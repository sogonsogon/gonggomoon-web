import type { PageInfo } from '@/shared/types/pageInfo';

export type Bookmark = {
  bookmarkId: number;
  postId: number;
  postTitle: string;
  companyName: string;
  postStatus: 'PUBLISHED' | string;
  startDate: string | null;
  dueDate: string | null;
  createdAt: string;
};

export type AddBookmarkRequest = {
  postId: number;
};

export type DeleteBookmarkRequest = {
  bookmarkId: number;
};

export type GetBookmarksResponse = {
  content: Bookmark[];
  pageInfo: PageInfo;
};
