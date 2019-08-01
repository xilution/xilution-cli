[<- api](../../../api/index.md)

# oauth_token

## Description

Generates a authentication token.

## Synopsis

```
xln-cli api core authentication oauth_token [options]
```

## Options

`--client_id (string)`

A Xilution client's ID. Required.

`--client_secret (string)`

A Xilution client's secret.

`--grant_type (string)`

The authentication grant type. Valid values: "password", "client_credentials". Required.

`--password (string)`

A Xilution user's password.

`--username (string)`

A Xilution user's username.

---
Copyright 2019 Teapot, LLC.  
Xilution is a DBA of Teapot, LLC.
