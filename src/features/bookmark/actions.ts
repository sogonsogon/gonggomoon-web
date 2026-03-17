'use server';

import {
  AddBookmarkRequest,
  DeleteBookmarkRequest,
  GetBookmarksResponse,
} from '@/features/bookmark/types';
import { privateFetch } from '@/shared/api/httpClient';
import { ApiResponse } from '@/shared/types/api';

export async function addBookmark({ postId }: AddBookmarkRequest): Promise<ApiResponse<null>> {
  const response = await privateFetch<null>(`/api/v1/bookmarks`, {
    method: 'POST',
    body: JSON.stringify({ postId }),
  });
  return response;
}

export async function getBookmarks(): Promise<ApiResponse<GetBookmarksResponse>> {
  const response = await privateFetch<GetBookmarksResponse>('/api/v1/bookmarks');
  return response;
}

export async function deleteBookmark({
  bookmarkId,
}: DeleteBookmarkRequest): Promise<ApiResponse<null>> {
  const response = await privateFetch<null>(`/api/v1/bookmarks/${bookmarkId}`, {
    method: 'DELETE',
  });
  return response;
}
