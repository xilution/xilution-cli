import { readFile, writeFile } from "fs";
import { promisify } from "util";
import { Arguments } from "yargs";
import { IContext } from "../../../../../@types";
import {
  createPipeline,
  deletePipeline,
  deprovisionPipeline,
  getPipeline,
  listPipelines,
  provisionPipeline,
  reprovisionPipeline,
  updatePipeline,
} from "../../../../../brokers/xilution-integration-fox-broker";
import { resolveUrl } from "../../../../../brokers/xilution-uri-broker";
import { getAuthentication } from "../../../../cache/cache-service";
import { getContext } from "../../../../config/config-service";

export default {
  operations: {
    create_pipeline: {
      operation: async (args: Arguments) => {
        const profile = args.profile as string;
        const context: IContext = await getContext(profile);
        const { env } = context;
        const authentication = await getAuthentication(profile);
        const { access_token } = authentication;
        const organizationId = args.organization_id as string;
        const inputFile = args.input_file as string;
        const buffer: Buffer = await promisify(readFile)(inputFile);
        const pipeline = JSON.parse(Buffer.from(buffer).toString("ascii"));

        const createResponse = await createPipeline(
          env,
          access_token,
          organizationId,
          pipeline
        );

        if (createResponse.status !== 201) {
          throw new Error(createResponse.data.message);
        }

        const getResponse = await resolveUrl(
          access_token,
          createResponse.headers.location
        );

        if (getResponse.status !== 200) {
          throw new Error(getResponse.data.message);
        }

        const outputFile = args.output_file as string;

        if (outputFile) {
          await promisify(writeFile)(
            outputFile,
            JSON.stringify(getResponse.data, null, 2)
          );

          return {
            message: `Successfully wrote new pipeline to ${outputFile}.`,
          };
        }

        return getResponse.data;
      },
      options: {
        input_file: {
          demandOption: true,
          description: "Path to input file",
        },
        output_file: {
          description: "Path to output file",
        },
      },
    },
    delete_pipeline: {
      operation: async (args: Arguments) => {
        const profile = args.profile as string;
        const context: IContext = await getContext(profile);
        const { env } = context;
        const authentication = await getAuthentication(profile);
        const { access_token } = authentication;
        const organizationId = args.organization_id as string;
        const pipelineId = args.pipeline_id as string;

        const response = await deletePipeline(
          env,
          access_token,
          organizationId,
          pipelineId
        );

        if (response.status !== 204) {
          throw new Error(response.data.message);
        }

        return {
          message: `Successfully deleted pipelineId: ${pipelineId}`,
        };
      },
      options: {
        pipeline_id: {
          demandOption: true,
          description: "A Fox pipeline ID",
        },
      },
    },
    deprovision_pipeline: {
      operation: async (args: Arguments) => {
        const profile = args.profile as string;
        const context: IContext = await getContext(profile);
        const { env } = context;
        const authentication = await getAuthentication(profile);
        const { access_token } = authentication;
        const organizationId = args.organization_id as string;
        const pipelineId = args.pipeline_id as string;

        const response = await deprovisionPipeline(
          env,
          access_token,
          organizationId,
          pipelineId
        );

        if (response.status !== 200) {
          throw new Error(response.data.message);
        }

        return response.data;
      },
      options: {
        pipeline_id: {
          demandOption: true,
          description: "A Fox pipeline ID",
        },
      },
    },
    get_pipeline: {
      operation: async (args: Arguments) => {
        const profile = args.profile as string;
        const context: IContext = await getContext(profile);
        const { env } = context;
        const authentication = await getAuthentication(profile);
        const { access_token } = authentication;
        const organizationId = args.organization_id as string;
        const pipelineId = args.pipeline_id as string;

        const response = await getPipeline(
          env,
          access_token,
          organizationId,
          pipelineId
        );

        if (response.status !== 200) {
          throw new Error(response.data.message);
        }

        const outputFile = args.output_file as string;

        if (outputFile) {
          await promisify(writeFile)(
            outputFile,
            JSON.stringify(response.data, null, 2)
          );

          return {
            message: `Successfully wrote pipeline to ${outputFile}.`,
          };
        }

        return response.data;
      },
      options: {
        output_file: {
          description: "Path to output file",
        },
        pipeline_id: {
          demandOption: true,
          description: "A Fox pipeline ID",
        },
      },
    },
    list_pipelines: {
      operation: async (args: Arguments) => {
        const profile = args.profile as string;
        const context: IContext = await getContext(profile);
        const { env } = context;
        const authentication = await getAuthentication(profile);
        const { access_token } = authentication;
        const organizationId = args.organization_id as string;
        const pageNumber = args.page_number as number;
        const pageSize = args.page_size as number;

        const response = await listPipelines(
          env,
          access_token,
          organizationId,
          pageNumber,
          pageSize
        );

        if (response.status !== 200) {
          throw new Error(response.data.message);
        }

        const outputFile = args.output_file as string;

        if (outputFile) {
          await promisify(writeFile)(
            outputFile,
            JSON.stringify(response.data, null, 2)
          );

          return {
            message: `Successfully wrote new pipeline to ${outputFile}.`,
          };
        }

        return response.data;
      },
      options: {
        output_file: {
          description: "Path to output file",
        },
        page_number: {
          description: "The page number",
          required: true,
          type: "number",
        },
        page_size: {
          description: "The page size",
          required: true,
          type: "number",
        },
      },
    },
    provision_pipeline: {
      operation: async (args: Arguments) => {
        const profile = args.profile as string;
        const context: IContext = await getContext(profile);
        const { env } = context;
        const authentication = await getAuthentication(profile);
        const { access_token } = authentication;
        const organizationId = args.organization_id as string;
        const pipelineId = args.pipeline_id as string;

        const response = await provisionPipeline(
          env,
          access_token,
          organizationId,
          pipelineId
        );

        if (response.status !== 200) {
          throw new Error(response.data.message);
        }

        return response.data;
      },
      options: {
        pipeline_id: {
          demandOption: true,
          description: "A Fox pipeline ID",
        },
      },
    },
    reprovision_pipeline: {
      operation: async (args: Arguments) => {
        const profile = args.profile as string;
        const context: IContext = await getContext(profile);
        const { env } = context;
        const authentication = await getAuthentication(profile);
        const { access_token } = authentication;
        const organizationId = args.organization_id as string;
        const pipelineId = args.pipeline_id as string;

        const response = await reprovisionPipeline(
          env,
          access_token,
          organizationId,
          pipelineId
        );

        if (response.status !== 200) {
          throw new Error(response.data.message);
        }

        return response.data;
      },
      options: {
        pipeline_id: {
          demandOption: true,
          description: "A Fox pipeline ID",
        },
      },
    },
    update_pipeline: {
      operation: async (args: Arguments) => {
        const profile = args.profile as string;
        const context: IContext = await getContext(profile);
        const { env } = context;
        const authentication = await getAuthentication(profile);
        const { access_token } = authentication;
        const organizationId = args.organization_id as string;
        const pipelineId = args.pipeline_id as string;
        const inputFile = args.input_file as string;
        const buffer: Buffer = await promisify(readFile)(inputFile);
        const pipeline = JSON.parse(Buffer.from(buffer).toString("ascii"));

        const updateResponse = await updatePipeline(
          env,
          access_token,
          organizationId,
          pipelineId,
          pipeline
        );

        if (updateResponse.status !== 204) {
          throw new Error(updateResponse.data.message);
        }

        const getResponse = await getPipeline(
          env,
          access_token,
          organizationId,
          pipelineId
        );

        if (getResponse.status !== 200) {
          throw new Error(getResponse.data.message);
        }

        const outputFile = args.output_file as string;

        if (outputFile) {
          await promisify(writeFile)(
            outputFile,
            JSON.stringify(getResponse.data, null, 2)
          );

          return {
            message: `Successfully wrote updated pipeline to ${outputFile}.`,
          };
        }

        return getResponse.data;
      },
      options: {
        input_file: {
          demandOption: true,
          description: "Path to input file",
        },
        output_file: {
          description: "Path to output file",
        },
        pipeline_id: {
          demandOption: true,
          description: "A Fox pipeline ID",
        },
      },
    },
  },
};
