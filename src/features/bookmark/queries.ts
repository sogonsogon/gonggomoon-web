import { addBookmark, deleteBookmark, getBookmarks } from '@/features/bookmark/actions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const bookmarkQueryOptions = {
  queryKey: ['bookmarks'],
  queryFn: async () => {
    const result = await getBookmarks();

    if (!result.success) {
      return Promise.reject(result);
    }

    return result.data;
  },
  // 1분
  staleTime: 60 * 1000,
};

// 북마크 목록 조회
export function useBookmarks() {
  return useQuery(bookmarkQueryOptions);
}

// 북마크 추가(생성)
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
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
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
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['bookmarks'] });
    },
    onError: (error) => {
      console.error('북마크 삭제 실패:', error);
    },
  });
}
