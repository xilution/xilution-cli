import {Argv, CommandModule, Options, PositionalOptions} from "yargs";

const PRODUCT_DEFINITIONS = {
    productCategories: {
        basics: {
            productNames: {
                beagily: {
                    operations: {
                        get_thing: {
                            options: {
                                thing_id: {
                                    demandOption: true,
                                    description: "the thing's id",
                                },
                                type: {
                                    demandOption: true,
                                    description: "the thing's type",
                                },
                            },
                        },
                    },
                },
            },
        },
        core: {
            productNames: {
                authentication: {
                    operations: {
                        oauth_token: {
                            options: {
                                grant_type: {
                                    choices: ["password", "client_credentials"],
                                    demandOption: true,
                                    description: "the authentication grant type",
                                },
                            },
                        },
                    },
                },
            },
        },
    },
} as any;

const buildProductCategoryPositionalOptions = (): PositionalOptions => {
    const choices = Object.keys(PRODUCT_DEFINITIONS.productCategories);

    return {
        choices,
        description: "A Xilution product category.",
    };
};

const buildProductNamePositionalOptions = (command: string[]): PositionalOptions => {
    const baseOptions = {
        description: "A Xilution product name.",
    };
    const [, productCategory] = command;
    const productCategories = PRODUCT_DEFINITIONS.productCategories;
    const productCategoryDefinition = productCategories[productCategory];

    if (productCategoryDefinition) {
        const choices = Object.keys(productCategoryDefinition.productNames);

        return {
            ...baseOptions,
            choices,
        };
    }

    return baseOptions;
};

const buildOperationPositionalOptions = (command: string[]): PositionalOptions => {
    const baseOptions = {
        description: "A product operation.",
    };
    const [, productCategory, productName] = command;
    const productCategories = PRODUCT_DEFINITIONS.productCategories;
    const productCategoryDefinition = productCategories[productCategory];

    if (productCategoryDefinition) {
        const productNames = productCategoryDefinition.productNames;
        const productNameDefinition = productNames[productName];

        if (productNameDefinition) {
            const choices = Object.keys(productNameDefinition.operations);

            return {
                ...baseOptions,
                choices,
            };
        }
    }

    return baseOptions;
};

const buildOptions = (command: string[]): { [key: string]: Options } => {
    const [, productCategory, productName, operation] = command;
    const productCategories = PRODUCT_DEFINITIONS.productCategories;
    const productCategoryDefinition = productCategories[productCategory];

    if (productCategoryDefinition) {
        const productNames = productCategoryDefinition.productNames;
        const productNameDefinition = productNames[productName];

        if (productNameDefinition) {
            const operations = productNameDefinition.operations;
            const operationsDefinition = operations[operation];

            if (operationsDefinition) {
                return operationsDefinition.options;
            }
        }
    }

    return {};
};

export default {
    builder:  (argv1: Argv) => {
        const command = argv1.argv._;

        return argv1
            .usage("Usage: $0 api <product_category> <product_name> <operation> [options]")
            .positional("product_category", buildProductCategoryPositionalOptions())
            .positional("product_name", buildProductNamePositionalOptions(command))
            .positional("operation", buildOperationPositionalOptions(command))
            .options(buildOptions(command))
            .help();
    },
    command: "api <product_category> <product_name> <operation> [options]",
    describe: "API command",
} as CommandModule;
