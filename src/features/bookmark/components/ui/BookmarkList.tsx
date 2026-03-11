'use client';
import BookmarkListItem from '@/features/bookmark/components/ui/BookmarkListItem';
import { useBookmarks } from '@/features/bookmark/queries';

export default function BookmarkList() {
  const { data: bookmarks } = useBookmarks();

  return (
    <div className="flex flex-col gap-3">
      {bookmarks?.map((bookmark) => (
        <BookmarkListItem key={bookmark.postId} bookmark={bookmark} />
      ))}
    </div>
  );
}
