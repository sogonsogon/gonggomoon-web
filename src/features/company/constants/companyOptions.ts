import type { CompanyType } from '@/features/company/types';

export const COMPANY_OPTIONS = [
  { value: 'LARGE_ENTERPRISE', label: '대기업' },
  { value: 'MID_SIZED_ENTERPRISE', label: '중견기업' },
  { value: 'SMALL_MEDIUM_ENTERPRISE', label: '중소기업' },
  { value: 'STARTUP', label: '스타트업' },
] as const satisfies ReadonlyArray<{
  value: CompanyType;
  label: string;
}>;

export const COMPANY_LABEL_MAP: Record<CompanyType, string> = Object.fromEntries(
  COMPANY_OPTIONS.map(({ value, label }) => [value, label]),
) as Record<CompanyType, string>;
