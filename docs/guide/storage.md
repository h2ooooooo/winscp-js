# Storage and discovery

Read WinSCP.ini files, registry sessions and .reg exports. Discovery honors an established running /ini= override and reports candidates rather than silently merging unrelated stores. Registry view and explicit file selection remain part of source identity.

## Discover before selecting

~~~ts
import {WinScpProfileSource} from '@jalsoedesign/winscp-core';

const discovery = await WinScpProfileSource.discover();
console.log(discovery.candidates, discovery.selectedSourceId, discovery.diagnostics);
~~~

Candidates carry source identity, storage kind and location, registry view where relevant, and an executable/version when discovery actually establishes them. An absent selected source means the caller must choose; it does not mean all candidates should be merged.

~~~sh
winscp-js sources --json
winscp-js list --source <source-id> --json
~~~

Use `open(options)` to apply discovery and open the selected source. Explicit source options take priority. Do not infer active storage or application version from an arbitrary file path.

## Native data and projection

Profiles distinguish SFTP, FTP/TLS and supported SSH tunnels. Default native options and unknown session properties remain available through the native API. Supported internal password formats are resolved explicitly; recognized external/master-password markers remain locked; malformed or unknown encodings are unsupported. Writers refuse unsupported protocols and TLS policy conversions instead of inventing an equivalent. Transfers belong to Dockline, not to this settings reader.

`getNativeSettings(name)` is an explicit escape hatch for application-specific values. It can contain saved credentials and should not be serialized or logged as ordinary profile metadata.



## Discovery and native-option limits

Built-in live registry/process inspection requires Windows; INI and .reg exports can be read as files independently. Running /ini= overrides are recognized only when they identify an absolute settings path. /ini=nul and unresolved relative overrides leave active storage unselected. Discovery also considers adjacent/roaming WinSCP.ini before registry fallback when that relationship is established. Explicit source selection takes precedence.

The reader projects supported SFTP, FTP/TLS and SSH-hop metadata. SCP, WebDAV, S3 and other native protocols are not turned into supported Dockline sessions. Per-session unknown properties remain available through native access; the adapter is not a complete application-preferences export or WinSCP defaults-merging engine. Supported internal password obfuscation can be resolved explicitly; recognized master-password/external markers remain locked; malformed or unknown encodings are unsupported.

Executable/version metadata is included only when inspection establishes it. Source discovery and credential resolution do not test a remote login.

For an explicit live operation after selecting a profile, use [the shared connection walkthrough](/api/integration). Native-only execution requirements are represented as `unsupportedOptions`; reading a profile does not grant permission to discard them.
