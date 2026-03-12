import type { QuestionLevel } from '@/features/interview/types';

export const QUESTION_LEVEL_OPTIONS: { value: QuestionLevel; label: string }[] = [
  { value: 'LOWER', label: '난이도 하' },
  { value: 'MIDDLE', label: '난이도 중' },
  { value: 'HIGH', label: '난이도 상' },
];

export const QUESTION_LEVEL_LABEL_MAP = Object.fromEntries(
  QUESTION_LEVEL_OPTIONS.map(({ value, label }) => [value, label]),
) as Record<QuestionLevel, string>;
