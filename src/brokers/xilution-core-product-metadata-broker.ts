import axios, {AxiosResponse} from "axios";
import {v4} from "uuid";

export const buildListAllProductsUrl = (env: string) =>
    `https://${env}.product-metadata.core.api.xilution.com/products`;

export const listAllProducts = async (
    env: string,
): Promise<AxiosResponse> => axios.get(buildListAllProductsUrl(env), {
    validateStatus: () => true,
});
