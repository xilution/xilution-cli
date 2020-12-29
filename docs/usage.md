[<- readme](../README.md)

# Usage

## Synopsis

```
xln-cli <command> [options]
```

## Options

`--version`

Show the version number.

`--help`

Show help.

`--profile (string)`

Use a specific context profile from your `~/.xilution/config.json` file.
When you don't include a profile, the Xilution CLI will look for a context profile named "default" in `~/.xilution/config.json`.
If a "default" context profile is not found, the Xilution CLI will use the _first_ context profile at the active context profile when executing commands.

## Available Commands

* [config](commands/config/index.md)
* [api](commands/api/index.md)

---
Copyright 2019-2020 Teapot, LLC.  
Xilution is a DBA of Teapot, LLC.
