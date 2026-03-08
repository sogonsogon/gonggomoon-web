import { Bookmark } from '@/features/bookmark/types';
import BookmarkListItem from './BookmarkListItem';

interface BookmarkListProps {
  bookmarks: Bookmark[];
}

export default function BookmarkList({ bookmarks }: BookmarkListProps) {
  return (
    <div className="flex flex-col gap-3">
      {bookmarks.map((bookmark) => (
        <BookmarkListItem key={bookmark.postId} bookmark={bookmark} />
      ))}
    </div>
  );
}
