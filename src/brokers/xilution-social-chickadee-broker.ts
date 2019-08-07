/* tslint:disable:max-line-length */
import axios, {AxiosResponse} from "axios";

export const buildListTweetsUrl = (env: string, organizationId: string, pageNumber: number, pageSize: number) =>
    `https://${env}.chickadee.social.api.xilution.com/organizations/${organizationId}/tweets?page-number=${pageNumber}&page-size=${pageSize}`;

export const buildPostTweetUrl = (env: string, organizationId: string) =>
    `https://${env}.chickadee.social.api.xilution.com/organizations/${organizationId}/tweets`;

export const buildPutTweetUrl = (env: string, organizationId: string, tweetId: string) =>
    `https://${env}.chickadee.social.api.xilution.com/organizations/${organizationId}/tweets/${tweetId}`;

export const buildGetTweetUrl = (env: string, organizationId: string, tweetId: string) =>
    `https://${env}.chickadee.social.api.xilution.com/organizations/${organizationId}/tweets/${tweetId}`;

export const buildListTweetEventsUrl = (env: string, organizationId: string, pageNumber: number, pageSize: number, fromTimestamp: string, toTimestamp: string) =>
    `https://${env}.chickadee.social.api.xilution.com/organizations/${organizationId}/tweet-events?page-number=${pageNumber}&page-size=${pageSize}&from-timestamp=${fromTimestamp}&to-timestamp=${toTimestamp}`;

export const buildGetTweetEventUrl = (env: string, organizationId: string, tweetEventId: string) =>
    `https://${env}.chickadee.social.api.xilution.com/organizations/${organizationId}/tweet-events/${tweetEventId}`;

export const buildDeleteTweetUrl = (env: string, organizationId: string, tweetId: string) =>
    `https://${env}.chickadee.social.api.xilution.com/organizations/${organizationId}/tweets/${tweetId}`;

export const buildAuditScheduledTweetsUrl = (env: string, organizationId: string, pageNumber: number, pageSize: number, fromTimestamp: string, toTimestamp: string) =>
    `https://${env}.chickadee.social.api.xilution.com/organizations/${organizationId}/scheduled-tweets/audit?page-number=${pageNumber}&page-size=${pageSize}&from-timestamp=${fromTimestamp}&to-timestamp=${toTimestamp}`;

export const buildListScheduledTweetsUrl = (env: string, organizationId: string, pageNumber: number, pageSize: number, fromTimestamp: string, toTimestamp: string) =>
    `https://${env}.chickadee.social.api.xilution.com/organizations/${organizationId}/scheduled-tweets?page-number=${pageNumber}&page-size=${pageSize}&from-timestamp=${fromTimestamp}&to-timestamp=${toTimestamp}`;

export const buildPostScheduledTweetUrl = (env: string, organizationId: string) =>
    `https://${env}.chickadee.social.api.xilution.com/organizations/${organizationId}/scheduled-tweets`;

export const buildPutScheduledTweetUrl = (env: string, organizationId: string, scheduledTweetId: string) =>
    `https://${env}.chickadee.social.api.xilution.com/organizations/${organizationId}/scheduled-tweets/${scheduledTweetId}`;

export const buildGetScheduledTweetUrl = (env: string, organizationId: string, scheduledTweetId: string) =>
    `https://${env}.chickadee.social.api.xilution.com/organizations/${organizationId}/scheduled-tweets/${scheduledTweetId}`;

export const buildDeleteScheduledTweetUrl = (env: string, organizationId: string, scheduledTweetId: string) =>
    `https://${env}.chickadee.social.api.xilution.com/organizations/${organizationId}/scheduled-tweets/${scheduledTweetId}`;

export const buildListTwitterAccountsUrl = (env: string, organizationId: string, pageNumber: number, pageSize: number) =>
    `https://${env}.chickadee.social.api.xilution.com/organizations/${organizationId}/twitter-accounts?page-number=${pageNumber}&page-size=${pageSize}`;

export const buildPostTwitterAccountUrl = (env: string, organizationId: string) =>
    `https://${env}.chickadee.social.api.xilution.com/organizations/${organizationId}/twitter-accounts`;

export const buildPutTwitterAccountUrl = (env: string, organizationId: string, twitterAccountId: string) =>
    `https://${env}.chickadee.social.api.xilution.com/organizations/${organizationId}/twitter-accounts/${twitterAccountId}`;

export const buildGetTwitterAccountUrl = (env: string, organizationId: string, twitterAccountId: string) =>
    `https://${env}.chickadee.social.api.xilution.com/organizations/${organizationId}/twitter-accounts/${twitterAccountId}`;

export const buildDeleteTwitterAccountUrl = (env: string, organizationId: string, twitterAccountId: string) =>
    `https://${env}.chickadee.social.api.xilution.com/organizations/${organizationId}/twitter-accounts/${twitterAccountId}`;

export const listTweets = async (
    env: string,
    accessToken: string,
    organizationId: string,
    pageNumber: number,
    pageSize: number,
): Promise<AxiosResponse> => axios.get(buildListTweetsUrl(env, organizationId, pageNumber, pageSize), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const createTweet = async (
    env: string,
    accessToken: string,
    organizationId: string,
    tweet: any,
): Promise<AxiosResponse> => axios.post(buildPostTweetUrl(env, organizationId), tweet, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const updateTweet = async (
    env: string,
    accessToken: string,
    organizationId: string,
    tweetId: string,
    tweet: any,
): Promise<AxiosResponse> => axios.put(buildPutTweetUrl(env, organizationId, tweetId), tweet, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const getTweet = async (
    env: string,
    accessToken: string,
    organizationId: string,
    tweetId: string,
): Promise<AxiosResponse> => axios.get(buildGetTweetUrl(env, organizationId, tweetId), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const deleteTweet = async (
    env: string,
    accessToken: string,
    organizationId: string,
    tweetId: string,
): Promise<AxiosResponse> => axios.delete(buildDeleteTweetUrl(env, organizationId, tweetId), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const listTweetEvents = async (
    env: string,
    accessToken: string,
    organizationId: string,
    pageNumber: number,
    pageSize: number,
    fromTimestamp: string,
    toTimestamp: string,
): Promise<AxiosResponse> => axios.get(buildListTweetEventsUrl(env, organizationId, pageNumber, pageSize, fromTimestamp, toTimestamp), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const getTweetEvent = async (
    env: string,
    accessToken: string,
    organizationId: string,
    tweetEventId: string,
): Promise<AxiosResponse> => axios.get(buildGetTweetEventUrl(env, organizationId, tweetEventId), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const auditScheduledTweets = async (
    env: string,
    accessToken: string,
    organizationId: string,
    pageNumber: number,
    pageSize: number,
    fromTimestamp: string,
    toTimestamp: string,
): Promise<AxiosResponse> => axios.get(buildAuditScheduledTweetsUrl(env, organizationId, pageNumber, pageSize, fromTimestamp, toTimestamp), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const listScheduledTweets = async (
    env: string,
    accessToken: string,
    organizationId: string,
    pageNumber: number,
    pageSize: number,
    fromTimestamp: string,
    toTimestamp: string,
): Promise<AxiosResponse> => axios.get(buildListScheduledTweetsUrl(env, organizationId, pageNumber, pageSize, fromTimestamp, toTimestamp), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const createScheduledTweet = async (
    env: string,
    accessToken: string,
    organizationId: string,
    scheduledTweet: any,
): Promise<AxiosResponse> => axios.post(buildPostScheduledTweetUrl(env, organizationId), scheduledTweet, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const updateScheduledTweet = async (
    env: string,
    accessToken: string,
    organizationId: string,
    scheduledTweetId: string,
    scheduledTweet: any,
): Promise<AxiosResponse> => axios.put(buildPutScheduledTweetUrl(env, organizationId, scheduledTweetId), scheduledTweet, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const getScheduledTweet = async (
    env: string,
    accessToken: string,
    organizationId: string,
    scheduledTweetId: string,
): Promise<AxiosResponse> => axios.get(buildGetScheduledTweetUrl(env, organizationId, scheduledTweetId), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const deleteScheduledTweet = async (
    env: string,
    accessToken: string,
    organizationId: string,
    scheduledTweetId: string,
): Promise<AxiosResponse> => axios.delete(buildDeleteScheduledTweetUrl(env, organizationId, scheduledTweetId), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const listTwitterAccounts = async (
    env: string,
    accessToken: string,
    organizationId: string,
    pageNumber: number,
    pageSize: number,
): Promise<AxiosResponse> => axios.get(buildListTwitterAccountsUrl(env, organizationId, pageNumber, pageSize), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const createTwitterAccount = async (
    env: string,
    accessToken: string,
    organizationId: string,
    twitterAccount: any,
): Promise<AxiosResponse> => axios.post(buildPostTwitterAccountUrl(env, organizationId), twitterAccount, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const updateTwitterAccount = async (
    env: string,
    accessToken: string,
    organizationId: string,
    twitterAccountId: string,
    twitterAccount: any,
): Promise<AxiosResponse> => axios.put(buildPutTwitterAccountUrl(env, organizationId, twitterAccountId), twitterAccount, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const getTwitterAccount = async (
    env: string,
    accessToken: string,
    organizationId: string,
    twitterAccountId: string,
): Promise<AxiosResponse> => axios.get(buildGetTwitterAccountUrl(env, organizationId, twitterAccountId), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const deleteTwitterAccount = async (
    env: string,
    accessToken: string,
    organizationId: string,
    twitterAccountId: string,
): Promise<AxiosResponse> => axios.delete(buildDeleteTwitterAccountUrl(env, organizationId, twitterAccountId), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});
/* tslint:enable */
