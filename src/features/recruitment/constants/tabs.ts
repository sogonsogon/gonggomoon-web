import { JobType } from '@/features/recruitment/types';

export type TabValue = 'ALL' | JobType;

export const TABS: { value: TabValue; label: string }[] = [
  { value: 'ALL', label: '전체' },
  { value: 'FRONTEND', label: '프론트엔드' },
  { value: 'BACKEND', label: '백엔드' },
  { value: 'DEVOPS', label: 'DevOps' },
  { value: 'DATA_ANALYSIS', label: '데이터 분석' },
  { value: 'AI', label: '인공지능' },
  { value: 'INFORMATION_SECURITY', label: '정보보안' },
  { value: 'DESIGN', label: '디자인' },
  { value: 'PM_PO', label: 'PM/PO' },
  { value: 'QA', label: 'QA' },
];
