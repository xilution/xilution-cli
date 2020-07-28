import axios, {AxiosResponse} from "axios";

export const buildListAllProductsUrl = (env: string) =>
    `https://${env}.product-metadata.core.api.xilution.com/products`;

export const listAllProducts = async (
    env: string,
): Promise<AxiosResponse> => axios.get(buildListAllProductsUrl(env), {
    validateStatus: () => true,
});
