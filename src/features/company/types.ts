export type CompanyType =
  | 'LARGE_ENTERPRISE'
  | 'MID_SIZED_ENTERPRISE'
  | 'SMALL_MEDIUM_ENTERPRISE'
  | 'STARTUP';

export type Company = {
  companyId: number;
  companyName: string;
  companyType: CompanyType;
  industryId?: number;
  websiteUrl?: string;
  foundedYear?: number;
  address?: string;
  employeeCount?: number;
};
