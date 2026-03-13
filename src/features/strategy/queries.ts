import { deleteStrategy, getStrategy, getStrategyList } from '@/features/strategy/actions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const strategyKeys = {
  all: ['strategies'],
  detail: (strategyId: number) => [...strategyKeys.all, strategyId] as const,
};

export const strategyListQueryOptions = () => ({
  queryKey: strategyKeys.all,
  queryFn: async () => {
    const result = await getStrategyList();
    if (!result.success) {
      return Promise.reject(result);
    }
    return result.data;
  },
  staleTime: 60 * 1000,
});

export const strategyQueryOptions = (strategyId: number) => ({
  queryKey: strategyKeys.detail(strategyId),
  queryFn: async () => {
    const result = await getStrategy({ strategyId });
    if (!result.success) {
      return Promise.reject(result);
    }
    return result.data;
  },
  staleTime: 60 * 1000,
});

// 포폴 전략 목록 조회
export function useGetStrategyList() {
  return useQuery(strategyListQueryOptions());
}

// 포폴 전략 단건 조회
export function useGetStrategy(strategyId: number) {
  return useQuery(strategyQueryOptions(strategyId));
}

// TODO: 포폴 전략 생성

// 포폴 전략 삭제
export function useDeleteStrategy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (strategyId: number) => {
      const result = await deleteStrategy({ strategyId });
      if (!result.success) {
        return Promise.reject(result);
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: strategyKeys.all });
    },
    onError: (error) => {
      console.error('포폴 전략 삭제 실패:', error);
    },
  });
}
