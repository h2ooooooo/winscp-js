# WinSCP JS API

Read WinSCP sessions from INI files, registry exports or the Windows registry. Inspect endpoints, key paths and remote directories, then preview supported native profile changes.

## Get a working result

The [API quick start](/api/quick-start) creates synthetic native settings, reads them through the public library, selects one profile and searches by host. Its code and captured output are shown together. No application installation or remote account is needed.

Install `@jalsoedesign/winscp-core` to use the library. The separate `@jalsoedesign/winscp-cli` installs the terminal command. See [installation](/guide/installation) for runtime requirements.

## Learn by task

| Task | Documentation |
| --- | --- |
| Read a file and understand the returned metadata | [Quick start](/api/quick-start) |
| List, select and search profiles | [Everyday profile queries](/api/profiles) |
| Find and select native storage | [Storage and discovery](/guide/storage) |
| Preview supported changes and cross-app sync | [Writing guide](/guide/writing) |
| Use a selected profile in your own integration | [Execution boundary](/api/integration) |
| Look up parameters, return values and exports | [API reference](/reference/api) and [TypeScript signatures](/reference/types) |

SFTP/FTP profile projection does not turn unsupported SCP, WebDAV or S3 settings into supported transfers. Dockline separately provides transport execution.

Application adapters retain native provenance and diagnostics. Portline supplies shared contracts/querying/writer guards; Dockline is a separate execution library. For terminal commands, switch to the [CLI documentation](/cli/).

## Connect through the shared integration

Use [shared FTP/SFTP and SSH execution](/api/integration) to reuse a selected normalized profile with `@jalsoedesign/portline-dockline`. The guide includes reader-specific source creation, optional client installation, scoped cleanup and trust/authentication requirements. Native readers do not open connections while listing profiles.
