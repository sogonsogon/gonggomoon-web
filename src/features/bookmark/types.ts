export type Bookmark = {
  postId: number;
  postTitle: string;
  companyName: string;
  deadline: string | null;
};

// ----------------------- 요청 타입 -----------------------
export type AddBookmarkRequest = {
  postId: number;
};

export type DeleteBookmarkRequest = {
  postId: number;
};

// ----------------------- 응답 타입 -----------------------
export type GetBookmarksResponse = Bookmark[];
