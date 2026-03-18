import { PostStatus } from '@/features/recruitment/types';

export type Industry = {
  industryId: number;
  industryName: string;
};

export type IndustryAnalysis = {
  industryReportId: number;
  industryName: string;
  reportStatus: PostStatus;
  reportYear: number;
  marketSize: string;
  competition: string;
  trend: string[];
  regulation: string[];
  keyword: string[];
  hiring: string[];
  investment: string[];
  createdAt: string;
  updatedAt: string;
};

export type GetIndustryListResponse = {
  content: Industry[];
};

export type GetIndustryAnalysisResponse = IndustryAnalysis;
