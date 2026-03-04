export type QuestionLevel = 'EASY' | 'MEDIUM' | 'HARD';

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
