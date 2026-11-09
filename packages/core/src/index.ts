import path from 'node:path';
import type {ConnectionDefinition, SourceReference} from '@jalsoedesign/portline-abstract';
import {
    NativeProfileSource, credential, decodeName, discoverNativeSources, exists, fileSource, nativeProfile,
    parseIni, parseRegistryExport, port, privateKey, readText, registrySource, requireSource, text, windowsRegistry,
} from '@jalsoedesign/portline-platform';
import type {NativeDiscoveryOptions, NativeSession, RegistryReader} from '@jalsoedesign/portline-platform';

const registryKey = 'HKCU\\Software\\Martin Prikryl\\WinSCP 2\\Sessions';

/** Recognizes WinSCP internal obfuscation; external/master-password blobs remain locked. */
export function decodeWinScpPassword(value: string, identity: string): {state: 'available'; value: string} | {state: 'locked' | 'unsupported'} {
    if (!/^(?:[a-f\d]{2})+$/i.test(value)) {
        return {state: 'unsupported'};
    }

    const bytes = Buffer.from(value, 'hex');
    let index = 0;
    const read = () => {
        if (index >= bytes.length) {
            throw new Error('Truncated WinSCP password');
        }

        return (~(bytes[index++] ^ 0xa3)) & 255;
    };

    try {
        const flag = read();
        let length = flag;

        if (flag === 255) {
            const version = read();

            if (version === 1) {
                return {state: 'locked'};
            }

            if (version !== 0 && version !== 2) {
                return {state: 'unsupported'};
            }

            length = version === 2 ? (read() << 8) + read() : read();
        }

        const skip = read();

        index += skip;

        if (index + length > bytes.length) {
            return {state: 'unsupported'};
        }

        const plain = Buffer.alloc(length);

        for (let position = 0; position < length; position++) {
            plain[position] = read();
        }

        const prefix = Buffer.from(identity, 'utf8');

        if (flag === 255 && !plain.subarray(0, prefix.length).equals(prefix)) {
            return {state: 'unsupported'};
        }

        return {state: 'available', value: plain.subarray(flag === 255 ? prefix.length : 0).toString('utf8')};
    } catch {
        return {state: 'unsupported'};
    }
}

function passwordState(value: string) {
    if (!value) {
        return 'not-stored';
    }

    if (!/^(?:[a-f\d]{2})+$/i.test(value)) {
        return 'unsupported';
    }

    const bytes = Buffer.from(value, 'hex');
    const first = (~(bytes[0] ^ 0xa3)) & 255;
    const version = (~(bytes[1] ^ 0xa3)) & 255;

    return first === 255 && version === 1 ? 'locked' :
        first !== 255 || version === 0 || version === 2 ? 'available' : 'unsupported';
}

export class WinScpProfileSource extends NativeProfileSource {
    public static fromSessions(source: SourceReference, sessions: readonly NativeSession[]) {
        const native = sessions.map(session => ({name: decodeName(session.name), settings: session.settings}));
        const profiles = native.filter(session => text(session.settings, 'HostName')).map(session => {
            const settings = session.settings;
            const fsProtocol = text(settings, 'FSProtocol', '1');
            const ftp = fsProtocol === '5';
            const ssh = ['1', '2'].includes(fsProtocol);
            const tlsMode = text(settings, 'Ftps', '0');
            const protocol = ftp ? tlsMode === '0' ? 'ftp' : 'ftps' : ssh ? 'sftp' :
                fsProtocol === '0' ? 'scp' : fsProtocol === '6' ? 'webdav' : fsProtocol === '7' ? 's3' : fsProtocol;
            const unsupportedOptions = [
                ...(text(settings, 'ProxyMethod', '0') !== '0' ? ['ProxyMethod'] : []),
                ...(text(settings, 'FtpAccount') ? ['FtpAccount'] : []),
                ...(text(settings, 'SftpServer') ? ['SftpServer'] : []),
                ...(text(settings, 'PostLoginCommands') ? ['PostLoginCommands'] : []),
                ...(text(settings, 'SourceAddress') ? ['SourceAddress'] : []),
                ...['Cipher', 'KEX', 'HostKey'].filter(key => text(settings, key)),
                ...(text(settings, 'Utf', '2') === '0' ? ['Utf=0 (native ANSI code page)'] : []),
            ];
            const base = {
                id: 'connection',
                unsupportedOptions,
                filenameEncoding: text(settings, 'Utf', '2') === '1' ? {charset: 'utf8'} : undefined,
                endpoint: {
                    host: text(settings, 'HostName'),
                    port: port(text(settings, 'PortNumber'), ftp ? tlsMode === '1' ? 990 : 21 : 22),
                    username: text(settings, 'UserName'),
                },
                authentication: [
                    ...privateKey(text(settings, 'PublicKeyFile')),
                    {
                        type: 'password' as const,
                        credential: credential(source, JSON.stringify([session.name, 'primary']), passwordState(text(settings, 'Password'))),
                    },
                ],
                via: text(settings, 'Tunnel', '0') === '1' ? ['ssh'] : undefined,
            };
            const connection: ConnectionDefinition = ftp ? {
                ...base,
                kind: 'ftp',
                protocol: protocol as 'ftp' | 'ftps',
                tls: tlsMode === '0' ? 'none' : tlsMode === '1' ? 'implicit' : 'explicit',
                passive: text(settings, 'FtpPasvMode') ? text(settings, 'FtpPasvMode') !== '0' : undefined,
                remoteDirectory: text(settings, 'RemoteDirectory'),
            } : ssh ? {
                ...base,
                kind: 'ssh',
                protocol: 'sftp',
                remoteDirectory: text(settings, 'RemoteDirectory'),
            } : {...base, kind: 'unsupported', protocol};
            const connections = [connection];

            if (base.via) {
                connections.push({
                    id: 'ssh',
                    unsupportedOptions: [
                        ...(text(settings, 'ProxyMethod', '0') !== '0' ? ['ProxyMethod'] : []),
                        ...(text(settings, 'TunnelHostKey') ? ['TunnelHostKey'] : []),
                    ],
                    kind: 'ssh',
                    protocol: 'ssh',
                    endpoint: {
                        host: text(settings, 'TunnelHostName'),
                        port: port(text(settings, 'TunnelPortNumber'), 22),
                        username: text(settings, 'TunnelUserName'),
                    },
                    authentication: [
                        ...privateKey(text(settings, 'TunnelPublicKeyFile')),
                        {
                            type: 'password',
                            credential: credential(source, JSON.stringify([session.name, 'ssh']),
                                passwordState(text(settings, 'TunnelPassword'))),
                        },
                    ],
                });
            }

            return {
                ...nativeProfile(source, session.name, connections),
                localDirectory: text(settings, 'LocalDirectory') ?
                    {value: text(settings, 'LocalDirectory'), format: 'native' as const} : undefined,
            };
        });

        const snapshot = new Map(native.map(session => [session.name, structuredClone(session.settings)]));

        return new WinScpProfileSource(source, profiles, native, async reference => {
            const [name, connection] = JSON.parse(reference.id);
            const tunnel = connection === 'ssh';
            const settings = snapshot.get(name);

            if (!settings) {
                return {state: 'unavailable'};
            }

            return decodeWinScpPassword(text(settings, tunnel ? 'TunnelPassword' : 'Password'),
                text(settings, tunnel ? 'TunnelUserName' : 'UserName') + text(settings, tunnel ? 'TunnelHostName' : 'HostName'));
        });
    }

    public static async fromFile(filename: string) {
        const contents = await readText(filename);
        const sessions = /^\s*(Windows Registry Editor|REGEDIT4)/.test(contents) ?
            parseRegistryExport(contents, registryKey) : parseIni(contents)
                .filter(section => section.name.startsWith('Sessions\\'))
                .map(section => ({name: section.name.slice(9), settings: Object.fromEntries(
                    Object.entries(section.settings).map(([key, value]) => [key, typeof value === 'string' ? decodeName(value) : value]),
                )}));

        return WinScpProfileSource.fromSessions(fileSource('winscp', filename), sessions);
    }

    public static async fromRegistry(
        key = registryKey,
        reader: RegistryReader = windowsRegistry,
        view: '32' | '64' | 'default' = 'default',
    ) {
        const source = registrySource('winscp', key, view);

        return WinScpProfileSource.fromSessions(source, await reader.read(source.storage![0] as Parameters<RegistryReader['read']>[0]));
    }

    public static async discover(options: NativeDiscoveryOptions = {}) {
        const roaming = process.env.APPDATA;
        const userIni = roaming ? path.join(roaming, 'WinSCP.ini') : undefined;

        return discoverNativeSources({
            application: 'winscp',
            registryKey,
            processNames: ['WinSCP.exe', 'WinSCP.com', 'winscp.exe', 'winscp.com'],
            portableNames: ['WinSCP.ini'],
            defaultDirectories: roaming ? [roaming] : [],
            async forExecutable(executable, registry) {
                const override = executable.arguments.find(argument => /^\/ini=/i.test(argument));

                if (override) {
                    const filename = override.slice(5);

                    if (filename.toLowerCase() === 'nul' || !path.isAbsolute(filename)) {
                        return undefined;
                    }

                    return fileSource('winscp', filename);
                }

                const adjacent = path.join(path.dirname(executable.executablePath), 'WinSCP.ini');

                if (await exists(adjacent)) {
                    return fileSource('winscp', adjacent);
                }

                if (userIni && await exists(userIni)) {
                    return fileSource('winscp', userIni);
                }

                return registry;
            },
        }, options);
    }

    public static async open(options: NativeDiscoveryOptions = {}) {
        const source = requireSource(await WinScpProfileSource.discover(options));
        const storage = source.storage![0];

        if (storage.kind === 'directory') {
            throw new Error('WinSCP requires an INI file or registry source');
        }

        const result = storage.kind === 'registry' ? await WinScpProfileSource.fromRegistry(
            storage.hive + '\\' + storage.key, options.registryReader, storage.view,
        ) : await WinScpProfileSource.fromFile(storage.path);

        return new WinScpProfileSource(source, result.list().map(profile => ({...profile, source})), result.list().map(profile => ({
            name: profile.id,
            settings: result.getNativeSettings(profile.id)!,
        })), reference => result.resolve(reference));
    }
}
export {WinScpProfileSource as WinSCP};
export const discoverWinScpSources = WinScpProfileSource.discover;

export * from './writing.js';
