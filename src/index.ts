#!/usr/bin/env node

import yargs from "yargs";

// tslint:disable-next-line:no-unused-expression
yargs
    .usage("Usage: $0 <cmd> [options]")
    .command("echo-env", "echos the environment", {
        environment: {
            alias: "env",
            default: "test",
        },
    }, (argv) => {
        const environment = argv.environment;

        // tslint:disable-next-line:no-console
        console.log("environment", environment);
    })
    .example("xln-cli echo-env test", "echos the test environment")
    .epilog("for more information visit https://github.com/xilution/xilution-cli")
    .demandCommand(1, "You need at least one command before moving on")
    .help()
    .argv;
