import type { Company } from '@/features/company/types';

export const mockCompanies: Company[] = [
  {
    companyId: 11,
    companyName: '네오커머스',
    companyType: 'LARGE_ENTERPRISE',
    industryType: 'COMMERCE',
    industryId: 1,
    websiteUrl: 'https://example.com',
    foundedYear: 2012,
    address: 'Seoul, KR',
    employeeCount: 3500,
    description:
      '네오커머스는 대규모 트래픽을 처리하는 이커머스 플랫폼을 운영하며, 데이터 기반 서비스 개선과 기술 혁신을 통해 수백만 명의 고객에게 최적의 쇼핑 경험을 제공하고 있습니다. 빠른 실험 문화와 엔지니어 중심의 조직으로 성장하고 있습니다.',
  },
  {
    companyId: 12,
    companyName: '핀웨이브',
    companyType: 'MID_SIZED_ENTERPRISE',
    industryType: 'FINTECH_FINANCIAL',
    industryId: 2,
    websiteUrl: 'https://example.com',
    foundedYear: 2018,
    address: 'Seoul, KR',
    employeeCount: 420,
    description:
      '핀웨이브는 간편 결제와 금융 데이터를 기반으로 새로운 금융 경험을 제공하는 핀테크 기업입니다. 사용자 중심의 금융 서비스를 통해 디지털 뱅킹의 미래를 만들어가고 있습니다.',
  },
  {
    companyId: 13,
    companyName: '글로벌테크랩',
    companyType: 'SMALL_MEDIUM_ENTERPRISE',
    industryType: 'AI',
    industryId: 5,
    websiteUrl: 'https://example.com',
    foundedYear: 2006,
    address: 'San Francisco, US',
    employeeCount: 12000,
    description:
      '글로벌테크랩은 AI 모델을 활용한 데이터 분석 플랫폼을 개발하는 기술 중심 기업입니다. 전 세계 고객을 대상으로 AI 기반 인사이트를 제공하며 빠르게 성장하고 있습니다.',
  },
  {
    companyId: 14,
    companyName: '스몰스튜디오',
    companyType: 'STARTUP',
    industryType: 'MEDIA_CONTENT',
    industryId: 3,
    websiteUrl: 'https://example.com',
    foundedYear: 2021,
    address: 'Seoul, KR',
    employeeCount: 18,
    description:
      '스몰스튜디오는 소규모이지만 강한 팀워크와 창의성을 바탕으로 독창적인 미디어 콘텐츠를 제작합니다. 구성원 모두가 주인의식을 갖고 함께 성장하는 환경을 지향합니다.',
  },
];
