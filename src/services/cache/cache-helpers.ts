import {isAfter} from "date-fns";
import {exists, mkdir, readFile, writeFile} from "fs";
import {promisify} from "util";
import {IAuthentication, ICache, IContext} from "../../@types";
import {getTokenWithClientCredentials} from "../authentication-service";
import {getConfiguration} from "../config-service";
import {getPathToCache, getPathToXilutionDirectory} from "../filesystem-helpers";

const getCache = async (): Promise<ICache | undefined> => {
    const pathToCache = getPathToCache();
    const doesPathToCacheExist = await promisify(exists)(pathToCache);
    if (doesPathToCacheExist) {
        const buffer: Buffer = await promisify(readFile)(pathToCache);

        return JSON.parse(Buffer.from(buffer).toString());
    }

    return undefined;
};

export const getAuthenticationFromCache = async (profile: string): Promise<IAuthentication | undefined> => {
    const cache: ICache | undefined = await getCache();

    if (cache) {
        return cache[profile];
    }

    return undefined;
};

export const isAuthenticationExpired = (authentication: IAuthentication): boolean =>
    isAfter(new Date(), new Date(authentication.access_token_expires_at));

const cacheAuthentication = async (profile: string, authentication: IAuthentication): Promise<void> => {
    const xilutionDirectory = getPathToXilutionDirectory();
    const doesPathToXilutionDirectoryExist = await promisify(exists)(xilutionDirectory);
    if (!doesPathToXilutionDirectoryExist) {
        await promisify(mkdir)(xilutionDirectory);
    }
    const cache = await getCache();

    if (cache) {
        await promisify(writeFile)(getPathToCache(), JSON.stringify({
            ...cache,
            [profile]: authentication,
        }, null, 2));
    } else {
        await promisify(writeFile)(getPathToCache(), JSON.stringify({
            [profile]: authentication,
        }, null, 2));
    }

    return Promise.resolve();
};

export const getAuthenticationFromXilution = async (profile: string): Promise<IAuthentication> => {
    const workingConfig: IContext = await getConfiguration(profile);
    const {env, clientId, clientSecret} = workingConfig;
    const authentication = await getTokenWithClientCredentials(env, clientId, clientSecret);

    await cacheAuthentication(profile, authentication);

    return authentication;
};
