import Link from 'next/link';
import { Sparkles, Calendar, Briefcase } from 'lucide-react';

type RecruitmentListItemProps = {
  postId: number | string;
  title: string;
  deadline: string | null | undefined;
  experienceLevel: number | undefined;
  companyName: string;
  analysisSummary?: string | null;
};

export default function RecruitmentListItem({
  postId,
  title,
  deadline,
  experienceLevel,
  companyName,
  analysisSummary,
}: RecruitmentListItemProps) {
  return (
    <Link
      href={`/recruitment/${postId}`}
      className="flex items-center justify-between rounded-lg border-gray-100 p-5 hover:bg-gray-50"
    >
      <div className="flex flex-col gap-2">
        <span className="text-base font-semibold text-gray-900">{title}</span>

        {analysisSummary && (
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-blue-500" />
            <span className="text-[13px] font-medium text-blue-500">{analysisSummary}</span>
          </div>
        )}

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-gray-400" />
            <span className="text-xs text-gray-500">{formatDeadline(deadline)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="h-3 w-3 text-gray-400" />
            <span className="text-xs text-gray-500">
              {experienceLevel === 0 ? '신입' : `경력 ${experienceLevel}년차`}
            </span>
          </div>
        </div>
      </div>

      <span className="shrink-0 rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
        {companyName}
      </span>
    </Link>
  );
}

function formatDeadline(deadline: string | null | undefined): string {
  if (!deadline) return '상시';

  const d = new Date(deadline);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return `~${y}. ${m}. ${day}`;
}
