import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
  GetRecruitmentsParams,
  GetRecruitmentsResponse,
  RequestRecruitmentRequest,
} from '@/features/recruitment/types';
import { requestRecruitment } from '@/features/recruitment/actions';
import { getRecruitments, getRecruitmentDetail } from '@/features/recruitment/actions';

export const recruitmentKeys = {
  all: ['recruitment'] as const,
  lists: () => [...recruitmentKeys.all, 'list'] as const,
  list: (params: GetRecruitmentsParams = {}) => [...recruitmentKeys.lists(), params] as const,
  detail: (postId: number) => [...recruitmentKeys.all, 'detail', postId] as const,
};

// 공고 목록 조회
export function useGetRecruitments(params: GetRecruitmentsParams = {}) {
  return useInfiniteQuery({
    ...getRecruitmentsInfiniteQueryOption(params),
    select: (data) => data.pages.flatMap((page) => page.content),
  });
}

export function getRecruitmentsInfiniteQueryOption(params: GetRecruitmentsParams = {}) {
  const { jobType, name, size } = params;

  return {
    queryKey: recruitmentKeys.list(params),
    initialPageParam: 0,
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const response = await getRecruitments({
        jobType,
        name,
        page: pageParam,
        size,
      });

      if (!response.success) {
        throw response;
      }

      return response.data;
    },
    getNextPageParam: (lastPage: GetRecruitmentsResponse): number | null => {
      if (!lastPage.pageInfo.hasNext) return null;
      return lastPage.pageInfo.currentPage + 1;
    },
    staleTime: 60 * 1000,
  };
}

// 공고 상세 조회
export function useGetRecruitmentDetail(postId: number) {
  return useQuery(getRecruitmentDetailQueryOption(postId));
}

export function getRecruitmentDetailQueryOption(postId: number) {
  return {
    queryKey: recruitmentKeys.detail(postId),
    queryFn: async () => {
      const response = await getRecruitmentDetail(postId);

      if (!response.success) {
        throw response;
      }

      return response.data;
    },
    staleTime: 60 * 1000,
    enabled: !!postId,
  };
}

// 공고 게시 요청
export function useRequestRecruitment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: RequestRecruitmentRequest) => {
      const response = await requestRecruitment(payload);

      if (!response.success) {
        throw response;
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recruitmentKeys.all });
    },
    onError: (error) => {
      console.error('공고 게시 요청 실패:', error);
    },
  });
}
