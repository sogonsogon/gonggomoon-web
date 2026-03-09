import { IndustryType } from '@/features/industry/types';

export type JobType =
  | 'FRONTEND'
  | 'BACKEND'
  | 'EMBEDDED'
  | 'DEVOPS'
  | 'DATA_ANALYSIS'
  | 'AI'
  | 'INFORMATION_SECURITY'
  | 'DESIGN'
  | 'PM_PO'
  | 'QA';

export type PlatformType = 'SARAMIN' | 'WANTED' | 'JABKOREA' | 'JASOSEOL';

export type PostStatus = 'ANALYZING' | 'ANALYSIS_DONE' | 'POSTED'; // 공고 분석 상태

export type RecruitmentAnalysis = {
  summary: string; // 공고 한 줄 요약
  companySummary: string; // 회사 한 줄 소개
  rolesResponsibilities: string[]; // R&R
  requiredSkills: string[]; // 필수 역량
  highlightPoints: string[]; // 차별 포인트
  hiddenKeywords: string[]; // 숨은 키워드
  recommendedActions: string[]; // 추천 활동
};

export type Recruitment = {
  postId: number;
  title: string;
  companyName: string;
  companyId: number;
  jobType?: JobType;
  industryType?: IndustryType;
  experienceLevel?: number;
  deadline?: string | null;
  postDescription?: string;
  status?: PostStatus;
  url?: string;
  analysisSummary?: string;
  analysis?: RecruitmentAnalysis;
};
