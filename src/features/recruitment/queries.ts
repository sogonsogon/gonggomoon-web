import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import type {
  GetRecruitmentsParams,
  GetRecruitmentsResponse,
  RequestRecruitmentRequest,
} from '@/features/recruitment/types';
import {
  requestRecruitment,
  getRecruitments,
  getRecruitmentDetail,
  getRecruitmentPlatforms,
} from '@/features/recruitment/actions';

export const recruitmentKeys = {
  all: ['recruitment'] as const,
  lists: () => [...recruitmentKeys.all, 'list'] as const,
  list: (params: GetRecruitmentsParams = {}) => [...recruitmentKeys.lists(), params] as const,
  detail: (postId: number) => [...recruitmentKeys.all, 'detail', postId] as const,
  platform: () => [...recruitmentKeys.all, 'platform'] as const,
};

// 공고 목록 조회
export function useGetRecruitments(params: GetRecruitmentsParams = {}) {
  return useInfiniteQuery({
    ...getRecruitmentsInfiniteQueryOption(params),
    select: (data) => {
      const mergedItems = data.pages.flatMap((page) => page.content);

      const items = Array.from(new Map(mergedItems.map((item) => [item.postId, item])).values());

      return {
        items,
        totalElements: data.pages[0]?.pageInfo.totalElements ?? 0,
        hasNextPage: data.pages[data.pages.length - 1]?.pageInfo.hasNext ?? false,
      };
    },
  });
}

export function getRecruitmentsInfiniteQueryOption(params: GetRecruitmentsParams = {}) {
  const { jobType, title, size } = params;

  return {
    queryKey: recruitmentKeys.list(params),
    initialPageParam: 0,
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const response = await getRecruitments({
        jobType,
        title,
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
    staleTime: 5 * 60 * 1000,
    enabled: !!postId,
  };
}

// 공고 게시 요청
export function useRequestRecruitment() {
  return useMutation({
    mutationFn: async (payload: RequestRecruitmentRequest) => {
      const response = await requestRecruitment(payload);

      if (!response.success) {
        throw response;
      }

      return response.data;
    },
    onError: (error) => {
      console.error('공고 게시 요청 실패:', error);
    },
  });
}

// 플랫폼 목록 조회
export function useGetRecruitmentPlatforms(options?: { enabled?: boolean }) {
  return useQuery(getRecruitmentPlatformsQueryOption(options));
}

export function getRecruitmentPlatformsQueryOption(options?: { enabled?: boolean }) {
  return {
    queryKey: recruitmentKeys.platform(),
    queryFn: async () => {
      const response = await getRecruitmentPlatforms();

      if (!response.success) {
        throw response;
      }

      return response.data;
    },
    enabled: options?.enabled ?? true,
    staleTime: Infinity,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  };
}
