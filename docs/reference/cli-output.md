---
outline: 2
---

# CLI output reference

These examples were captured from the actual built CLI using synthetic native settings. No remote connection was made. Paths are normalized for portability. Terminal examples preserve the executable's ANSI color choices; JSON examples are color-free. The [complete input reference](/reference/cli-help) lists command help.

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

## full record

```sh
winscp-js get Demo --file <fixture-directory>\WinSCP.ini --full --json
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

## recursive list

```sh
winscp-js list --file <fixture-directory>\WinSCP.ini --recurse --json
```

Exit code: 0.

### stdout

```json
{
  "name": "Root",
  "folders": [],
  "profiles": [
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
  ]
}
```

## missing profile

```sh
winscp-js get does-not-exist --file <fixture-directory>\WinSCP.ini --json
```

Exit code: 1.

### stderr

```json
{"error":"Could not find profile by path \"does-not-exist\""}
```

## write status

```sh
winscp-js write-status --file <fixture-directory>\WinSCP.ini --json
```

Exit code: 0.

### stdout

```json
{
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
  },
  "revision": "2f3b97e0dc66d800ac21b1a7fc4f43a552b115e699a8314a66995b6d19b426ba",
  "diagnostics": [],
  "lock": "unlocked",
  "application": "closed"
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

## write preview

```sh
winscp-js write --file <fixture-directory>\WinSCP.ini --input <fixture-directory>\winscp-js-profiles.json --json
```

Exit code: 0.

### stdout

```json
{
  "schemaVersion": 1,
  "sourceId": "winscp:<fixture-directory>\\WinSCP.ini",
  "application": "winscp",
  "mode": "create",
  "allowLossy": false,
  "registryMode": "transactional",
  "expectedRevision": "2f3b97e0dc66d800ac21b1a7fc4f43a552b115e699a8314a66995b6d19b426ba",
  "inspection": {
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
    },
    "revision": "2f3b97e0dc66d800ac21b1a7fc4f43a552b115e699a8314a66995b6d19b426ba",
    "diagnostics": [],
    "lock": "unlocked",
    "application": "closed"
  },
  "changes": [
    {
      "profileId": "Imported",
      "operation": "create",
      "fields": [
        "HostName",
        "PortNumber",
        "UserName",
        "TryAgent",
        "FSProtocol",
        "Ftps",
        "PublicKeyFile",
        "RemoteDirectory",
        "Tunnel"
      ]
    }
  ],
  "diagnostics": [
    {
      "code": "metadata-only-sync",
      "severity": "warning",
      "message": "Stored secrets, private key contents, trust policies and application-specific settings are not copied"
    }
  ],
  "mutations": [
    {
      "operation": "create",
      "path": "Imported",
      "profile": {
        "id": "Demo",
        "path": "Imported",
        "name": "Imported",
        "source": {
          "id": "winscp:<fixture-directory>\\WinSCP.ini",
          "application": "winscp"
        },
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
                  "value": "C:\\keys\\example.ppk"
                },
                "format": "ppk"
              },
              {
                "type": "password",
                "credential": {
                  "sourceId": "omitted",
                  "id": "omitted",
                  "kind": "password",
                  "state": "not-stored"
                }
              }
            ],
            "kind": "ftp",
            "protocol": "ftp",
            "tls": "none",
            "remoteDirectory": "/srv/example"
          }
        ],
        "diagnostics": []
      }
    }
  ],
  "digest": "1fb78434952505125ed0f9a3cf1e1194ff4dc1f3f59f48c3dafff20b7595fa8e"
}
```

## invalid apply

```sh
winscp-js apply --file <fixture-directory>\WinSCP.ini --plan <fixture-directory>\missing-plan.json --json
```

Exit code: 1.

### stderr

```json
{"error":"ENOENT: no such file or directory, stat '<fixture-directory>\\missing-plan.json'"}
```

## Write and sync result contracts

write and sync both emit NativeWritePreview: schemaVersion, application, sourceId, expectedRevision, mode, allowLossy, optional registryMode/scope, inspection, diagnostics, changes, sanitized mutations and a digest. They never apply settings. A digest detects an edited plan; it is not a signature. Sync requires an installed source adapter and explicit connection selection for multi-connection profiles.

Successful apply emits `{applied: true, sourceId, changes, backups}`. It performs guard checks and commits separately; this documentation does not execute apply against a real application store. write-status emits source, revision, application, lock and diagnostics. These write commands emit JSON even without --json; --json also requests JSON errors.

Read/query success uses stdout; shared query/write failures use stderr and exit 1. Help and successful/empty reads exit 0. With --json, ordinary errors have an error string. Registry refusals can additionally include code, nativeCode, operation, recoveryRequired and backups. Do not treat a failed lookup as an empty successful list.

Stored credentials remain hidden by default. --show-password explicitly changes credential visibility and may report unavailable/locked/unsupported states. Keys and remote directories appear only when present. Captured examples contain no real credential values.
