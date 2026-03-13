import Link from 'next/link';
import { Briefcase, Lightbulb, Timer } from 'lucide-react';
import type { Recruitment } from '@/features/recruitment/types';
import { JOB_LABEL_MAP } from '@/features/recruitment/constants/jobOptions';
import { DDAY_VARIANT_CLASS } from '@/features/recruitment/constants/dDayVariant';
import { formatDDay } from '@/shared/utils/formatDDay';

interface CompanyRecruitmentListItemProps {
  recruitment: Recruitment;
}

export default function CompanyRecruitmentListItem({
  recruitment,
}: CompanyRecruitmentListItemProps) {
  const dDay = formatDDay(recruitment.dueDate);
  const dDayStyle = DDAY_VARIANT_CLASS[dDay.variant];

  return (
    <Link
      href={`/recruitment/${recruitment.postId}`}
      className="block rounded-[10px] border border-gray-100 bg-gray-50 px-4 py-4 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-[14px] font-semibold text-gray-900">{recruitment.postTitle}</span>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5">
              <Lightbulb className="h-3 w-3 text-blue-600" />
              <span className="text-[11px] font-medium text-blue-600">
                {recruitment.jobType ? JOB_LABEL_MAP[recruitment.jobType] : '직무 미정'}
              </span>
            </div>
            <div className="flex items-center gap-1 rounded-md bg-gray-50 px-2 py-0.5">
              <Briefcase className="h-3 w-3 text-gray-600" />
              <span className="text-[11px] font-medium text-gray-600">{'경력'}</span>
            </div>

            {recruitment.dueDate ? (
              <div className="flex items-center gap-1">
                <Timer className={`h-3 w-3 ${dDayStyle.icon}`} />
                <span className={`text-[11px] font-medium ${dDayStyle.label}`}>{dDay.label}</span>
              </div>
            ) : (
              <span className="text-[11px] text-gray-400">상시 모집</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
