/* tslint:disable:max-line-length */
import axios, {AxiosResponse} from "axios";

export const buildListTweetsUrl = (env: string, pageNumber: number, pageSize: number) =>
    `https://${env}.chickadee.social.api.xilution.com/tweets?page-number=${pageNumber}&page-size=${pageSize}`;

export const buildPostTweetUrl = (env: string) =>
    `https://${env}.chickadee.social.api.xilution.com/tweets`;

export const buildPutTweetUrl = (env: string, tweetId: string) =>
    `https://${env}.chickadee.social.api.xilution.com/tweets/${tweetId}`;

export const buildGetTweetUrl = (env: string, tweetId: string) =>
    `https://${env}.chickadee.social.api.xilution.com/tweets/${tweetId}`;

export const buildListTweetEventsUrl = (env: string, pageNumber: number, pageSize: number, fromTimestamp: string, toTimestamp: string) =>
    `https://${env}.chickadee.social.api.xilution.com/tweet-events?page-number=${pageNumber}&page-size=${pageSize}&from-timestamp=${fromTimestamp}&to-timestamp=${toTimestamp}`;

export const buildGetTweetEventUrl = (env: string, tweetEventId: string) =>
    `https://${env}.chickadee.social.api.xilution.com/tweet-events/${tweetEventId}`;

export const buildDeleteTweetUrl = (env: string, tweetId: string) =>
    `https://${env}.chickadee.social.api.xilution.com/tweets/${tweetId}`;

export const buildAuditScheduledTweetsUrl = (env: string, pageNumber: number, pageSize: number, fromTimestamp: string, toTimestamp: string) =>
    `https://${env}.chickadee.social.api.xilution.com/scheduled-tweets/audit?page-number=${pageNumber}&page-size=${pageSize}&from-timestamp=${fromTimestamp}&to-timestamp=${toTimestamp}`;

export const buildListScheduledTweetsUrl = (env: string, pageNumber: number, pageSize: number, fromTimestamp: string, toTimestamp: string) =>
    `https://${env}.chickadee.social.api.xilution.com/scheduled-tweets?page-number=${pageNumber}&page-size=${pageSize}&from-timestamp=${fromTimestamp}&to-timestamp=${toTimestamp}`;

export const buildPostScheduledTweetUrl = (env: string) =>
    `https://${env}.chickadee.social.api.xilution.com/scheduled-tweets`;

export const buildPutScheduledTweetUrl = (env: string, scheduledTweetId: string) =>
    `https://${env}.chickadee.social.api.xilution.com/scheduled-tweets/${scheduledTweetId}`;

export const buildGetScheduledTweetUrl = (env: string, scheduledTweetId: string) =>
    `https://${env}.chickadee.social.api.xilution.com/scheduled-tweets/${scheduledTweetId}`;

export const buildDeleteScheduledTweetUrl = (env: string, scheduledTweetId: string) =>
    `https://${env}.chickadee.social.api.xilution.com/scheduled-tweets/${scheduledTweetId}`;

export const buildListTwitterAccountsUrl = (env: string, pageNumber: number, pageSize: number) =>
    `https://${env}.chickadee.social.api.xilution.com/twitter-accounts?page-number=${pageNumber}&page-size=${pageSize}`;

export const buildPostTwitterAccountUrl = (env: string) =>
    `https://${env}.chickadee.social.api.xilution.com/twitter-accounts`;

export const buildPutTwitterAccountUrl = (env: string, twitterAccountId: string) =>
    `https://${env}.chickadee.social.api.xilution.com/twitter-accounts/${twitterAccountId}`;

export const buildGetTwitterAccountUrl = (env: string, twitterAccountId: string) =>
    `https://${env}.chickadee.social.api.xilution.com/twitter-accounts/${twitterAccountId}`;

export const buildDeleteTwitterAccountUrl = (env: string, twitterAccountId: string) =>
    `https://${env}.chickadee.social.api.xilution.com/twitter-accounts/${twitterAccountId}`;

export const listTweets = async (
    env: string,
    accessToken: string,
    pageNumber: number,
    pageSize: number,
): Promise<AxiosResponse> => axios.get(buildListTweetsUrl(env, pageNumber, pageSize), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const createTweet = async (
    env: string,
    accessToken: string,
    tweet: any,
): Promise<AxiosResponse> => axios.post(buildPostTweetUrl(env), tweet, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const updateTweet = async (
    env: string,
    accessToken: string,
    tweetId: string,
    tweet: any,
): Promise<AxiosResponse> => axios.put(buildPutTweetUrl(env, tweetId), tweet, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const getTweet = async (
    env: string,
    accessToken: string,
    tweetId: string,
): Promise<AxiosResponse> => axios.get(buildGetTweetUrl(env, tweetId), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const deleteTweet = async (
    env: string,
    accessToken: string,
    tweetId: string,
): Promise<AxiosResponse> => axios.delete(buildDeleteTweetUrl(env, tweetId), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const listTweetEvents = async (
    env: string,
    accessToken: string,
    pageNumber: number,
    pageSize: number,
    fromTimestamp: string,
    toTimestamp: string,
): Promise<AxiosResponse> => axios.get(buildListTweetEventsUrl(env, pageNumber, pageSize, fromTimestamp, toTimestamp), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const getTweetEvent = async (
    env: string,
    accessToken: string,
    tweetEventId: string,
): Promise<AxiosResponse> => axios.get(buildGetTweetEventUrl(env, tweetEventId), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const auditScheduledTweets = async (
    env: string,
    accessToken: string,
    pageNumber: number,
    pageSize: number,
    fromTimestamp: string,
    toTimestamp: string,
): Promise<AxiosResponse> => axios.get(buildAuditScheduledTweetsUrl(env, pageNumber, pageSize, fromTimestamp, toTimestamp), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const listScheduledTweets = async (
    env: string,
    accessToken: string,
    pageNumber: number,
    pageSize: number,
    fromTimestamp: string,
    toTimestamp: string,
): Promise<AxiosResponse> => axios.get(buildListScheduledTweetsUrl(env, pageNumber, pageSize, fromTimestamp, toTimestamp), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const createScheduledTweet = async (
    env: string,
    accessToken: string,
    scheduledTweet: any,
): Promise<AxiosResponse> => axios.post(buildPostScheduledTweetUrl(env), scheduledTweet, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const updateScheduledTweet = async (
    env: string,
    accessToken: string,
    scheduledTweetId: string,
    scheduledTweet: any,
): Promise<AxiosResponse> => axios.put(buildPutScheduledTweetUrl(env, scheduledTweetId), scheduledTweet, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const getScheduledTweet = async (
    env: string,
    accessToken: string,
    scheduledTweetId: string,
): Promise<AxiosResponse> => axios.get(buildGetScheduledTweetUrl(env, scheduledTweetId), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const deleteScheduledTweet = async (
    env: string,
    accessToken: string,
    scheduledTweetId: string,
): Promise<AxiosResponse> => axios.delete(buildDeleteScheduledTweetUrl(env, scheduledTweetId), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const listTwitterAccounts = async (
    env: string,
    accessToken: string,
    pageNumber: number,
    pageSize: number,
): Promise<AxiosResponse> => axios.get(buildListTwitterAccountsUrl(env, pageNumber, pageSize), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const createTwitterAccount = async (
    env: string,
    accessToken: string,
    twitterAccount: any,
): Promise<AxiosResponse> => axios.post(buildPostTwitterAccountUrl(env), twitterAccount, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const updateTwitterAccount = async (
    env: string,
    accessToken: string,
    twitterAccountId: string,
    twitterAccount: any,
): Promise<AxiosResponse> => axios.put(buildPutTwitterAccountUrl(env, twitterAccountId), twitterAccount, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const getTwitterAccount = async (
    env: string,
    accessToken: string,
    twitterAccountId: string,
): Promise<AxiosResponse> => axios.get(buildGetTwitterAccountUrl(env, twitterAccountId), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});

export const deleteTwitterAccount = async (
    env: string,
    accessToken: string,
    twitterAccountId: string,
): Promise<AxiosResponse> => axios.delete(buildDeleteTwitterAccountUrl(env, twitterAccountId), {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});
/* tslint:enable */
