import { JobType } from '@/features/recruitment/types';

export const JOB_OPTIONS: { value: JobType; label: string }[] = [
  { value: 'FRONTEND', label: '프론트엔드' },
  { value: 'BACKEND', label: '백엔드' },
  { value: 'EMBEDDED', label: '임베디드' },
  { value: 'DEVOPS', label: 'DevOps' },
  { value: 'DATA_ANALYSIS', label: '데이터 분석' },
  { value: 'AI', label: '인공지능' },
  { value: 'INFORMATION_SECURITY', label: '정보보안' },
  { value: 'DESIGN', label: '디자인' },
  { value: 'PM_PO', label: 'PM/PO' },
  { value: 'QA', label: 'QA' },
];

export const JOB_LABEL_MAP = Object.fromEntries(
  JOB_OPTIONS.map(({ value, label }) => [value, label]),
) as Record<JobType, string>;
