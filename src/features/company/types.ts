export type CompanyType =
  | 'LARGE_ENTERPRISE'
  | 'MID_SIZED_ENTERPRISE'
  | 'SMALL_MEDIUM_ENTERPRISE'
  | 'STARTUP';

export type Company = {
  companyId: number;
  industryId: number;
  industryName: string;
  companyName: string;
  companyType: CompanyType;
  employeeCount: number;
  address: string;
  description: string;
  foundedYear: number;
  companyUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type GetCompanyDetailResponse = Company;
