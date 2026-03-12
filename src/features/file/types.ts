export type FileCategory = 'RESUME' | 'PORTFOLIO' | 'OTHER';

export type File = {
  fileAssetId: number;
  category: FileCategory;
  originalFileName: string;
  sizeBytes: number;
  createdAt: string;
};

export type GetFilesResponse = {
  contents: File[];
  totalCount: number;
};

export type UploadFileRequest = {
  category: FileCategory;
  file: globalThis.File;
};

export type UploadFileResponse = {
  fileAssetId: number;
};

export type DeleteFileRequest = { fileAssetId: number };
