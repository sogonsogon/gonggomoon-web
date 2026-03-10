'use client';

import { Code, Info, Server, Sparkles, Timer } from 'lucide-react';
import { JOB_LABEL_MAP } from '@/features/recruitment/constants/jobOptions';
import { INDUSTRY_LABEL_MAP } from '@/features/industry/constants/industryOptions';
import { Switch } from '@/shared/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import type { IndustryType } from '@/features/industry/types';
import type { StrategyJobType } from '@/features/strategy/types';
import { startStrategyGeneration } from '@/features/strategy/services/startStrategyGeneration';
import { useStrategyGenerationStore } from '@/features/strategy/stores/useStrategyGenerationStore';
import { useStrategyCreateFormStore } from '@/features/strategy/stores/useCreateStrategyFormStore';

export default function StrategyConditionPanel() {
  const formData = useStrategyCreateFormStore((state) => state.formData);
  const updateFormData = useStrategyCreateFormStore((state) => state.updateFormData);

  const submitLoading = useStrategyGenerationStore((state) => state.submitLoading);
  const generationStatus = useStrategyGenerationStore((state) => state.generationStatus);

  const isFormLocked = submitLoading || generationStatus === 'PROCESSING';

  const handleJobChange = (job: StrategyJobType) => {
    if (isFormLocked) return;
    updateFormData('selectedJob', job);
  };

  const handleIndustryToggle = () => {
    if (isFormLocked) return;
    updateFormData('isIndustryOn', !formData.isIndustryOn);
  };

  const handleIndustryChange = (industry: IndustryType) => {
    if (isFormLocked) return;
    updateFormData('selectedIndustry', industry);
  };

  const handleGenerateClick = async () => {
    try {
      await startStrategyGeneration();
    } catch {}
  };

  return (
    <div className="sticky top-6 flex w-80 shrink-0 self-start flex-col gap-4">
      <div className="flex flex-col gap-4 rounded-xl border border-gray-100 p-5">
        <h2 className="text-base font-bold text-gray-900">조건 설정</h2>
        <div className="h-px bg-gray-100" />

        <div className="flex flex-col gap-2.5">
          <span className="text-[13px] font-semibold text-gray-700">직무 선택</span>

          <div className="flex gap-2">
            {(['FRONTEND', 'BACKEND'] as StrategyJobType[]).map((job) => {
              const isActive = formData.selectedJob === job;

              return (
                <button
                  key={job}
                  type="button"
                  onClick={() => handleJobChange(job)}
                  disabled={isFormLocked}
                  className={`inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 text-[13px] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                    isActive
                      ? 'border-[#2272eb] bg-[#2272eb] text-white'
                      : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {job === 'FRONTEND' ? (
                    <Code className="h-3.5 w-3.5" />
                  ) : (
                    <Server className="h-3.5 w-3.5" />
                  )}
                  {JOB_LABEL_MAP[job]}
                </button>
              );
            })}
          </div>
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

          {formData.isIndustryOn && (
            <div className="flex flex-col gap-1.5">
              <Select
                value={formData.selectedIndustry}
                onValueChange={(value) => handleIndustryChange(value as IndustryType)}
                disabled={isFormLocked}
              >
                <SelectTrigger className="h-10 w-full cursor-pointer border-[1.5px] border-[#4593e6] text-[13px] font-medium text-gray-900 disabled:cursor-not-allowed disabled:opacity-50">
                  <SelectValue>{INDUSTRY_LABEL_MAP[formData.selectedIndustry]}</SelectValue>
                </SelectTrigger>

                <SelectContent position="popper">
                  {(Object.keys(INDUSTRY_LABEL_MAP) as IndustryType[])
                    .filter((industry) => industry !== 'OTHER')
                    .map((industry) => (
                      <SelectItem
                        key={industry}
                        value={industry}
                        className="cursor-pointer text-[13px]"
                      >
                        {INDUSTRY_LABEL_MAP[industry]}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <div className="flex items-center gap-1">
                <Info className="h-3 w-3 text-[#4593e6]" />
                <span className="text-[11px] text-[#4593e6]">
                  공고 상세 페이지에서 진입 시 자동으로 채워집니다
                </span>
              </div>
            </div>
          )}
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
              {formData.isIndustryOn ? ` · ${INDUSTRY_LABEL_MAP[formData.selectedIndustry]}` : ''}
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGenerateClick}
        disabled={formData.selectedExperienceIds.length === 0 || isFormLocked}
        className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-blue-600 px-4 text-[15px] font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        <Sparkles className="h-4 w-4" />
        {isFormLocked ? '포트폴리오 전략 생성 중...' : '포트폴리오 전략 생성'}
      </button>

      <div className="flex items-center justify-center gap-1">
        <Timer className="h-3 w-3 text-gray-400" />
        <span className="text-[11px] text-gray-400">생성 후 자동 저장 · 결과 페이지로 이동</span>
      </div>
    </div>
  );
}
