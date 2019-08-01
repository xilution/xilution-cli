[<- readme](../README.md)

# Set Up

Before you use the Xilution CLI, you need to create `~/.xilution/config.json` add a little bit of information it.

## Config

Here's a sample `config.json` used by the Xilution CLI.
Use this as a guide when you edit `~/.xilution/config.json`.

```json
{
  "test": {
    "env": "test",
    "organizationId": "5f371e6ab0f04c268d707d3da67a9dfb",
    "clientId": "8f5d594f8a964052811ee5efdf56fe54",
    "clientSecret": "2cd79e7a30954c4299863bb3f3dbcc21"
  },
  "prod": {
    "env": "prod",
    "organizationId": "b24aa43bb5d647fcac226e11724ab797",
    "clientId": "b8b1a73c4c314f62bfb8c7ff181dc3f6",
    "clientSecret": "6b7c6a3a2b8846309838b0505c1e400c"
  }
}

```

Let's break it down.

`test` and `prod` are context profiles.
You can pass a `--profile (string)` option when invoking Xilution CLI commands to change your context profile.

`env` is required and references the Xilution environment. 
We offer two environments `test` and `prod`. 

`test` refers to our Test or Sandbox environment.
`prod` refers to our Production environment.

`organizationId` is a Xilution organization ID.

`clientId` is required and references a Xilution client ID.

`clientSecret` is a Xilution client secret.

`clientId` and `clientSecret` are used when the Xilution CLI authenticates with the Xilution platform.
You can also include a `username` and `password` properties in your context profile.
The Xilution CLI will first try to authenticate with `clientId` and `clientSecret`.
If the `clientSecret` is not present, the Xilution CLI will try to use `clientId`, `username` and `password to authenticate.

## Cache

The Xilution CLI caches authentication data in `~/.xilution/cache.json`.
This includes OAuth tokens.
Like `config.json`, `cache.json` is organized by context profile.
You can delete `cache.json` anytime you want.
Xilution CLI will automatically recreate it when necessary.

---
Copyright 2019 Teapot, LLC.  
Xilution is a DBA of Teapot, LLC.
