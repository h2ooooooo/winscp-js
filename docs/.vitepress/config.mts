import {defineConfig} from 'vitepress';
import {nav, sidebar} from './navigation.mjs';

export default defineConfig({
    base: process.env.DOCS_BASE ?? '/',
    "title": "WinSCP JS",
    "description": "Read WinSCP transfer sessions and SSH tunnels, discover active storage, and preview safe session imports or updates.",
    "lang": "en-US",
    "appearance": false,
    "cleanUrls": false,
    "markdown": {
        "theme": "github-dark-high-contrast"
    },
    "head": [
        [
            "meta",
            {
                "name": "theme-color",
                "content": "#171a1d"
            }
        ]
    ],
    "themeConfig": {
        "siteTitle": "WinSCP JS",
        "nav": nav,
        "sidebar": sidebar,
        "search": {
            "provider": "local"
        },
        "outline": [
            2,
            3
        ],
        "socialLinks": [
            {
                "icon": "github",
                "link": "https://github.com/h2ooooooo/winscp-js"
            }
        ],
    }
});
