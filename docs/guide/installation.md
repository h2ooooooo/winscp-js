# Installation

Use Node.js 22.22.2 or newer. Install the library in your application and the CLI only when needed:

~~~sh
npm install @jalsoedesign/winscp-core
npm install --global @jalsoedesign/winscp-cli
~~~

The executable name remains `winscp-js`. The library is ESM and includes TypeScript declarations. TypeScript consumers should install `@types/node` and include `node` in their compiler's types when needed.

~~~sh
winscp-js --help
~~~



## Platform support

Portable files can be parsed without the native application. Registry reads, Windows process discovery and built-in apply require Windows. On other platforms, file reads and previews remain available, while apply refuses unknown availability. See the [format boundaries](/guide/limitations).
