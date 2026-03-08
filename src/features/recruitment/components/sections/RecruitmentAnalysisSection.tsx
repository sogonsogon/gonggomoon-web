import { Sparkles } from 'lucide-react';
import type { RecruitmentAnalysis } from '@/features/recruitment/types';
import RecommendedActionsCard from '@/features/recruitment/components/ui/RecommendedActionsCard';
import FitAnalysisCard from '@/features/recruitment/components/ui/FitAnalysisCard';
import AnalysisInfoCard from '@/shared/components/ui/AnalysisInfoCard';
import KeywordTagList from '@/shared/components/ui/KeywordTagList';

interface RecruitmentAnalysisSectionProps {
  analysis?: RecruitmentAnalysis | null;
}

export default function RecruitmentAnalysisSection({ analysis }: RecruitmentAnalysisSectionProps) {
  return (
    <aside className="flex w-110 shrink-0 flex-col gap-6">
      <div className="flex items-center gap-2 pb-2">
        <Sparkles className="h-4.5 w-4.5 text-blue-500" />
        <h2 className="text-lg font-bold text-gray-900">AI 공고 분석</h2>
      </div>

      {analysis ? (
        <>
          <AnalysisInfoCard title="회사 한줄 소개" content={analysis.companySummary} />

          <AnalysisInfoCard
            title="R&R (역할과 책임)"
            content={analysis.rolesResponsibilities ?? []}
          />

          <KeywordTagList
            title="필수 역량"
            keywords={analysis.requiredSkills ?? []}
            variant="blue"
          />

          <AnalysisInfoCard
            title="차별 포인트"
            content={analysis.highlightPoints}
            preserveLineBreak
          />

          <KeywordTagList
            title="숨은 키워드"
            keywords={analysis.hiddenKeywords ?? []}
            variant="gray"
          />
        </>
      ) : (
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 text-center text-sm text-gray-400">
          AI 분석 결과가 없습니다.
        </div>
      )}

      <RecommendedActionsCard
        actions={analysis?.recommendedActions ?? FALLBACK_RECOMMENDED_ACTIONS}
      />

      <FitAnalysisCard />
    </aside>
  );
}

const FALLBACK_RECOMMENDED_ACTIONS = [
  '직무 핵심 키워드 익히기',
  '관련 경험 STAR 정리',
  '예상 면접 질문 준비',
];
