import { isAfter } from "date-fns";
import { exists, mkdir, readFile, writeFile } from "fs";
import { promisify } from "util";
import { IAuthentication, ICache, IContext } from "../../types";
import {
  getTokenWithClientCredentials,
  getTokenWithPassword,
} from "../authentication-service";
import { getContext } from "../config/config-service";
import {
  getPathToCache,
  getPathToConfig,
  getPathToXilutionDirectory,
} from "../filesystem-helpers";

const getCache = async (): Promise<ICache | undefined> => {
  const pathToCache = getPathToCache();
  const doesPathToCacheExist = await promisify(exists)(pathToCache);
  if (doesPathToCacheExist) {
    const buffer: Buffer = await promisify(readFile)(pathToCache);

    return JSON.parse(Buffer.from(buffer).toString("ascii"));
  }

  return undefined;
};

export const getAuthenticationFromCache = async (
  profile: string
): Promise<IAuthentication | undefined> => {
  const cache: ICache | undefined = await getCache();

  if (cache) {
    return cache[profile];
  }

  return undefined;
};

export const isAuthenticationExpired = (
  authentication: IAuthentication
): boolean =>
  isAfter(new Date(), new Date(authentication.access_token_expires_at));

const cacheAuthentication = async (
  profile: string,
  authentication: IAuthentication
): Promise<void> => {
  const xilutionDirectory = getPathToXilutionDirectory();
  const doesPathToXilutionDirectoryExist = await promisify(exists)(
    xilutionDirectory
  );
  if (!doesPathToXilutionDirectoryExist) {
    await promisify(mkdir)(xilutionDirectory);
  }
  const cache = await getCache();
  const pathToCache = getPathToCache();

  if (cache) {
    await promisify(writeFile)(
      pathToCache,
      JSON.stringify(
        {
          ...cache,
          [profile]: authentication,
        },
        null,
        2
      )
    );
  } else {
    await promisify(writeFile)(
      pathToCache,
      JSON.stringify(
        {
          [profile]: authentication,
        },
        null,
        2
      )
    );
  }

  return Promise.resolve();
};

export const getAuthenticationFromXilution = async (
  profile: string
): Promise<IAuthentication> => {
  const context: IContext = await getContext(profile);
  const {
    env,
    organizationId,
    clientId,
    clientSecret,
    username,
    password,
  } = context;
  let authentication;
  if (env && organizationId && clientId && clientSecret) {
    authentication = await getTokenWithClientCredentials(
      env,
      organizationId,
      clientId,
      clientSecret
    );
  } else if (env && organizationId && clientId && username && password) {
    authentication = await getTokenWithPassword(
      env,
      organizationId,
      clientId,
      username,
      password
    );
  }

  if (authentication) {
    await cacheAuthentication(profile, authentication);

    return authentication;
  }

  const pathToConfig = getPathToConfig();
  // tslint:disable-next-line:max-line-length
  throw new Error(
    `Unable to authenticate. The configuration for the profile ${profile} found in ${pathToConfig} must contain one of (env, clientId, clientSecret) or (env, clientId, username, password).`
  );
};
