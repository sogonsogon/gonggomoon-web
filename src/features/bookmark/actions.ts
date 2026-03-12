'use server';

import {
  AddBookmarkRequest,
  DeleteBookmarkRequest,
  GetBookmarksResponse,
} from '@/features/bookmark/types';
import { privateFetch } from '@/shared/api/httpClient';
import { ApiResponse } from '@/shared/types/api';

export async function addBookmark({ postId }: AddBookmarkRequest): Promise<ApiResponse<null>> {
  const response = await privateFetch<null>(`/api/v1/bookmarks/${postId}`, {
    method: 'POST',
  });
  return response;
}

export async function getBookmarks(): Promise<ApiResponse<GetBookmarksResponse>> {
  const response = await privateFetch<GetBookmarksResponse>('/api/v1/bookmarks');
  return response;
}

export async function deleteBookmark({
  postId,
}: DeleteBookmarkRequest): Promise<ApiResponse<null>> {
  const response = await privateFetch<null>('/api/v1/bookmarks', {
    method: 'DELETE',
    body: JSON.stringify({ postId }),
  });
  return response;
}
