import { Lock, Sparkles } from 'lucide-react';

export default function FitAnalysisCard() {
  const isDisabled = true;

  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-white p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900">나의 적합도 분석</span>
          {isDisabled && (
            <span className="rounded-full bg-gray-100 px-2 py-1 text-[11px] font-medium text-gray-500">
              준비 중
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-green-500">강점 역량</span>
          <span className="text-[13px] text-gray-400">• 분석 결과 제공 예정</span>
          <span className="text-[13px] text-gray-400">• 분석 결과 제공 예정</span>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-red-500">보완 역량</span>
          <span className="text-[13px] text-gray-400">• 분석 결과 제공 예정</span>
          <span className="text-[13px] text-gray-400">• 분석 결과 제공 예정</span>
        </div>
      </div>

      {isDisabled && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/80 backdrop-blur-sm">
          <Lock className="h-6 w-6 text-gray-400" />
          <p className="text-center text-[13px] text-gray-500">
            적합도 분석 기능은 현재 준비 중입니다
          </p>
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="flex cursor-not-allowed items-center gap-1.5 rounded-lg bg-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-500"
          >
            <Sparkles className="h-4 w-4" />
            준비 중
          </button>
        </div>
      )}
    </div>
  );
}
