import type { Recruitment } from '@/features/recruitment/types';

export const mockRecruitments: Recruitment[] = [
  {
    recruitmentId: 3001,
    title: '프론트엔드 엔지니어 (커머스)',
    companyId: 11,
    jobType: 'FRONTEND',
    industryType: 'COMMERCE',
    status: 'OPEN',
    url: 'https://example.com/jobs/3001',
    dueDate: '2026-03-31',
    createdAt: '2026-03-01T00:00:00.000Z',
  },
  {
    recruitmentId: 3002,
    title: '프론트엔드 인턴 (핀테크)',
    companyId: 12,
    jobType: 'FRONTEND',
    industryType: 'FINTECH',
    status: 'OPEN',
    url: 'https://example.com/jobs/3002',
    dueDate: null,
    createdAt: '2026-03-02T00:00:00.000Z',
  },
  {
    recruitmentId: 3003,
    title: '백엔드 엔지니어 (AI)',
    companyId: 13,
    jobType: 'BACKEND',
    industryType: 'AI',
    status: 'DRAFT',
    createdAt: '2026-03-03T00:00:00.000Z',
  },
];
