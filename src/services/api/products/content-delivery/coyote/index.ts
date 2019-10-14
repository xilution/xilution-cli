import {AxiosResponse} from "axios";
import {readFile, writeFile} from "fs";
import mime from "mime-types";
import {relative} from "path";
import recursive from "recursive-readdir";
import {promisify} from "util";
import {Arguments} from "yargs";
import {IContext} from "../../../../../@types";
import {
    createInstance,
    deleteInstance,
    deleteInstanceContent,
    deprovisionInstance,
    downloadInstanceContent,
    getInstance,
    getInstanceStatus,
    listInstanceContents,
    listInstances,
    provisionInstance,
    reprovisionInstance,
    updateInstance,
    uploadInstanceContents,
} from "../../../../../brokers/xilution-content-delivery-coyote-broker";
import {resolveUrl} from "../../../../../brokers/xilution-uri-broker";
import {getAuthentication} from "../../../../cache/cache-service";
import {getContext} from "../../../../config/config-service";
import {IExistingInstanceContent, IListInstanceContentsResponse, IUploadedInstanceContent} from "./@types";

const encodeKey = (key: string) => new Buffer(key).toString("base64");

export default {
    operations: {
        create_instance: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const authentication = await getAuthentication(profile);
                const {access_token} = authentication;
                const organizationId = args.organization_id as string;
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
                const organizationId = args.organization_id as string;
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
            },
        },
        delete_instance_content: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const authentication = await getAuthentication(profile);
                const {access_token} = authentication;
                const organizationId = args.organization_id as string;
                const instanceId = args.instance_id as string;
                const key = args.key as string;

                const response: AxiosResponse =
                    await deleteInstanceContent(env, access_token, organizationId, instanceId, encodeKey(key));

                if (response.status !== 204) {
                    throw new Error(response.data.message);
                }

                return {
                    message: `Successfully deleted content.`,
                };
            },
            options: {
                instance_id: {
                    demandOption: true,
                    description: "A Fox instance ID",
                },
                key: {
                    demandOption: true,
                    description: "A Fox content key",
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
                const organizationId = args.organization_id as string;
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
            },
        },
        download_instance_content: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const authentication = await getAuthentication(profile);
                const {access_token} = authentication;
                const organizationId = args.organization_id as string;
                const instanceId = args.instance_id as string;
                const inputKey = args.key as string;

                const response: AxiosResponse<IExistingInstanceContent & { message?: string }> =
                    await downloadInstanceContent(env, access_token, organizationId, instanceId, encodeKey(inputKey));

                if (response.status !== 200) {
                    throw new Error(response.data.message);
                }

                const outputFolder = args.output_folder as string;
                const {key, data} = response.data;

                await promisify(writeFile)(`${outputFolder}/${key}`, new Buffer(data, "base64"));

                return {
                    message: `Successfully downloaded content.`,
                };
            },
            options: {
                instance_id: {
                    demandOption: true,
                    description: "A Fox instance ID",
                },
                key: {
                    demandOption: true,
                    description: "A Fox content key",
                },
                output_folder: {
                    demandOption: true,
                    description: "Path to output folder",
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
                const organizationId = args.organization_id as string;
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
                const organizationId = args.organization_id as string;
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
            },
        },
        list_instance_contents: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const authentication = await getAuthentication(profile);
                const {access_token} = authentication;
                const organizationId = args.organization_id as string;
                const instanceId = args.instance_id as string;
                const pageSize = args.page_size as number;
                const pageMarker = args.page_number as string;

                const response: AxiosResponse<IListInstanceContentsResponse & { message?: string }> =
                    await listInstanceContents(env, access_token, organizationId, instanceId, pageSize, pageMarker);

                if (response.status !== 200) {
                    throw new Error(response.data.message);
                }

                const outputFile = args.output_file as string;

                if (outputFile) {
                    await promisify(writeFile)(outputFile, JSON.stringify(response.data, null, 2));

                    return {
                        message: `Successfully wrote updated instance to ${outputFile}.`,
                    };
                }

                return response.data;
            },
            options: {
                instance_id: {
                    demandOption: true,
                    description: "A Fox instance ID",
                },
                output_file: {
                    description: "Path to output file",
                },
                page_marker: {
                    description: "The page marker",
                    type: "string",
                },
                page_size: {
                    description: "The page size",
                    required: true,
                    type: "number",
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
                const organizationId = args.organization_id as string;
                const pageNumber = args.page_number as number;
                const pageSize = args.page_size as number;

                const response = await listInstances(env, access_token, organizationId, pageNumber, pageSize);

                if (response.status !== 200) {
                    throw new Error(response.data.message);
                }

                const outputFile = args.output_file as string;

                if (outputFile) {
                    await promisify(writeFile)(outputFile, JSON.stringify(response.data, null, 2));

                    return {
                        message: `Successfully wrote new instance to ${outputFile}.`,
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
        provision_instance: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const authentication = await getAuthentication(profile);
                const {access_token} = authentication;
                const organizationId = args.organization_id as string;
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
            },
        },
        reprovision_instance: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const authentication = await getAuthentication(profile);
                const {access_token} = authentication;
                const organizationId = args.organization_id as string;
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
            },
        },
        update_instance: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const authentication = await getAuthentication(profile);
                const {access_token} = authentication;
                const organizationId = args.organization_id as string;
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
                output_file: {
                    description: "Path to output file",
                },
            },
        },
        upload_instance_contents: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const authentication = await getAuthentication(profile);
                const {access_token} = authentication;
                const organizationId = args.organization_id as string;
                const instanceId = args.instance_id as string;
                const inputFolder = args.input_folder as string;
                const fileNames = await promisify(recursive)(inputFolder) as string[];

                const uploadedInstanceContents: IUploadedInstanceContent[] =
                    await Promise.all(fileNames.map(async (fileName: string) => {
                        const buffer: Buffer = await promisify(readFile)(fileName);
                        const type = await mime.lookup(fileName) || "application/octet-stream";

                        return {
                            data: buffer.toString("base64"),
                            key: relative(inputFolder, fileName),
                            type,
                        };
                    }));

                const response: AxiosResponse<{ message?: string }> =
                    await uploadInstanceContents(
                        env, access_token, organizationId, instanceId, uploadedInstanceContents);

                if (response.status !== 200) {
                    throw new Error(response.data.message);
                }

                return {
                    message: `Successfully uploaded content.`,
                };
            },
            options: {
                input_folder: {
                    demandOption: true,
                    description: "Path to input folder",
                },
                instance_id: {
                    demandOption: true,
                    description: "A Fox instance ID",
                },
            },
        },
    },
};
