import { ExperienceType } from '@/features/experience/types';
import { EXP_VARIANTS } from '@/features/experience/constants/experenceVariants';

export const EXP_BADGE_CHECKED: Record<ExperienceType, string> = {
  CAREER: `${EXP_VARIANTS.CAREER.bg} border ${EXP_VARIANTS.CAREER.border} ${EXP_VARIANTS.CAREER.text}`,
  PROJECT: `${EXP_VARIANTS.PROJECT.bg} border ${EXP_VARIANTS.PROJECT.border} ${EXP_VARIANTS.PROJECT.text}`,
  EDUCATION: `${EXP_VARIANTS.EDUCATION.bg} border ${EXP_VARIANTS.EDUCATION.border} ${EXP_VARIANTS.EDUCATION.text}`,
  COMPETITION: `${EXP_VARIANTS.COMPETITION.bg} border ${EXP_VARIANTS.COMPETITION.border} ${EXP_VARIANTS.COMPETITION.text}`,
  OTHER: `${EXP_VARIANTS.OTHER.bg} border ${EXP_VARIANTS.OTHER.border} ${EXP_VARIANTS.OTHER.text}`,
};

export const EXP_BADGE_UNCHECKED = 'bg-gray-100 border border-gray-200 text-gray-600';

export const EXP_BADGE: Record<ExperienceType, string> = {
  CAREER: `${EXP_VARIANTS.CAREER.bg} ${EXP_VARIANTS.CAREER.text}`,
  PROJECT: `${EXP_VARIANTS.PROJECT.bg} ${EXP_VARIANTS.PROJECT.text}`,
  EDUCATION: `${EXP_VARIANTS.EDUCATION.bg} ${EXP_VARIANTS.EDUCATION.text}`,
  COMPETITION: `${EXP_VARIANTS.COMPETITION.bg} ${EXP_VARIANTS.COMPETITION.text}`,
  OTHER: `${EXP_VARIANTS.OTHER.bg} ${EXP_VARIANTS.OTHER.text}`,
};
