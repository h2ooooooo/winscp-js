# How WinSCP JS works

WinSCP JS reads saved sessions from storage on the host. It does not control an open WinSCP window or connect to a saved server while listing profiles.

## Find the session store

Sessions can be read from a selected `WinSCP.ini`, a Windows registry export or the live registry key `HKCU\Software\Martin Prikryl\WinSCP 2\Sessions`.

| Storage | Location on the host |
| --- | --- |
| Registry sessions | `HKEY_CURRENT_USER\Software\Martin Prikryl\WinSCP 2\Sessions` |
| Portable INI | `WinSCP.ini` beside the selected executable |
| Roaming INI | `%APPDATA%\WinSCP.ini` |
| Explicit INI/export | The supplied file path |

`HKCU` is the current Windows account's registry hive, so a different account can have different sessions. WinSCP's [configuration-storage documentation](https://winscp.net/eng/docs/config) explains native storage selection; its [checking the active store](https://winscp.net/eng/docs/config#checking_what_store_is_in_use) section shows how the session log identifies the actual store. [Discovery](/guide/storage#discover-before-selecting) returns candidates and source identity rather than merging them.

Discovery checks available registry and file candidates. For a running executable it examines an absolute `/ini=` override, then an adjacent `WinSCP.ini`, then a supported roaming-profile file before considering registry storage. A `/ini=nul` switch or an unresolved relative override does not identify a readable persistent file. Ambiguous sources need explicit selection.

The registry and INI paths identify settings on the host. A session's `RemoteDirectory` identifies a directory on the saved server. Its `PublicKeyFile` identifies a private-key file on the host.

## Interpret the native session records

1. Read the selected file or enumerate the selected registry key.
2. Parse registry-export records or INI sections below `Sessions\`.
3. Decode supported escaped session names and INI string values.
4. Interpret protocol, FTP/TLS mode, endpoint, key path and remote-directory fields.
5. Return normalized profiles, authentication references, native settings and diagnostics.

### Example: a saved SFTP session

This synthetic INI section describes one session:

```ini
[Sessions\Production]
HostName=sftp.example.test
PortNumber=22
UserName=deploy
FSProtocol=2
PublicKeyFile=C:\Keys\deploy.ppk
RemoteDirectory=/srv/example
```

| Stored field | Meaning |
| --- | --- |
| `Sessions\Production` | Saved session name `Production` inside the `Sessions` section hierarchy. |
| `HostName`, `PortNumber`, `UserName` | Server endpoint `deploy@sftp.example.test:22`. |
| `FSProtocol=2` | Native `fsSFTPonly`, projected as an SFTP connection. |
| `PublicKeyFile` | Despite its native name, the private-key path on the host. |
| `RemoteDirectory` | Initial directory `/srv/example` on the server; no FileZilla-style path decoding is needed. |

The registry stores corresponding named values below `...\Sessions\Production` instead of an INI section. WinSCP defines protocol numbers in [`TFSProtocol` in `SessionData.h`](https://github.com/winscp/winscp/blob/master/source/core/SessionData.h): `0` is SCP, `1` is SFTP with SCP fallback, `2` is SFTP only and `5` is FTP. Its [`TSessionData::DoLoad` implementation](https://github.com/winscp/winscp/blob/master/source/core/SessionData.cpp) reads the native fields. [WinScpProfileSource](/reference/types#index-d-ts) defines the reader entry points, while [native data and projection](/guide/storage#native-data-and-projection) explains the returned metadata.

Supported SFTP and FTP/TLS settings receive a connection projection. Native SCP, WebDAV, S3 and other unsupported protocols remain identifiable rather than being silently treated as supported transfers.

A session can also describe one SSH tunnel. That tunnel is a separate `ssh` connection, and the main connection's `via` relationship refers to it. Tunnel credentials and the transfer-session credentials remain independent.

## Resolve credentials only when requested

The reader recognizes supported internal stored-password representations. Explicit resolution validates the native envelope and required identity prefix before returning a value. External/master-password blobs remain locked, and unknown formats remain unsupported.

Private-key paths do not load key contents. Raw native settings may contain stored credential representations, so log selected metadata rather than an entire raw session.

## Reading, connecting and writing

A source is a snapshot; reopen it after settings change. Reading does not transfer files, open a tunnel or modify the native store. Dockline separately provides live transfer and SSH operations for supported connection settings.

Use the [API quick start](/api/quick-start), [CLI quick start](/cli/quick-start) or [storage guide](/guide/storage). [Profile writing](/guide/writing) describes the separate preview/apply operation, native field preservation and lock checks.
