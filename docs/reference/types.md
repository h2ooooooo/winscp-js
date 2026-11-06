<!-- Generated from public package declarations by scripts/generate-api-docs.mjs. -->
# TypeScript reference

These signatures come from the public package entry points and their re-exports. Build the libraries and run `npm run docs:api` to update them. Use the API guide for behavior and examples.

## @jalsoedesign/winscp-core

### index.d.ts

```ts
import type { SourceReference } from '@jalsoedesign/portline-abstract';
import { NativeProfileSource } from '@jalsoedesign/portline-platform';
import type { NativeDiscoveryOptions, NativeSession, RegistryReader } from '@jalsoedesign/portline-platform';
/** Recognizes WinSCP internal obfuscation; external/master-password blobs remain locked. */
export declare function decodeWinScpPassword(value: string, identity: string): {
    state: 'available';
    value: string;
} | {
    state: 'locked' | 'unsupported';
};
export declare class WinScpProfileSource extends NativeProfileSource {
    static fromSessions(source: SourceReference, sessions: readonly NativeSession[]): WinScpProfileSource;
    static fromFile(filename: string): Promise<WinScpProfileSource>;
    static fromRegistry(key?: string, reader?: RegistryReader, view?: '32' | '64' | 'default'): Promise<WinScpProfileSource>;
    static discover(options?: NativeDiscoveryOptions): Promise<import("@jalsoedesign/portline-platform").DiscoveryResult>;
    static open(options?: NativeDiscoveryOptions): Promise<WinScpProfileSource>;
}
export { WinScpProfileSource as WinSCP };
export declare const discoverWinScpSources: typeof WinScpProfileSource.discover;
export * from './writing.js';
```

### writing.d.ts

```ts
import { NativeProfileWriter } from '@jalsoedesign/portline-platform';
import type { NativeWriteOptions } from '@jalsoedesign/portline-platform';
import type { SourceReference } from '@jalsoedesign/portline-abstract';
export declare function createWinScpWriter(source: SourceReference, options?: Omit<NativeWriteOptions, 'source' | 'application'>): NativeProfileWriter;
```
