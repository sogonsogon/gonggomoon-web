'use client';
import MyBookmarkListItem from '@/features/bookmark/components/ui/MyBookmarkListItem';
import { useGetBookmarks } from '@/features/bookmark/queries';

export default function BookmarkList() {
  const { data: bookmarks } = useGetBookmarks();

  return (
    <div className="flex flex-col gap-3">
      {bookmarks?.content.map((bookmark) => (
        <MyBookmarkListItem key={bookmark.postId} bookmark={bookmark} />
      ))}
    </div>
  );
}
