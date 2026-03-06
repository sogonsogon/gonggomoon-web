'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  PanelLeftClose,
  Plus,
  Settings2,
  Sparkles,
  Server,
  Code,
  Layers,
  CircleCheck,
  Trash2,
  Tag,
  Zap,
  ChartColumnBig,
  TriangleAlert,
  LayoutList,
} from 'lucide-react';
import { mockStrategies } from '@/mocks/strategy.mock';
import { mockExperiences } from '@/mocks/experience.mock';
import type { StrategyJobType } from '@/features/strategy/types';
import type { IndustryType } from '@/features/industry/types';
import type { ExperienceType } from '@/features/experience/types';

const JOB_TYPE_LABELS: Record<StrategyJobType, string> = {
  FRONTEND: '프론트엔드',
  BACKEND: '백엔드',
};

const INDUSTRY_LABELS: Record<IndustryType, string> = {
  MEDIA_CONTENT: '미디어/컨텐츠',
  COMMERCE: '커머스',
  FINTECH_FINANCIAL: '핀테크/금융',
  MOBILITY_LOGISTICS: '모빌리티/물류',
  AI: '인공지능',
  HEALTHCARE_BIO: '헬스케어/바이오',
  MANUFACTURING_INDUSTRY: '제조업',
  OTHER: '기타',
};

const EXP_TYPE_LABELS: Record<ExperienceType, string> = {
  CAREER: '경력',
  PROJECT: '프로젝트',
  EDUCATION: '교육',
  COMPETITION: '수상/공모전',
  OTHER: '기타',
};

const EXP_TYPE_BADGE: Record<ExperienceType, string> = {
  CAREER: 'bg-[#e6f9f2] text-[#127848]',
  PROJECT: 'bg-[#e8f3ff] text-[#2272eb]',
  EDUCATION: 'bg-blue-50 text-blue-700',
  COMPETITION: 'bg-purple-50 text-purple-700',
  OTHER: 'bg-orange-50 text-orange-700',
};

function formatHistoryDate(iso: string): string {
  return iso.slice(0, 10).replace(/-/g, '.');
}

function formatCreatedDate(iso: string): string {
  return iso.slice(0, 10).replace(/-/g, '.') + ' 생성';
}

const expMap = Object.fromEntries(mockExperiences.map((e) => [e.id, e]));

export default function StrategyResultPage() {
  const params = useParams();
  const router = useRouter();
  const strategyId = Number(params.strategyId);

  const [strategies, setStrategies] = useState(mockStrategies);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const strategy = strategies.find((s) => s.strategyId === strategyId);

  function handleDelete() {
    setStrategies((prev) => prev.filter((s) => s.strategyId !== strategyId));
    router.push('/strategy/create');
  }

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <div className="flex flex-1">
        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="flex w-65 shrink-0 flex-col border-r border-gray-100 bg-gray-50">
            {/* Sidebar Top */}
            <div className="flex flex-col gap-2 px-4 pb-4 pt-5">
              <div className="flex items-center justify-between pb-1">
                <span className="text-[13px] font-semibold text-gray-700">포폴 전략</span>
                <button
                  type="button"
                  onClick={() => setIsSidebarOpen(false)}
                  className="rounded-md p-0.5 hover:bg-gray-200"
                  aria-label="사이드바 닫기"
                >
                  <PanelLeftClose className="h-4 w-4 text-gray-400" />
                </button>
              </div>
              <Link
                href="/strategy/create"
                className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2.5 text-[13px] font-semibold text-white hover:bg-blue-700"
              >
                <Plus className="h-3.5 w-3.5" />새 포폴 전략 생성
              </Link>
            </div>

            {/* History Section */}
            <div className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-2">
              <span className="px-3 py-1 text-[11px] font-semibold text-gray-400">히스토리</span>
              {strategies.map((s) => {
                const isActive = s.strategyId === strategyId;
                return (
                  <Link
                    key={s.strategyId}
                    href={`/strategy/result/${s.strategyId}`}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 ${
                      isActive
                        ? 'border-[#90c2ff] bg-[#e8f3ff]'
                        : 'border-transparent hover:bg-gray-100'
                    }`}
                  >
                    <div
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${isActive ? 'bg-[#2272eb]' : 'bg-gray-300'}`}
                    />
                    <div className="flex flex-col gap-0.5">
                      <span
                        className={`text-[12px] font-semibold ${isActive ? 'text-[#1b64da]' : 'text-gray-700'}`}
                      >
                        {JOB_TYPE_LABELS[s.jobType]} · {INDUSTRY_LABELS[s.industryType]}
                      </span>
                      <span
                        className={`text-[11px] ${isActive ? 'text-[#4593e6]' : 'text-gray-400'}`}
                      >
                        {formatHistoryDate(s.createdDate)}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Sidebar Bottom */}
            <div className="flex items-center gap-1.5 border-t border-gray-100 px-4 py-3.5">
              <Settings2 className="h-3.5 w-3.5 text-gray-400" />
              <Link
                href="/my/strategy"
                className="text-[12px] font-medium text-gray-500 hover:text-gray-700"
              >
                포폴 전략 관리
              </Link>
            </div>
          </div>
        )}

        {/* Body */}
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 overflow-y-auto">
            {!strategy ? (
              <div className="flex flex-1 items-center justify-center">
                <p className="text-gray-500">전략을 찾을 수 없습니다.</p>
              </div>
            ) : (
              <div className="flex flex-1 flex-col gap-8 px-14 py-10">
                {/* Page Title */}
                <div className="flex flex-col gap-1">
                  <h1 className="text-[22px] font-bold text-gray-900">포폴 전략 결과</h1>
                  <p className="text-sm text-gray-500">
                    AI가 생성한 산업 맞춤형 포트폴리오 전략입니다. 생성 시 자동으로 저장됩니다.
                  </p>
                </div>

                {/* Meta Bar */}
                <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-5 py-3.5">
                  <div className="flex items-center gap-5">
                    {/* 직무 */}
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[11px] font-medium text-gray-400">직무</span>
                      <div className="flex items-center gap-1.5">
                        {strategy.jobType === 'BACKEND' ? (
                          <Server className="h-3.5 w-3.5 text-[#2272eb]" />
                        ) : (
                          <Code className="h-3.5 w-3.5 text-[#2272eb]" />
                        )}
                        <span className="text-[13px] font-semibold text-gray-900">
                          {JOB_TYPE_LABELS[strategy.jobType]}
                        </span>
                      </div>
                    </div>
                    <div className="h-7 w-px bg-gray-200" />
                    {/* 타겟 산업 */}
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[11px] font-medium text-gray-400">타겟 산업</span>
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-[#1557a0]" />
                        <span className="text-[13px] font-semibold text-gray-900">
                          {INDUSTRY_LABELS[strategy.industryType]}
                        </span>
                      </div>
                    </div>
                    <div className="h-7 w-px bg-gray-200" />
                    {/* 기반 경험 */}
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[11px] font-medium text-gray-400">기반 경험</span>
                      <div className="flex items-center gap-1.5">
                        <Layers className="h-3.5 w-3.5 text-gray-600" />
                        <span className="text-[13px] font-semibold text-gray-900">
                          {strategy.experienceTotalCount ?? 0}개 경험 선택됨
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 rounded-full bg-[#e6f9f2] px-2.5 py-1.5">
                      <CircleCheck className="h-3 w-3 text-[#127848]" />
                      <span className="text-[11px] font-semibold text-[#127848]">저장됨</span>
                    </div>
                    <span className="text-[12px] text-gray-400">
                      {formatCreatedDate(strategy.createdDate)}
                    </span>
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="flex items-center gap-1.5 rounded-lg border border-gray-100 px-3 py-1.5 hover:bg-gray-50"
                    >
                      <Trash2 className="h-3.5 w-3.5 text-red-500" />
                      <span className="text-[12px] font-medium text-red-500">삭제하기</span>
                    </button>
                  </div>
                </div>

                {/* Result Area */}
                {!strategy.detail ? (
                  <div className="flex flex-1 items-center justify-center py-20">
                    <p className="text-gray-400">분석 결과가 없습니다.</p>
                  </div>
                ) : (
                  <div className="flex gap-6">
                    {/* Strategy Column (left, fill) */}
                    <div className="flex flex-1 flex-col gap-4">
                      {/* Header */}
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#c9e2ff]">
                          <Sparkles className="h-3.5 w-3.5 text-[#2272eb]" />
                        </div>
                        <span className="text-[15px] font-bold text-gray-900">AI 전략 분석</span>
                      </div>

                      {/* Strategy Card */}
                      <div className="flex flex-col gap-5 rounded-xl border border-gray-100 p-6">
                        {/* Section 1: 핵심 포지셔닝 메시지 */}
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-1.5">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2272eb]">
                              <span className="text-[11px] font-bold text-white">1</span>
                            </div>
                            <span className="text-[13px] font-bold text-gray-900">
                              핵심 포지셔닝 메시지
                            </span>
                          </div>
                          <div className="rounded-lg border border-[#c9e2ff] bg-[#e8f3ff] px-4 py-3.5">
                            <p className="text-[13px] leading-[1.7] text-[#1557a0]">
                              {strategy.detail.oneLinePositioning}
                            </p>
                          </div>
                        </div>

                        <div className="h-px bg-gray-100" />

                        {/* Section 2: 경험별 전략 포인트 */}
                        <div className="flex flex-col gap-2.5">
                          <div className="flex items-center gap-1.5">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2272eb]">
                              <span className="text-[11px] font-bold text-white">2</span>
                            </div>
                            <span className="text-[13px] font-bold text-gray-900">
                              경험별 전략 포인트
                            </span>
                          </div>
                          <div className="flex flex-col gap-2.5">
                            {strategy.detail.orderedExperiences.map((oe) => {
                              const exp = expMap[oe.experienceId];
                              const expType: ExperienceType = exp?.experienceType ?? 'PROJECT';
                              return (
                                <div
                                  key={oe.experienceId}
                                  className="flex gap-3 rounded-lg border border-gray-100 px-3.5 py-3"
                                >
                                  <span
                                    className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${EXP_TYPE_BADGE[expType]}`}
                                  >
                                    {EXP_TYPE_LABELS[expType]}
                                  </span>
                                  <div className="flex flex-1 flex-col gap-1">
                                    <span className="text-[12px] font-bold text-gray-800">
                                      {oe.title}
                                    </span>
                                    <p className="text-[12px] leading-[1.6] text-gray-500">
                                      {oe.reason}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="h-px bg-gray-100" />

                        {/* Section 3: 경험 정렬 전략 */}
                        <div className="flex flex-col gap-2.5">
                          <div className="flex items-center gap-1.5">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2272eb]">
                              <span className="text-[11px] font-bold text-white">3</span>
                            </div>
                            <span className="text-[13px] font-bold text-gray-900">
                              경험 정렬 전략
                            </span>
                          </div>
                          <div className="overflow-hidden rounded-lg border border-gray-100">
                            {strategy.detail.orderedExperiences.map((oe, idx) => {
                              const isLast = idx === strategy.detail!.orderedExperiences.length - 1;
                              return (
                                <div
                                  key={oe.experienceId}
                                  className={`flex items-start gap-3 px-3.5 py-3 ${!isLast ? 'border-b border-gray-100' : ''}`}
                                >
                                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#c9e2ff]">
                                    <span className="text-[11px] font-bold text-[#1b64da]">
                                      {oe.order}
                                    </span>
                                  </div>
                                  <div className="flex flex-1 flex-col gap-0.5">
                                    <span className="text-[12px] font-semibold text-gray-800">
                                      {oe.order}번 — {oe.title}
                                    </span>
                                    <p className="text-[12px] leading-normal text-gray-500">
                                      {oe.reason}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Data Column (right, w-75) */}
                    <div className="flex w-75 shrink-0 flex-col gap-4">
                      {/* Header */}
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100">
                          <LayoutList className="h-3.5 w-3.5 text-blue-600" />
                        </div>
                        <span className="text-[15px] font-bold text-gray-900">구조화 데이터</span>
                      </div>

                      {/* Keywords Card */}
                      <div className="flex flex-col gap-3 rounded-xl border border-gray-100 px-4 py-4.5">
                        <div className="flex items-center gap-1.5">
                          <Tag className="h-3.5 w-3.5 text-gray-500" />
                          <span className="text-[12px] font-bold text-gray-700">강조 키워드</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {strategy.detail.highlightKeywords.map((kw) => (
                            <span
                              key={kw}
                              className="rounded-full border border-[#90c2ff] bg-[#e8f3ff] px-2.5 py-1.5 text-[12px] font-semibold text-[#1b64da]"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Strength Card */}
                      <div className="flex flex-col gap-3 rounded-xl border border-gray-100 px-4 py-4.5">
                        <div className="flex items-center gap-1.5">
                          <Zap className="h-3.5 w-3.5 text-gray-500" />
                          <span className="text-[12px] font-bold text-gray-700">강조 역량</span>
                        </div>
                        <div className="flex flex-col gap-2.5">
                          {strategy.detail.orderedExperiences.map((oe) => (
                            <div key={oe.experienceId} className="flex items-start gap-2">
                              <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2272eb]" />
                              <p className="text-[12px] leading-normal text-gray-700">
                                {oe.reason}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* KPI Checklist Card */}
                      <div className="flex flex-col gap-2.5 rounded-xl border border-gray-100 px-4 py-4.5">
                        <div className="flex items-center gap-1.5">
                          <ChartColumnBig className="h-3.5 w-3.5 text-gray-500" />
                          <span className="text-[12px] font-bold text-gray-700">
                            KPI 체크리스트
                          </span>
                        </div>
                        <div className="flex flex-col gap-2">
                          {strategy.detail.kpiExamples.map((item) => (
                            <div key={item} className="flex items-start gap-2">
                              <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
                              <p className="text-[12px] leading-normal text-gray-700">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Improve Guide Card */}
                      <div className="flex flex-col gap-3 rounded-xl border border-[#fde68a] bg-[#fffbeb] px-4 py-4.5">
                        <div className="flex items-center gap-1.5">
                          <TriangleAlert className="h-3.5 w-3.5 text-[#d97706]" />
                          <span className="text-[12px] font-bold text-[#92400e]">보완 가이드</span>
                        </div>
                        <div className="h-px bg-[#fde68a]" />
                        <div className="flex flex-col gap-1">
                          <span className="text-[11px] font-bold text-[#b45309]">
                            경험 수치 보강
                          </span>
                          <p className="text-[11px] leading-[1.6] text-[#92400e]">
                            {strategy.detail.techNarrativeGuide}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
