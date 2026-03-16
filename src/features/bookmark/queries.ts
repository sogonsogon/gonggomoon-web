import { addBookmark, deleteBookmark, getBookmarks } from '@/features/bookmark/actions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Bookmark } from '@/features/bookmark/types';

export const bookmarkKeys = {
  all: ['bookmark'] as const,
  list: () => [...bookmarkKeys.all, 'list'] as const,
};

// 북마크 목록 조회
export function useGetBookmarks(enabled = true) {
  return useQuery({
    ...bookmarkQueryOptions(),
    enabled,
  });
}

export function bookmarkQueryOptions() {
  return {
    queryKey: bookmarkKeys.list(),
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

type ToggleBookmarkVariables = {
  postId: number;
  nextBookmarked: boolean;
};

// 북마크 토글
export function useToggleBookmark(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['bookmark', 'toggle', postId],
    scope: {
      id: `bookmark-${postId}`,
    },
    mutationFn: async ({ postId, nextBookmarked }: ToggleBookmarkVariables) => {
      const result = nextBookmarked
        ? await addBookmark({ postId })
        : await deleteBookmark({ postId });

      if (!result.success) {
        return Promise.reject(result);
      }

      return result.data;
    },

    onMutate: async ({ postId, nextBookmarked }) => {
      await queryClient.cancelQueries({ queryKey: bookmarkKeys.list() });

      const previousBookmarks = queryClient.getQueryData<Bookmark[]>(bookmarkKeys.list());

      queryClient.setQueryData<Bookmark[]>(bookmarkKeys.list(), (old = []) =>
        updateBookmarkCache(old, postId, nextBookmarked),
      );

      return { previousBookmarks };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousBookmarks) {
        queryClient.setQueryData(bookmarkKeys.list(), context.previousBookmarks);
      }
      console.error('북마크 토글 실패');
    },

    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: bookmarkKeys.list() });
    },
  });
}

function updateBookmarkCache(
  old: Bookmark[] = [],
  postId: number,
  nextBookmarked: boolean,
): Bookmark[] {
  const exists = old.some((item) => item.postId === postId);

  if (nextBookmarked) {
    if (exists) return old;

    // Bookmark 타입에 postId 외 필수 필드가 있다면 여기에 기본값을 채워주세요.
    return [{ postId } as Bookmark, ...old];
  }

  return old.filter((item) => item.postId !== postId);
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

    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: bookmarkKeys.list() });

      const previousBookmarks = queryClient.getQueryData<Bookmark[]>(bookmarkKeys.list());

      queryClient.setQueryData<Bookmark[]>(bookmarkKeys.list(), (old = []) =>
        updateBookmarkCache(old, postId, true),
      );

      return { previousBookmarks };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousBookmarks) {
        queryClient.setQueryData(bookmarkKeys.list(), context.previousBookmarks);
      }
      console.error('북마크 추가 실패');
    },

    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: bookmarkKeys.list() });
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
      await queryClient.cancelQueries({ queryKey: bookmarkKeys.list() });

      const previousBookmarks = queryClient.getQueryData<Bookmark[]>(bookmarkKeys.list());

      queryClient.setQueryData<Bookmark[]>(bookmarkKeys.list(), (old = []) =>
        updateBookmarkCache(old, postId, false),
      );

      return { previousBookmarks };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousBookmarks) {
        queryClient.setQueryData(bookmarkKeys.list(), context.previousBookmarks);
      }
      console.error('북마크 삭제 실패');
    },

    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: bookmarkKeys.list() });
    },
  });
}
