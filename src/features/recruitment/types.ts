import { IndustryType } from '@/features/industry/types';

export type JobType =
  | 'FRONTEND'
  | 'BACKEND'
  | 'DEVOPS'
  | 'DATA'
  | 'AI'
  | 'SECURITY'
  | 'DESIGN'
  | 'PM/PO'
  | 'QA';

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
