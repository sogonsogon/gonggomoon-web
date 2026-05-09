import { SparklesIcon } from 'lucide-react';
import ExperienceExtractButton from '@/features/experience/components/ui/ExperienceExtractButton';
import GenerationUsageCard from '@/shared/components/ui/GenerationUsageCard';

interface ExperienceExtractBannerProps {
  usageLabel: string;
  usedCount: number;
  limitCount: number;
  isUsageLoading?: boolean;
  isLimitReached?: boolean;
}

export default function ExperienceExtractBanner({
  usageLabel,
  usedCount,
  limitCount,
  isUsageLoading = false,
  isLimitReached = false,
}: ExperienceExtractBannerProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-blue-100 bg-blue-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="flex flex-1 items-center gap-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-blue-100">
          <SparklesIcon className="h-5 w-5 text-blue-600" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[15px] font-bold text-blue-900">AI 경험 추출</span>
          <span className="text-[13px] text-blue-800">
            업로드한 포트폴리오, 이력서에서 경험을 자동으로 추출할 수 있어요
          </span>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
        <GenerationUsageCard
          variant="compact"
          label="이번 주 사용 횟수"
          usedCount={usedCount}
          limitCount={limitCount}
          isLoading={isUsageLoading}
          className="max-sm:w-full"
        />

        <ExperienceExtractButton disabled={isLimitReached || isUsageLoading} />
      </div>
    </div>
  );
}
