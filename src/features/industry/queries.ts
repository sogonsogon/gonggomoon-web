import { useQuery } from '@tanstack/react-query';
import { getIndustryAnalysis } from '@/features/industry/actions';

export const industryKeys = {
  all: ['industry'],
  detail: (industryId: number) => [...industryKeys.all, 'industry', industryId] as const,
};

// 산업 분석 조회
export function useIndustryAnalysis(industryId: number) {
  return useQuery(getIndustryAnalysisQueryOptions(industryId));
}

export const getIndustryAnalysisQueryOptions = (industryId: number) => ({
  queryKey: industryKeys.detail(industryId),
  queryFn: async () => {
    const result = await getIndustryAnalysis(industryId);
    if (!result.success) {
      return Promise.reject(result);
    }
    return result.data;
  },
  staleTime: 60 * 1000,
});
