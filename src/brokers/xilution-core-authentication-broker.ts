import axios, {AxiosResponse} from "axios";
import {v4} from "uuid";

const SCOPE = "read write";

export const buildOAuthImpersonationTokenUrl = (env: string) =>
    `https://${env}.authentication.core.api.xilution.com/oauth/impersonation/token`;

export const buildOAuthTokenUrl = (env: string) =>
    `https://${env}.authentication.core.api.xilution.com/oauth/token`;

export const oauthImpersonationToken = async (
    env: string,
    accessToken: string,
    clientId: string,
    username: string | undefined = undefined,
): Promise<AxiosResponse> => axios.post(buildOAuthImpersonationTokenUrl(env), {
    client_id: clientId,
    grant_type: "password",
    password: v4().split("-").join(""),
    scope: SCOPE,
    username,
}, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

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
