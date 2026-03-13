import { addBookmark, deleteBookmark, getBookmarks } from '@/features/bookmark/actions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Bookmark } from '@/features/bookmark/types';

export const bookmarkKeys = {
  all: ['bookmark'] as const,
};

export function bookmarkQueryOptions() {
  return {
    queryKey: bookmarkKeys.all,
    queryFn: async (): Promise<Bookmark[]> => {
      const result = await getBookmarks();

      if (!result.success) {
        return Promise.reject(result);
      }

      return result.data;
    },
    staleTime: Infinity,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  };
}

// 북마크 목록 조회
export function useGetBookmarks(enabled = true) {
  return useQuery({
    ...bookmarkQueryOptions(),
    enabled,
  });
}

// 북마크 추가
export function useAddBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: number) => {
      const result = await addBookmark({ postId });

      if (!result.success) {
        return Promise.reject(result);
      }

      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookmarkKeys.all });
    },
    onError: (error) => {
      console.error('북마크 추가 실패:', error);
    },
  });
}

// 북마크 삭제
export function useDeleteBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: number) => {
      const result = await deleteBookmark({ postId });

      if (!result.success) {
        return Promise.reject(result);
      }

      return result.data;
    },

    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: bookmarkKeys.all });

      const previousBookmarks = queryClient.getQueryData<Bookmark[]>(bookmarkKeys.all);

      queryClient.setQueryData<Bookmark[]>(bookmarkKeys.all, (old = []) =>
        old.filter((item) => item.postId !== postId),
      );

      return { previousBookmarks };
    },

    onError: (error, _variables, context) => {
      if (context?.previousBookmarks) {
        queryClient.setQueryData(bookmarkKeys.all, context.previousBookmarks);
      }
      console.error('북마크 삭제 실패:', error);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: bookmarkKeys.all });
    },
  });
}
