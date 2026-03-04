export type FileCategory = 'RESUME' | 'PORTFOLIO' | 'OTHER';

export type File = {
  fileId: number;
  category: FileCategory;
  title: string;
  sizeBytes: number;
  createdAt: string;
};
