import { get } from "lodash";
import { Argv, CommandModule, Options, PositionalOptions } from "yargs";
import products from "./products";

const buildProductCategoryPositionalOptions = (): PositionalOptions => {
  const choices = Object.keys(products.productCategories);

  return {
    choices,
    description: "A Xilution product category.",
  };
};

const buildProductNamePositionalOptions = (
  command: string[]
): PositionalOptions => {
  const baseOptions = {
    description: "A Xilution product name.",
  };
  const [, productCategory] = command;
  const path = `productCategories.${productCategory}.productNames`;
  const productNames = get(products, path);

  if (productNames) {
    return {
      ...baseOptions,
      choices: Object.keys(productNames),
    };
  }

  return baseOptions;
};

const buildOperationPositionalOptions = (
  command: string[]
): PositionalOptions => {
  const baseOptions = {
    description: "A product operation.",
  };
  const [, productCategory, productName] = command;
  const path = `productCategories.${productCategory}.productNames.${productName}.operations`;
  const operations = get(products, path);

  if (operations) {
    return {
      ...baseOptions,
      choices: Object.keys(operations),
    };
  }

  return baseOptions;
};

const buildOptions = (command: string[]): { [key: string]: Options } => {
  const [, productCategory, productName, operation] = command;
  const path = `productCategories.${productCategory}.productNames.${productName}.operations.${operation}.options`;
  const options = get(products, path);

  if (options) {
    return options;
  }

  return {};
};

export default {
  builder: (argv1: Argv) => {
    const command = argv1.argv._;

    return argv1
      .usage(
        "Usage: $0 api <product_category> <product_name> <operation> [options]"
      )
      .positional("product_category", buildProductCategoryPositionalOptions())
      .positional("product_name", buildProductNamePositionalOptions(command))
      .positional("operation", buildOperationPositionalOptions(command))
      .options(buildOptions(command))
      .help();
  },
  command: "api <product_category> <product_name> <operation> [options]",
  describe: "API command",
} as CommandModule;
