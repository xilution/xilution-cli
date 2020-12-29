import axios, { AxiosResponse } from "axios";

export const buildListProductActivationsUrl = (
  env: string,
  pageNumber: number,
  pageSize: number
) =>
  // tslint:disable-next-line:max-line-length
  `https://${env}.account-management.core.api.xilution.com/activations?page-number=${pageNumber}&page-size=${pageSize}`;

export const buildActivateProductUrl = (env: string, productId: string) =>
  `https://${env}.account-management.core.api.xilution.com/activate/${productId}`;

export const buildDeactivateProductUrl = (env: string, productId: string) =>
  `https://${env}.account-management.core.api.xilution.com/deactivate/${productId}`;

export const listProductActivations = async (
  env: string,
  accessToken: string,
  pageNumber: number,
  pageSize: number
): Promise<AxiosResponse> =>
  axios.get(buildListProductActivationsUrl(env, pageNumber, pageSize), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
  });

export const activateProduct = async (
  env: string,
  accessToken: string,
  productId: string
): Promise<AxiosResponse> =>
  axios.post(buildActivateProductUrl(env, productId), undefined, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
  });

export const deactivateProduct = async (
  env: string,
  accessToken: string,
  productId: string
): Promise<AxiosResponse> =>
  axios.post(buildDeactivateProductUrl(env, productId), undefined, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
  });
