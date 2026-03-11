import { ExperienceType } from '@/features/experience/types';

export const EXPERIENCE_OPTIONS: { value: ExperienceType; label: string }[] = [
  { value: 'CAREER', label: '경력' },
  { value: 'PROJECT', label: '프로젝트' },
  { value: 'EDUCATION', label: '교육' },
  { value: 'COMPETITION', label: '수상/공모전' },
  { value: 'OTHER', label: '기타' },
];

export const EXPERIENCE_LABEL_MAP = Object.fromEntries(
  EXPERIENCE_OPTIONS.map(({ value, label }) => [value, label]),
) as Record<ExperienceType, string>;
