export type IndustryType =
  | 'MEDIA_CONTENT'
  | 'COMMERCE'
  | 'FINTECH_FINANCIAL'
  | 'MOBILITY_LOGISTICS'
  | 'AI'
  | 'HEALTHCARE_BIO'
  | 'MANUFACTURING_INDUSTRY'
  | 'OTHER';

export type Industry = {
  industryId: number;
  name: string;
};
