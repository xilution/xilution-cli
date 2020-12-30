import { AxiosResponse } from "axios";
import { IAuthentication } from "../types";
import { oauthToken } from "../brokers/xilution-basics-zebra-broker";

export const getTokenWithClientCredentials = async (
  env: string,
  organizationId: string,
  clientId: string,
  clientSecret: string
): Promise<IAuthentication> => {
  const fetchTokensResponse: AxiosResponse = await oauthToken(
    env,
    organizationId,
    "client_credentials",
    clientId,
    clientSecret
  );

  if (fetchTokensResponse.status !== 200) {
    throw new Error(fetchTokensResponse.data.message);
  }

  return fetchTokensResponse.data as IAuthentication;
};

export const getTokenWithPassword = async (
  env: string,
  organizationId: string,
  clientId: string,
  username: string,
  password: string
): Promise<IAuthentication> => {
  const fetchTokensResponse: AxiosResponse = await oauthToken(
    env,
    organizationId,
    "password",
    clientId,
    username,
    password
  );

  if (fetchTokensResponse.status !== 200) {
    throw new Error(fetchTokensResponse.data.message);
  }

  return fetchTokensResponse.data as IAuthentication;
};
