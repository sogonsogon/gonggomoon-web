import { Code, Layers, LoaderCircle } from 'lucide-react';

export default function StrategyMetaBarSkeleton() {
  return (
    <div className="w-full">
      <div className="rounded-xl border border-gray-100 bg-gray-50 px-5 py-3.5 max-md:px-4 max-md:py-3 xl:flex xl:items-center xl:justify-between">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:flex xl:items-center xl:gap-5">
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-medium text-gray-400">직무</span>
            <div className="flex items-center gap-1.5">
              <Code className="h-3.5 w-3.5 text-[#2272eb]" />
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
          <div className="hidden h-7 w-px bg-gray-200 xl:block" />

          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-medium text-gray-400">타겟 산업</span>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-[#1557a0]" />
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
          <div className="hidden h-7 w-px bg-gray-200 xl:block" />

          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-medium text-gray-400">기반 경험</span>
            <div className="flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-gray-600" />
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-gray-200 pt-2.5 xl:mt-0 xl:w-auto xl:border-t-0 xl:pt-0">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1.5">
              <LoaderCircle className="h-3 w-3 animate-spin text-blue-600" />
              <span className="text-[11px] font-semibold text-blue-600">생성 중</span>
            </div>
            <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="h-8 w-8 shrink-0 animate-pulse rounded-md border border-gray-200 bg-white" />
        </div>
      </div>
    </div>
  );
}
