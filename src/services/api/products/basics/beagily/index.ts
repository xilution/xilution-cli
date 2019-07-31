import {readFile, writeFile} from "fs";
import {promisify} from "util";
import {Arguments} from "yargs";
import {IContext} from "../../../../../@types";
import {
    createThing,
    deleteThing, deleteType,
    getThing, getType,
    listThings,
    updateThing, updateType,
} from "../../../../../brokers/xilution-basics-beagily-broker";
import {resolveUrl} from "../../../../../brokers/xilution-uri-broker";
import {getAuthentication} from "../../../../cache/cache-service";
import {getContext} from "../../../../config/config-service";

export default {
    operations: {
        create_thing: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const authentication = await getAuthentication(profile);
                const {access_token} = authentication;
                const type = args.type as string;
                const inputFile = args.input_file as string;
                const buffer: Buffer = await promisify(readFile)(inputFile);
                const thing = JSON.parse(Buffer.from(buffer).toString("ASCII"));

                const createResponse = await createThing(env, access_token, type, thing);

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
                        message: `Successfully wrote new thing to ${outputFile}.`,
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
                type: {
                    demandOption: true,
                    description: "A thing's type",
                },
            },
        },
        create_type: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const authentication = await getAuthentication(profile);
                const {access_token} = authentication;
                const name = args.name as string;
                const inputFile = args.input_file as string;
                const buffer: Buffer = await promisify(readFile)(inputFile);
                const type = JSON.parse(Buffer.from(buffer).toString("ASCII"));

                const updateResponse = await updateType(
                    env, access_token, name, type);

                if (updateResponse.status !== 204) {
                    throw new Error(updateResponse.data.message);
                }

                const getResponse = await getType(env, access_token, name);

                if (getResponse.status !== 200) {
                    throw new Error(getResponse.data.message);
                }

                const outputFile = args.output_file as string;

                if (outputFile) {
                    await promisify(writeFile)(outputFile, JSON.stringify(getResponse.data, null, 2));

                    return {
                        message: `Successfully wrote new type to ${outputFile}.`,
                    };
                }

                return getResponse.data;
            },
            options: {
                input_file: {
                    demandOption: true,
                    description: "Path to input file",
                },
                name: {
                    demandOption: true,
                    description: "The type's name",
                },
                output_file: {
                    description: "Path to output file",
                },
            },
        },
        delete_thing: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const authentication = await getAuthentication(profile);
                const {access_token} = authentication;
                const type = args.type as string;
                const thingId = args.thing_id as string;

                const response = await deleteThing(env, access_token, type, thingId);

                if (response.status !== 204) {
                    throw new Error(response.data.message);
                }

                return {
                    message: `Successfully deleted thingId: ${thingId}`,
                };
            },
            options: {
                thing_id: {
                    demandOption: true,
                    description: "A thing ID",
                },
                type: {
                    demandOption: true,
                    description: "A thing's type",
                },
            },
        },
        delete_type: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const authentication = await getAuthentication(profile);
                const {access_token} = authentication;
                const name = args.name as string;

                const response = await deleteType(env, access_token, name);

                if (response.status !== 204) {
                    throw new Error(response.data.message);
                }

                return {
                    message: `Successfully deleted type: ${name}`,
                };
            },
            options: {
                name: {
                    demandOption: true,
                    description: "The type's name",
                },
            },
        },
        get_thing: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const authentication = await getAuthentication(profile);
                const {access_token} = authentication;
                const type = args.type as string;
                const thingId = args.thing_id as string;

                const response = await getThing(env, access_token, type, thingId);

                if (response.status !== 200) {
                    throw new Error(response.data.message);
                }

                const outputFile = args.output_file as string;

                if (outputFile) {
                    await promisify(writeFile)(outputFile, JSON.stringify(response.data, null, 2));

                    return {
                        message: `Successfully wrote thing to ${outputFile}.`,
                    };
                }

                return response.data;
            },
            options: {
                output_file: {
                    description: "Path to output file",
                },
                thing_id: {
                    demandOption: true,
                    description: "A thing ID",
                },
                type: {
                    demandOption: true,
                    description: "A thing's type",
                },
            },
        },
        get_type: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const authentication = await getAuthentication(profile);
                const {access_token} = authentication;
                const name = args.name as string;

                const response = await getType(env, access_token, name);

                if (response.status !== 200) {
                    throw new Error(response.data.message);
                }

                const outputFile = args.output_file as string;

                if (outputFile) {
                    await promisify(writeFile)(outputFile, JSON.stringify(response.data, null, 2));

                    return {
                        message: `Successfully wrote type to ${outputFile}.`,
                    };
                }

                return response.data;
            },
            options: {
                name: {
                    demandOption: true,
                    description: "The type's name",
                },
                output_file: {
                    description: "Path to output file",
                },
            },
        },
        list_things: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const authentication = await getAuthentication(profile);
                const {access_token} = authentication;
                const type = args.type as string;
                const pageNumber = args.page_number as number;
                const pageSize = args.page_size as number;

                const response = await listThings(env, access_token, type, pageNumber, pageSize);

                if (response.status !== 200) {
                    throw new Error(response.data.message);
                }

                return response.data;
            },
            options: {
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
                type: {
                    demandOption: true,
                    description: "A thing's type",
                },
            },
        },
        update_thing: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const authentication = await getAuthentication(profile);
                const {access_token} = authentication;
                const type = args.type as string;
                const thingId = args.thing_id as string;
                const inputFile = args.input_file as string;
                const buffer: Buffer = await promisify(readFile)(inputFile);
                const thing = JSON.parse(Buffer.from(buffer).toString("ASCII"));

                const updateResponse = await updateThing(
                    env, access_token, type, thingId, thing);

                if (updateResponse.status !== 204) {
                    throw new Error(updateResponse.data.message);
                }

                const getResponse = await getThing(env, access_token, type, thingId);

                if (getResponse.status !== 200) {
                    throw new Error(getResponse.data.message);
                }

                const outputFile = args.output_file as string;

                if (outputFile) {
                    await promisify(writeFile)(outputFile, JSON.stringify(getResponse.data, null, 2));

                    return {
                        message: `Successfully wrote updated thing to ${outputFile}.`,
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
                thing_id: {
                    demandOption: true,
                    description: "A thing ID",
                },
                type: {
                    demandOption: true,
                    description: "A thing's type",
                },
            },
        },
        update_type: {
            operation: async (args: Arguments) => {
                const profile = args.profile as string;
                const context: IContext = await getContext(profile);
                const {env} = context;
                const authentication = await getAuthentication(profile);
                const {access_token} = authentication;
                const name = args.name as string;
                const inputFile = args.input_file as string;
                const buffer: Buffer = await promisify(readFile)(inputFile);
                const type = JSON.parse(Buffer.from(buffer).toString("ASCII"));

                const updateResponse = await updateType(
                    env, access_token, name, type);

                if (updateResponse.status !== 204) {
                    throw new Error(updateResponse.data.message);
                }

                const getResponse = await getType(env, access_token, name);

                if (getResponse.status !== 200) {
                    throw new Error(getResponse.data.message);
                }

                const outputFile = args.output_file as string;

                if (outputFile) {
                    await promisify(writeFile)(outputFile, JSON.stringify(getResponse.data, null, 2));

                    return {
                        message: `Successfully wrote updated type to ${outputFile}.`,
                    };
                }

                return getResponse.data;
            },
            options: {
                input_file: {
                    demandOption: true,
                    description: "Path to input file",
                },
                name: {
                    demandOption: true,
                    description: "The type's name",
                },
                output_file: {
                    description: "Path to output file",
                },
            },
        },
    },
};
