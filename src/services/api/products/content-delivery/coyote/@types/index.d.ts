export interface IUploadedPipelineContent {
  data: string;
  key: string;
  type: string;
}

export interface IExistingPipelineContentSummary {
  fileName: string;
  key: string;
  lastModified: string;
  size: number;
}

export interface IExistingPipelineContent
  extends IExistingPipelineContentSummary {
  data: string;
  type: string;
}

export interface IListPipelineContentsResponse {
  content: IExistingPipelineContentSummary[];
  nextPageMarker?: string;
}
