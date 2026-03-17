import { Code, Layers, LoaderCircle } from 'lucide-react';

export default function StrategyMetaBarSkeleton() {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-5 py-3.5">
      <div className="flex items-center gap-5">
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] font-medium text-gray-400">직무</span>
          <div className="flex items-center gap-1.5">
            <Code className="h-3.5 w-3.5 text-[#2272eb]" />
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
          </div>
        </div>

        <div className="h-7 w-px bg-gray-200" />

        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] font-medium text-gray-400">타겟 산업</span>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-[#1557a0]" />
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
          </div>
        </div>

        <div className="h-7 w-px bg-gray-200" />

        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] font-medium text-gray-400">기반 경험</span>
          <div className="flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-gray-600" />
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1.5">
        <LoaderCircle className="h-3 w-3 animate-spin text-blue-600" />
        <span className="text-[11px] font-semibold text-blue-600">생성 중</span>
      </div>
    </div>
  );
}
