import axios, {AxiosResponse} from "axios";

const SCOPE = "read write";

export const buildOAuthTokenUrl = (env: string) =>
    `https://${env}.authentication.core.api.xilution.com/oauth/token`;

export const oauthToken = async (
    env: string,
    grantType: string,
    clientId: string,
    clientSecret: string | undefined = undefined,
    username: string | undefined = undefined,
    password: string | undefined = undefined,
): Promise<AxiosResponse> => axios.post(buildOAuthTokenUrl(env), {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: grantType,
    password,
    scope: SCOPE,
    username,
}, {
    validateStatus: () => true,
});
