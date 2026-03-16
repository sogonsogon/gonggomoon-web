import Link from 'next/link';
import { Sparkles, Calendar, Briefcase } from 'lucide-react';
import { formatDeadline } from '@/shared/utils/formatDeadline';
import BookmarkButton from '@/features/bookmark/components/ui/BookmarkButton';

interface RecruitmentListItemProps {
  postId: number;
  title: string;
  dueDate: string | null | undefined;
  experienceLevel: number | undefined;
  companyName: string;
  analysisSummary?: string | null;
  isBookmarked?: boolean;
}

export default function RecruitmentListItem({
  postId,
  title,
  dueDate,
  experienceLevel,
  companyName,
  analysisSummary,
  isBookmarked = false,
}: RecruitmentListItemProps) {
  return (
    <div className="relative flex items-center justify-between rounded-lg border-gray-100 p-5 hover:bg-gray-50 max-md:flex-col max-md:items-stretch max-md:gap-3 max-md:px-3 max-md:py-4 lg:p-4 xl:p-5">
      <div className="absolute right-3 top-4 md:hidden">
        <BookmarkButton postId={postId} isBookmarked={isBookmarked} variant="icon" />
      </div>

      <Link href={`/recruitment/${postId}`} className="min-w-0 flex-1 max-md:w-full">
        <div className="flex min-w-0 flex-col gap-2 lg:gap-1.5 xl:gap-2 max-md:pr-11">
          <span className="truncate text-base font-semibold text-gray-900">{title}</span>

          {analysisSummary && (
            <div className="flex min-w-0 items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-blue-500" />
              <span className="truncate text-[13px] font-medium text-blue-500">
                {analysisSummary}
              </span>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 lg:gap-2.5 xl:gap-3">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-500">{formatDeadline(dueDate)}</span>
            </div>

            <div className="flex items-center gap-1">
              <Briefcase className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-500">
                {experienceLevel === 0 ? '신입' : `경력 ${experienceLevel}년 이상`}
              </span>
            </div>
          </div>
        </div>
      </Link>

      <div className="ml-4 flex shrink items-center gap-2 lg:ml-3 lg:gap-1.5 xl:ml-4 xl:gap-2 xl:shrink-0 max-md:ml-0 max-md:w-full max-md:min-w-0 max-md:justify-start">
        <span className="inline-block truncate rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 max-md:max-w-[75%] lg:max-w-40 xl:max-w-none">
          {companyName}
        </span>

        <div className="max-md:hidden">
          <BookmarkButton postId={postId} isBookmarked={isBookmarked} variant="icon" />
        </div>
      </div>
    </div>
  );
}
