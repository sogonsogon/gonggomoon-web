import { addBookmark, deleteBookmark, getBookmarks } from '@/features/bookmark/actions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Bookmark } from '@/features/bookmark/types';
import { toast } from 'sonner';

export const bookmarkKeys = {
  all: ['bookmark'] as const,
  list: () => [...bookmarkKeys.all, 'list'] as const,
  status: () => [...bookmarkKeys.all, 'status'] as const,
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

type BookmarkStatusMap = Record<number, boolean>;

function reconcileBookmarkStatusMap(
  previousStatusMap: BookmarkStatusMap = {},
  bookmarks: Bookmark[],
): BookmarkStatusMap {
  const fetchedIds = new Set(bookmarks.map((bookmark) => bookmark.postId));
  const nextStatusMap: BookmarkStatusMap = { ...previousStatusMap };

  // 기존에 알고 있던 postId는 이번 bookmark list 기준으로 true/false 재계산
  Object.keys(nextStatusMap).forEach((key) => {
    const postId = Number(key);
    nextStatusMap[postId] = fetchedIds.has(postId);
  });

  // 이번에 받아온 bookmark는 무조건 true
  fetchedIds.forEach((postId) => {
    nextStatusMap[postId] = true;
  });

  return nextStatusMap;
}

// 북마크 상태 조회
export function useBookmarkStatus(enabled = true) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: bookmarkKeys.status(),
    enabled,
    queryFn: async (): Promise<BookmarkStatusMap> => {
      const bookmarks = await queryClient.ensureQueryData(bookmarkQueryOptions());
      const previousStatusMap =
        queryClient.getQueryData<BookmarkStatusMap>(bookmarkKeys.status()) ?? {};

      return reconcileBookmarkStatusMap(previousStatusMap, bookmarks);
    },
    staleTime: Infinity,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

type ToggleBookmarkVariables = {
  postId: number;
  nextBookmarked: boolean;
};

type BookmarkMutationContext = {
  previousBookmarks?: Bookmark[];
  hadPreviousBookmarks: boolean;
  previousStatusMap?: BookmarkStatusMap;
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

    onMutate: async ({ postId, nextBookmarked }): Promise<BookmarkMutationContext> => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: bookmarkKeys.list() }),
        queryClient.cancelQueries({ queryKey: bookmarkKeys.status() }),
      ]);

      const previousBookmarks = queryClient.getQueryData<Bookmark[]>(bookmarkKeys.list());
      const hadPreviousBookmarks = previousBookmarks !== undefined;
      const previousStatusMap = queryClient.getQueryData<BookmarkStatusMap>(bookmarkKeys.status());

      // 북마크 상태 cache는 항상 optimistic 반영
      queryClient.setQueryData<BookmarkStatusMap>(bookmarkKeys.status(), (old = {}) =>
        updateBookmarkStatusMap(old, postId, nextBookmarked),
      );

      // 북마크 목록 cache는 기존 cache가 있을 때만 optimistic 반영
      if (hadPreviousBookmarks) {
        queryClient.setQueryData<Bookmark[]>(bookmarkKeys.list(), (old = []) =>
          updateBookmarkListCache(old, postId, nextBookmarked),
        );
      }

      return { previousBookmarks, hadPreviousBookmarks, previousStatusMap };
    },

    onError: (_error, variables, context) => {
      queryClient.setQueryData<BookmarkStatusMap>(
        bookmarkKeys.status(),
        context?.previousStatusMap ?? {},
      );

      if (context?.hadPreviousBookmarks) {
        queryClient.setQueryData(bookmarkKeys.list(), context.previousBookmarks);
      }

      toast.error(
        variables.nextBookmarked
          ? '북마크 추가에 실패했어요. 다시 시도해 주세요.'
          : '북마크 해제에 실패했어요. 다시 시도해 주세요.',
      );
    },

    onSettled: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: bookmarkKeys.list() }),
        queryClient.invalidateQueries({ queryKey: bookmarkKeys.status() }),
      ]);
    },
  });
}

function updateBookmarkListCache(
  old: Bookmark[] = [],
  postId: number,
  nextBookmarked: boolean,
): Bookmark[] {
  const exists = old.some((item) => item.postId === postId);

  if (nextBookmarked) {
    if (exists) return old;

    // Bookmark 타입에 postId 외 필수 필드가 있다면 기본값을 채워주세요.
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

    onMutate: async (postId): Promise<BookmarkMutationContext> => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: bookmarkKeys.list() }),
        queryClient.cancelQueries({ queryKey: bookmarkKeys.status() }),
      ]);

      const previousBookmarks = queryClient.getQueryData<Bookmark[]>(bookmarkKeys.list());
      const hadPreviousBookmarks = previousBookmarks !== undefined;
      const previousStatusMap = queryClient.getQueryData<BookmarkStatusMap>(bookmarkKeys.status());

      queryClient.setQueryData<BookmarkStatusMap>(bookmarkKeys.status(), (old = {}) =>
        updateBookmarkStatusMap(old, postId, true),
      );

      if (hadPreviousBookmarks) {
        queryClient.setQueryData<Bookmark[]>(bookmarkKeys.list(), (old = []) =>
          updateBookmarkListCache(old, postId, true),
        );
      }

      return { previousBookmarks, hadPreviousBookmarks, previousStatusMap };
    },

    onError: (_error, _variables, context) => {
      queryClient.setQueryData<BookmarkStatusMap>(
        bookmarkKeys.status(),
        context?.previousStatusMap ?? {},
      );

      if (context?.hadPreviousBookmarks) {
        queryClient.setQueryData(bookmarkKeys.list(), context.previousBookmarks);
      }

      toast.error('북마크 추가에 실패했어요. 다시 시도해 주세요.');
    },

    onSettled: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: bookmarkKeys.list() }),
        queryClient.invalidateQueries({ queryKey: bookmarkKeys.status() }),
      ]);
    },
  });
}

function updateBookmarkStatusMap(
  old: BookmarkStatusMap = {},
  postId: number,
  nextBookmarked: boolean,
): BookmarkStatusMap {
  return {
    ...old,
    [postId]: nextBookmarked,
  };
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

    onMutate: async (postId): Promise<BookmarkMutationContext> => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: bookmarkKeys.list() }),
        queryClient.cancelQueries({ queryKey: bookmarkKeys.status() }),
      ]);

      const previousBookmarks = queryClient.getQueryData<Bookmark[]>(bookmarkKeys.list());
      const hadPreviousBookmarks = previousBookmarks !== undefined;
      const previousStatusMap = queryClient.getQueryData<BookmarkStatusMap>(bookmarkKeys.status());

      queryClient.setQueryData<BookmarkStatusMap>(bookmarkKeys.status(), (old = {}) =>
        updateBookmarkStatusMap(old, postId, false),
      );

      if (hadPreviousBookmarks) {
        queryClient.setQueryData<Bookmark[]>(bookmarkKeys.list(), (old = []) =>
          updateBookmarkListCache(old, postId, false),
        );
      }

      return { previousBookmarks, hadPreviousBookmarks, previousStatusMap };
    },

    onError: (_error, _variables, context) => {
      queryClient.setQueryData<BookmarkStatusMap>(
        bookmarkKeys.status(),
        context?.previousStatusMap ?? {},
      );

      if (context?.hadPreviousBookmarks) {
        queryClient.setQueryData(bookmarkKeys.list(), context.previousBookmarks);
      }

      toast.error('북마크 삭제에 실패했어요. 다시 시도해 주세요.');
    },

    onSettled: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: bookmarkKeys.list() }),
        queryClient.invalidateQueries({ queryKey: bookmarkKeys.status() }),
      ]);
    },
  });
}
