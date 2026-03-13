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
  companySummary: string; // 회사 한 줄 소개
  rolesResponsibilities: string[]; // R&R
  requiredSkills: string[]; // 필수 역량
  highlightPoints: string[]; // 차별 포인트
  hiddenKeywords: string[]; // 숨은 키워드
  recommendedActions: string[]; // 추천 활동
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
  name?: string; // 검색어(공고명)
  page?: number;
  size?: number;
};

export type GetRecruitmentsResponse = {
  content: Recruitment[];
  pageInfo: PageInfo;
};

export type RecruitmentDetail = {
  postId: number; // 추가 요청
  companyId: number;
  industryId: number;
  companyName: string;
  industryName: string;
  postTitle: string;
  url: string; // 추가 요청
  experienceLevel: number;
  originalContent: string;
  jobType: JobType;
  status: PostStatus;
  stateDate: string;
  dueDate: string;
  analysis?: RecruitmentAnalysis;
};

export type GetRecruitmentDetailResponse = RecruitmentDetail;

export type RequestRecruitmentRequest = {
  platformId: number;
  postUrl: string;
};

export type RecruitmentPlatform = {
  id: number;
  name: string;
};

export type GetRecruitmentPlatformsResponse = RecruitmentPlatform[];
