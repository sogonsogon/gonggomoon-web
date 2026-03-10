import { IndustryType } from '@/features/industry/types';
import { JobType } from '@/features/recruitment/types';

export type StrategyJobType = Extract<JobType, 'FRONTEND' | 'BACKEND'>;

export type Strategy = {
  strategyId: number;
  jobType: StrategyJobType;
  industryType?: Exclude<IndustryType, 'OTHER'>;
  createdDate: string;
  experienceTotalCount?: number;
  detail?: StrategyDetail;
};

export type StrategyDetail = {
  highlightKeywords: string[];
  techNarrativeGuide: string;
  kpiExamples: string[];
  oneLinePositioning: string;
  orderedExperiences: OrderedExperience[];
};

export type OrderedExperience = {
  order: number;
  experienceId: number;
  title: string;
  reason: string;
};

export type StrategyIndustry = Exclude<IndustryType, 'OTHER'> | 'MASTER';
