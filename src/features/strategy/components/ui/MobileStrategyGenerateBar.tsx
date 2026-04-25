'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { JOB_LABEL_MAP } from '@/features/recruitment/constants/jobOptions';
import { useGetStrategyAvailability } from '@/features/strategy/queries';
import { TODAY_USAGE, DAILY_LIMIT } from '@/features/strategy/constants/limit';
import { useStartStrategyGeneration } from '@/features/strategy/hooks/useStartStrategyGeneration';
import { useStrategyGenerationStore } from '@/features/strategy/stores/useStrategyGenerationStore';
import { useStrategyCreateFormStore } from '@/features/strategy/stores/useCreateStrategyFormStore';
import MobileStrategyConditionSheet from '@/features/strategy/components/ui/MobileStrategyConditionSheet';
import { useGetIndustryList } from '@/features/industry/queries';

export default function MobileStrategyGenerateBar() {
  const router = useRouter();
  const { startStrategyGeneration } = useStartStrategyGeneration();

  const formData = useStrategyCreateFormStore((state) => state.formData);
  const submitLoading = useStrategyGenerationStore((state) => state.submitLoading);
  const { data: availability } = useGetStrategyAvailability();
  const { data: industryData } = useGetIndustryList();

  const todayUsage = availability?.usedCount ?? TODAY_USAGE;
  const dailyLimit = availability?.limitCount ?? DAILY_LIMIT;
  const isLimitReached = !availability?.canGenerate;

  const selectedIndustryName = useMemo(() => {
    if (!formData.isIndustryOn || !formData.selectedIndustryId) return '';

    const industries = industryData?.content ?? [];

    const selectedIndustry = industries.find(
      (industry) => String(industry.industryId) === String(formData.selectedIndustryId),
    );

    return selectedIndustry?.industryName ?? '';
  }, [formData.isIndustryOn, formData.selectedIndustryId, industryData]);

  const [isNavigating, setIsNavigating] = useState(false);
  const isFormLocked = submitLoading || isNavigating;

  const handleGenerateClick = async () => {
    if (formData.selectedExperienceIds.length === 0 || isLimitReached || isFormLocked) return;

    try {
      const response = await startStrategyGeneration();
      setIsNavigating(true);
      router.push(`/strategy/result/${response.strategyId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-x-0 z-50 bottom-[calc(env(safe-area-inset-bottom)+1rem)] px-5 max-md:bottom-[calc(env(safe-area-inset-bottom)+5.5rem)] lg:hidden">
      <div className="mx-auto w-full max-w-7xl rounded-2xl border border-gray-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.1)]">
        <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 pb-2.5 pt-3">
          <p className="truncate text-[12px] font-semibold text-gray-700">
            {JOB_LABEL_MAP[formData.selectedJob]}
            {formData.isIndustryOn && selectedIndustryName ? ` · ${selectedIndustryName}` : ''}
          </p>

          <p className="shrink-0 text-[11px] font-medium text-gray-500">
            {todayUsage}/{dailyLimit}회
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 pb-3 pt-2.5">
          <MobileStrategyConditionSheet
            className="shrink-0"
            triggerClassName="h-11 w-auto rounded-[10px] border-gray-200 bg-gray-50 px-3 text-[13px] font-medium text-gray-600 shadow-none hover:bg-gray-100"
          />

          <Button
            type="button"
            onClick={handleGenerateClick}
            disabled={formData.selectedExperienceIds.length === 0 || isLimitReached || isFormLocked}
            className="inline-flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-blue-600 px-4 text-[14px] font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {isNavigating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                결과 페이지로 이동 중...
              </>
            ) : submitLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                생성 요청 중...
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
    </div>
  );
}
