/* tslint:disable:max-line-length */
import axios, {AxiosResponse} from "axios";
import {
    IExistingInstanceContent,
    IListInstanceContentsResponse,
    IUploadedInstanceContent,
} from "../services/api/products/content-delivery/coyote/@types";

export const buildListInstancesUrl = (env: string, pageNumber: number, pageSize: number) =>
    `https://${env}.coyote.content-delivery.api.xilution.com/instances?page-number=${pageNumber}&page-size=${pageSize}`;

export const buildPostInstanceUrl = (env: string) =>
    `https://${env}.coyote.content-delivery.api.xilution.com/instances`;

export const buildPutInstanceUrl = (env: string, instanceId: string) =>
    `https://${env}.coyote.content-delivery.api.xilution.com/instances/${instanceId}`;

export const buildGetInstanceUrl = (env: string, instanceId: string) =>
    `https://${env}.coyote.content-delivery.api.xilution.com/instances/${instanceId}`;

export const buildGetInstanceStatusUrl = (env: string, instanceId: string) =>
    `https://${env}.coyote.content-delivery.api.xilution.com/instances/${instanceId}/status`;

export const buildDeleteInstanceUrl = (env: string, instanceId: string) =>
    `https://${env}.coyote.content-delivery.api.xilution.com/instances/${instanceId}`;

export const buildProvisionInstanceUrl = (env: string, instanceId: string) =>
    `https://${env}.coyote.content-delivery.api.xilution.com/instances/${instanceId}/provision`;

export const buildDeprovisionInstanceUrl = (env: string, instanceId: string) =>
    `https://${env}.coyote.content-delivery.api.xilution.com/instances/${instanceId}/deprovision`;

export const buildReprovisionInstanceUrl = (env: string, instanceId: string) =>
    `https://${env}.coyote.content-delivery.api.xilution.com/instances/${instanceId}/reprovision`;

export const buildDeleteInstanceContentUrl = (env: string, instanceId: string, key: string) =>
    `https://${env}.coyote.content-delivery.api.xilution.com/instances/${instanceId}/contents/${key}`;

export const buildDownloadInstanceContentUrl = (env: string, instanceId: string, key: string) =>
    `https://${env}.coyote.content-delivery.api.xilution.com/instances/${instanceId}/contents/${key}`;

export const buildListInstanceContentsUrl = (env: string, instanceId: string, pageSize: number, pageMarker?: string) =>
    pageMarker
        ? `https://${env}.coyote.content-delivery.api.xilution.com/instances/${instanceId}/contents?page-size=${pageSize}&page-marker=${pageMarker}`
        : `https://${env}.coyote.content-delivery.api.xilution.com/instances/${instanceId}/contents?page-size=${pageSize}`;

export const buildUploadInstanceContentsUrl = (env: string, instanceId: string) =>
    `https://${env}.coyote.content-delivery.api.xilution.com/instances/${instanceId}/contents`;

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

export const deleteInstanceContent = async (
    env: string,
    accessToken: string,
    instanceId: string,
    key: string,
): Promise<AxiosResponse<{ message?: string }>> => axios.delete(buildDeleteInstanceContentUrl(env, instanceId, key), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const downloadInstanceContent = async (
    env: string,
    accessToken: string,
    instanceId: string,
    key: string,
): Promise<AxiosResponse<IExistingInstanceContent & { message?: string }>> => axios.get(buildDownloadInstanceContentUrl(env, instanceId, key), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const listInstanceContents = async (
    env: string,
    accessToken: string,
    instanceId: string,
    pageSize: number,
    pageMarker: string,
): Promise<AxiosResponse<IListInstanceContentsResponse & { message?: string }>> => axios.get(buildListInstanceContentsUrl(env, instanceId, pageSize, pageMarker), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const uploadInstanceContents = async (
    env: string,
    accessToken: string,
    instanceId: string,
    uploadedInstanceContents: IUploadedInstanceContent[],
): Promise<AxiosResponse<{ message?: string }>> => axios.post(buildUploadInstanceContentsUrl(env, instanceId), uploadedInstanceContents, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});
/* tslint:enable */
