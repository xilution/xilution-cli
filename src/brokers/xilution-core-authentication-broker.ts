import axios, {AxiosResponse} from "axios";

const SCOPE = "read write";

export const buildOAuthTokenUrl = (env: string) =>
    `https://${env}.authentication.core.api.xilution.com/oauth/token`;

export const fetchTokensWithClientCredentialsGrantType = async (
    env: string,
    clientId: string,
    clientSecret: string,
): Promise<AxiosResponse> => axios.post(buildOAuthTokenUrl(env), {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "client_credentials",
    scope: SCOPE,
}, {
    validateStatus: () => true,
});
