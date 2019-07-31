import axios, {AxiosResponse} from "axios";

export const buildUpdateTypeUrl = (env: string, name: string) =>
    `https://${env}.beagily.basics.api.xilution.com/types/${name}`;

export const buildGetTypeUrl = (env: string, name: string) =>
    `https://${env}.beagily.basics.api.xilution.com/types/${name}`;

export const buildDeleteTypeUrl = (env: string, name: string) =>
    `https://${env}.beagily.basics.api.xilution.com/types/${name}`;

export const buildListThingsUrl = (env: string, type: string, pageNumber: number, pageSize: number) =>
    // tslint:disable-next-line:max-line-length
    `https://${env}.beagily.basics.api.xilution.com/things?type=${type}&page-number=${pageNumber}&page-size=${pageSize}`;

export const buildPostThingUrl = (env: string, type: string) =>
    `https://${env}.beagily.basics.api.xilution.com/things?type=${type}`;

export const buildPutThingUrl = (env: string, type: string, thingId: string) =>
    `https://${env}.beagily.basics.api.xilution.com/things/${thingId}?type=${type}`;

export const buildGetThingUrl = (env: string, type: string, thingId: string) =>
    `https://${env}.beagily.basics.api.xilution.com/things/${thingId}?type=${type}`;

export const buildDeleteThingUrl = (env: string, type: string, thingId: string) =>
    `https://${env}.beagily.basics.api.xilution.com/things/${thingId}?type=${type}`;

export const updateType = async (
    env: string,
    accessToken: string,
    name: string,
    type: any,
): Promise<AxiosResponse> => axios.put(buildUpdateTypeUrl(env, name), type, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const deleteType = async (
    env: string,
    accessToken: string,
    name: string,
): Promise<AxiosResponse> => axios.delete(buildDeleteTypeUrl(env, name), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const getType = async (
    env: string,
    accessToken: string,
    name: string,
): Promise<AxiosResponse> => axios.get(buildGetTypeUrl(env, name), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const listThings = async (
    env: string,
    accessToken: string,
    type: string,
    pageNumber: number,
    pageSize: number,
): Promise<AxiosResponse> => axios.get(buildListThingsUrl(env, type, pageNumber, pageSize), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const createThing = async (
    env: string,
    accessToken: string,
    type: string,
    thing: any,
): Promise<AxiosResponse> => axios.post(buildPostThingUrl(env, type), thing, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const updateThing = async (
    env: string,
    accessToken: string,
    type: string,
    thingId: string,
    thing: any,
): Promise<AxiosResponse> => axios.put(buildPutThingUrl(env, type, thingId), thing, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const getThing = async (
    env: string,
    accessToken: string,
    type: string,
    thingId: string,
): Promise<AxiosResponse> => axios.get(buildGetThingUrl(env, type, thingId), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const deleteThing = async (
    env: string,
    accessToken: string,
    type: string,
    thingId: string,
): Promise<AxiosResponse> => axios.delete(buildDeleteThingUrl(env, type, thingId), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});
