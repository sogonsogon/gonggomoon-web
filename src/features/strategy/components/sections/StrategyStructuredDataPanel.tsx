import { LayoutList, Tag, TriangleAlert, Zap, ChartColumnBig } from 'lucide-react';
import { StrategyDetail } from '@/features/strategy/types';

interface StrategyStructuredDataPanelProps {
  detail: StrategyDetail; // StrategyDetail 타입을 사용
}

export default function StrategyStructuredDataPanel({ detail }: StrategyStructuredDataPanelProps) {
  return (
    <div className="flex w-75 shrink-0 flex-col gap-4">
      {/* 강조 키워드 */}
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100">
          <LayoutList className="h-3.5 w-3.5 text-blue-600" />
        </div>
        <span className="text-[15px] font-bold text-gray-900">구조화 데이터</span>
      </div>

      {/* 키워드 카드 */}
      <div className="flex flex-col gap-3 rounded-xl border border-gray-100 px-4 py-4.5">
        <div className="flex items-center gap-1.5">
          <Tag className="h-3.5 w-3.5 text-gray-500" />
          <span className="text-[12px] font-bold text-gray-700">강조 키워드</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {detail.keywords.map((kw) => (
            <span
              key={kw}
              className="rounded-full border border-[#90c2ff] bg-[#e8f3ff] px-2.5 py-1.5 text-[12px] font-semibold text-[#1b64da]"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* 강점 카드 */}
      <div className="flex flex-col gap-3 rounded-xl border border-gray-100 px-4 py-4.5">
        <div className="flex items-center gap-1.5">
          <Zap className="h-3.5 w-3.5 text-gray-500" />
          <span className="text-[12px] font-bold text-gray-700">강조 역량</span>
        </div>
        <div className="flex flex-col gap-2.5">
          {detail.strengths.map((strength) => (
            <div key={strength} className="flex items-start gap-2">
              <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2272eb]" />
              <p className="text-[12px] leading-normal text-gray-700">{strength}</p>
            </div>
          ))}
        </div>
      </div>

      {/* KPI 체크리스트 카드 */}
      <div className="flex flex-col gap-2.5 rounded-xl border border-gray-100 px-4 py-4.5">
        <div className="flex items-center gap-1.5">
          <ChartColumnBig className="h-3.5 w-3.5 text-gray-500" />
          <span className="text-[12px] font-bold text-gray-700">KPI 체크리스트</span>
        </div>
        <div className="flex flex-col gap-2">
          {detail.kpiCheckList.map((item) => (
            <div key={item} className="flex items-start gap-2">
              <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
              <p className="text-[12px] leading-normal text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 개선 가이드 카드 */}
      <div className="flex flex-col gap-3 rounded-xl border border-[#fde68a] bg-[#fffbeb] px-4 py-4.5">
        <div className="flex items-center gap-1.5">
          <TriangleAlert className="h-3.5 w-3.5 text-[#d97706]" />
          <span className="text-[12px] font-bold text-[#92400e]">보완 가이드</span>
        </div>
        <div className="h-px bg-[#fde68a]" />
        <div className="flex flex-col gap-1">
          {detail.improvementGuides.map((guide) => (
            <div key={guide.title} className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-[#b45309]">{guide.title}</span>
              <p className="text-[11px] leading-[1.6] text-[#92400e]">{guide.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
