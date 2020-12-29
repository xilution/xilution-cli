[<- readme](../README.md)

# Config

Before you use the Xilution CLI, you need to create a `~/.xilution/config.json` file and add a little bit of information it.

Here's a sample `config.json` file used by the Xilution CLI.
Use it as a guide when you edit your `~/.xilution/config.json` file.

```json
{
  "default": {
    "env": "prod",
    "organizationId": "b24aa43bb5d647fcac226e11724ab797",
    "clientId": "b8b1a73c4c314f62bfb8c7ff181dc3f6",
    "clientSecret": "6b7c6a3a2b8846309838b0505c1e400c"
  }
}
```

Let's break down the components of this JSON formatted file.

The top level property, `default`, is the name given to a context profile.
You can create as many context profiles as you need.
You can pass a `--profile (string)` option when invoking Xilution CLI commands to change your context profile.

`env` is required and references the Xilution environment.
We currently offer only one environment: `prod`.

`organizationId` is a Xilution organization ID.

`clientId` is required and references a Xilution client ID.

`clientSecret` is a Xilution client secret.

Note: `clientId` and `clientSecret` are used when the Xilution CLI authenticates with the Xilution platform.
You can also include a `username` and `password` properties in your context profile.
The Xilution CLI will first try to authenticate with `clientId` and `clientSecret`.
If the `clientSecret` is not present, the Xilution CLI will try to use `clientId`, `username` and `password to authenticate.

---

Copyright 2019-2020 Teapot, LLC.  
Xilution is a DBA of Teapot, LLC.
