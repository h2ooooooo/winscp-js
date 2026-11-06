---
outline: 2
---

# Query command examples

Inputs and outputs below were captured from the built command using synthetic settings. Colours preserve the executable's actual ANSI choices; JSON remains colour-free. These reference fixtures use example.invalid hosts and are separate from the 127.0.0.1 quick-start fixture. Placeholder fixture paths must be replaced with your local paths. No external server was contacted.

Start with the [CLI quick start](/cli/quick-start) for a complete fixture you can create and query immediately. See the [full output reference](/reference/cli-output) for every captured case.

## list (terminal)
```sh
winscp-js list --file <fixture-directory>\WinSCP.ini --color
```

Exit code: 0.

### stdout

<pre class="cli-output" v-pre><code><span style="color:#72f088;">• </span>Demo (Private key: C:\keys\example.ppk; Remote: /srv/example)</code></pre>

## list (JSON)
```sh
winscp-js list --file <fixture-directory>\WinSCP.ini --json
```

Exit code: 0.

### stdout

```json
[
  {
    "path": "Demo",
    "host": "files.example.invalid",
    "protocol": "ftp",
    "keyFile": "C:\\keys\\example.ppk",
    "remoteDirectory": "/srv/example"
  }
]
```

## list (table)
```sh
winscp-js list --file <fixture-directory>\WinSCP.ini --table --color
```

Exit code: 0.

### stdout

<pre class="cli-output" v-pre><code><span style="color:#76e3ea;">┌</span><span style="color:#76e3ea;">──────</span><span style="color:#76e3ea;">┬</span><span style="color:#76e3ea;">───────────────────────</span><span style="color:#76e3ea;">┬</span><span style="color:#76e3ea;">──────────</span><span style="color:#76e3ea;">┬</span><span style="color:#76e3ea;">─────────────────────</span><span style="color:#76e3ea;">┬</span><span style="color:#76e3ea;">──────────────</span><span style="color:#76e3ea;">┐</span>
<span style="color:#76e3ea;">│</span> <span style="font-weight:700;"></span><span style="color:#f0f3f6;font-weight:700;">Path</span><span style="font-weight:700;"></span> <span style="color:#76e3ea;">│</span> <span style="font-weight:700;"></span><span style="color:#f0f3f6;font-weight:700;">Host                 </span><span style="font-weight:700;"></span> <span style="color:#76e3ea;">│</span> <span style="font-weight:700;"></span><span style="color:#f0f3f6;font-weight:700;">Protocol</span><span style="font-weight:700;"></span> <span style="color:#76e3ea;">│</span> <span style="font-weight:700;"></span><span style="color:#f0f3f6;font-weight:700;">Private key        </span><span style="font-weight:700;"></span> <span style="color:#76e3ea;">│</span> <span style="font-weight:700;"></span><span style="color:#f0f3f6;font-weight:700;">Remote      </span><span style="font-weight:700;"></span> <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">├</span><span style="color:#76e3ea;">──────</span><span style="color:#76e3ea;">┼</span><span style="color:#76e3ea;">───────────────────────</span><span style="color:#76e3ea;">┼</span><span style="color:#76e3ea;">──────────</span><span style="color:#76e3ea;">┼</span><span style="color:#76e3ea;">─────────────────────</span><span style="color:#76e3ea;">┼</span><span style="color:#76e3ea;">──────────────</span><span style="color:#76e3ea;">┤</span>
<span style="color:#76e3ea;">│</span> Demo <span style="color:#76e3ea;">│</span> files.example.invalid <span style="color:#76e3ea;">│</span> ftp      <span style="color:#76e3ea;">│</span> C:\keys\example.ppk <span style="color:#76e3ea;">│</span> /srv/example <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">└</span><span style="color:#76e3ea;">──────</span><span style="color:#76e3ea;">┴</span><span style="color:#76e3ea;">───────────────────────</span><span style="color:#76e3ea;">┴</span><span style="color:#76e3ea;">──────────</span><span style="color:#76e3ea;">┴</span><span style="color:#76e3ea;">─────────────────────</span><span style="color:#76e3ea;">┴</span><span style="color:#76e3ea;">──────────────</span><span style="color:#76e3ea;">┘</span></code></pre>

## search
```sh
winscp-js search example --file <fixture-directory>\WinSCP.ini --color
```

Exit code: 0.

### stdout

<pre class="cli-output" v-pre><code>Found 1 profile

<span style="color:#76e3ea;">┌</span><span style="color:#76e3ea;">──────────────────</span><span style="color:#76e3ea;">┬</span><span style="color:#76e3ea;">─────────────────────────────────</span><span style="color:#76e3ea;">┐</span>
<span style="color:#76e3ea;">│</span> <span style="font-weight:700;"></span><span style="color:#f0f3f6;font-weight:700;">Label           </span><span style="font-weight:700;"></span> <span style="color:#76e3ea;">│</span> <span style="font-weight:700;"></span><span style="color:#f0f3f6;font-weight:700;">Value                          </span><span style="font-weight:700;"></span> <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">├</span><span style="color:#76e3ea;">──────────────────</span><span style="color:#76e3ea;">┼</span><span style="color:#76e3ea;">─────────────────────────────────</span><span style="color:#76e3ea;">┤</span>
<span style="color:#76e3ea;">│</span> Name             <span style="color:#76e3ea;">│</span> Demo                            <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Path             <span style="color:#76e3ea;">│</span> Demo                            <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Protocol         <span style="color:#76e3ea;">│</span> ftp                             <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Host             <span style="color:#76e3ea;">│</span> files.example.invalid           <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Port             <span style="color:#76e3ea;">│</span> 21                              <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Username         <span style="color:#76e3ea;">│</span> deploy                          <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Password         <span style="color:#76e3ea;">│</span>                                 <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Passphrase       <span style="color:#76e3ea;">│</span>                                 <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Credential state <span style="color:#76e3ea;">│</span> not-stored                      <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Authentication   <span style="color:#76e3ea;">│</span> connection/password: not-stored <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Private key      <span style="color:#76e3ea;">│</span> C:\keys\example.ppk             <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">│</span> Remote           <span style="color:#76e3ea;">│</span> /srv/example                    <span style="color:#76e3ea;">│</span>
<span style="color:#76e3ea;">└</span><span style="color:#76e3ea;">──────────────────</span><span style="color:#76e3ea;">┴</span><span style="color:#76e3ea;">─────────────────────────────────</span><span style="color:#76e3ea;">┘</span></code></pre>

## get (JSON)
```sh
winscp-js get Demo --file <fixture-directory>\WinSCP.ini --json
```

Exit code: 0.

### stdout

```json
{
  "name": "Demo",
  "path": "Demo",
  "protocol": "ftp",
  "host": "files.example.invalid",
  "port": 21,
  "user": "deploy",
  "password": "(hidden)",
  "passphrase": "(hidden)",
  "credentialState": "not-stored",
  "credentials": [
    {
      "connectionId": "connection",
      "kind": "password",
      "state": "not-stored"
    }
  ],
  "authentication": "connection/password: not-stored",
  "keyFile": "C:\\keys\\example.ppk",
  "remoteDirectory": "/srv/example",
  "connections": [
    {
      "id": "connection",
      "endpoint": {
        "host": "files.example.invalid",
        "port": 21,
        "username": "deploy"
      },
      "authentication": [
        {
          "type": "private-key",
          "path": {
            "value": "C:\\keys\\example.ppk",
            "format": "native"
          },
          "format": "ppk"
        },
        {
          "type": "password",
          "credential": {
            "sourceId": "winscp:<fixture-directory>\\WinSCP.ini",
            "id": "[\"Demo\",\"primary\"]",
            "state": "not-stored",
            "kind": "password"
          }
        }
      ],
      "kind": "ftp",
      "protocol": "ftp",
      "tls": "none",
      "remoteDirectory": "/srv/example"
    }
  ],
  "diagnostics": [],
  "source": {
    "id": "winscp:<fixture-directory>\\WinSCP.ini",
    "application": "winscp",
    "location": "<fixture-directory>\\WinSCP.ini",
    "storage": [
      {
        "kind": "file",
        "path": "<fixture-directory>\\WinSCP.ini"
      }
    ]
  }
}
```

## get a property
```sh
winscp-js get Demo host --file <fixture-directory>\WinSCP.ini --json
```

Exit code: 0.

### stdout

```json
"files.example.invalid"
```

## source
```sh
winscp-js source --file <fixture-directory>\WinSCP.ini --json
```

Exit code: 0.

### stdout

```json
{
  "id": "winscp:<fixture-directory>\\WinSCP.ini",
  "application": "winscp",
  "location": "<fixture-directory>\\WinSCP.ini",
  "storage": [
    {
      "kind": "file",
      "path": "<fixture-directory>\\WinSCP.ini"
    }
  ]
}
```

## sources
```sh
winscp-js sources --file <fixture-directory>\WinSCP.ini --json
```

Exit code: 0.

### stdout

```json
{
  "candidates": [
    {
      "id": "winscp:<fixture-directory>\\WinSCP.ini",
      "application": "winscp",
      "location": "<fixture-directory>\\WinSCP.ini",
      "storage": [
        {
          "kind": "file",
          "path": "<fixture-directory>\\WinSCP.ini"
        }
      ]
    }
  ],
  "selectedSourceId": "winscp:<fixture-directory>\\WinSCP.ini",
  "selectedBy": "explicit",
  "diagnostics": []
}
```
