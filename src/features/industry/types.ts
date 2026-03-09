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
  analysisYear?: number;
  keyword: string[];
  marketSize: string;
  trend: string[];
  regulation: string[];
  competition: string;
  hiring: string[];
  investment: string[];
  createdAt: string;
  updatedAt: string;
};

export type Industry = {
  industryId: number;
  name: string;
  analysis?: IndustryAnalysis;
};
