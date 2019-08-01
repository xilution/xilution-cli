#!/usr/bin/env node

import yargs from "yargs";
import {IContext} from "./@types";
import apiCommand from "./services/api/command";
import {doCallApi} from "./services/api/operations";
import configCommand from "./services/config/command";
import {doGetContext} from "./services/config/operations";

const CONFIG_COMMAND = "config";
const API_COMMAND = "api";

const argv = yargs
    .usage("Usage: $0 <command> [options]")
    .option("profile", {
        alias: "p",
        default: "default",
        describe: "The context profile to use",
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

if (command === CONFIG_COMMAND) {
    doGetContext(argv).then((workingConfig: IContext) => {
        // tslint:disable-next-line:no-console
        console.log(JSON.stringify(workingConfig, null, 2));
    }).catch((error) => {
        // tslint:disable-next-line:no-console
        console.error(`Error: ${error.message}`);
        process.exit(1);
    });
} else {
    if (command === API_COMMAND) {
        doCallApi(argv).then((result: any) => {
            // tslint:disable-next-line:no-console
            console.log(JSON.stringify(result, null, 2));
        }).catch((error) => {
            // tslint:disable-next-line:no-console
            console.error(`Error: ${error.message}`);
            process.exit(1);
        });
    }
}
