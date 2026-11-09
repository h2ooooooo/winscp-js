# CLI quick start

Query a synthetic profile without reading installed application settings or contacting a server.

## Install

```sh
npm install --global @jalsoedesign/winscp-cli@rc
winscp-js --help
```


For a project-local dependency use `npm install @jalsoedesign/winscp-cli@rc`, then prefix the commands below with `npm exec --`. Runtime requirements are listed in [installation](/guide/installation).

## Create the fixture

In a new working directory, save the following file:

### WinSCP.ini

```ini
[Sessions\Demo]
HostName=127.0.0.1
UserName=deploy
FSProtocol=5
PublicKeyFile=C:\keys\example.ppk
RemoteDirectory=/srv/example
```


The key paths in these fixtures are illustrative metadata; no key file or account is required.

## Run this command

```sh
winscp-js get Demo host --file ./WinSCP.ini --json
```


## Get this output

Exit code: `0`, stdout:

```json
"127.0.0.1"
```


List and search the same fixture:

```sh
winscp-js list --file ./WinSCP.ini --json
winscp-js search 127.0.0.1 --file ./WinSCP.ini
```


The first command returns summary records; the second displays matching metadata. See [captured query outputs](/cli/queries) for full table/JSON examples and colours. Summary records are not normalized write-intent documents.

## Run the complete demo automatically

From an installed checkout, run `npm run build`, then `node examples/test-profiles.mjs`. It creates equivalent settings in a temporary directory, runs the built CLI, checks the host and cleans up. Its [full transcript](/guide/local-demo) includes list output.
