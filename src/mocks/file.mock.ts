import type { File, FileCategory } from '@/features/file/types';

export const mockFileCategories: FileCategory[] = ['RESUME', 'PORTFOLIO', 'OTHER'];

export const mockFiles: File[] = [
  {
    fileId: 1,
    category: 'RESUME',
    title: '이력서_프론트엔드_김수연.pdf',
    sizeBytes: 345_210,
    createdAt: '2026-02-20T09:30:00.000Z',
  },
  {
    fileId: 2,
    category: 'PORTFOLIO',
    title: '포트폴리오_김수연_2026Q1.pdf',
    sizeBytes: 1_245_992,
    createdAt: '2026-02-21T03:10:00.000Z',
  },
  {
    fileId: 3,
    category: 'OTHER',
    title: '경력기술서_김수연.docx',
    sizeBytes: 512_400,
    createdAt: '2026-02-22T12:00:00.000Z',
  },
];
