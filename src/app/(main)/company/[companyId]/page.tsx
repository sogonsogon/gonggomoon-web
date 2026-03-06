import {
  Building2,
  Landmark,
  Users,
  MapPin,
  Calendar,
  Globe,
  Briefcase,
  Timer,
  Sparkles,
} from 'lucide-react';
import { mockCompanies } from '@/mocks/company.mock';
import { mockRecruitments } from '@/mocks/recruitment.mock';
import type { CompanyType } from '@/features/company/types';
import type { IndustryType } from '@/features/industry/types';
import type { JobType } from '@/features/recruitment/types';
import Header from '@/shared/components/layout/Header';
import Footer from '@/shared/components/layout/Footer';

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

const COMPANY_TYPE_LABELS: Record<CompanyType, string> = {
  LARGE_ENTERPRISE: '대기업',
  MID_SIZED_ENTERPRISE: '중견기업',
  SMALL_MEDIUM_ENTERPRISE: '중소기업',
  STARTUP: '스타트업',
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

const INDUSTRY_ID_TO_TYPE: Record<number, IndustryType> = {
  1: 'COMMERCE',
  2: 'FINTECH_FINANCIAL',
  3: 'MEDIA_CONTENT',
  4: 'MOBILITY_LOGISTICS',
  5: 'AI',
  6: 'HEALTHCARE_BIO',
  7: 'MANUFACTURING_INDUSTRY',
  8: 'OTHER',
};

type IndustryAnalysis = {
  updatedAt: string;
  createdAt: string;
  coreKeywords: string[];
  trendSummary: string;
  marketScale: string;
  regulatoryRisk: string;
  competitiveLandscape: string;
  hiringTrend: string;
  investmentDirection: string;
};

const INDUSTRY_ANALYSIS: Record<number, IndustryAnalysis> = {
  1: {
    createdAt: '2025.12.15',
    updatedAt: '2026.02.28',
    coreKeywords: ['이커머스', '대규모트래픽', '개인화추천', '풀필먼트'],
    trendSummary:
      '모바일 중심 커머스로의 전환이 가속화되며, AI 기반 개인화 추천 및 빠른 배송 경쟁이 심화되고 있습니다.',
    marketScale:
      '국내 이커머스 시장 규모는 연 200조원을 넘어서며 지속적인 성장세를 유지하고 있습니다.',
    regulatoryRisk:
      '전자상거래법 개정 및 개인정보보호 강화로 데이터 활용에 대한 규제 리스크가 증가하고 있습니다.',
    competitiveLandscape:
      '쿠팡, 네이버쇼핑 등 대형 플랫폼과 버티컬 커머스 간의 경쟁이 치열하며 차별화된 UX가 핵심입니다.',
    hiringTrend: '프론트엔드, 데이터 엔지니어링, 물류 시스템 개발 직군의 수요가 꾸준히 높습니다.',
    investmentDirection:
      '물류 자동화, AI 추천 시스템, 라이브커머스 등 기술 기반 고객 경험 혁신에 투자가 집중되고 있습니다.',
  },
  2: {
    createdAt: '2025.12.15',
    updatedAt: '2026.02.28',
    coreKeywords: ['간편결제', '디지털뱅킹', '슈퍼앱', '마이데이터'],
    trendSummary:
      '금융과 IT의 융합이 가속화되며 간편결제, 마이데이터, 오픈뱅킹 등 新금융 서비스가 빠르게 성장하고 있습니다.',
    marketScale:
      '국내 핀테크 시장은 연간 30% 이상 성장하며 간편결제 거래액이 연 100조원을 돌파했습니다.',
    regulatoryRisk:
      '금융위원회의 핀테크 규제 샌드박스 확대로 기회가 늘었지만, 보안 및 개인정보 관련 규제는 강화되고 있습니다.',
    competitiveLandscape:
      '카카오페이, 토스, 네이버페이 등 빅테크 기반 플랫폼과 전통 금융사의 디지털 전환 경쟁이 심화되고 있습니다.',
    hiringTrend:
      '보안 전문가, 데이터 분석, 프론트엔드 엔지니어 채용 수요가 높으며 금융 규제 이해 역량이 중요합니다.',
    investmentDirection:
      'BNPL, 자산관리 자동화, 블록체인 기반 결제 인프라 등 신규 금융 서비스 영역에 투자가 집중되고 있습니다.',
  },
  5: {
    createdAt: '2025.12.15',
    updatedAt: '2026.02.28',
    coreKeywords: ['LLM', '생성형AI', 'MLOps', 'AI에이전트'],
    trendSummary:
      'GPT 이후 생성형 AI 기술이 전 산업에 빠르게 적용되며 AI 기반 자동화와 인텔리전트 서비스 수요가 폭증하고 있습니다.',
    marketScale:
      '글로벌 AI 시장은 2026년 기준 약 500조원 규모로 성장하며 국내 기업들의 AI 전환도 본격화되고 있습니다.',
    regulatoryRisk:
      'EU AI Act 등 글로벌 AI 규제 기준이 강화되며 투명성, 설명 가능성에 대한 요구가 높아지고 있습니다.',
    competitiveLandscape:
      '빅테크(Google, Microsoft, Anthropic 등)의 시장 지배력이 강하며 국내 스타트업은 버티컬 AI로 차별화 중입니다.',
    hiringTrend:
      'ML 엔지니어, AI 백엔드, MLOps, 프롬프트 엔지니어링 전문가 수요가 폭발적으로 증가하고 있습니다.',
    investmentDirection:
      'AI 인프라(GPU 클러스터), 버티컬 AI SaaS, AI 에이전트 플랫폼 등에 대규모 투자가 이루어지고 있습니다.',
  },
};

const COMPANY_INTRO: Record<number, string> = {
  11: '네오커머스는 대규모 트래픽을 처리하는 이커머스 플랫폼을 운영하며, 데이터 기반 서비스 개선과 기술 혁신을 통해 수백만 명의 고객에게 최적의 쇼핑 경험을 제공하고 있습니다. 빠른 실험 문화와 엔지니어 중심의 조직으로 성장하고 있습니다.',
  12: '핀웨이브는 간편 결제와 금융 데이터를 기반으로 새로운 금융 경험을 제공하는 핀테크 기업입니다. 사용자 중심의 금융 서비스를 통해 디지털 뱅킹의 미래를 만들어가고 있습니다.',
  13: '글로벌테크랩은 AI 모델을 활용한 데이터 분석 플랫폼을 개발하는 기술 중심 기업입니다. 전 세계 고객을 대상으로 AI 기반 인사이트를 제공하며 빠르게 성장하고 있습니다.',
  14: '스몰스튜디오는 소규모이지만 강한 팀워크와 창의성을 바탕으로 독창적인 미디어 콘텐츠를 제작합니다. 구성원 모두가 주인의식을 갖고 함께 성장하는 환경을 지향합니다.',
};

function getDDayLabel(dueDate: string | null | undefined): string | null {
  if (!dueDate) return null;
  const due = new Date(dueDate);
  const diff = Math.ceil((due.getTime() - TODAY.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return '마감';
  if (diff === 0) return 'D-Day';
  return `D-${diff}`;
}

interface CompanyDetailPageProps {
  params: Promise<{ companyId: string }>;
}

export default async function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  const companyId = Number((await params).companyId);
  const company = mockCompanies.find((c) => c.companyId === companyId);
  const companyRecruitments = mockRecruitments.filter((r) => r.companyId === companyId);

  if (!company) {
    return (
      <div className="flex min-h-screen flex-col bg-white font-sans">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-gray-500">기업을 찾을 수 없습니다.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const industryType = company.industryId ? INDUSTRY_ID_TO_TYPE[company.industryId] : undefined;
  const analysis = company.industryId ? INDUSTRY_ANALYSIS[company.industryId] : undefined;
  const intro = COMPANY_INTRO[companyId];

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Header />

      {/* Body */}
      <div className="flex flex-1 gap-10 px-30 py-10">
        {/* Left: Company Info */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Logo Row */}
          <div className="flex items-center gap-4 pb-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-100">
              <Building2 className="h-7 w-7 text-gray-400" />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-2xl font-bold text-gray-900">{company.companyName}</span>
              <div className="flex items-center gap-2">
                {industryType && (
                  <div className="flex items-center gap-1 rounded-md bg-blue-50 px-2.5 py-1">
                    <Landmark className="h-3 w-3 text-blue-600" />
                    <span className="text-[12px] font-semibold text-blue-600">
                      {INDUSTRY_LABELS[industryType]}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-1 rounded-md bg-gray-100 px-2.5 py-1">
                  <span className="text-[12px] font-semibold text-gray-600">
                    {COMPANY_TYPE_LABELS[company.companyType]}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Meta Grid */}
          <div className="grid grid-cols-2 gap-3 pb-6">
            {company.employeeCount !== undefined && (
              <div className="flex items-center gap-3 rounded-[10px] border border-gray-100 bg-gray-50 px-4 py-3.5">
                <Users className="h-4 w-4 shrink-0 text-gray-400" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] text-gray-400">사원 수</span>
                  <span className="text-[13px] font-semibold text-gray-800">
                    {company.employeeCount.toLocaleString()}명
                  </span>
                </div>
              </div>
            )}
            {company.address && (
              <div className="flex items-center gap-3 rounded-[10px] border border-gray-100 bg-gray-50 px-4 py-3.5">
                <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] text-gray-400">주소지</span>
                  <span className="text-[13px] font-semibold text-gray-800">{company.address}</span>
                </div>
              </div>
            )}
            {company.foundedYear !== undefined && (
              <div className="flex items-center gap-3 rounded-[10px] border border-gray-100 bg-gray-50 px-4 py-3.5">
                <Calendar className="h-4 w-4 shrink-0 text-gray-400" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] text-gray-400">설립연도</span>
                  <span className="text-[13px] font-semibold text-gray-800">
                    {company.foundedYear}년
                  </span>
                </div>
              </div>
            )}
            {company.websiteUrl && (
              <div className="flex items-center gap-3 rounded-[10px] border border-gray-100 bg-gray-50 px-4 py-3.5">
                <Globe className="h-4 w-4 shrink-0 text-gray-400" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] text-gray-400">홈페이지</span>
                  <a
                    href={company.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] font-semibold text-blue-500 hover:underline"
                  >
                    바로가기
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100" />

          {/* 기업 소개 */}
          <div className="flex flex-col gap-4 py-6">
            <h2 className="text-base font-bold text-gray-900">기업 소개</h2>
            <p className="text-sm leading-[1.7] text-gray-700">
              {intro ?? '기업 소개 정보가 없습니다.'}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100" />

          {/* 현재 채용 중인 공고 */}
          <div className="flex flex-col gap-4 pt-6">
            <h2 className="text-base font-bold text-gray-900">현재 채용 중인 공고</h2>
            {companyRecruitments.length === 0 ? (
              <p className="text-sm text-gray-400">현재 채용 중인 공고가 없습니다.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {companyRecruitments.map((job) => {
                  const dDay = getDDayLabel(job.dueDate);
                  const isExpired = job.dueDate
                    ? new Date(job.dueDate).getTime() < TODAY.getTime()
                    : false;
                  return (
                    <div
                      key={job.recruitmentId}
                      className="flex items-center justify-between rounded-[10px] border border-gray-100 bg-gray-50 px-4 py-4"
                    >
                      <div className="flex flex-col gap-2">
                        <span className="text-[14px] font-semibold text-gray-900">{job.title}</span>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5">
                            <Briefcase className="h-3 w-3 text-blue-600" />
                            <span className="text-[11px] font-medium text-blue-600">
                              {JOB_TYPE_LABELS[job.jobType]}
                            </span>
                          </div>
                          {dDay && (
                            <div className="flex items-center gap-1">
                              <Timer className="h-3 w-3 text-gray-400" />
                              <span
                                className={`text-[11px] font-medium ${isExpired ? 'text-gray-400' : 'text-red-500'}`}
                              >
                                {dDay}
                              </span>
                            </div>
                          )}
                          {!job.dueDate && (
                            <span className="text-[11px] text-gray-400">상시 모집</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right: AI Industry Analysis */}
        <div className="flex w-110 shrink-0 flex-col gap-6">
          {/* AI Header */}
          <div className="flex items-center gap-2 pb-2">
            <Sparkles className="h-4.5 w-4.5 text-blue-500" />
            <h2 className="text-lg font-bold text-gray-900">산업 분석</h2>
          </div>

          {analysis ? (
            <>
              {/* Analysis Meta */}
              <div className="flex items-center gap-3 text-[11px] text-gray-400">
                <span>분석 등록일 {analysis.createdAt}</span>
                <span>·</span>
                <span>업데이트 {analysis.updatedAt}</span>
              </div>

              {/* Core Keywords */}
              <div className="flex flex-col gap-2.5 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <span className="text-xs font-semibold text-gray-500">핵심 산업 키워드</span>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.coreKeywords.map((kw) => (
                    <span
                      key={kw}
                      className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Trend Summary */}
              <div className="flex flex-col gap-2 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <span className="text-xs font-semibold text-gray-500">산업 트렌드 요약</span>
                <p className="text-sm leading-relaxed text-gray-800">{analysis.trendSummary}</p>
              </div>

              {/* Market Scale */}
              <div className="flex flex-col gap-2 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <span className="text-xs font-semibold text-gray-500">산업 규모</span>
                <p className="text-sm leading-relaxed text-gray-800">{analysis.marketScale}</p>
              </div>

              {/* Regulatory Risk */}
              <div className="flex flex-col gap-2 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <span className="text-xs font-semibold text-gray-500">규제 리스크</span>
                <p className="text-sm leading-relaxed text-gray-800">{analysis.regulatoryRisk}</p>
              </div>

              {/* Competitive Landscape */}
              <div className="flex flex-col gap-2 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <span className="text-xs font-semibold text-gray-500">경쟁 구도</span>
                <p className="text-sm leading-relaxed text-gray-800">
                  {analysis.competitiveLandscape}
                </p>
              </div>

              {/* Hiring Trend */}
              <div className="flex flex-col gap-2 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <span className="text-xs font-semibold text-gray-500">채용 트렌드</span>
                <p className="text-sm leading-relaxed text-gray-800">{analysis.hiringTrend}</p>
              </div>

              {/* Investment Direction */}
              <div className="flex flex-col gap-2 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <span className="text-xs font-semibold text-gray-500">투자 방향</span>
                <p className="text-sm leading-relaxed text-gray-800">
                  {analysis.investmentDirection}
                </p>
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 text-center text-sm text-gray-400">
              산업 분석 결과가 없습니다.
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
