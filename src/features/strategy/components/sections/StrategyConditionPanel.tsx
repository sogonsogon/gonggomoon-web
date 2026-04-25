'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Info, Loader2, Sparkles, Timer } from 'lucide-react';
import { JOB_LABEL_MAP } from '@/features/recruitment/constants/jobOptions';
import { Switch } from '@/shared/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import type { StrategyJobType } from '@/features/strategy/types';
import { useStartStrategyGeneration } from '@/features/strategy/hooks/useStartStrategyGeneration';
import { useStrategyGenerationStore } from '@/features/strategy/stores/useStrategyGenerationStore';
import { useStrategyCreateFormStore } from '@/features/strategy/stores/useCreateStrategyFormStore';
import { Button } from '@/shared/components/ui/button';
import { useGetStrategyAvailability } from '@/features/strategy/queries';
import { TODAY_USAGE, DAILY_LIMIT } from '@/features/strategy/constants/limit';
import { cn } from '@/shared/lib/cn';
import { useGetIndustryList } from '@/features/industry/queries';
import GenerationUsageCard from '@/shared/components/ui/GenerationUsageCard';

interface StrategyConditionPanelProps {
  variant?: 'sidebar' | 'sheet';
}

export default function StrategyConditionPanel({
  variant = 'sidebar',
}: StrategyConditionPanelProps) {
  const router = useRouter();
  const { startStrategyGeneration } = useStartStrategyGeneration();

  const formData = useStrategyCreateFormStore((state) => state.formData);
  const updateFormData = useStrategyCreateFormStore((state) => state.updateFormData);

  const submitLoading = useStrategyGenerationStore((state) => state.submitLoading);
  const requests = useStrategyGenerationStore((state) => state.requests);
  const requestOrder = useStrategyGenerationStore((state) => state.requestOrder);

  const { data: industryData } = useGetIndustryList();

  const industries = industryData?.content ?? [];

  useEffect(() => {
    if (industries.length > 0 && formData.selectedIndustryId === null) {
      updateFormData('selectedIndustryId', industries[0].industryId);
    }
  }, [industries]);

  const { data: availability, isLoading: isAvailabilityLoading } = useGetStrategyAvailability();

  const todayUsage = availability?.usedCount ?? TODAY_USAGE;
  const dailyLimit = availability?.limitCount ?? DAILY_LIMIT;
  const isLimitReached = !availability?.canGenerate;

  const isFormLocked = submitLoading;

  const processingCount = useMemo(() => {
    return requestOrder.filter((id) => requests[id]?.status === 'PROCESSING').length;
  }, [requestOrder, requests]);

  const handleJobChange = (job: StrategyJobType) => {
    if (isFormLocked) return;
    updateFormData('selectedJob', job);
  };

  const handleIndustryToggle = (checked: boolean) => {
    if (isFormLocked) return;
    updateFormData('isIndustryOn', checked);
  };

  const handleIndustryChange = (industryIdStr: string) => {
    if (isFormLocked) return;
    updateFormData('selectedIndustryId', Number(industryIdStr));
  };

  const handleGenerateClick = async () => {
    if (formData.selectedExperienceIds.length === 0 || isLimitReached || isFormLocked) return;

    try {
      const response = await startStrategyGeneration();
      router.push(`/strategy/result/${response.strategyId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        variant === 'sidebar'
          ? 'sticky top-6 w-80 shrink-0 self-start max-lg:static max-lg:w-full max-lg:self-auto max-md:gap-3'
          : 'w-full gap-3',
      )}
    >
      <div className="flex flex-col gap-4 rounded-xl border border-gray-100 p-5 max-md:p-4">
        {variant === 'sidebar' && (
          <>
            <h2 className="text-base font-bold text-gray-900">조건 설정</h2>
            <div className="h-px bg-gray-100" />
          </>
        )}

        <div className="flex flex-col gap-2.5">
          <span className="text-[13px] font-semibold text-gray-700">직무 선택</span>

          <Select
            value={formData.selectedJob}
            onValueChange={(value) => handleJobChange(value as StrategyJobType)}
            disabled={isFormLocked}
          >
            <SelectTrigger className="h-10 w-full cursor-pointer border border-gray-200 text-[13px] font-medium text-gray-900 disabled:cursor-not-allowed disabled:opacity-50">
              <SelectValue placeholder="직무를 선택하세요" />
            </SelectTrigger>

            <SelectContent position="popper">
              {(['FRONTEND', 'BACKEND'] as StrategyJobType[]).map((job) => (
                <SelectItem key={job} value={job} className="cursor-pointer text-[13px]">
                  {JOB_LABEL_MAP[job]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-0.5">
              <span className="text-[13px] font-semibold text-gray-700">타겟 산업 설정</span>
              <span className="text-[11px] text-gray-400">산업 특화 여부</span>
            </div>

            <div className="flex items-center gap-2 pt-0.5">
              <span
                className={`text-[11px] font-bold ${
                  formData.isIndustryOn ? 'text-[#2272eb]' : 'text-gray-400'
                }`}
              >
                {formData.isIndustryOn ? 'ON' : 'OFF'}
              </span>

              <Switch
                checked={formData.isIndustryOn}
                onCheckedChange={handleIndustryToggle}
                disabled={isFormLocked}
                className="cursor-pointer"
                aria-label="산업 특화 토글"
              />
            </div>
          </div>

          <div
            className={`flex flex-col gap-1.5 transition-opacity ${
              formData.isIndustryOn ? 'opacity-100' : 'opacity-50'
            }`}
          >
            {industryData && (
              <Select
                value={formData.selectedIndustryId ? String(formData.selectedIndustryId) : ''}
                onValueChange={handleIndustryChange}
                disabled={!formData.isIndustryOn || isFormLocked}
              >
                <SelectTrigger className="h-10 w-full cursor-pointer border-[1.5px] border-[#4593e6] text-[13px] font-medium text-gray-900 disabled:cursor-not-allowed disabled:opacity-50">
                  <SelectValue placeholder="산업을 선택하세요" />
                </SelectTrigger>

                <SelectContent position="popper">
                  {industries.map((industry) => (
                    <SelectItem
                      key={industry.industryId}
                      value={String(industry.industryId)}
                      className="cursor-pointer text-[13px]"
                    >
                      {industry.industryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <div className="flex items-center gap-1">
              <Info className="h-3 w-3 text-[#4593e6]" />
              <span className="text-[11px] text-[#4593e6]">
                공고 상세 페이지에서 진입 시 자동으로 채워집니다
              </span>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-100" />

        <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3.5 py-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] text-gray-500">선택된 경험</span>
            <span className="text-[13px] font-bold text-gray-900">
              {formData.selectedExperienceIds.length}개 선택됨
            </span>
          </div>

          <div className="flex flex-col items-end gap-0.5 text-right">
            <span className="text-[11px] text-gray-500">직무 · 산업</span>
            <span className="text-[12px] font-semibold text-[#1b64da]">
              {JOB_LABEL_MAP[formData.selectedJob]}
              {formData.isIndustryOn && formData.selectedIndustryId
                ? ` · ${industries.find((i) => i.industryId === formData.selectedIndustryId)?.industryName ?? ''}`
                : ''}
            </span>
          </div>
        </div>
      </div>

      <GenerationUsageCard
        label="오늘 사용 횟수"
        usedCount={todayUsage}
        limitCount={dailyLimit}
        isLoading={isAvailabilityLoading}
        className="max-md:px-3.5 max-md:py-2.5"
      />

      {variant === 'sidebar' && (
        <>
          <Button
            type="button"
            onClick={handleGenerateClick}
            disabled={formData.selectedExperienceIds.length === 0 || isLimitReached || isFormLocked}
            className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-blue-600 px-4 text-[15px] font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 max-md:h-11"
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

          {processingCount > 0 ? (
            <div className="flex items-center justify-center gap-1">
              <Timer className="h-3 w-3 text-gray-400" />
              <span className="text-[11px] text-gray-400">
                현재 생성 중인 전략 {processingCount}건 · 추가 생성은 가능합니다.
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-1">
              <Timer className="h-3 w-3 text-gray-400" />
              <span className="text-[11px] text-gray-400">
                생성 후 자동 저장 · 결과 페이지로 이동
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
