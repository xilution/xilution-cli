import {readFile, writeFile} from "fs";
import {promisify} from "util";
import {Arguments} from "yargs";
import {IContext} from "../../../../../@types";
import {
    auditScheduledTweets,
    createScheduledTweet,
    createTweet,
    createTwitterAccount,
    deleteScheduledTweet,
    deleteTweet,
    deleteTwitterAccount,
    getScheduledTweet,
    getTweet,
    getTweetEvent,
    getTwitterAccount,
    listScheduledTweets,
    listTweetEvents,
    listTweets,
    listTwitterAccounts,
    updateScheduledTweet,
    updateTweet,
    updateTwitterAccount,
} from "../../../../../brokers/xilution-social-chickadee-broker";
import {resolveUrl} from "../../../../../brokers/xilution-uri-broker";
import {getAuthentication} from "../../../../cache/cache-service";
import {getContext} from "../../../../config/config-service";

export default {
    operations: {
        audit_scheduled_tweets: {
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
                const fromTimestamp = args.from_timestamp as string;
                const toTimestamp = args.to_timestamp as string;

                const response = await auditScheduledTweets(
                    env, access_token, organizationId, pageNumber, pageSize, fromTimestamp, toTimestamp);

                if (response.status !== 200) {
                    throw new Error(response.data.message);
                }

                return response.data;
            },
            options: {
                from_timestamp: {
                    description: "The start timestamp in ISO 8601 format",
                    required: true,
                    type: "string",
                },
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
                to_timestamp: {
                    description: "The end timestamp in ISO 8601 format",
                    required: true,
                    type: "string",
                },
            },
        },
        create_scheduled_tweet: {
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
                const scheduledTweet = JSON.parse(Buffer.from(buffer).toString("ASCII"));

                const createResponse = await createScheduledTweet(env, access_token, organizationId, scheduledTweet);

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
                        message: `Successfully wrote new scheduled tweet to ${outputFile}.`,
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
        create_tweet: {
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
                const tweet = JSON.parse(Buffer.from(buffer).toString("ASCII"));

                const createResponse = await createTweet(env, access_token, organizationId, tweet);

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
                        message: `Successfully wrote new tweet to ${outputFile}.`,
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
        create_twitter_account: {
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
                const twitterAccount = JSON.parse(Buffer.from(buffer).toString("ASCII"));

                const createResponse = await createTwitterAccount(env, access_token, organizationId, twitterAccount);

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
                        message: `Successfully wrote new scheduled tweet to ${outputFile}.`,
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
        delete_scheduled_tweet: {
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
                const scheduledTweetId = args.scheduled_tweet_id as string;

                const response = await deleteScheduledTweet(env, access_token, organizationId, scheduledTweetId);

                if (response.status !== 204) {
                    throw new Error(response.data.message);
                }

                return {
                    message: `Successfully deleted scheduledTweetId: ${scheduledTweetId}`,
                };
            },
            options: {
                organization_id: {
                    demandOption: true,
                    description: "A Xilution organization's ID",
                },
                scheduled_tweet_id: {
                    demandOption: true,
                    description: "A Chickadee scheduled tweet ID",
                },
            },
        },
        delete_tweet: {
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
                const tweetId = args.tweet_id as string;

                const response = await deleteTweet(env, access_token, organizationId, tweetId);

                if (response.status !== 204) {
                    throw new Error(response.data.message);
                }

                return {
                    message: `Successfully deleted tweetId: ${tweetId}`,
                };
            },
            options: {
                organization_id: {
                    demandOption: true,
                    description: "A Xilution organization's ID",
                },
                tweet_id: {
                    demandOption: true,
                    description: "A Chickadee tweet ID",
                },
            },
        },
        delete_twitter_account: {
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
                const twitterAccountId = args.twitter_account_id as string;

                const response = await deleteTwitterAccount(env, access_token, organizationId, twitterAccountId);

                if (response.status !== 204) {
                    throw new Error(response.data.message);
                }

                return {
                    message: `Successfully deleted twitterAccountId: ${twitterAccountId}`,
                };
            },
            options: {
                organization_id: {
                    demandOption: true,
                    description: "A Xilution organization's ID",
                },
                twitter_account_id: {
                    demandOption: true,
                    description: "A Chickadee scheduled tweet ID",
                },
            },
        },
        get_scheduled_tweet: {
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
                const scheduledTweetId = args.scheduled_tweet_id as string;

                const response = await getScheduledTweet(env, access_token, organizationId, scheduledTweetId);

                if (response.status !== 200) {
                    throw new Error(response.data.message);
                }

                const outputFile = args.output_file as string;

                if (outputFile) {
                    await promisify(writeFile)(outputFile, JSON.stringify(response.data, null, 2));

                    return {
                        message: `Successfully wrote scheduled tweet to ${outputFile}.`,
                    };
                }

                return response.data;
            },
            options: {
                organization_id: {
                    demandOption: true,
                    description: "A Xilution organization's ID",
                },
                output_file: {
                    description: "Path to output file",
                },
                scheduled_tweet_id: {
                    demandOption: true,
                    description: "A Chickadee scheduled tweet ID",
                },
            },
        },
        get_tweet: {
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
                const tweetId = args.tweet_id as string;

                const response = await getTweet(env, access_token, organizationId, tweetId);

                if (response.status !== 200) {
                    throw new Error(response.data.message);
                }

                const outputFile = args.output_file as string;

                if (outputFile) {
                    await promisify(writeFile)(outputFile, JSON.stringify(response.data, null, 2));

                    return {
                        message: `Successfully wrote tweet to ${outputFile}.`,
                    };
                }

                return response.data;
            },
            options: {
                organization_id: {
                    demandOption: true,
                    description: "A Xilution organization's ID",
                },
                output_file: {
                    description: "Path to output file",
                },
                tweet_id: {
                    demandOption: true,
                    description: "A Chickadee tweet ID",
                },
            },
        },
        get_tweet_event: {
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
                const tweetEventId = args.tweet_event_id as string;

                const response = await getTweetEvent(env, access_token, organizationId, tweetEventId);

                if (response.status !== 200) {
                    throw new Error(response.data.message);
                }

                const outputFile = args.output_file as string;

                if (outputFile) {
                    await promisify(writeFile)(outputFile, JSON.stringify(response.data, null, 2));

                    return {
                        message: `Successfully wrote scheduled tweet to ${outputFile}.`,
                    };
                }

                return response.data;
            },
            options: {
                organization_id: {
                    demandOption: true,
                    description: "A Xilution organization's ID",
                },
                output_file: {
                    description: "Path to output file",
                },
                tweet_event_id: {
                    demandOption: true,
                    description: "A Chickadee tweet event ID",
                },
            },
        },
        get_twitter_account: {
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
                const twitterAccountId = args.twitter_account_id as string;

                const response = await getTwitterAccount(env, access_token, organizationId, twitterAccountId);

                if (response.status !== 200) {
                    throw new Error(response.data.message);
                }

                const outputFile = args.output_file as string;

                if (outputFile) {
                    await promisify(writeFile)(outputFile, JSON.stringify(response.data, null, 2));

                    return {
                        message: `Successfully wrote scheduled tweet to ${outputFile}.`,
                    };
                }

                return response.data;
            },
            options: {
                organization_id: {
                    demandOption: true,
                    description: "A Xilution organization's ID",
                },
                output_file: {
                    description: "Path to output file",
                },
                twitter_account_id: {
                    demandOption: true,
                    description: "A Chickadee scheduled tweet ID",
                },
            },
        },
        list_scheduled_tweets: {
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
                const fromTimestamp = args.from_timestamp as string;
                const toTimestamp = args.to_timestamp as string;

                const response = await listScheduledTweets(
                    env, access_token, organizationId, pageNumber, pageSize, fromTimestamp, toTimestamp);

                if (response.status !== 200) {
                    throw new Error(response.data.message);
                }

                return response.data;
            },
            options: {
                from_timestamp: {
                    description: "The start timestamp in ISO 8601 format",
                    required: true,
                    type: "string",
                },
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
                to_timestamp: {
                    description: "The end timestamp in ISO 8601 format",
                    required: true,
                    type: "string",
                },
            },
        },
        list_tweet_events: {
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
                const fromTimestamp = args.from_timestamp as string;
                const toTimestamp = args.to_timestamp as string;

                const response = await listTweetEvents(
                    env, access_token, organizationId, pageNumber, pageSize, fromTimestamp, toTimestamp);

                if (response.status !== 200) {
                    throw new Error(response.data.message);
                }

                return response.data;
            },
            options: {
                from_timestamp: {
                    description: "The start timestamp in ISO 8601 format",
                    required: true,
                    type: "string",
                },
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
                to_timestamp: {
                    description: "The end timestamp in ISO 8601 format",
                    required: true,
                    type: "string",
                },
            },
        },
        list_tweets: {
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

                const response = await listTweets(env, access_token, organizationId, pageNumber, pageSize);

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
        list_twitter_accounts: {
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

                const response = await listTwitterAccounts(env, access_token, organizationId, pageNumber, pageSize);

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
        update_scheduled_tweet: {
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
                const scheduledTweetId = args.scheduled_tweet_id as string;
                const inputFile = args.input_file as string;
                const buffer: Buffer = await promisify(readFile)(inputFile);
                const scheduledTweet = JSON.parse(Buffer.from(buffer).toString("ASCII"));

                const updateResponse = await updateScheduledTweet(
                    env, access_token, organizationId, scheduledTweetId, scheduledTweet);

                if (updateResponse.status !== 204) {
                    throw new Error(updateResponse.data.message);
                }

                const getResponse = await getScheduledTweet(env, access_token, organizationId, scheduledTweetId);

                if (getResponse.status !== 200) {
                    throw new Error(getResponse.data.message);
                }

                const outputFile = args.output_file as string;

                if (outputFile) {
                    await promisify(writeFile)(outputFile, JSON.stringify(getResponse.data, null, 2));

                    return {
                        message: `Successfully wrote updated scheduled tweet to ${outputFile}.`,
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
                scheduled_tweet_id: {
                    demandOption: true,
                    description: "A Chickadee scheduled tweet ID",
                },
            },
        },
        update_tweet: {
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
                const tweetId = args.tweet_id as string;
                const inputFile = args.input_file as string;
                const buffer: Buffer = await promisify(readFile)(inputFile);
                const tweet = JSON.parse(Buffer.from(buffer).toString("ASCII"));

                const updateResponse = await updateTweet(
                    env, access_token, organizationId, tweetId, tweet);

                if (updateResponse.status !== 204) {
                    throw new Error(updateResponse.data.message);
                }

                const getResponse = await getTweet(env, access_token, organizationId, tweetId);

                if (getResponse.status !== 200) {
                    throw new Error(getResponse.data.message);
                }

                const outputFile = args.output_file as string;

                if (outputFile) {
                    await promisify(writeFile)(outputFile, JSON.stringify(getResponse.data, null, 2));

                    return {
                        message: `Successfully wrote updated tweet to ${outputFile}.`,
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
                tweet_id: {
                    demandOption: true,
                    description: "A Chickadee tweet ID",
                },
            },
        },
        update_twitter_account: {
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
                const twitterAccountId = args.twitter_account_id as string;
                const inputFile = args.input_file as string;
                const buffer: Buffer = await promisify(readFile)(inputFile);
                const twitterAccount = JSON.parse(Buffer.from(buffer).toString("ASCII"));

                const updateResponse = await updateTwitterAccount(
                    env, access_token, organizationId, twitterAccountId, twitterAccount);

                if (updateResponse.status !== 204) {
                    throw new Error(updateResponse.data.message);
                }

                const getResponse = await getTwitterAccount(env, access_token, organizationId, twitterAccountId);

                if (getResponse.status !== 200) {
                    throw new Error(getResponse.data.message);
                }

                const outputFile = args.output_file as string;

                if (outputFile) {
                    await promisify(writeFile)(outputFile, JSON.stringify(getResponse.data, null, 2));

                    return {
                        message: `Successfully wrote updated scheduled tweet to ${outputFile}.`,
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
                twitter_account_id: {
                    demandOption: true,
                    description: "A Chickadee scheduled tweet ID",
                },
            },
        },
    },
};
