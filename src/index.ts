#!/usr/bin/env node

import yargs from "yargs";
import {IContext} from "./@types";
import apiCommand from "./commands/api";
import configCommand from "./commands/config";
import {doApiCommand, doConfigCommand} from "./operations";

const argv = yargs
    .usage("Usage: $0 <cmd> [options]")
    .option("profile", {
        alias: "p",
        default: "default",
        describe: "The profile to use",
        global: true,
    })
    .command(configCommand)
    .command(apiCommand)
    .example("xln-cli config", "echos the default profile")
    .epilog("for more information visit https://github.com/xilution/xilution-cli")
    .demandCommand(1, "You need at least one command before moving on")
    .help()
    .argv;

const [command] = argv._;

if (command === "config") {
    doConfigCommand(argv).then((workingConfig: IContext) => {
        // tslint:disable-next-line:no-console
        console.log(JSON.stringify(workingConfig, null, 2));
    }).catch((error) => {
        // tslint:disable-next-line:no-console
        console.error(error);
        process.exit(1);
    });
} else if (command === "api") {
    doApiCommand(argv).then((result: any) => {
        // tslint:disable-next-line:no-console
        console.log(JSON.stringify(result, null, 2));
    }).catch((error) => {
        // tslint:disable-next-line:no-console
        console.error(error);
        process.exit(1);
    });
}
