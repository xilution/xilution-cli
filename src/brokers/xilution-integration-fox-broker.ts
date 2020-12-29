import axios, { AxiosResponse } from "axios";

export const buildListPipelinesUrl = (
  env: string,
  organizationId: string,
  pageNumber: number,
  pageSize: number
) =>
  // tslint:disable-next-line:max-line-length
  `https://${env}.fox.integration.api.xilution.com/organizations/${organizationId}/pipelines?page-number=${pageNumber}&page-size=${pageSize}`;

export const buildPostPipelineUrl = (env: string, organizationId: string) =>
  `https://${env}.fox.integration.api.xilution.com/organizations/${organizationId}/pipelines`;

export const buildPutPipelineUrl = (
  env: string,
  organizationId: string,
  pipelineId: string
) =>
  `https://${env}.fox.integration.api.xilution.com/organizations/${organizationId}/pipelines/${pipelineId}`;

export const buildGetPipelineUrl = (
  env: string,
  organizationId: string,
  pipelineId: string
) =>
  `https://${env}.fox.integration.api.xilution.com/organizations/${organizationId}/pipelines/${pipelineId}`;

export const buildDeletePipelineUrl = (
  env: string,
  organizationId: string,
  pipelineId: string
) =>
  `https://${env}.fox.integration.api.xilution.com/organizations/${organizationId}/pipelines/${pipelineId}`;

export const buildProvisionPipelineUrl = (
  env: string,
  organizationId: string,
  pipelineId: string
) =>
  `https://${env}.fox.integration.api.xilution.com/organizations/${organizationId}/pipelines/${pipelineId}/provision`;

export const buildDeprovisionPipelineUrl = (
  env: string,
  organizationId: string,
  pipelineId: string
) =>
  // tslint:disable-next-line:max-line-length
  `https://${env}.fox.integration.api.xilution.com/organizations/${organizationId}/pipelines/${pipelineId}/deprovision`;

export const buildReprovisionPipelineUrl = (
  env: string,
  organizationId: string,
  pipelineId: string
) =>
  // tslint:disable-next-line:max-line-length
  `https://${env}.fox.integration.api.xilution.com/organizations/${organizationId}/pipelines/${pipelineId}/reprovision`;

export const listPipelines = async (
  env: string,
  accessToken: string,
  organizationId: string,
  pageNumber: number,
  pageSize: number
): Promise<AxiosResponse> =>
  axios.get(buildListPipelinesUrl(env, organizationId, pageNumber, pageSize), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
  });

export const createPipeline = async (
  env: string,
  accessToken: string,
  organizationId: string,
  pipeline: any
): Promise<AxiosResponse> =>
  axios.post(buildPostPipelineUrl(env, organizationId), pipeline, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
  });

export const updatePipeline = async (
  env: string,
  accessToken: string,
  organizationId: string,
  pipelineId: string,
  pipeline: any
): Promise<AxiosResponse> =>
  axios.put(buildPutPipelineUrl(env, organizationId, pipelineId), pipeline, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
  });

export const getPipeline = async (
  env: string,
  accessToken: string,
  organizationId: string,
  pipelineId: string
): Promise<AxiosResponse> =>
  axios.get(buildGetPipelineUrl(env, organizationId, pipelineId), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
  });

export const deletePipeline = async (
  env: string,
  accessToken: string,
  organizationId: string,
  pipelineId: string
): Promise<AxiosResponse> =>
  axios.delete(buildDeletePipelineUrl(env, organizationId, pipelineId), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
  });

export const provisionPipeline = async (
  env: string,
  accessToken: string,
  organizationId: string,
  pipelineId: string
): Promise<AxiosResponse> =>
  axios.put(
    buildProvisionPipelineUrl(env, organizationId, pipelineId),
    undefined,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      validateStatus: () => true,
    }
  );

export const deprovisionPipeline = async (
  env: string,
  accessToken: string,
  organizationId: string,
  pipelineId: string
): Promise<AxiosResponse> =>
  axios.put(
    buildDeprovisionPipelineUrl(env, organizationId, pipelineId),
    undefined,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      validateStatus: () => true,
    }
  );

export const reprovisionPipeline = async (
  env: string,
  accessToken: string,
  organizationId: string,
  pipelineId: string
): Promise<AxiosResponse> =>
  axios.put(
    buildReprovisionPipelineUrl(env, organizationId, pipelineId),
    undefined,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      validateStatus: () => true,
    }
  );
