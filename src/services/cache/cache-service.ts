import { IAuthentication } from "../../@types";
import {
  getAuthenticationFromCache,
  getAuthenticationFromXilution,
  isAuthenticationExpired,
} from "./cache-helpers";

export const getAuthentication = async (
  profile: string
): Promise<IAuthentication> => {
  let authentication = await getAuthenticationFromCache(profile);
  if (!authentication || isAuthenticationExpired(authentication)) {
    authentication = await getAuthenticationFromXilution(profile);
  }

  return authentication;
};
