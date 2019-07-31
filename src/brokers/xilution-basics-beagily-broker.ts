import axios, {AxiosResponse} from "axios";

export const buildGetThingsUrl = (env: string, type: string, thingId: string) =>
    `https://${env}.beagily.basics.api.xilution.com/things/${thingId}?type=${type}`;

export const getThing = async (
    env: string,
    accessToken: string,
    type: string,
    thingId: string,
): Promise<AxiosResponse> => axios.get(buildGetThingsUrl(env, type, thingId), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});
