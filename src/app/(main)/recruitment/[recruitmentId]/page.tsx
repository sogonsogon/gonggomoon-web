import {
  Building2,
  ExternalLink,
  Bookmark,
  Briefcase,
  Timer,
  Sparkles,
  Zap,
  Lock,
} from 'lucide-react';
import { mockRecruitments } from '@/mocks/recruitment.mock';
import { mockCompanies } from '@/mocks/company.mock';
import type { IndustryType } from '@/features/industry/types';
import type { JobType } from '@/features/recruitment/types';
import Header from '@/shared/components/layout/Header';
import Footer from '@/shared/components/layout/Footer';
import Link from 'next/link';

const TODAY = new Date('2026-03-05');

const INDUSTRY_LABELS: Record<IndustryType, string> = {
  MEDIA_CONTENT: '미디어 / 컨텐츠',
  COMMERCE: '커머스',
  FINTECH_FINANCIAL: '핀테크 · 금융',
  MOBILITY_LOGISTICS: '모빌리티 / 물류',
  AI: '인공지능',
  HEALTHCARE_BIO: '헬스케어 / 바이오',
  MANUFACTURING_INDUSTRY: '제조업',
  OTHER: '기타',
};

const JOB_TYPE_LABELS: Record<JobType, string> = {
  FRONTEND: '프론트엔드',
  BACKEND: '백엔드',
  DEVOPS: 'DevOps',
  DATA_ANALYSIS: '데이터 분석',
  AI: '인공지능',
  INFORMATION_SECURITY: '정보보안',
  DESIGN: '디자인',
  PM_PO: 'PM/PO',
  QA: 'QA',
};

function getDDayLabel(dueDate: string | null | undefined): string | null {
  if (!dueDate) return null;
  const due = new Date(dueDate);
  const diff = Math.ceil((due.getTime() - TODAY.getTime()) / (1000 * 60 * 60 * 24));
  const y = due.getFullYear();
  const m = String(due.getMonth() + 1).padStart(2, '0');
  const d = String(due.getDate()).padStart(2, '0');
  if (diff < 0) return `마감 · ${y}.${m}.${d}`;
  if (diff === 0) return `D-Day · ${y}.${m}.${d}`;
  return `마감 D-${diff} · ${y}.${m}.${d}`;
}

interface RecruitmentDetailPageProps {
  params: Promise<{ recruitmentId: string }>;
}

export default async function RecruitmentDetailPage({ params }: RecruitmentDetailPageProps) {
  const recruitmentId = Number((await params).recruitmentId);
  const recruitment = mockRecruitments.find((r) => r.recruitmentId === recruitmentId);
  const company = mockCompanies.find((c) => c.companyId === recruitment?.companyId);

  const isBookmarked = true;

  if (!recruitment) {
    return (
      <div className="flex min-h-screen flex-col bg-white font-sans">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-gray-500">공고를 찾을 수 없습니다.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const dDayLabel = getDDayLabel(recruitment.dueDate);

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Header />

      {/* Body */}
      <div className="flex flex-1 gap-10 px-30 py-10">
        {/* Left: Job Info */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Top Section */}
          <div className="flex flex-col gap-4 pb-6">
            {/* Company Meta */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-md bg-blue-50 px-2.5 py-1">
                <Building2 className="h-3.5 w-3.5 text-blue-600" />
                <Link
                  href={`/company/${recruitment.companyId}`}
                  className="text-[13px] font-semibold text-blue-600"
                >
                  {company?.companyName ?? '기업명'}
                </Link>
              </div>
              <span className="text-[13px] text-gray-400">·</span>
              <span className="text-[13px] text-gray-600">
                {recruitment.industryType ? INDUSTRY_LABELS[recruitment.industryType] : ''}
              </span>
            </div>

            {/* URL Row */}
            {recruitment.url && (
              <a
                href={recruitment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 w-fit"
              >
                <ExternalLink className="h-3.5 w-3.5 text-blue-500" />
                <span className="text-[13px] font-medium text-blue-500">공고 원문 보기</span>
              </a>
            )}

            {/* Title Row */}
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-[28px] font-bold leading-tight text-gray-900">
                {recruitment.title}
              </h1>
              <button
                type="button"
                className={`flex shrink-0 items-center gap-1.5 rounded-lg border px-2 py-2 text-[13px] font-medium transition-colors ${
                  isBookmarked
                    ? 'border-blue-300 bg-blue-50 text-blue-600'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Bookmark
                  className={`h-5 w-5 ${isBookmarked ? 'fill-blue-500 text-blue-500' : 'text-gray-500'}`}
                />
                북마크
              </button>
            </div>

            {/* Info Row */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 rounded-md bg-blue-50 px-2.5 py-1">
                <Briefcase className="h-3.5 w-3.5 text-blue-700" />
                <span className="text-[13px] font-medium text-blue-700">
                  {JOB_TYPE_LABELS[recruitment.jobType]}
                </span>
              </div>
              {dDayLabel && (
                <div className="flex items-center gap-1 rounded-md bg-[#FEF2F2] px-2.5 py-1">
                  <Timer className="h-3.5 w-3.5 text-red-500" />
                  <span className="text-[13px] font-medium text-red-500">{dDayLabel}</span>
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100" />

          {/* Raw Content */}
          <div className="flex flex-col gap-4 pt-6">
            <h2 className="text-base font-bold text-gray-900">공고 원문</h2>
            <p className="whitespace-pre-line text-sm leading-[1.7] text-gray-700">{'공고 원문'}</p>
          </div>
        </div>

        {/* Right: AI Analysis */}
        <div className="flex w-110 shrink-0 flex-col gap-6">
          {/* AI Header */}
          <div className="flex items-center gap-2 pb-2">
            <Sparkles className="h-4.5 w-4.5 text-blue-500" />
            <h2 className="text-lg font-bold text-gray-900">AI 공고 분석</h2>
          </div>

          {recruitment.analysis ? (
            <>
              {/* Company Intro */}
              <div className="flex flex-col gap-2 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <span className="text-xs font-semibold text-gray-500">회사 한줄 소개</span>
                <p className="text-sm leading-relaxed text-gray-800">
                  {recruitment.analysis.companySummary}
                </p>
              </div>

              {/* R&R */}
              <div className="flex flex-col gap-2 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <span className="text-xs font-semibold text-gray-500">R&R (역할과 책임)</span>
                <p className="whitespace-pre-line text-sm leading-relaxed text-gray-800">
                  {recruitment.analysis.rolesResponsibilities}
                </p>
              </div>

              {/* Core Skills */}
              <div className="flex flex-col gap-2.5 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <span className="text-xs font-semibold text-gray-500">필수 역량</span>
                <div className="flex flex-wrap gap-1.5">
                  {recruitment.analysis.requiredSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Differentiators */}
              <div className="flex flex-col gap-2 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <span className="text-xs font-semibold text-gray-500">차별 포인트</span>
                <p className="whitespace-pre-line text-sm leading-relaxed text-gray-800">
                  {recruitment.analysis.highlightPoints}
                </p>
              </div>

              {/* Hidden Keywords */}
              <div className="flex flex-col gap-2.5 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <span className="text-xs font-semibold text-gray-500">숨은 키워드</span>
                <div className="flex flex-wrap gap-1.5">
                  {recruitment.analysis.hiddenKeywords.map((kw) => (
                    <span
                      key={kw}
                      className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 text-center text-sm text-gray-400">
              AI 분석 결과가 없습니다.
            </div>
          )}

          {/* Action Box */}
          <div className="overflow-hidden rounded-xl border border-gray-100">
            <div className="flex items-center gap-2 px-4 py-3.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-100">
                <Zap className="h-3 w-3 text-blue-600" />
              </div>
              <span className="text-[13px] font-bold text-gray-900">이 공고 맞춤 추천 활동</span>
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-600">
                AI 추천
              </span>
            </div>
            <div className="h-px bg-gray-100" />
            <ul className="flex flex-col">
              {(
                recruitment.analysis?.recommendedActions ?? [
                  '직무 핵심 키워드 익히기',
                  '관련 경험 STAR 정리',
                  '예상 면접 질문 준비',
                ]
              ).map((action, i) => (
                <li
                  key={action}
                  className={`flex items-center gap-3 px-4 py-3 ${
                    i < 2 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600">
                    <span className="text-[11px] font-bold text-white">{i + 1}</span>
                  </div>
                  <span className="text-[13px] font-semibold text-gray-800">{action}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Fit Analysis Box (locked) */}
          <div className="relative h-50 overflow-hidden rounded-xl border border-gray-100">
            {/* Background content */}
            <div className="absolute inset-0 flex flex-col justify-around p-4">
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
            {/* Blur overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/80 backdrop-blur-sm">
              <Lock className="h-6 w-6 text-gray-400" />
              <p className="text-center text-[13px] text-gray-500">
                내 경험을 기반으로 적합도를 분석합니다
              </p>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-600"
              >
                <Sparkles className="h-4 w-4" />
                적합도 분석하기
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
