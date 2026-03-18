'use client';

import Link from 'next/link';
import { Briefcase, Building2, ExternalLink, Lightbulb, Timer } from 'lucide-react';
import type { RecruitmentDetail } from '@/features/recruitment/types';
import { JOB_LABEL_MAP } from '@/features/recruitment/constants/jobOptions';
import { formatDDay } from '@/shared/utils/formatDDay';
import BookmarkButton from '@/features/bookmark/components/ui/BookmarkButton';
import { DDAY_VARIANT_CLASS } from '@/features/recruitment/constants/dDayVariant';
import { useUser } from '@/features/user/queries';
import { useGetBookmarks } from '@/features/bookmark/queries';

interface RecruitmentDetailOverviewProps {
  recruitment: RecruitmentDetail;
}

export default function RecruitmentDetailOverview({ recruitment }: RecruitmentDetailOverviewProps) {
  const { data: user } = useUser();
  const { data: bookmarks } = useGetBookmarks(!!user);

  const isBookmarked = (bookmarks?.content ?? []).some(
    (item) => item.postId === recruitment.postId,
  );

  const dDayInfo = formatDDay(recruitment.dueDate);
  const dDayStyle = DDAY_VARIANT_CLASS[dDayInfo.variant];

  const experienceLabel =
    recruitment.experienceLevel === undefined
      ? '경력 정보 없음'
      : recruitment.experienceLevel === 0
        ? '신입'
        : `경력 ${recruitment.experienceLevel}년 이상`;

  return (
    <section className="flex flex-col gap-4 pb-6 lg:gap-3 lg:pb-5 xl:gap-4 xl:pb-6">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 rounded-md bg-blue-50 px-2.5 py-1">
          <Building2 className="h-3.5 w-3.5 text-blue-600" />
          <Link
            href={`/company/${recruitment.companyId}`}
            className="text-[13px] font-semibold text-blue-600 max-md:inline-block max-md:max-w-45 max-md:truncate"
          >
            {recruitment.companyName ?? '기업명'}
          </Link>
        </div>

        <span className="text-[13px] text-gray-400">·</span>

        <span className="text-[13px] text-gray-600">{recruitment.industryName}</span>
      </div>

      {recruitment.postUrl && (
        <Link
          href={recruitment.postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-fit items-center gap-1.5"
        >
          <ExternalLink className="h-3.5 w-3.5 text-blue-500" />
          <span className="text-[13px] font-medium text-blue-500">공고 바로가기</span>
        </Link>
      )}

      <div className="relative flex items-start justify-between gap-4 max-md:gap-3 lg:gap-3 xl:gap-4">
        <div className="min-w-0 flex-1 max-lg:pr-11">
          <h1 className="text-[28px] font-bold leading-tight text-gray-900 max-md:text-2xl lg:text-[26px] xl:text-[28px]">
            {recruitment.postTitle}
          </h1>
        </div>

        <div className="absolute right-0 top-0 lg:hidden">
          <BookmarkButton postId={recruitment.postId} isBookmarked={isBookmarked} variant="icon" />
        </div>
        <div className="max-lg:hidden">
          <BookmarkButton postId={recruitment.postId} isBookmarked={isBookmarked} />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 max-md:gap-2 lg:gap-3 xl:gap-4">
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
