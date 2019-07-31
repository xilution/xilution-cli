import {AxiosResponse} from "axios";
import {IAuthentication} from "../@types";
import {fetchTokensWithClientCredentialsGrantType} from "../brokers/xilution-core-authentication-broker";

export const getTokenWithClientCredentials = async (
    env: string,
    clientId: string,
    clientSecret: string,
): Promise<IAuthentication> => {
    const fetchTokensResponse: AxiosResponse =
        await fetchTokensWithClientCredentialsGrantType(env, clientId, clientSecret);

    if (fetchTokensResponse.status !== 200) {
        throw new Error(fetchTokensResponse.data.message);
    }

    return fetchTokensResponse.data as IAuthentication;
};
