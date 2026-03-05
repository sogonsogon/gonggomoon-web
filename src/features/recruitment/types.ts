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

export type PostStatus = 'ANALYZING' | 'ANALYSIS_DONE' | 'POSTED'; // 공고 분석 상태

export type Recruitment = {
  recruitmentId: number;
  title: string;
  companyId: number;
  jobType: JobType;
  industryType?: IndustryType;
  status: PostStatus;
  url?: string;
  startDate?: string | null;
  dueDate?: string | null;
  createdAt: string;
};
