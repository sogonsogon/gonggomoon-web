import { deleteInterview, getInterview, getInterviewList } from '@/features/interview/actions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const interviewKeys = {
  all: ['interviews'],
  detail: (interviewStrategyId: number) => [...interviewKeys.all, interviewStrategyId] as const,
};

export const interviewListQueryOptions = () => ({
  queryKey: interviewKeys.all,
  queryFn: async () => {
    const result = await getInterviewList();
    if (!result.success) {
      return Promise.reject(result);
    }
    return result.data;
  },
  staleTime: 60 * 1000,
});

export const interviewQueryOptions = (interviewStrategyId: number) => ({
  queryKey: interviewKeys.detail(interviewStrategyId),
  queryFn: async () => {
    const result = await getInterview({ interviewStrategyId });
    if (!result.success) {
      return Promise.reject(result);
    }
    return result.data;
  },
  staleTime: 60 * 1000,
});

// 면접 질문 목록 조회
export function useGetInterviewList() {
  return useQuery(interviewListQueryOptions());
}

// 면접 질문 단건 조회
export function useGetInterview(interviewStrategyId: number) {
  return useQuery(interviewQueryOptions(interviewStrategyId));
}

// TODO: 면접 질문 생성

// 면접 질문 삭제
export function useDeleteInterview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (interviewStrategyId: number) => {
      const result = await deleteInterview({ interviewStrategyId });
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
