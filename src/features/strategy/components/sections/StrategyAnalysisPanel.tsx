import { Sparkles } from 'lucide-react';
import { EXPERIENCE_LABEL_MAP } from '@/features/experience/constants/experienceOptions';
import { EXP_BADGE_CHECKED } from '@/features/experience/constants/experienceBadgeStyles';
import { ExperienceStrategyPoint, ExperienceOrdering } from '@/features/strategy/types';

interface StrategyAnalysisPanelProps {
  mainPositioningMessage: string; // 핵심 포지셔닝 메시지
  experienceStrategyPoints: ExperienceStrategyPoint[]; // 경험별 전략 포인트
  experienceOrdering: ExperienceOrdering[]; // 경험 정렬 전략
}

export default function StrategyAnalysisPanel({
  mainPositioningMessage,
  experienceStrategyPoints,
  experienceOrdering,
}: StrategyAnalysisPanelProps) {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#c9e2ff]">
          <Sparkles className="h-3.5 w-3.5 text-[#2272eb]" />
        </div>
        <span className="text-[15px] font-bold text-gray-900">AI 전략 분석</span>
      </div>

      <div className="flex flex-col gap-6 rounded-xl border border-gray-100 p-6">
        {/* 핵심 포지셔닝 메시지 */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2272eb]">
              <span className="text-[14px] font-bold text-white">1</span>
            </div>
            <span className="text-[14px] font-semibold text-gray-900">핵심 포지셔닝 메시지</span>
          </div>

          <div className="rounded-lg border border-[#c9e2ff] bg-[#e8f3ff] px-4 py-3">
            <p className="text-[14px] leading-[1.7] text-[#1557a0]">{mainPositioningMessage}</p>
          </div>
        </section>

        <div className="h-px bg-gray-100" />

        {/* 경험별 전략 포인트 */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2272eb]">
              <span className="text-[14px] font-bold text-white">2</span>
            </div>
            <span className="text-[14px] font-semibold text-gray-900">경험별 전략 포인트</span>
          </div>

          <div className="flex flex-col gap-4">
            {experienceStrategyPoints.map((strategyPoint, index) => {
              return (
                <div
                  key={index}
                  className="flex gap-4 rounded-lg items-center border border-gray-100 px-4 py-3"
                >
                  <span
                    className={`inline-flex h-6 shrink-0 items-center rounded-full px-2 py-0 text-[11px] leading-none font-semibold ${
                      EXP_BADGE_CHECKED[strategyPoint.experienceType]
                    }`}
                  >
                    {EXPERIENCE_LABEL_MAP[strategyPoint.experienceType]}
                  </span>
                  <div className="flex flex-1 flex-col gap-1">
                    <span className="text-[14px] font-semibold text-gray-800">
                      {strategyPoint.experienceTitle}
                    </span>
                    <p className="text-[14px] leading-[1.6] text-gray-500">
                      {strategyPoint.strategyPoint}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="h-px bg-gray-100" />

        {/* 경험 정렬 전략 */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2272eb]">
              <span className="text-[14px] font-bold text-white">3</span>
            </div>
            <span className="text-[14px] font-semibold text-gray-900">경험 정렬 전략</span>
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-100">
            {experienceOrdering.map((oe, idx) => {
              const isLast = idx === experienceOrdering.length - 1;

              return (
                <div
                  key={oe.order}
                  className={`flex items-center gap-4 px-4 py-3 ${!isLast ? 'border-b border-gray-100' : ''}`}
                >
                  {/* 번호 */}
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#c9e2ff]">
                    <span className="text-[14px] font-bold text-[#1b64da] leading-none">
                      {oe.order}
                    </span>
                  </div>

                  {/* 내용 */}
                  <div className="flex flex-1 flex-col gap-0.5">
                    <span className="text-[14px] font-semibold text-gray-800">
                      {oe.order}번 — {oe.title}
                    </span>
                    <p className="text-[14px] leading-[1.6] text-gray-500">{oe.reason}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
