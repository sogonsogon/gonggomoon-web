import { useQuery } from '@tanstack/react-query';
import { getIndustryAnalysis, getIndustryList } from '@/features/industry/actions';

export const industryKeys = {
  all: ['industry'],
  list: () => [...industryKeys.all, 'list'] as const,
  detail: (industryId: number) => [...industryKeys.all, industryId] as const,
};

// 산업 목록 조회
export function useGetIndustryList() {
  return useQuery(getIndustryListQueryOptions());
}

// 산업 분석 조회
export function useIndustryAnalysis(industryId: number) {
  return useQuery(getIndustryAnalysisQueryOptions(industryId));
}

export const getIndustryListQueryOptions = () => ({
  queryKey: industryKeys.list(),
  queryFn: async () => {
    const result = await getIndustryList();
    if (!result.success) {
      return Promise.reject(result);
    }
    return result.data;
  },
  staleTime: 24 * 60 * 60 * 1000,
  gcTime: 24 * 60 * 60 * 1000,
});

export const getIndustryAnalysisQueryOptions = (industryId: number) => ({
  queryKey: industryKeys.detail(industryId),
  queryFn: async () => {
    const result = await getIndustryAnalysis(industryId);
    if (!result.success) {
      return Promise.reject(result);
    }
    return result.data;
  },
  staleTime: 24 * 60 * 60 * 1000,
  gcTime: 24 * 60 * 60 * 1000,
});
