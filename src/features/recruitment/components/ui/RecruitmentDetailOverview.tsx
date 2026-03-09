import Link from 'next/link';
import { Briefcase, Building2, ExternalLink, Lightbulb, Timer } from 'lucide-react';
import type { Recruitment } from '@/features/recruitment/types';
import { JOB_LABEL_MAP } from '@/features/recruitment/constants/jobOptions';
import { INDUSTRY_LABEL_MAP } from '@/features/industry/constants/industryOptions';
import { formatDDay } from '@/shared/utils/formatDDay';
import BookmarkButton from '@/features/recruitment/components/ui/BookmarkButton';
import { DDAY_VARIANT_CLASS } from '@/features/recruitment/constants/dDayVariant';

interface RecruitmentDetailOverviewProps {
  recruitment: Recruitment;
  companyName?: string;
  initialBookmarked?: boolean;
}

export default function RecruitmentDetailOverview({
  recruitment,
  companyName,
  initialBookmarked = false,
}: RecruitmentDetailOverviewProps) {
  const dDayInfo = formatDDay(recruitment.deadline);
  const dDayStyle = DDAY_VARIANT_CLASS[dDayInfo.variant];

  const experienceLabel =
    recruitment.experienceLevel === undefined
      ? '경력 정보 없음'
      : recruitment.experienceLevel === 0
        ? '신입'
        : `경력 ${recruitment.experienceLevel}년 이상`;

  return (
    <section className="flex flex-col gap-4 pb-6">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 rounded-md bg-blue-50 px-2.5 py-1">
          <Building2 className="h-3.5 w-3.5 text-blue-600" />
          <Link
            href={`/company/${recruitment.companyId}`}
            className="text-[13px] font-semibold text-blue-600"
          >
            {companyName ?? '기업명'}
          </Link>
        </div>

        <span className="text-[13px] text-gray-400">·</span>

        <span className="text-[13px] text-gray-600">
          {recruitment.industryType ? INDUSTRY_LABEL_MAP[recruitment.industryType] : ''}
        </span>
      </div>

      {recruitment.url && (
        <a
          href={recruitment.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-fit items-center gap-1.5"
        >
          <ExternalLink className="h-3.5 w-3.5 text-blue-500" />
          <span className="text-[13px] font-medium text-blue-500">공고 원문 보기</span>
        </a>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-[28px] font-bold leading-tight text-gray-900">{recruitment.title}</h1>
        </div>

        <BookmarkButton postId={recruitment.postId} initialBookmarked={initialBookmarked} />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-1 rounded-md bg-blue-50 px-2.5 py-1">
          <Lightbulb className="h-3.5 w-3.5 text-blue-700" />
          <span className="text-[13px] font-medium text-blue-700">
            {recruitment.jobType ? JOB_LABEL_MAP[recruitment.jobType] : '직무 무관'}
          </span>
        </div>

        <div className="flex items-center gap-1 rounded-md bg-gray-100 px-2.5 py-1">
          <Briefcase className="h-3.5 w-3.5 text-gray-700" />
          <span className="text-[13px] font-medium text-gray-700">{experienceLabel}</span>
        </div>

        <div className={`flex items-center gap-1 rounded-md px-2.5 py-1 ${dDayStyle.container}`}>
          <Timer className={`h-3.5 w-3.5 ${dDayStyle.icon}`} />
          <span className={`text-[13px] font-medium ${dDayStyle.label}`}>{dDayInfo.label}</span>
        </div>
      </div>
    </section>
  );
}
