import axios, {AxiosResponse} from "axios";

export const buildListInstancesUrl = (env: string, organizationId: string, pageNumber: number, pageSize: number) =>
    // tslint:disable-next-line:max-line-length
    `https://${env}.fox.integration.api.xilution.com/organizations/${organizationId}/instances?page-number=${pageNumber}&page-size=${pageSize}`;

export const buildPostInstanceUrl = (env: string, organizationId: string) =>
    `https://${env}.fox.integration.api.xilution.com/organizations/${organizationId}/instances`;

export const buildPutInstanceUrl = (env: string, organizationId: string, instanceId: string) =>
    `https://${env}.fox.integration.api.xilution.com/organizations/${organizationId}/instances/${instanceId}`;

export const buildGetInstanceUrl = (env: string, organizationId: string, instanceId: string) =>
    `https://${env}.fox.integration.api.xilution.com/organizations/${organizationId}/instances/${instanceId}`;

export const buildGetInstanceStatusUrl = (env: string, organizationId: string, instanceId: string) =>
    `https://${env}.fox.integration.api.xilution.com/organizations/${organizationId}/instances/${instanceId}/status`;

export const buildDeleteInstanceUrl = (env: string, organizationId: string, instanceId: string) =>
    `https://${env}.fox.integration.api.xilution.com/organizations/${organizationId}/instances/${instanceId}`;

export const buildProvisionInstanceUrl = (env: string, organizationId: string, instanceId: string) =>
    `https://${env}.fox.integration.api.xilution.com/organizations/${organizationId}/instances/${instanceId}/provision`;

export const buildDeprovisionInstanceUrl = (env: string, organizationId: string, instanceId: string) =>
    // tslint:disable-next-line:max-line-length
    `https://${env}.fox.integration.api.xilution.com/organizations/${organizationId}/instances/${instanceId}/deprovision`;

export const buildReprovisionInstanceUrl = (env: string, organizationId: string, instanceId: string) =>
    // tslint:disable-next-line:max-line-length
    `https://${env}.fox.integration.api.xilution.com/organizations/${organizationId}/instances/${instanceId}/reprovision`;

export const buildUpdateInstanceImageUrl = (env: string, organizationId: string, instanceId: string) =>
    // tslint:disable-next-line:max-line-length
    `https://${env}.fox.integration.api.xilution.com/organizations/${organizationId}/instances/${instanceId}/update-image`;

export const listInstances = async (
    env: string,
    accessToken: string,
    organizationId: string,
    pageNumber: number,
    pageSize: number,
): Promise<AxiosResponse> => axios.get(buildListInstancesUrl(env, organizationId, pageNumber, pageSize), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const createInstance = async (
    env: string,
    accessToken: string,
    organizationId: string,
    instance: any,
): Promise<AxiosResponse> => axios.post(buildPostInstanceUrl(env, organizationId), instance, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const updateInstance = async (
    env: string,
    accessToken: string,
    organizationId: string,
    instanceId: string,
    instance: any,
): Promise<AxiosResponse> => axios.put(buildPutInstanceUrl(env, organizationId, instanceId), instance, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const getInstance = async (
    env: string,
    accessToken: string,
    organizationId: string,
    instanceId: string,
): Promise<AxiosResponse> => axios.get(buildGetInstanceUrl(env, organizationId, instanceId), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const getInstanceStatus = async (
    env: string,
    accessToken: string,
    organizationId: string,
    instanceId: string,
): Promise<AxiosResponse> => axios.get(buildGetInstanceStatusUrl(env, organizationId, instanceId), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const deleteInstance = async (
    env: string,
    accessToken: string,
    organizationId: string,
    instanceId: string,
): Promise<AxiosResponse> => axios.delete(buildDeleteInstanceUrl(env, organizationId, instanceId), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const provisionInstance = async (
    env: string,
    accessToken: string,
    organizationId: string,
    instanceId: string,
): Promise<AxiosResponse> => axios.put(buildProvisionInstanceUrl(env, organizationId, instanceId), undefined, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const deprovisionInstance = async (
    env: string,
    accessToken: string,
    organizationId: string,
    instanceId: string,
): Promise<AxiosResponse> => axios.put(buildDeprovisionInstanceUrl(env, organizationId, instanceId), undefined, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const reprovisionInstance = async (
    env: string,
    accessToken: string,
    organizationId: string,
    instanceId: string,
): Promise<AxiosResponse> => axios.put(buildReprovisionInstanceUrl(env, organizationId, instanceId), undefined, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const updateInstanceImage = async (
    env: string,
    accessToken: string,
    organizationId: string,
    instanceId: string,
): Promise<AxiosResponse> => axios.put(buildUpdateInstanceImageUrl(env, organizationId, instanceId), undefined, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});
