import axios, {AxiosResponse} from "axios";

export const resolveUrl = async (
    accessToken: string,
    url: string,
): Promise<AxiosResponse> => axios.get(url, {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    validateStatus: () => true,
});
