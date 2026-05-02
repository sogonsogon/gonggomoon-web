'use client';

import BookmarkSkeleton from '@/features/bookmark/components/ui/BookmarkSkeleton';
import MyBookmarkEmpty from '@/features/bookmark/components/ui/MyBookmarkEmpty';
import MyBookmarkList from '@/features/bookmark/components/ui/MyBookmarkList';
import { useGetBookmarks } from '@/features/bookmark/queries';

export default function BookmarkSection() {
  const { data, isLoading, isError, error } = useGetBookmarks();

  const bookmarks = data?.content || [];

  return (
    <>
      {/* 북마크 개수 */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600">
          총 {bookmarks.length ?? 0}개의 북마크
        </span>
      </div>

      {/* 빈 리스트 or 북마크 리스트 */}
      {isLoading ? (
        <>
          {Array.from({ length: 5 }, (_, idx) => (
            <BookmarkSkeleton key={idx} />
          ))}
        </>
      ) : bookmarks.length === 0 ? (
        <MyBookmarkEmpty />
      ) : (
        <MyBookmarkList />
      )}
    </>
  );
}
