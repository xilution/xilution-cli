export interface IUploadedInstanceContent {
    data: string;
    key: string;
    type: string;
}

export interface IExistingInstanceContentSummary {
    fileName: string;
    key: string;
    lastModified: string;
    size: number;
}

export interface IExistingInstanceContent extends IExistingInstanceContentSummary {
    data: string;
    type: string;
}

export interface IListInstanceContentsResponse {
    content: IExistingInstanceContentSummary[];
    nextPageMarker?: string;
}
