import {requireSource} from '@jalsoedesign/portline-platform';
import {WinScpProfileSource, createWinScpWriter} from '@jalsoedesign/winscp-core';
import {createProfileCli, createNormalizedCliSource, parseProfileArgs, createProfileWriteCommands} from '@jalsoedesign/portline-cli';
import type {ProfileCliOptions} from '@jalsoedesign/portline-cli';

const sourceOptions = [
    {
        "flag": "--source",
        "key": "sourceId",
        "takesValue": true,
        "description": "Select a discovered source ID"
    },
    {
        "flag": "--executable",
        "key": "executablePath",
        "takesValue": true,
        "description": "Inspect storage beside an application executable"
    },
    {
        "flag": "--directory",
        "key": "directory",
        "takesValue": true,
        "description": "Portable session directory"
    },
    {
        "flag": "--registry",
        "key": "registry",
        "takesValue": true,
        "description": "HKCU or HKLM session registry key"
    },
    {
        "flag": "--registry-view",
        "key": "registryView",
        "takesValue": true,
        "description": "32, 64 or default registry view"
    }
] as const;

function optionsFor(options: ProfileCliOptions): Parameters<typeof WinScpProfileSource.open>[0] {

    if (options.registryView && !['32', '64', 'default'].includes(String(options.registryView))) {
        throw new Error('Registry view must be 32, 64 or default');
    }

    return options as Parameters<typeof WinScpProfileSource.open>[0];
}

export const cli = createProfileCli({
    name: 'winscp-js',
    sourceOptions,
    loadSource: options => WinScpProfileSource.open(optionsFor(options)).then(createNormalizedCliSource),
    commands: {
        ...createProfileWriteCommands({
            application: 'winscp', sourceOptions,
            importSource: name => import(name),
            writer: async options => createWinScpWriter(requireSource(await WinScpProfileSource.discover(optionsFor(options))), {
                mode: options.mode as 'create' | 'update' | 'upsert' | undefined,
                allowLossy: options.allowLossy === true,
                registryMode: options.registryMode as 'transactional' | 'guarded' | undefined,
            }),
        }),
        async sources(args) {
            const {options} = parseProfileArgs(args, {sourceOptions});

            if (options.help) {
                console.log('Use sources --json to inspect candidates; select with --source <id> or an explicit source path.');

                return;
            }

            console.log(JSON.stringify(await WinScpProfileSource.discover(optionsFor(options)), null, 2));
        },
    },
});
