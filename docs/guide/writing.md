# Write and sync

Writers separate a redacted preview from an explicit apply. Reading a source, planning changes or saving a preview never modifies settings.

## Preview with the CLI

Prepare normalized ConnectionProfile records in profiles.json. This is the Portline profile contract, not an arbitrary native settings dump.

~~~sh
winscp-js write --file WinSCP-copy.ini --input profiles.json --preview plan.json --json
winscp-js write-status --file WinSCP-copy.ini --json
~~~

The default mode is create. Existing paths fail rather than overwrite; use `--mode update` or `--mode upsert` explicitly and repeat that policy during apply.

Review the saved preview's changes, diagnostics and application/lock inspection. Close the application and other settings writers before the next command.

~~~sh
winscp-js apply --file WinSCP-copy.ini --plan plan.json --json
~~~

Apply rechecks destination identity, revision, process state and locks. A changed destination or edited preview must be replanned.

## SDK writer

~~~ts
import {createWinScpWriter} from '@jalsoedesign/winscp-core';

// source and selected come from the quick start.
if (!selected) {
    throw new Error('Choose an existing source profile first.');
}

const writer = createWinScpWriter(source.source, {mode: 'create'});
const preview = await writer.plan([{
    ...selected,
    path: 'Imported',
    name: 'Imported',
}]);

console.log(preview.changes, preview.inspection, preview.diagnostics);
~~~

This previews a new name in the selected storage. It can refuse unsupported profile fields or an existing Imported path. Apply separately, after reviewing the preview and closing the application:

~~~ts
await writer.apply(preview);
console.log(writer.backupPaths);
~~~

The writer also provides inspect, planChanges and importPlan. `planChanges` supports explicit create/update/upsert/delete mutations. A serialized preview must pass `importPlan` on a writer with the same destination and policies before apply.

## One-way sync

Install the source application's adapter alongside the destination CLI. Use `sync --help` for source-specific selectors. A source with multiple connections requires explicit `--connection`; this is especially relevant to database sessions with SSH tunnels. Sync never infers that a database endpoint is an SSH server, and never prunes unrelated target profiles.

Supported SFTP/FTP/TLS and tunnel settings are projected. Unsupported protocols or TLS policy conversions are refused.

See [safeguards and limitations](/guide/limitations) for backups, secrets and registry policies.
