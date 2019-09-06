import axios, {AxiosResponse} from "axios";

export const buildListInstancesUrl = (env: string, pageNumber: number, pageSize: number) =>
    // tslint:disable-next-line:max-line-length
    `https://${env}.fox.integration.api.xilution.com/instances?page-number=${pageNumber}&page-size=${pageSize}`;

export const buildPostInstanceUrl = (env: string) =>
    `https://${env}.fox.integration.api.xilution.com/instances`;

export const buildPutInstanceUrl = (env: string, instanceId: string) =>
    `https://${env}.fox.integration.api.xilution.com/instances/${instanceId}`;

export const buildGetInstanceUrl = (env: string, instanceId: string) =>
    `https://${env}.fox.integration.api.xilution.com/instances/${instanceId}`;

export const buildGetInstanceStatusUrl = (env: string, instanceId: string) =>
    `https://${env}.fox.integration.api.xilution.com/instances/${instanceId}/status`;

export const buildDeleteInstanceUrl = (env: string, instanceId: string) =>
    `https://${env}.fox.integration.api.xilution.com/instances/${instanceId}`;

export const buildProvisionInstanceUrl = (env: string, instanceId: string) =>
    `https://${env}.fox.integration.api.xilution.com/instances/${instanceId}/provision`;

export const buildDeprovisionInstanceUrl = (env: string, instanceId: string) =>
    // tslint:disable-next-line:max-line-length
    `https://${env}.fox.integration.api.xilution.com/instances/${instanceId}/deprovision`;

export const buildReprovisionInstanceUrl = (env: string, instanceId: string) =>
    // tslint:disable-next-line:max-line-length
    `https://${env}.fox.integration.api.xilution.com/instances/${instanceId}/reprovision`;

export const buildUpdateInstanceImageUrl = (env: string, instanceId: string) =>
    // tslint:disable-next-line:max-line-length
    `https://${env}.fox.integration.api.xilution.com/instances/${instanceId}/update-image`;

export const listInstances = async (
    env: string,
    accessToken: string,
    pageNumber: number,
    pageSize: number,
): Promise<AxiosResponse> => axios.get(buildListInstancesUrl(env, pageNumber, pageSize), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const createInstance = async (
    env: string,
    accessToken: string,
    instance: any,
): Promise<AxiosResponse> => axios.post(buildPostInstanceUrl(env), instance, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const updateInstance = async (
    env: string,
    accessToken: string,
    instanceId: string,
    instance: any,
): Promise<AxiosResponse> => axios.put(buildPutInstanceUrl(env, instanceId), instance, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const getInstance = async (
    env: string,
    accessToken: string,
    instanceId: string,
): Promise<AxiosResponse> => axios.get(buildGetInstanceUrl(env, instanceId), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const getInstanceStatus = async (
    env: string,
    accessToken: string,
    instanceId: string,
): Promise<AxiosResponse> => axios.get(buildGetInstanceStatusUrl(env, instanceId), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const deleteInstance = async (
    env: string,
    accessToken: string,
    instanceId: string,
): Promise<AxiosResponse> => axios.delete(buildDeleteInstanceUrl(env, instanceId), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const provisionInstance = async (
    env: string,
    accessToken: string,
    instanceId: string,
): Promise<AxiosResponse> => axios.put(buildProvisionInstanceUrl(env, instanceId), undefined, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const deprovisionInstance = async (
    env: string,
    accessToken: string,
    instanceId: string,
): Promise<AxiosResponse> => axios.put(buildDeprovisionInstanceUrl(env, instanceId), undefined, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const reprovisionInstance = async (
    env: string,
    accessToken: string,
    instanceId: string,
): Promise<AxiosResponse> => axios.put(buildReprovisionInstanceUrl(env, instanceId), undefined, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const updateInstanceImage = async (
    env: string,
    accessToken: string,
    instanceId: string,
): Promise<AxiosResponse> => axios.put(buildUpdateInstanceImageUrl(env, instanceId), undefined, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});
