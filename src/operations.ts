import {Arguments} from "yargs";
import {IContext} from "./@types";
import {getThing} from "./services/api/basics-beagily-service";
import {getAuthentication} from "./services/cache/cache-service";
import {getConfiguration} from "./services/config-service";

export const doConfigCommand = async (args: Arguments): Promise<IContext> => {
    const profile = args.profile as string;

    return await getConfiguration(profile);
};

export const doApiCommand = async (args: Arguments): Promise<any> => {
    const profile = args.profile as string;
    const workingConfig: IContext = await getConfiguration(profile);
    const authResponse = await getAuthentication(profile);
    const {env} = workingConfig;
    const {access_token} = authResponse;
    const productCategory = args.product_category as string;

    if (productCategory === "basics") {
        const productName = args.product_name as string;

        if (productName === "beagily") {
            const operation = args.operation as string;

            if (operation === "get_thing") {
                const type = args.type as string;
                const thingId = args.thing_id as string;

                return await getThing(env, access_token, type, thingId);
            }

            throw new Error(`Operation: ${operation} is not yet implemented.`);
        }

        throw new Error(`Product name: ${productName} is not yet implemented.`);
    }

    throw new Error(`Product category: ${productCategory} is not yet implemented.`);
};
