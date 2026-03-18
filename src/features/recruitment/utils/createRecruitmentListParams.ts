import type { TabValue } from '@/features/recruitment/constants/tabs';
import type { GetRecruitmentsParams } from '@/features/recruitment/types';

export function createRecruitmentListParams(
  activeTab: TabValue,
  title: string,
): GetRecruitmentsParams {
  return {
    title: title || undefined,
    jobType: activeTab === 'ALL' ? undefined : activeTab,
    size: 10,
  };
}
