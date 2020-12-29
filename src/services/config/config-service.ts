import { exists, readFile } from "fs";
import { promisify } from "util";
import { IConfiguration, IContext } from "../../@types";
import {
  getPathToConfig,
  getPathToXilutionDirectory,
} from "../filesystem-helpers";

export const getContext = async (profile: string): Promise<IContext> => {
  const pathToXilutionDirectory = getPathToXilutionDirectory();
  const doesPathToXilutionDirectory = await promisify(exists)(
    pathToXilutionDirectory
  );
  if (!doesPathToXilutionDirectory) {
    throw new Error(
      `${pathToXilutionDirectory} does not exist. Please create ${pathToXilutionDirectory} to continue.`
    );
  }

  const pathToConfig = getPathToConfig();
  const doesPathToConfigExist = await promisify(exists)(pathToConfig);
  if (!doesPathToConfigExist) {
    throw new Error(
      `${pathToConfig} does not exist. Please create ${pathToConfig} to continue.`
    );
  }
  const buffer: Buffer = await promisify(readFile)(pathToConfig);

  const configuration = JSON.parse(
    Buffer.from(buffer).toString("ascii")
  ) as IConfiguration;
  const workingConfiguration: IContext = configuration[profile];

  if (workingConfiguration) {
    return workingConfiguration;
  } else if (profile === "default" && Object.keys(configuration).length > 0) {
    const [firstProfile] = Object.keys(configuration);

    return configuration[firstProfile];
  }

  throw new Error(
    `Configuration for the profile ${profile} does not exist. Please create one in ${pathToConfig} to continue.`
  );
};
