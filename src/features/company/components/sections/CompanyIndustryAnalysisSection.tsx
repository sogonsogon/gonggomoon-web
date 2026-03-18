import { Sparkles } from 'lucide-react';
import AnalysisInfoCard from '@/shared/components/ui/AnalysisInfoCard';
import KeywordTagList from '@/shared/components/ui/KeywordTagList';
import type { IndustryAnalysis } from '@/features/industry/types';
import { formatAnalysisDateTime } from '@/features/company/utils/formatAnalysisDateTime';

interface CompanyIndustryAnalysisSectionProps {
  industryName: string;
  analysis: IndustryAnalysis | null;
}

export default function CompanyIndustryAnalysisSection({
  industryName,
  analysis,
}: CompanyIndustryAnalysisSectionProps) {
  return (
    <div className="flex w-full flex-col max-lg:w-full lg:w-96 lg:shrink-0 xl:w-110">
      <div className="flex items-center gap-2 pb-2">
        <Sparkles className="h-4.5 w-4.5 text-blue-500" />
        <h2 className="text-lg font-bold text-gray-900">산업 분석</h2>
        <div className="flex items-center gap-1 rounded-md bg-blue-50 px-2.5 py-1">
          <span className="text-[12px] font-semibold text-blue-600">{industryName}</span>
        </div>
      </div>
      {analysis && (
        <div className="flex flex-wrap items-center gap-3 pb-7 text-xs text-gray-400 max-md:gap-2 max-md:pb-5">
          <span>분석 등록일 {formatAnalysisDateTime(analysis.createdAt)}</span>
          {/* <span>·</span>
          <span>업데이트 {formatAnalysisDateTime(analysis.updatedAt)}</span> */}
        </div>
      )}

      {analysis ? (
        <div className="flex flex-col gap-6 lg:gap-5 xl:gap-6">
          <KeywordTagList
            title="핵심 산업 키워드"
            keywords={analysis.keyword.map((keyword) => `#${keyword}`)}
            variant="blue"
          />

          <AnalysisInfoCard title="산업 규모" content={analysis.marketSize} />
          <AnalysisInfoCard title="산업 트렌드" content={analysis.trend} />
          <AnalysisInfoCard title="규제 이슈" content={analysis.regulation} />
          <AnalysisInfoCard title="경쟁 구도" content={analysis.competition} />
          <AnalysisInfoCard title="채용 트렌드" content={analysis.hiring} />
          <AnalysisInfoCard title="투자 방향" content={analysis.investment} />
        </div>
      ) : (
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 text-center text-sm text-gray-400">
          산업 분석 결과가 없습니다.
        </div>
      )}
    </div>
  );
}
