import {Arguments} from "yargs";
import {IContext} from "../../../../../@types";
import {
    oauthImpersonationToken,
    oauthToken as oauthTokenFromBroker,
} from "../../../../../brokers/xilution-core-authentication-broker";
import {getAuthentication} from "../../../../cache/cache-service";
import {getContext} from "../../../../config/config-service";

export default {
    operations: {
        oauth_impersonation_token: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const authResponse = await getAuthentication(profile);
                const {access_token} = authResponse;
                const clientId = args.client_id as string;
                const username = args.username as string;

                const response = await oauthImpersonationToken(
                    env, access_token, clientId, username);

                if (response.status !== 200) {
                    throw new Error(response.data.message);
                }

                return response.data;
            },
            options: {
                client_id: {
                    demandOption: true,
                    description: "A Xilution client's ID",
                },
                username: {
                    demandOption: true,
                    description: "A Xilution user's username",
                },
            },
        },
        oauth_token: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const clientId = args.client_id as string;
                const clientSecret = args.client_secret as string;
                const grantType = args.grant_type as string;
                const password = args.password as string;
                const username = args.username as string;

                const response = await oauthTokenFromBroker(
                    env, grantType, clientId, clientSecret, username, password);

                if (response.status !== 200) {
                    throw new Error(response.data.message);
                }

                return response.data;
            },
            options: {
                client_id: {
                    demandOption: true,
                    description: "a Xilution client's ID",
                },
                client_secret: {
                    demandOption: false,
                    description: "a Xilution client's secret",
                },
                grant_type: {
                    choices: ["password", "client_credentials"],
                    demandOption: true,
                    description: "the authentication grant type",
                },
                password: {
                    demandOption: false,
                    description: "a Xilution user's password",
                },
                username: {
                    demandOption: false,
                    description: "a Xilution user's username",
                },
            },
        },
    },
};
