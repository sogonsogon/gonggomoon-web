import Link from 'next/link';
import { Sparkles, Calendar, Briefcase } from 'lucide-react';
import { formatDeadline } from '@/shared/utils/formatDeadline';
import BookmarkButton from '@/features/recruitment/components/ui/BookmarkButton';

interface RecruitmentListItemProps {
  postId: number | string;
  title: string;
  deadline: string | null | undefined;
  experienceLevel: number | undefined;
  companyName: string;
  analysisSummary?: string | null;
  initialBookmarked?: boolean;
}

export default function RecruitmentListItem({
  postId,
  title,
  deadline,
  experienceLevel,
  companyName,
  analysisSummary,
  initialBookmarked = false,
}: RecruitmentListItemProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border-gray-100 p-5 hover:bg-gray-50">
      <Link href={`/recruitment/${postId}`} className="min-w-0 flex-1">
        <div className="flex min-w-0 flex-col gap-2">
          <span className="truncate text-base font-semibold text-gray-900">{title}</span>

          {analysisSummary && (
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-blue-500" />
              <span className="truncate text-[13px] font-medium text-blue-500">
                {analysisSummary}
              </span>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-500">{formatDeadline(deadline)}</span>
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

      <div className="ml-4 flex shrink-0 items-center gap-2">
        <span className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
          {companyName}
        </span>

        <BookmarkButton postId={postId} initialBookmarked={initialBookmarked} variant="icon" />
      </div>
    </div>
  );
}
