[<- readme](../README.md)

# xln-cli

## Synopsis

```
xln-cli <command> [options]
```
## Commands

* [api](commands/api/index.md)
* [config](commands/config/index.md)

## Options

`--version`

Show the version number.

`--help`

Show help.

`--profile (string)`

Use a specific context profile from your `~/.xilution/config.json` file.
When you don't include a profile, the Xilution CLI will look for a context profile named "default" in `~/.xilution/config.json`.
If a "default" context profile is not found, the Xilution CLI will use the _first_ context profile at the active context profile when executing commands.

---
Copyright 2019-2020 Teapot, LLC.  
Xilution is a DBA of Teapot, LLC.
