[<- readme](../README.md)

# Installation

## Prerequisites

* **Xilution Account(s)** - 
The Xilution CLI interfaces with the Xilution API.
Most Xilution API endpoints require a Xilution Account to function properly.
Furthermore, many Xilution API endpoints require Xilution Product activation.
You can create a Xilution account through our [Registration](https://prod.register.xilution.com) site.
Once registered, some API endpoints will require activation.
You can active Xilution products through our [Account Admin Portal](https://prod.portal.xilution.com).
* **Node.js** -
The Xilution CLI requires Node.js version 10.16.3 or newer to be installed on your system. 
We recommend using the [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm) to manage your Node.js installation(s).
See the NVM site for installation instructions.

## Install

* To install the Xilution CLI, run `npm install -g @xilution/xilution-cli`.

* To install the Xilution CLI to a specific version, run `npm install -g @xilution/xilution-cli@{version}`.
For example, run `npm install -g @xilution/xilution-cli@1.3.0` to install to version 1.3.0.

## Verify

* To verify your installation, run `xln-cli --version`.

## Configure

* Once you have installed the Xilution CLI, you will want to set up your configuration.
See [Config](./config.md) for Xilution CLI configuration details.

## Upgrade

* To upgrade the Xilution CLI to the latest version, run `npm update -g @xilution/xilution-cli`.

The Xilution CLI changes frequently as we add more and more products to [our portfolio of APIs](https://products.xilution.com).
If your version of the CLI does not include something you expect, try upgrading.
If after upgrading, if your version still doesn't meet your expectations, send an email to [support@xilution.com](mailto:support@xilution.com) and let us know.
See [our releases](https://github.com/xilution/xilution-cli/releases) for the latest and older versions of the Xilution CLI.

## Uninstall

* To uninstall the Xilution CLI, run `yarn global remove @xilution/xilution-cli`.

---
Copyright 2019 Teapot, LLC.  
Xilution is a DBA of Teapot, LLC.
