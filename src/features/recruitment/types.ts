import { PageInfo } from '@/shared/types/pageInfo';

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

export type PostStatus = 'ANALYZING' | 'ANALYZED' | 'ANALYSIS_FAILED' | 'PUBLISHED' | 'REJECTED'; // 공고 분석 상태

export type RecruitmentAnalysis = {
  summary: string; // 공고 한 줄 요약
  company_intro: string; // 회사 한 줄 소개
  rnr: string[]; // R&R
  required_skills: string[]; // 필수 역량
  differentiators: string[]; // 차별 포인트
  hidden_keywords: string[]; // 숨은 키워드
  action_items: string[]; // 추천 활동
};

export type Recruitment = {
  postId: number;
  companyId: number;
  companyName: string;
  platformName: string;
  postTitle: string;
  experienceLevel: number;
  jobType: JobType;
  stateDate: string;
  dueDate: string;
  analysisSummary: string; // AI 공고 한 줄 분석
};

export type GetRecruitmentsParams = {
  jobType?: JobType;
  title?: string; // 검색어(공고명)
  page?: number;
  size?: number;
};

export type GetRecruitmentsResponse = {
  content: Recruitment[];
  pageInfo: PageInfo;
};

export type RecruitmentDetail = {
  postId: number;
  companyId: number;
  industryId: number;
  companyName: string;
  industryName: string;
  postTitle: string;
  postUrl: string;
  experienceLevel: number;
  originalContent: string;
  jobType: JobType;
  status: PostStatus;
  stateDate: string;
  dueDate: string;
  analyzedContent?: RecruitmentAnalysis;
};

export type GetRecruitmentDetailResponse = RecruitmentDetail;

export type RequestRecruitmentRequest = {
  platformId: number;
  postUrl: string;
};

export type RecruitmentPlatform = {
  platformId: number;
  platformName: string;
};

export type GetRecruitmentPlatformsResponse = { content: RecruitmentPlatform[] };
