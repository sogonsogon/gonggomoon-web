'use client';

import { Code, Info, Server, Sparkles, Timer } from 'lucide-react';
import type { StrategyJobType } from '@/features/strategy/types';
import type { IndustryType } from '@/features/industry/types';
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

interface StrategyConditionPanelProps {
  selectedJob: StrategyJobType;
  onSelectJob: (job: StrategyJobType) => void;
  isIndustryOn: boolean;
  onToggleIndustry: (checked: boolean) => void;
  selectedIndustry: IndustryType;
  onSelectIndustry: (industry: IndustryType) => void;
  selectedCount: number;
}

export default function StrategyConditionPanel({
  selectedJob,
  onSelectJob,
  isIndustryOn,
  onToggleIndustry,
  selectedIndustry,
  onSelectIndustry,
  selectedCount,
}: StrategyConditionPanelProps) {
  return (
    <div className="sticky top-6 flex w-80 shrink-0 self-start flex-col gap-4">
      <div className="flex flex-col gap-4 rounded-xl border border-gray-100 p-5">
        <h2 className="text-base font-bold text-gray-900">조건 설정</h2>
        <div className="h-px bg-gray-100" />

        <div className="flex flex-col gap-2.5">
          <span className="text-[13px] font-semibold text-gray-700">직무 선택</span>

          <div className="flex gap-2">
            {(['FRONTEND', 'BACKEND'] as StrategyJobType[]).map((job) => {
              const isActive = selectedJob === job;

              return (
                <button
                  key={job}
                  type="button"
                  onClick={() => onSelectJob(job)}
                  className={`inline-flex h-10 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg border px-3 text-[13px] font-semibold transition-colors ${
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
                  isIndustryOn ? 'text-[#2272eb]' : 'text-gray-400'
                }`}
              >
                {isIndustryOn ? 'ON' : 'OFF'}
              </span>

              <Switch
                checked={isIndustryOn}
                onCheckedChange={onToggleIndustry}
                className="cursor-pointer"
                aria-label="산업 특화 토글"
              />
            </div>
          </div>

          {isIndustryOn && (
            <div className="flex flex-col gap-1.5">
              <Select
                value={selectedIndustry}
                onValueChange={(value) => onSelectIndustry(value as IndustryType)}
              >
                <SelectTrigger className="h-10 w-full cursor-pointer border-[1.5px] border-[#4593e6] text-[13px] font-medium text-gray-900">
                  <SelectValue>{INDUSTRY_LABEL_MAP[selectedIndustry]}</SelectValue>
                </SelectTrigger>

                <SelectContent position="popper">
                  {(Object.keys(INDUSTRY_LABEL_MAP) as IndustryType[]).map((industry) => (
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
            <span className="text-[13px] font-bold text-gray-900">{selectedCount}개 선택됨</span>
          </div>

          <div className="flex flex-col items-end gap-0.5 text-right">
            <span className="text-[11px] text-gray-500">직무 · 산업</span>
            <span className="text-[12px] font-semibold text-[#1b64da]">
              {JOB_LABEL_MAP[selectedJob]}
              {isIndustryOn ? ` · ${INDUSTRY_LABEL_MAP[selectedIndustry]}` : ''}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-[10px] border border-blue-100 bg-blue-50 px-4 py-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] font-medium text-blue-600">오늘 사용 횟수</span>
          <div className="flex items-center gap-1">
            <span className="text-[20px] font-bold text-blue-700">1</span>
            <span className="text-[13px] font-medium text-blue-400">/ 1회</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
          <div className="h-2.5 w-2.5 rounded-full bg-blue-200" />
          <div className="h-2.5 w-2.5 rounded-full bg-blue-200" />
        </div>
      </div>

      <button
        type="button"
        className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-blue-600 px-4 text-[15px] font-bold text-white hover:bg-blue-700"
      >
        <Sparkles className="h-4 w-4" />
        포트폴리오 전략 생성
      </button>

      <div className="flex items-center justify-center gap-1">
        <Timer className="h-3 w-3 text-gray-400" />
        <span className="text-[11px] text-gray-400">생성 후 자동 저장 · 결과 페이지로 이동</span>
      </div>
    </div>
  );
}
