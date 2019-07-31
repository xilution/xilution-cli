import {get} from "lodash";
import {Arguments} from "yargs";
import products from "./products";

export const doCallApi = async (args: Arguments): Promise<any> => {
    const productCategory = args.product_category as string;
    const productName = args.product_name as string;
    const operation = args.operation as string;

    const path = `productCategories.${productCategory}.productNames.${productName}.operations.${operation}.operation`;
    const fn = get(products, path);

    if (fn) {
        return await fn(args);
    }

    // tslint:disable-next-line:max-line-length
    throw new Error(`Implementation for product_category: ${productCategory}, product_name: ${productName} and operation: ${operation} has not been completed yet.`);
};
