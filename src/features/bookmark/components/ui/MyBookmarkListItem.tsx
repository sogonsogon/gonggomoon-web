import { Bookmark } from '@/features/bookmark/types';
import { formatDDay } from '@/shared/utils/formatDDay';
import { formatDeadline } from '@/shared/utils/formatDeadline';
import { Building2Icon, CalendarIcon } from 'lucide-react';
import Link from 'next/link';
import BookmarkButton from '@/features/bookmark/components/ui/BookmarkButton';
import { DDAY_VARIANT_CLASS } from '@/features/recruitment/constants/dDayVariant';

interface BookmarkListItem {
  bookmark: Bookmark;
}

export default function MyBookmarkListItem({ bookmark }: BookmarkListItem) {
  const dday = formatDDay(bookmark.dueDate);

  return (
    <div className="group relative flex items-center justify-between rounded-xl border border-gray-100 px-6 py-5">
      {/* 공고 상세 페이지 링크 연결 */}
      <Link href={`/recruitment/${bookmark.postId}`} className="absolute inset-0 z-0" />

      {/* 북마크 정보 */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <Building2Icon className="h-3.5 w-3.5 text-blue-600" />
          <span className="text-sm font-semibold text-blue-600">{bookmark.companyName}</span>
        </div>
        <span className="text-base font-semibold text-gray-900">{bookmark.postTitle}</span>
        <div className="flex items-center gap-1.5">
          <CalendarIcon className="h-3 w-3 text-gray-500" />
          <span className="text-xs text-gray-500">{formatDeadline(bookmark.dueDate)}</span>
        </div>
      </div>
      <div className="relative flex items-center gap-2 z-10">
        <span
          className={`rounded-md px-2 py-1 text-xs font-semibold ${DDAY_VARIANT_CLASS[dday.variant]}`}
        >
          {dday.label}
        </span>

        {/* 북마크 토글 버튼 */}
        <BookmarkButton postId={bookmark.postId} isBookmarked={true} variant="icon" />
      </div>
    </div>
  );
}
