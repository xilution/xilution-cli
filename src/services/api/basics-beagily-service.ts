import {IThing} from "../../@types";
import {getThing as getThingFromBroker} from "../../brokers/xilution-basics-beagily-broker";

export const getThing = async (env: string, accessToken: string, type: string, thingId: string): Promise<IThing> => {
    const getThingResponse = await getThingFromBroker(env, accessToken, type, thingId);

    if (getThingResponse.status !== 200) {
        throw new Error(getThingResponse.data.message);
    }

    return getThingResponse.data;
};
