import { PostStatus } from '@/features/recruitment/types';

export type IndustryType =
  | 'MEDIA_CONTENT'
  | 'COMMERCE'
  | 'FINTECH_FINANCIAL'
  | 'MOBILITY_LOGISTICS'
  | 'AI'
  | 'HEALTHCARE_BIO'
  | 'MANUFACTURING_INDUSTRY'
  | 'OTHER';

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

export type GetIndustryAnalysisResponse = IndustryAnalysis;
