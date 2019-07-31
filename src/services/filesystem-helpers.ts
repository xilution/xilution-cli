import {homedir} from "os";

export const getPathToXilutionDirectory = () => `${homedir()}/.xilution`;

export const getPathToCache = () => `${getPathToXilutionDirectory()}/cache.json`;

export const getPathToConfig = () => `${getPathToXilutionDirectory()}/config.json`;
