import { addBookmark, deleteBookmark, getBookmarks } from '@/features/bookmark/actions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Bookmark, GetBookmarksResponse } from '@/features/bookmark/types';
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
    queryFn: async (): Promise<GetBookmarksResponse> => {
      const result = await getBookmarks();

      if (!result.success) {
        throw new Error(result.message ?? '북마크 목록 조회 실패');
      }

      return result.data ?? createEmptyBookmarkResponse();
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  };
}

function createEmptyBookmarkResponse(): GetBookmarksResponse {
  return {
    content: [],
    pageInfo: {} as GetBookmarksResponse['pageInfo'],
  };
}

type BookmarkStatusMap = Record<number, boolean>;

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

      return reconcileBookmarkStatusMap(previousStatusMap, bookmarks.content);
    },
    staleTime: 5 * 60 ** 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

function reconcileBookmarkStatusMap(
  previousStatusMap: BookmarkStatusMap = {},
  bookmarks: Bookmark[],
): BookmarkStatusMap {
  const fetchedIds = new Set(bookmarks.map((bookmark) => bookmark.postId));
  const nextStatusMap: BookmarkStatusMap = { ...previousStatusMap };

  Object.keys(nextStatusMap).forEach((key) => {
    const postId = Number(key);
    nextStatusMap[postId] = fetchedIds.has(postId);
  });

  fetchedIds.forEach((postId) => {
    nextStatusMap[postId] = true;
  });

  return nextStatusMap;
}

type ToggleBookmarkVariables = {
  postId: number;
  nextBookmarked: boolean;
  bookmarkId?: number;
};

type BookmarkMutationContext = {
  previousBookmarks?: GetBookmarksResponse;
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
    mutationFn: async ({ postId, nextBookmarked, bookmarkId }: ToggleBookmarkVariables) => {
      if (nextBookmarked) {
        const result = await addBookmark({ postId });

        if (!result.success) {
          throw new Error(result.message ?? '북마크 추가 실패');
        }

        return result.data;
      }

      if (bookmarkId == null) {
        throw new Error('bookmarkId가 없어 북마크를 해제할 수 없어요.');
      }

      const result = await deleteBookmark({ bookmarkId });

      if (!result.success) {
        throw new Error(result.message ?? '북마크 해제 실패');
      }

      return result.data;
    },

    onMutate: async ({ postId, nextBookmarked }): Promise<BookmarkMutationContext> => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: bookmarkKeys.list() }),
        queryClient.cancelQueries({ queryKey: bookmarkKeys.status() }),
      ]);

      const previousBookmarks = queryClient.getQueryData<GetBookmarksResponse>(bookmarkKeys.list());
      const hadPreviousBookmarks = previousBookmarks !== undefined;
      const previousStatusMap = queryClient.getQueryData<BookmarkStatusMap>(bookmarkKeys.status());

      // 북마크 상태 cache는 항상 optimistic 반영
      queryClient.setQueryData<BookmarkStatusMap>(bookmarkKeys.status(), (old = {}) =>
        updateBookmarkStatusMap(old, postId, nextBookmarked),
      );

      // 북마크 목록 cache는 기존 cache가 있을 때만 optimistic 반영
      if (hadPreviousBookmarks) {
        queryClient.setQueryData<GetBookmarksResponse>(bookmarkKeys.list(), (old) =>
          updateBookmarkListCache(old, postId, nextBookmarked),
        );
      }

      return { previousBookmarks, hadPreviousBookmarks, previousStatusMap };
    },

    onError: (error, variables, context) => {
      queryClient.setQueryData<BookmarkStatusMap>(
        bookmarkKeys.status(),
        context?.previousStatusMap ?? {},
      );

      if (context?.hadPreviousBookmarks && context.previousBookmarks) {
        queryClient.setQueryData<GetBookmarksResponse>(
          bookmarkKeys.list(),
          context.previousBookmarks,
        );
      }

      toast.error(
        error instanceof Error
          ? error.message
          : variables.nextBookmarked
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
  old: GetBookmarksResponse | undefined,
  postId: number,
  nextBookmarked: boolean,
): GetBookmarksResponse {
  const current = old ?? createEmptyBookmarkResponse();
  const exists = current.content.some((item) => item.postId === postId);

  if (nextBookmarked) {
    if (exists) return current;

    return {
      ...current,
      content: [
        {
          bookmarkId: 0,
          postId,
          postTitle: '',
          companyName: '',
          postStatus: 'PUBLISHED',
          startDate: null,
          dueDate: null,
          createdAt: new Date().toISOString(),
        },
        ...current.content,
      ],
    };
  }

  return {
    ...current,
    content: current.content.filter((item) => item.postId !== postId),
  };
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
