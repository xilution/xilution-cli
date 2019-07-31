import {readFile, writeFile} from "fs";
import {promisify} from "util";
import {Arguments} from "yargs";
import {IContext} from "../../../../../@types";
import {
    createInstance,
    deleteInstance,
    deprovisionInstance,
    getInstance,
    getInstanceStatus,
    listInstances,
    provisionInstance,
    reprovisionInstance,
    updateInstance,
    updateInstanceImage,
} from "../../../../../brokers/xilution-integration-fox-broker";
import {resolveUrl} from "../../../../../brokers/xilution-uri-broker";
import {getAuthentication} from "../../../../cache/cache-service";
import {getContext} from "../../../../config/config-service";

export default {
    operations: {
        create_instance: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const authentication = await getAuthentication(profile);
                const {access_token} = authentication;
                let organizationId = args.organization_id as string;
                if (organizationId === "MY_ORG_ID") {
                    organizationId = context.organizationId;
                }
                const inputFile = args.input_file as string;
                const buffer: Buffer = await promisify(readFile)(inputFile);
                const instance = JSON.parse(Buffer.from(buffer).toString("ASCII"));

                const createResponse = await createInstance(env, access_token, organizationId, instance);

                if (createResponse.status !== 201) {
                    throw new Error(createResponse.data.message);
                }

                const getResponse = await resolveUrl(access_token, createResponse.headers.location);

                if (getResponse.status !== 200) {
                    throw new Error(getResponse.data.message);
                }

                const outputFile = args.output_file as string;

                if (outputFile) {
                    await promisify(writeFile)(outputFile, JSON.stringify(getResponse.data, null, 2));

                    return {
                        message: `Successfully wrote new instance to ${outputFile}.`,
                    };
                }

                return getResponse.data;
            },
            options: {
                input_file: {
                    demandOption: true,
                    description: "Path to input file",
                },
                organization_id: {
                    demandOption: true,
                    description: "A Xilution organization's ID",
                },
                output_file: {
                    description: "Path to output file",
                },
            },
        },
        delete_instance: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const authentication = await getAuthentication(profile);
                const {access_token} = authentication;
                let organizationId = args.organization_id as string;
                if (organizationId === "MY_ORG_ID") {
                    organizationId = context.organizationId;
                }
                const instanceId = args.instance_id as string;

                const response = await deleteInstance(env, access_token, organizationId, instanceId);

                if (response.status !== 204) {
                    throw new Error(response.data.message);
                }

                return {
                    message: `Successfully deleted instanceId: ${instanceId}`,
                };
            },
            options: {
                instance_id: {
                    demandOption: true,
                    description: "A Fox instance ID",
                },
                organization_id: {
                    demandOption: true,
                    description: "A Xilution organization's ID",
                },
            },
        },
        deprovision_instance: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const authentication = await getAuthentication(profile);
                const {access_token} = authentication;
                let organizationId = args.organization_id as string;
                if (organizationId === "MY_ORG_ID") {
                    organizationId = context.organizationId;
                }
                const instanceId = args.instance_id as string;

                const response = await deprovisionInstance(env, access_token, organizationId, instanceId);

                if (response.status !== 200) {
                    throw new Error(response.data.message);
                }

                return response.data;
            },
            options: {
                instance_id: {
                    demandOption: true,
                    description: "A Fox instance ID",
                },
                organization_id: {
                    demandOption: true,
                    description: "A Xilution organization's ID",
                },
            },
        },
        get_instance: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const authentication = await getAuthentication(profile);
                const {access_token} = authentication;
                let organizationId = args.organization_id as string;
                if (organizationId === "MY_ORG_ID") {
                    organizationId = context.organizationId;
                }
                const instanceId = args.instance_id as string;

                const response = await getInstance(env, access_token, organizationId, instanceId);

                if (response.status !== 200) {
                    throw new Error(response.data.message);
                }

                const outputFile = args.output_file as string;

                if (outputFile) {
                    await promisify(writeFile)(outputFile, JSON.stringify(response.data, null, 2));

                    return {
                        message: `Successfully wrote instance to ${outputFile}.`,
                    };
                }

                return response.data;
            },
            options: {
                instance_id: {
                    demandOption: true,
                    description: "A Fox instance ID",
                },
                organization_id: {
                    demandOption: true,
                    description: "A Xilution organization's ID",
                },
                output_file: {
                    description: "Path to output file",
                },
            },
        },
        get_instance_status: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const authentication = await getAuthentication(profile);
                const {access_token} = authentication;
                let organizationId = args.organization_id as string;
                if (organizationId === "MY_ORG_ID") {
                    organizationId = context.organizationId;
                }
                const instanceId = args.instance_id as string;

                const response = await getInstanceStatus(env, access_token, organizationId, instanceId);

                if (response.status !== 200) {
                    throw new Error(response.data.message);
                }

                return response.data;
            },
            options: {
                instance_id: {
                    demandOption: true,
                    description: "A Fox instance ID",
                },
                organization_id: {
                    demandOption: true,
                    description: "A Xilution organization's ID",
                },
            },
        },
        list_instances: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const authentication = await getAuthentication(profile);
                const {access_token} = authentication;
                let organizationId = args.organization_id as string;
                if (organizationId === "MY_ORG_ID") {
                    organizationId = context.organizationId;
                }
                const pageNumber = args.page_number as number;
                const pageSize = args.page_size as number;

                const response = await listInstances(env, access_token, organizationId, pageNumber, pageSize);

                if (response.status !== 200) {
                    throw new Error(response.data.message);
                }

                return response.data;
            },
            options: {
                organization_id: {
                    demandOption: true,
                    description: "A Xilution organization's ID",
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
        provision_instance: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const authentication = await getAuthentication(profile);
                const {access_token} = authentication;
                let organizationId = args.organization_id as string;
                if (organizationId === "MY_ORG_ID") {
                    organizationId = context.organizationId;
                }
                const instanceId = args.instance_id as string;

                const response = await provisionInstance(env, access_token, organizationId, instanceId);

                if (response.status !== 200) {
                    throw new Error(response.data.message);
                }

                return response.data;
            },
            options: {
                instance_id: {
                    demandOption: true,
                    description: "A Fox instance ID",
                },
                organization_id: {
                    demandOption: true,
                    description: "A Xilution organization's ID",
                },
            },
        },
        reprovision_instance: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const authentication = await getAuthentication(profile);
                const {access_token} = authentication;
                let organizationId = args.organization_id as string;
                if (organizationId === "MY_ORG_ID") {
                    organizationId = context.organizationId;
                }
                const instanceId = args.instance_id as string;

                const response = await reprovisionInstance(env, access_token, organizationId, instanceId);

                if (response.status !== 200) {
                    throw new Error(response.data.message);
                }

                return response.data;
            },
            options: {
                instance_id: {
                    demandOption: true,
                    description: "A Fox instance ID",
                },
                organization_id: {
                    demandOption: true,
                    description: "A Xilution organization's ID",
                },
            },
        },
        update_instance: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const authentication = await getAuthentication(profile);
                const {access_token} = authentication;
                let organizationId = args.organization_id as string;
                if (organizationId === "MY_ORG_ID") {
                    organizationId = context.organizationId;
                }
                const instanceId = args.instance_id as string;
                const inputFile = args.input_file as string;
                const buffer: Buffer = await promisify(readFile)(inputFile);
                const instance = JSON.parse(Buffer.from(buffer).toString("ASCII"));

                const updateResponse = await updateInstance(
                    env, access_token, organizationId, instanceId, instance);

                if (updateResponse.status !== 204) {
                    throw new Error(updateResponse.data.message);
                }

                const getResponse = await getInstance(env, access_token, organizationId, instanceId);

                if (getResponse.status !== 200) {
                    throw new Error(getResponse.data.message);
                }

                const outputFile = args.output_file as string;

                if (outputFile) {
                    await promisify(writeFile)(outputFile, JSON.stringify(getResponse.data, null, 2));

                    return {
                        message: `Successfully wrote updated instance to ${outputFile}.`,
                    };
                }

                return getResponse.data;
            },
            options: {
                input_file: {
                    demandOption: true,
                    description: "Path to input file",
                },
                instance_id: {
                    demandOption: true,
                    description: "A Fox instance ID",
                },
                organization_id: {
                    demandOption: true,
                    description: "A Xilution organization's ID",
                },
                output_file: {
                    description: "Path to output file",
                },
            },
        },
        update_instance_image: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const authentication = await getAuthentication(profile);
                const {access_token} = authentication;
                let organizationId = args.organization_id as string;
                if (organizationId === "MY_ORG_ID") {
                    organizationId = context.organizationId;
                }
                const instanceId = args.instance_id as string;

                const response = await updateInstanceImage(env, access_token, organizationId, instanceId);

                if (response.status !== 200) {
                    throw new Error(response.data.message);
                }

                return response.data;
            },
            options: {
                instance_id: {
                    demandOption: true,
                    description: "A Fox instance ID",
                },
                organization_id: {
                    demandOption: true,
                    description: "A Xilution organization's ID",
                },
            },
        },
    },
};
