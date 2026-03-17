import { CircleCheck, Code, Layers, Server } from 'lucide-react';
import type { StrategyDetail } from '@/features/strategy/types';
import { JOB_LABEL_MAP } from '@/features/recruitment/constants/jobOptions';
import StrategyDeleteButton from '@/features/strategy/components/ui/StrategyDeleteButton';
import { formatCreatedDate } from '@/shared/utils/formatCreatedDate';

interface StrategyMetaBarProps {
  strategy: StrategyDetail;
}

export default function StrategyMetaBar({ strategy }: StrategyMetaBarProps) {
  return (
    <div className="w-full">
      <div className="rounded-xl border border-gray-100 bg-gray-50 px-5 py-3.5 max-md:px-4 max-md:py-3 xl:flex xl:items-center xl:justify-between">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:flex xl:items-center xl:gap-5">
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-medium text-gray-400">직무</span>
            <div className="flex items-center gap-1.5">
              {strategy.jobType === 'BACKEND' ? (
                <Server className="h-3.5 w-3.5 text-[#2272eb]" />
              ) : (
                <Code className="h-3.5 w-3.5 text-[#2272eb]" />
              )}
              <span className="text-[13px] font-semibold text-gray-900">
                {JOB_LABEL_MAP[strategy.jobType]}
              </span>
            </div>
          </div>
          <div className="hidden h-7 w-px bg-gray-200 xl:block" />

          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-medium text-gray-400">타겟 산업</span>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-[#1557a0]" />
              <span className="text-[13px] font-semibold text-gray-900">
                {strategy.industryName ?? '미설정'}
              </span>
            </div>
          </div>
          <div className="hidden h-7 w-px bg-gray-200 xl:block" />

          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-medium text-gray-400">기반 경험</span>
            <div className="flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-gray-600" />
              <span className="text-[13px] font-semibold text-gray-900">
                {strategy.selectedExperienceCount ?? 0}개 경험 선택됨
              </span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-gray-200 pt-2.5 xl:mt-0 xl:w-auto xl:border-t-0 xl:pt-0">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex items-center gap-1.5 rounded-full bg-[#e6f9f2] px-2.5 py-1.5">
              <CircleCheck className="h-3 w-3 text-[#127848]" />
              <span className="text-[11px] font-semibold text-[#127848]">저장됨</span>
            </div>
            <span className="truncate text-[12px] text-gray-400">
              {formatCreatedDate(strategy.createdAt)}
            </span>
          </div>

          <StrategyDeleteButton
            strategyId={strategy.strategyId}
            hideLabelOnMobile
            className="shrink-0 border-gray-200 bg-white px-2.5 py-1.5"
          />
        </div>
      </div>
    </div>
  );
}
