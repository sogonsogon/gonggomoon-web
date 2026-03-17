'use client';

import { useRouter } from 'next/navigation';
import { Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { JOB_LABEL_MAP } from '@/features/recruitment/constants/jobOptions';
import { INDUSTRY_LABEL_MAP } from '@/features/industry/constants/industryOptions';
import { useGetStrategyAvailability } from '@/features/strategy/queries';
import { TODAY_USAGE, DAILY_LIMIT } from '@/features/strategy/constants/limit';
import { useStartStrategyGeneration } from '@/features/strategy/hooks/useStartStrategyGeneration';
import { useStrategyGenerationStore } from '@/features/strategy/stores/useStrategyGenerationStore';
import { useStrategyCreateFormStore } from '@/features/strategy/stores/useCreateStrategyFormStore';

export default function MobileStrategyGenerateBar() {
  const router = useRouter();
  const { startStrategyGeneration } = useStartStrategyGeneration();

  const formData = useStrategyCreateFormStore((state) => state.formData);
  const submitLoading = useStrategyGenerationStore((state) => state.submitLoading);
  const { data: availability } = useGetStrategyAvailability();

  const todayUsage = availability?.usedCount ?? TODAY_USAGE;
  const dailyLimit = availability?.limitCount ?? DAILY_LIMIT;
  const isLimitReached = !availability?.canGenerate;

  const handleGenerateClick = async () => {
    if (formData.selectedExperienceIds.length === 0 || isLimitReached || submitLoading) return;

    try {
      const response = await startStrategyGeneration();
      router.push(`/strategy/result/${response.strategyId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur lg:hidden">
      <div className="mx-auto w-full max-w-7xl px-4 pt-2.5 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="truncate text-[12px] font-medium text-gray-600">
            {JOB_LABEL_MAP[formData.selectedJob]}
            {formData.isIndustryOn ? ` · ${INDUSTRY_LABEL_MAP[formData.selectedIndustry]}` : ''}
          </p>
          <p className="shrink-0 text-[11px] text-gray-400">
            {todayUsage}/{dailyLimit}회
          </p>
        </div>

        <Button
          type="button"
          onClick={handleGenerateClick}
          disabled={formData.selectedExperienceIds.length === 0 || isLimitReached || submitLoading}
          className="inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-blue-600 px-4 text-[14px] font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {submitLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              전략 생성 요청 중...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              포트폴리오 전략 생성
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
