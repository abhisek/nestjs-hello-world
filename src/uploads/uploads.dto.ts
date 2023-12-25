export enum UploadVisibility {
  PUBLIC,
  PRIVATE,
}

export interface UploadRequestDTO {
  filename: string;
  visibility: UploadVisibility;
}

export interface UploadResponseDTO {
  url: string;
}
