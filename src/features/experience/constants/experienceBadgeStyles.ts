import { ExperienceType } from '@/features/experience/types';

export const EXP_BADGE_CHECKED: Record<ExperienceType, string> = {
  CAREER: 'bg-[#e6f9f2] border border-[#b2e8d4] text-[#127848]',
  PROJECT: 'bg-[#e8f3ff] border border-[#90c2ff] text-[#2272eb]',
  EDUCATION: 'bg-blue-50 border border-blue-200 text-blue-700',
  COMPETITION: 'bg-purple-50 border border-purple-200 text-purple-700',
  OTHER: 'bg-orange-50 border border-orange-200 text-orange-700',
};

export const EXP_BADGE_UNCHECKED = 'bg-gray-100 border border-gray-200 text-gray-600';
