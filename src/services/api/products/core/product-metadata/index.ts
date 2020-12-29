import { Arguments } from "yargs";
import { IContext } from "../../../../../@types";
import { listAllProducts } from "../../../../../brokers/xilution-core-product-metadata-broker";
import { getContext } from "../../../../config/config-service";

export default {
  operations: {
    list_all_products: {
      operation: async (args: Arguments) => {
        const profile = args.profile as string;
        const context: IContext = await getContext(profile);
        const { env } = context;

        const response = await listAllProducts(env);

        if (response.status !== 200) {
          throw new Error(response.data.message);
        }

        return response.data;
      },
      options: {},
    },
  },
};
