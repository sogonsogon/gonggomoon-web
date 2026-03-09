import { IndustryType } from '@/features/industry/types';

export const INDUSTRY_OPTIONS: { value: IndustryType; label: string }[] = [
  { value: 'MEDIA_CONTENT', label: '미디어 / 컨텐츠' },
  { value: 'COMMERCE', label: '커머스' },
  { value: 'FINTECH_FINANCIAL', label: '핀테크 · 금융' },
  { value: 'MOBILITY_LOGISTICS', label: '모빌리티 / 물류' },
  { value: 'AI', label: '인공지능' },
  { value: 'HEALTHCARE_BIO', label: '헬스케어 / 바이오' },
  { value: 'MANUFACTURING_INDUSTRY', label: '제조업' },
  { value: 'OTHER', label: '기타' },
];

export const INDUSTRY_LABEL_MAP = Object.fromEntries(
  INDUSTRY_OPTIONS.map(({ value, label }) => [value, label]),
) as Record<IndustryType, string>;
