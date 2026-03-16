import { GenerationStatus } from '@/shared/types';

export type QuestionLevel = 'LOWER' | 'MIDDLE' | 'HIGH';

export type Interview = {
  interviewStrategyId: number;
  createdAt: string;
};

export type InterviewDetail = Interview & {
  interviewStrategyId: number;
  basePortfolio: string;
  createdAt: string;
  questionTotalCount: number;
  contents: InterviewQuestion[];
};

export type InterviewQuestion = {
  questionId: number;
  question: string;
  questionLevel: QuestionLevel;
};

export type CreateInterviewRequest = {
  fileAssetId: number;
};

export type CreateInterviewResponse = {
  interviewStrategyId: number;
  status: GenerationStatus;
};

export type GetInterviewListResponse = {
  contents: Interview[];
  totalCount: number;
};

export type GetInterviewRequest = {
  interviewStrategyId: number;
};

export type GetInterviewResponse = InterviewDetail;

export type DeleteInterviewRequest = {
  interviewStrategyId: number;
};

export type GetInterviewAvailablityResponse = {
  usedCount: number;
  limitCount: number;
  canGenerate: boolean;
};
