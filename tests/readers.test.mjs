import assert from 'node:assert/strict';
import {test} from 'node:test';
import {mkdtemp, mkdir, writeFile, rm} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

async function fixture(t) {
    const directory = await mkdtemp(path.join(os.tmpdir(), 'portline fixtures '));
    t.after(() => rm(directory, {recursive: true, force: true}));

    return directory;
}
function cli(args) {
    return spawnSync(process.execPath, ['packages/cli/bin/cli.js', ...args], {encoding: 'utf8'});
}
import {WinScpProfileSource, decodeWinScpPassword} from '../packages/core/dist/index.js';

function stored(value, identity, version = 0) {
    const data = Buffer.from(identity + value, 'utf8');
    const header = version === 2 ? [255, 2, data.length >> 8, data.length & 255, 0] : [255, 0, data.length, 0];

    return Buffer.from([...header, ...data].map(byte => (~byte ^ 0xa3) & 255)).toString('hex').toUpperCase();
}

test('INI reads defaults, folders, tunnels and private keys without leaking saved secrets', async t => {
    const directory = await fixture(t);
    const filename = path.join(directory, 'WinSCP.ini');
    const password = stored('secret-value', 'aliceexample');
    await writeFile(filename, [
        '[Sessions\\folder%2Fwork]', 'HostName=example', 'UserName=alice',
        'PublicKeyFile=C:\\keys\\id.ppk', 'Password=' + password, 'RemoteDirectory=/srv/web',
        'Tunnel=1', 'TunnelHostName=gateway', 'TunnelUserName=deploy',
        'TunnelPublicKeyFile=C:\\keys\\gateway.ppk', 'CustomOption=retained',
    ].join('\n'));
    const source = await WinScpProfileSource.open({file: filename});
    const profile = source.get('folder/work');

    assert.equal(profile.connections[0].protocol, 'sftp');
    assert.equal(profile.connections[0].remoteDirectory, '/srv/web');
    assert.equal(profile.connections[1].endpoint.host, 'gateway');
    assert.equal(source.getNativeSettings('folder/work').CustomOption, 'retained');
    assert.ok(!JSON.stringify(profile).includes(password));
    assert.deepEqual(await source.resolve(profile.connections[0].authentication[1].credential),
        {state: 'available', value: 'secret-value'});
    const result = cli(['get', 'folder/work', '--file', filename, '--show-password', '--json']);

    assert.equal(result.status, 0, result.stderr);
    assert.equal(JSON.parse(result.stdout).password, 'secret-value');
});

test('credential decoding rejects corrupt identities and handles external/master blobs explicitly', () => {
    assert.deepEqual(decodeWinScpPassword(stored('sëcret', 'userhost'), 'userhost'), {state: 'available', value: 'sëcret'});
    assert.deepEqual(decodeWinScpPassword(stored('x'.repeat(300), 'userhost', 2), 'userhost'),
        {state: 'available', value: 'x'.repeat(300)});
    assert.deepEqual(decodeWinScpPassword(stored('secret', 'userhost'), 'wrong'), {state: 'unsupported'});
    assert.deepEqual(decodeWinScpPassword('A35D', ''), {state: 'locked'});
    assert.deepEqual(decodeWinScpPassword('bad', ''), {state: 'unsupported'});
});

test('discovery honors running /ini= path and does not serialize process arguments', async t => {
    const directory = await fixture(t);
    const filename = path.join(directory, 'alternate.ini');
    const result = await WinScpProfileSource.discover({
        platform: 'win32',
        registryReader: {exists: async () => true, read: async () => []},
        processReader: {list: async () => [{
            executablePath: path.join(directory, 'WinSCP.exe'),
            applicationVersion: '6.0',
            arguments: ['/ini=' + filename, '/password=do-not-print'],
        }]},
    });

    assert.equal(result.selectedBy, 'running-application');
    assert.equal(result.candidates.find(item => item.id === result.selectedSourceId).location, filename);
    assert.ok(!JSON.stringify(result).includes('do-not-print'));
});

test('execution projection preserves FTP mode and UTF-8 and blocks native-only routing', () => {
    const source = WinScpProfileSource.fromSessions({id: 'fixture', application: 'winscp'}, [{
        name: 'ftp', settings: {
            HostName: 'ftp.example', FSProtocol: '5', Ftps: '1', FtpPasvMode: '0', Utf: '1',
        },
    }, {
        name: 'proxy', settings: {HostName: 'ssh.example', ProxyMethod: '3', Utf: '0'},
    }]);
    const ftp = source.get('ftp').connections[0];

    assert.equal(ftp.tls, 'implicit');
    assert.equal(ftp.endpoint.port, 990);
    assert.equal(ftp.passive, false);
    assert.deepEqual(ftp.filenameEncoding, {charset: 'utf8'});
    assert.deepEqual(source.get('proxy').connections[0].unsupportedOptions,
        ['ProxyMethod', 'Utf=0 (native ANSI code page)']);
});
