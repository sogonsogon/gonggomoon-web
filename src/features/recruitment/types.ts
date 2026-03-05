import { IndustryType } from '@/features/industry/types';

export type JobType =
  | 'FRONTEND'
  | 'BACKEND'
  | 'DEVOPS'
  | 'DATA_ANALYSIS'
  | 'AI'
  | 'INFORMATION_SECURITY'
  | 'DESIGN'
  | 'PM_PO'
  | 'QA';

export type PlatformType = 'SARAMIN' | 'WANTED' | 'JABKOREA' | 'JASOSEOL';

export type RecruitmentStatus = 'OPEN' | 'CLOSED';

export type Recruitment = {
  recruitmentId: number;
  title: string;
  companyId: number;
  jobType: JobType;
  industryType?: IndustryType;
  status: RecruitmentStatus;
  url?: string;
  startDate?: string | null;
  dueDate?: string | null;
  createdAt: string;
};
