import {
  createStrategy,
  deleteStrategy,
  getStrategyDetail,
  getStrategyList,
} from '@/features/strategy/actions';
import { CreateStrategyRequest } from '@/features/strategy/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const strategyKeys = {
  all: ['strategy'] as const,
  list: () => [...strategyKeys.all, 'list'] as const,
  detail: (strategyId: number) => [...strategyKeys.all, 'detail', strategyId] as const,
};

// 포폴 전략 목록 조회
export function useGetStrategyList() {
  return useQuery(getStrategyListQueryOptions());
}

export const getStrategyListQueryOptions = () => ({
  queryKey: strategyKeys.list(),
  queryFn: async () => {
    const response = await getStrategyList();

    if (!response.success) {
      return Promise.reject(response);
    }

    return response.data;
  },
  staleTime: 60 * 1000,
});

// 포폴 전략 상세 조회
export function useGetStrategy(strategyId: number) {
  return useQuery(getStrategyQueryOption(strategyId));
}

export const getStrategyQueryOption = (strategyId: number) => ({
  queryKey: strategyKeys.detail(strategyId),
  queryFn: async () => {
    const response = await getStrategyDetail(strategyId);

    if (!response.success) {
      return Promise.reject(response);
    }

    return response.data;
  },
  staleTime: 60 * 1000,
  enabled: !!strategyId,
});

// 포폴 전략 생성
export function useCreateStrategy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateStrategyRequest) => {
      const result = await createStrategy(payload);

      if (!result.success) {
        return Promise.reject(result);
      }

      return result.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: strategyKeys.list() });

      // 생성 직후 상세 캐시를 미리 무효화하고 싶다면 추가
      queryClient.invalidateQueries({
        queryKey: strategyKeys.detail(data.strategyId),
      });
    },
    onError: (error) => {
      console.error('포폴 전략 생성 실패:', error);
    },
  });
}

// 포폴 전략 삭제
export function useDeleteStrategy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (strategyId: number) => {
      const result = await deleteStrategy(strategyId);

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
