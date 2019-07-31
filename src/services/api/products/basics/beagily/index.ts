import {Arguments} from "yargs";
import {IContext} from "../../../../../@types";
import {getThing as getThingFromBroker} from "../../../../../brokers/xilution-basics-beagily-broker";
import {getAuthentication} from "../../../../cache/cache-service";
import {getContext} from "../../../../config/config-service";

export default {
    operations: {
        get_thing: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const authResponse = await getAuthentication(profile);
                const {access_token} = authResponse;
                const type = args.type as string;
                const thingId = args.thing_id as string;

                const getThingResponse = await getThingFromBroker(env, access_token, type, thingId);

                if (getThingResponse.status !== 200) {
                    throw new Error(getThingResponse.data.message);
                }

                return getThingResponse.data;
            },
            options: {
                thing_id: {
                    demandOption: true,
                    description: "the thing's id",
                },
                type: {
                    demandOption: true,
                    description: "the thing's type",
                },
            },
        },
    },
};
