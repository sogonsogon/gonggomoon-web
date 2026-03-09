import { IndustryType } from '@/features/industry/types';

export type CompanyType =
  | 'LARGE_ENTERPRISE'
  | 'MID_SIZED_ENTERPRISE'
  | 'SMALL_MEDIUM_ENTERPRISE'
  | 'STARTUP';

export type Company = {
  companyId: number;
  industryType: IndustryType;
  companyName: string;
  companyType: CompanyType;
  industryId?: number;
  description?: string; // 기업 소개
  revenue?: number; // 매출액
  websiteUrl?: string;
  foundedYear?: number;
  address?: string;
  employeeCount?: number;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: string;
  updatedAt?: string;
};
