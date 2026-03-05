import type { Company } from '@/features/company/types';

export const mockCompanies: Company[] = [
  {
    companyId: 11,
    companyName: '네오커머스',
    companyType: 'LARGE_ENTERPRISE',
    industryId: 1,
    websiteUrl: 'https://example.com',
    foundedYear: 2012,
    address: 'Seoul, KR',
    employeeCount: 3500,
  },
  {
    companyId: 12,
    companyName: '핀웨이브',
    companyType: 'MID_SIZED_ENTERPRISE',
    industryId: 2,
    websiteUrl: 'https://example.com',
    foundedYear: 2018,
    address: 'Seoul, KR',
    employeeCount: 420,
  },
  {
    companyId: 13,
    companyName: '글로벌테크랩',
    companyType: 'SMALL_MEDIUM_ENTERPRISE',
    industryId: 5,
    websiteUrl: 'https://example.com',
    foundedYear: 2006,
    address: 'San Francisco, US',
    employeeCount: 12000,
  },
  {
    companyId: 14,
    companyName: '스몰스튜디오',
    companyType: 'STARTUP',
    industryId: 3,
    websiteUrl: 'https://example.com',
    foundedYear: 2021,
    address: 'Seoul, KR',
    employeeCount: 18,
  },
];
