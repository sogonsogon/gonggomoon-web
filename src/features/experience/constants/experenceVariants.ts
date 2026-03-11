import { ExperienceType } from '@/features/experience/types';

export const EXP_VARIANTS: Record<ExperienceType, { bg: string; border: string; text: string }> = {
  CAREER: {
    bg: 'bg-[#e6f9f2]',
    border: 'border-[#b2e8d4]',
    text: 'text-[#127848]',
  },
  PROJECT: {
    bg: 'bg-[#e8f3ff]',
    border: 'border-[#90c2ff]',
    text: 'text-[#2272eb]',
  },
  EDUCATION: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
  },
  COMPETITION: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-700',
  },
  OTHER: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-700',
  },
};
