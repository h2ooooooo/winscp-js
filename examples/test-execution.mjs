import assert from 'node:assert/strict';
import {createDocklineBridge} from '@jalsoedesign/portline-dockline';
import {WinScpProfileSource} from '../packages/core/dist/index.js';

const source = WinScpProfileSource.fromSessions({id: 'fixture', application: 'winscp'}, [{
    name: 'site', settings: {HostName: 'files.example', UserName: 'alice', RemoteDirectory: '/srv/site'},
}, {
    name: 'proxy', settings: {HostName: 'files.example', ProxyMethod: '3'},
}]);
const bridge = createDocklineBridge({source});
const options = {password: 'fixture-password', hostFingerprint: 'SHA256:' + 'A'.repeat(43)};
const config = await bridge.toConfig('site', options);
assert.equal(config.protocol, 'sftp');
assert.equal(config.host, 'files.example');
assert.equal(config.root, '/srv/site');
await assert.rejects(bridge.toConfig('proxy', options), /ProxyMethod|unsupported/i);
console.log('WinSCP profile prepared through the shared bridge; unsupported native routing refused.');
