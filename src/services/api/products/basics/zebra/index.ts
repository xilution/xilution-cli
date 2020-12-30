import { Arguments } from "yargs";
import { IContext } from "../../../../../types";
import {
  oauthImpersonationToken,
  oauthToken as oauthTokenFromBroker,
} from "../../../../../brokers/xilution-basics-zebra-broker";
import { getAuthentication } from "../../../../cache/cache-service";
import { getContext } from "../../../../config/config-service";

export default {
  operations: {
    ["oauth-impersonation-token"]: {
      operation: async (args: Arguments) => {
        const profile = args.profile as string;
        const context: IContext = await getContext(profile);
        const { env, organizationId } = context;
        const authResponse = await getAuthentication(profile);
        const { access_token } = authResponse;
        const clientId = args["client-id"] as string;
        const username = args.username as string;

        const response = await oauthImpersonationToken(
          env,
          organizationId,
          access_token,
          clientId,
          username
        );

        if (response.status !== 200) {
          throw new Error(response.data.message);
        }

        return response.data;
      },
      options: {
        ["client-id"]: {
          demandOption: true,
          description: "A Xilution client's ID",
        },
        username: {
          demandOption: true,
          description: "A Xilution user's username",
        },
      },
    },
    ["oauth-token"]: {
      operation: async (args: Arguments) => {
        const profile = args.profile as string;
        const context: IContext = await getContext(profile);
        const { env, organizationId } = context;
        const clientId = args["client-id"] as string;
        const clientSecret = args["client-secret"] as string;
        const grantType = args["grant-type"] as string;
        const password = args.password as string;
        const username = args.username as string;

        const response = await oauthTokenFromBroker(
          env,
          organizationId,
          grantType,
          clientId,
          clientSecret,
          username,
          password
        );

        if (response.status !== 200) {
          throw new Error(response.data.message);
        }

        return response.data;
      },
      options: {
        ["client-id"]: {
          demandOption: true,
          description: "A Xilution client's ID",
        },
        ["client-secret"]: {
          demandOption: false,
          description: "A Xilution client's secret",
        },
        ["grant-type"]: {
          choices: ["password", "client_credentials"],
          demandOption: true,
          description: "The authentication grant type",
        },
        password: {
          demandOption: false,
          description: "A Xilution user's password",
        },
        username: {
          demandOption: false,
          description: "A Xilution user's username",
        },
      },
    },
  },
};
