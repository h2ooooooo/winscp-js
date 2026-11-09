---
layout: home
hero:
  name: WinSCP JS
  text: Use the transfer sessions you have already saved.
  tagline: Read saved WinSCP connection settings from code or the terminal.
  actions:
    - theme: brand
      text: Use the API
      link: /api/
    - theme: alt
      text: Use the CLI
      link: /cli/
---

Source code: [GitHub repository](https://github.com/h2ooooooo/winscp-js).

WinSCP already stores the connection details, key paths and remote directories used for file transfers. WinSCP JS lets scripts read those saved profiles from INI files, registry exports or the Windows registry. Find a session, inspect its settings, or preview supported changes without re-entering the server details.

[How it works](/guide/how-it-works) explains where settings are read, how the native format is interpreted and what happens on the host.

## Choose your starting point

| You want to… | Start here |
| --- | --- |
| Use JavaScript or TypeScript | [API quick start](/api/quick-start) |
| Work from your terminal | [CLI quick start](/cli/quick-start) |
| Understand available packages and operations | [API overview](/api/) |
| Look up commands, inputs and output | [CLI overview](/cli/) |


## Supported settings

SFTP/FTP profile projection does not turn unsupported SCP, WebDAV or S3 settings into supported transfers. [Dockline](https://h2ooooooo.github.io/dockline/) separately provides transport execution. See the [API reference](/reference/api) for supported native settings.

[Browse related application libraries](https://h2ooooooo.github.io/portline/libraries/).

## Reuse a saved connection

[Connect a selected profile](/api/integration) through the optional shared Portline–Dockline integration. Use the same scoped execution API across application readers while keeping native parsing and metadata queries free of transport dependencies.
