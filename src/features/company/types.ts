export type CompanyType = 'LARGE' | 'FOREIGN' | 'MIDDLE' | 'SMALL';

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
