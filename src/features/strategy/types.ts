import { IndustryType } from '@/features/industry/types';
import { JobType } from '@/features/recruitment/types';
import { GenerationStatus } from '@/shared/types';
import { ExperienceType } from '@/features/experience/types';

export type StrategyJobType = Extract<JobType, 'FRONTEND' | 'BACKEND'>;
export type StrategyIndustryType = Exclude<IndustryType, 'OTHER'> | 'MASTER';

export type Strategy = {
  strategyId: number;
  jobType: StrategyJobType;
  industryType: Exclude<StrategyIndustryType, 'MASTER'>;
  createdAt: string;
  selectedExperienceCount?: number;
  totalCount?: number;
};

export type ExperienceStrategyPoint = {
  experienceType: ExperienceType;
  experienceTitle: string;
  strategyPoint: string;
};

export type ExperienceOrdering = {
  order: number;
  title: string;
  reason: string;
};

export type StrategyDetail = {
  strategyId: number;
  jobType: StrategyJobType;
  industryType: Exclude<StrategyIndustryType, 'MASTER'>;
  selectedExperienceCount?: number;
  createdAt: string;
  mainPositioningMessage: string;
  experienceStrategyPoints: ExperienceStrategyPoint[];
  experienceOrdering: ExperienceOrdering[];
  keywords: string[];
  strengths: string[];
  kpiCheckList: string[];
  improvementGuides: ImprovementGuide[];
};

export type ImprovementGuide = {
  title: string;
  description: string;
};

export type CreateStrategyRequest = {
  jobType: StrategyJobType;
  industryType: IndustryType | null;
  experienceIds: number[];
};

export type CreateStrategyResponse = {
  strategyId: number;
  status: GenerationStatus;
};
