import { GenerationStatus } from '@/shared/types';

export type QuestionLevel = 'LOWER' | 'MIDDLE' | 'HIGH';

export type Interview = {
  interviewSetId: number;
  createdAt: string;
  basePortfolio?: string;
  questionTotalCount?: number;
  contents?: InterviewQuestion[];
};

export type InterviewQuestion = {
  questionId: number;
  content: string;
  questionLevel: QuestionLevel;
};

export type CreateInterviewRequest = {
  fileAssetId: number;
};

export type CreateInterviewResponse = {
  interviewSetId: number;
  status: GenerationStatus;
};
