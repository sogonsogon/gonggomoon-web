import {
  createInterview,
  deleteInterview,
  getInterview,
  getInterviewAvailability,
  getInterviewList,
} from '@/features/interview/actions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateInterviewRequest } from './types';

export const interviewKeys = {
  all: ['interview'] as const,
  list: () => [...interviewKeys.all, 'list'] as const,
  detail: (interviewStrategyId: number) =>
    [...interviewKeys.all, 'detail', interviewStrategyId] as const,
  availability: () => [...interviewKeys.all, 'availability'] as const,
};

// 면접 질문 목록 조회
export function useGetInterviewList() {
  return useQuery(getInterviewListQueryOptions());
}

export const getInterviewListQueryOptions = () => ({
  queryKey: interviewKeys.list(),
  queryFn: async () => {
    const result = await getInterviewList();
    if (!result.success) {
      return Promise.reject(result);
    }
    return result.data;
  },
  staleTime: 5 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
});

// 면접 질문 단건 조회
export function useGetInterview(interviewStrategyId: number) {
  return useQuery(getInterviewQueryOptions(interviewStrategyId));
}

export const getInterviewQueryOptions = (interviewStrategyId: number) => ({
  queryKey: interviewKeys.detail(interviewStrategyId),
  queryFn: async () => {
    const result = await getInterview(interviewStrategyId);
    if (!result.success && result.code !== 'INTERVIEW_STRATEGY_RESULT_NOT_READY') {
      return Promise.reject(result);
    }
    return result.data;
  },
  staleTime: 60 * 60 * 1000,
  gcTime: 60 * 60 * 1000,
  enabled: !!interviewStrategyId,
  retry: false,
});

// 면접 질문 생성
export function useCreateInterview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateInterviewRequest) => {
      const result = await createInterview(payload);

      if (!result.success) {
        return Promise.reject(result);
      }

      return result.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: interviewKeys.list() });

      // 생성 직후 상세 캐시를 미리 무효화하고 싶다면 추가
      queryClient.invalidateQueries({
        queryKey: interviewKeys.detail(data.interviewStrategyId),
      });
    },
    onError: (error) => {
      console.error('면접 질문 생성 실패:', error);
    },
  });
}

// 면접 질문 삭제
export function useDeleteInterview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (interviewStrategyId: number) => {
      const result = await deleteInterview(interviewStrategyId);
      if (!result.success) {
        return Promise.reject(result);
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: interviewKeys.all });
    },
    onError: (error) => {
      console.error('면접 질문 삭제 실패:', error);
    },
  });
}

// 면접 질문 생성 사용 횟수 조회
export function useGetInterviewAvailability(enabled = true) {
  return useQuery(getInterviewAvailabilityQueryOptions(enabled));
}

export const getInterviewAvailabilityQueryOptions = (enabled = true) => ({
  queryKey: interviewKeys.availability(),
  queryFn: async () => {
    const response = await getInterviewAvailability();

    if (!response.success) {
      return Promise.reject(response);
    }

    return response.data;
  },
  staleTime: 60 * 1000,
  enabled,
});
