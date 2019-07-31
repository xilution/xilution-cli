import {Arguments} from "yargs";
import {IContext} from "../../@types";
import {getContext} from "./config-service";

export const doGetContext = async (args: Arguments): Promise<IContext> => {
    const profile = args.profile as string;

    return await getContext(profile);
};
