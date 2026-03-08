'use client';

import { useState } from 'react';
import { Lock, Sparkles } from 'lucide-react';

export default function FitAnalysisCard() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-white p-4">
      <div className="flex flex-col gap-4">
        <span className="text-sm font-bold text-gray-900">나의 적합도 분석</span>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-green-500">강점 역량</span>
          <span className="text-[13px] text-gray-700">• 재무 모델링 및 분석 역량 우수</span>
          <span className="text-[13px] text-gray-700">• Excel 고급 활용 능력 보유</span>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-red-500">약점 역량</span>
          <span className="text-[13px] text-gray-700">• SQL 활용 경험 부족</span>
          <span className="text-[13px] text-gray-700">• 핀테크 산업 경험 없음</span>
        </div>
      </div>

      {!isUnlocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/80 backdrop-blur-sm">
          <Lock className="h-6 w-6 text-gray-400" />
          <p className="text-center text-[13px] text-gray-500">
            내 경험을 기반으로 적합도를 분석합니다
          </p>
          <button
            type="button"
            onClick={() => setIsUnlocked(true)}
            className="flex items-center gap-1.5 rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white cursor-pointer hover:bg-blue-600"
          >
            <Sparkles className="h-4 w-4" />
            적합도 분석하기
          </button>
        </div>
      )}
    </div>
  );
}
