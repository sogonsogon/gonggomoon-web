import { JobType } from '@/features/recruitment/types';
import { JOB_OPTIONS } from '@/features/recruitment/constants/jobOptions';

export type TabValue = 'ALL' | JobType;

export const TABS: { value: TabValue; label: string }[] = [
  { value: 'ALL', label: '전체' },
  ...JOB_OPTIONS,
];
