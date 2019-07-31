import {Arguments} from "yargs";
import {IContext} from "../../../../../@types";
import {
    activateProduct,
    deactivateProduct,
    listProductActivations,
} from "../../../../../brokers/xilution-core-account-management-broker";
import {getAuthentication} from "../../../../cache/cache-service";
import {getContext} from "../../../../config/config-service";

export default {
    operations: {
        activate_product: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const authResponse = await getAuthentication(profile);
                const {access_token} = authResponse;
                const productId = args.product_id as string;

                const response = await activateProduct(env, access_token, productId);

                if (response.status !== 200) {
                    throw new Error(response.data.message);
                }

                return response.data;
            },
            options: {
                product_id: {
                    demandOption: true,
                    description: "A Xilution product ID",
                },
            },
        },
        deactivate_product: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const authResponse = await getAuthentication(profile);
                const {access_token} = authResponse;
                const productId = args.product_id as string;

                const response = await deactivateProduct(env, access_token, productId);

                if (response.status !== 200) {
                    throw new Error(response.data.message);
                }

                return response.data;
            },
            options: {
                product_id: {
                    demandOption: true,
                    description: "A Xilution product ID",
                },
            },
        },
        list_product_activations: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const authResponse = await getAuthentication(profile);
                const {access_token} = authResponse;
                const pageNumber = args.page_number as number;
                const pageSize = args.page_size as number;

                const response = await listProductActivations(env, access_token, pageNumber, pageSize);

                if (response.status !== 200) {
                    throw new Error(response.data.message);
                }

                return response.data;
            },
            options: {
                page_number: {
                    description: "The page number",
                    required: true,
                    type: "number",
                },
                page_size: {
                    description: "The page size",
                    required: true,
                    type: "number",
                },
            },
        },
    },
};
