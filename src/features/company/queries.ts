import { useQuery } from '@tanstack/react-query';
import { getCompanyDetail } from '@/features/company/actions';

export const companyKeys = {
  all: ['company'],
  detail: (companyId: number) => [...companyKeys.all, 'detail', companyId] as const,
};

// 기업 상세 조회
export function useGetCompanyDetail(strategyId: number) {
  return useQuery(getCompanyDetailQueryOptions(strategyId));
}

export const getCompanyDetailQueryOptions = (companyId: number) => ({
  queryKey: companyKeys.detail(companyId),
  queryFn: async () => {
    const result = await getCompanyDetail(companyId);
    if (!result.success) {
      return Promise.reject(result);
    }
    return result.data;
  },
  staleTime: 5 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
});
