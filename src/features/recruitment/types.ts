import { IndustryType } from '../industry/types';

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

export type RecruitmentStatus = 'OPEN' | 'CLOSED' | 'DRAFT';

export type Recruitment = {
  recruitmentId: number;
  title: string;
  companyId: number;
  jobType: JobType;
  industryType?: IndustryType;
  status: RecruitmentStatus;
  url?: string;
  dueDate?: string | null;
  createdAt: string;
};
