export type FileCategory = 'RESUME' | 'PORTFOLIO' | 'OTHER';

export type File = {
  fileAssetId: number;
  category: FileCategory;
  originalFileName: string;
  sizeBytes: number;
  createdAt: string;
};
