[<- api . core . authentication](index.md)

# oauth-token

## Description

Generates a authentication token.

## Synopsis

```
xln-cli api core authentication oauth-token [options]
```

## Options

`--client-id (string)`

A Xilution client's ID. Required.

`--client-secret (string)`

A Xilution client's secret.

`--grant-type (string)`

The authentication grant type. Valid values: "password", "client-credentials". Required.

`--password (string)`

A Xilution user's password.

`--username (string)`

A Xilution user's username.

---

Copyright 2019-2020 Teapot, LLC.  
Xilution is a DBA of Teapot, LLC.
