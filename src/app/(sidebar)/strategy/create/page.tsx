'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  PanelLeftClose,
  Plus,
  Settings2,
  ExternalLink,
  Check,
  ChevronRight,
  Code,
  Server,
  ChevronDown,
  Info,
  Sparkles,
  Timer,
  Calendar,
  X,
  Briefcase,
} from 'lucide-react';
import { mockExperiences } from '@/mocks/experience.mock';
import { mockStrategies } from '@/mocks/strategy.mock';
import type { Experience, ExperienceType } from '@/features/experience/types';
import type { StrategyJobType } from '@/features/strategy/types';
import type { IndustryType } from '@/features/industry/types';
import Header from '@/shared/components/layout/Header';
import Footer from '@/shared/components/layout/Footer';

const EXP_TYPE_LABELS: Record<ExperienceType, string> = {
  CAREER: '경력',
  PROJECT: '프로젝트',
  EDUCATION: '교육',
  COMPETITION: '수상/공모전',
  OTHER: '기타',
};

const EXP_TYPE_BADGE_CHECKED: Record<ExperienceType, string> = {
  CAREER: 'bg-[#e6f9f2] border border-[#b2e8d4] text-[#127848]',
  PROJECT: 'bg-[#e8f3ff] border border-[#90c2ff] text-[#2272eb]',
  EDUCATION: 'bg-blue-50 border border-blue-200 text-blue-700',
  COMPETITION: 'bg-purple-50 border border-purple-200 text-purple-700',
  OTHER: 'bg-orange-50 border border-orange-200 text-orange-700',
};

const EXP_TYPE_BADGE_UNCHECKED = 'bg-gray-100 border border-gray-200 text-gray-600';

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

const JOB_TYPE_LABELS: Record<StrategyJobType, string> = {
  FRONTEND: '프론트엔드',
  BACKEND: '백엔드',
};

function toDisplayDate(date: string): string {
  if (!date) return '';
  return date.slice(0, 7).replace('-', '.');
}

function formatHistoryDate(iso: string): string {
  return iso.slice(0, 10).replace(/-/g, '.');
}

export default function StrategyCreatePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedExpIds, setSelectedExpIds] = useState<Set<number>>(
    new Set(mockExperiences.map((e) => e.id)),
  );
  const [detailExp, setDetailExp] = useState<Experience | null>(null);
  const [selectedJob, setSelectedJob] = useState<StrategyJobType>('FRONTEND');
  const [isIndustryOn, setIsIndustryOn] = useState(true);
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType>('FINTECH_FINANCIAL');
  const [isIndustryDropdownOpen, setIsIndustryDropdownOpen] = useState(false);

  function handleToggleExp(id: number) {
    setSelectedExpIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const selectedCount = selectedExpIds.size;

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Header />

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
              <button
                type="button"
                className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2.5 text-[13px] font-semibold text-white hover:bg-blue-700"
              >
                <Plus className="h-3.5 w-3.5" />새 포폴 전략 생성
              </button>
            </div>

            {/* History Section */}
            <div className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-2">
              <span className="px-3 py-1 text-[11px] font-semibold text-gray-400">히스토리</span>
              {mockStrategies.map((s) => (
                <Link
                  key={s.strategyId}
                  href={`/strategy/result/${s.strategyId}`}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 hover:bg-gray-100"
                >
                  <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[12px] font-semibold text-gray-700">
                      {JOB_TYPE_LABELS[s.jobType]} · {INDUSTRY_LABELS[s.industryType]}
                    </span>
                    <span className="text-[11px] text-gray-400">
                      {formatHistoryDate(s.createdDate)}
                    </span>
                  </div>
                </Link>
              ))}
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
        <div className="flex flex-col flex-1">
          <div className="flex flex-1">
            {/* Main Area */}
            <div className="flex flex-1 flex-col gap-8 overflow-y-auto px-14 py-10">
              {/* Page Title */}
              <div className="flex flex-col gap-1">
                <h1 className="text-[22px] font-bold text-gray-900">포폴 전략 생성</h1>
                <p className="text-sm text-gray-500">
                  경험과 조건을 설정하여 나만의 포트폴리오 전략을 생성하세요
                </p>
              </div>

              {/* Two Col */}
              <div className="flex flex-1 gap-6">
                {/* Left Panel: Experience Selection */}
                <div className="flex flex-1 flex-col gap-4">
                  {/* Experience Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-base font-bold text-gray-900">내 경험 선택</span>
                      <span className="text-[12px] text-gray-400">
                        포트폴리오에 포함할 경험을 선택하세요 (기본: 전체 선택)
                      </span>
                    </div>
                    <Link
                      href="/my/experience"
                      className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-[12px] font-medium text-gray-600 hover:bg-gray-50"
                    >
                      <ExternalLink className="h-3 w-3 text-gray-500" />
                      경험 등록하기
                    </Link>
                  </div>

                  {/* Experience List */}
                  {mockExperiences.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-4 py-20">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                        <Briefcase className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="flex flex-col items-center gap-1.5 text-center">
                        <p className="text-[15px] font-semibold text-gray-900">
                          등록된 경험이 없어요
                        </p>
                        <p className="text-[13px] text-gray-500">
                          나의 경험을 먼저 등록하고 포트폴리오 전략을 생성하세요
                        </p>
                      </div>
                      <Link
                        href="/my/experience"
                        className="rounded-lg bg-gray-900 px-4 py-2 text-[13px] font-semibold text-white hover:bg-gray-700"
                      >
                        경험 등록하기
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2.5">
                      {mockExperiences.map((exp) => {
                        const isChecked = selectedExpIds.has(exp.id);
                        return (
                          <div
                            key={exp.id}
                            className={`flex items-center gap-3 rounded-[10px] border px-4 py-3.5 ${
                              isChecked ? 'border-blue-100 bg-blue-50' : 'border-gray-200 bg-white'
                            }`}
                          >
                            {/* Checkbox */}
                            <button
                              type="button"
                              onClick={() => handleToggleExp(exp.id)}
                              className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded ${
                                isChecked
                                  ? 'bg-[#2272eb]'
                                  : 'border-[1.5px] border-gray-300 bg-white'
                              }`}
                              aria-label={isChecked ? '선택 해제' : '선택'}
                            >
                              {isChecked && (
                                <Check className="h-2.75 w-2.75 text-white" strokeWidth={3} />
                              )}
                            </button>

                            {/* Type Badge */}
                            <span
                              className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                                isChecked
                                  ? EXP_TYPE_BADGE_CHECKED[exp.experienceType]
                                  : EXP_TYPE_BADGE_UNCHECKED
                              }`}
                            >
                              {EXP_TYPE_LABELS[exp.experienceType]}
                            </span>

                            {/* Info */}
                            <div className="flex flex-1 flex-col gap-0.5">
                              <span
                                className={`text-[13px] font-semibold ${isChecked ? 'text-gray-900' : 'text-gray-700'}`}
                              >
                                {exp.title}
                              </span>
                              <span
                                className={`text-[12px] ${isChecked ? 'text-gray-500' : 'text-gray-400'}`}
                              >
                                {toDisplayDate(exp.startDate)}
                                {exp.endDate ? ` – ${toDisplayDate(exp.endDate)}` : ' – 현재'}
                              </span>
                            </div>

                            {/* Detail Button */}
                            <button
                              type="button"
                              onClick={() => setDetailExp(exp)}
                              className={`flex shrink-0 items-center gap-1 rounded-md border px-2.5 py-1.5 text-[11px] font-medium ${
                                isChecked
                                  ? 'border-[#90c2ff] text-[#2272eb] hover:bg-blue-100'
                                  : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                              }`}
                            >
                              상세보기
                              <ChevronRight
                                className={`h-2.5 w-2.5 ${isChecked ? 'text-[#4593e6]' : 'text-gray-400'}`}
                              />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Right Panel: Conditions */}
                <div className="flex w-80 shrink-0 flex-col gap-4">
                  {/* Cond Card */}
                  <div className="flex flex-col gap-4 rounded-xl border border-gray-100 p-5">
                    <h2 className="text-base font-bold text-gray-900">조건 설정</h2>
                    <div className="h-px bg-gray-100" />

                    {/* Job Type */}
                    <div className="flex flex-col gap-2.5">
                      <span className="text-[13px] font-semibold text-gray-700">직무 선택</span>
                      <div className="flex gap-2">
                        {(['FRONTEND', 'BACKEND'] as StrategyJobType[]).map((job) => {
                          const isActive = selectedJob === job;
                          return (
                            <button
                              key={job}
                              type="button"
                              onClick={() => setSelectedJob(job)}
                              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border py-2.5 text-[13px] font-semibold transition-colors ${
                                isActive
                                  ? 'border-[#2272eb] bg-[#2272eb] text-white'
                                  : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              {job === 'FRONTEND' ? (
                                <Code className="h-3.5 w-3.5" />
                              ) : (
                                <Server className="h-3.5 w-3.5" />
                              )}
                              {JOB_TYPE_LABELS[job]}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Industry */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[13px] font-semibold text-gray-700">
                            타겟 산업 설정
                          </span>
                          <span className="text-[11px] text-gray-400">산업 특화 여부</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[11px] font-bold ${isIndustryOn ? 'text-[#2272eb]' : 'text-gray-400'}`}
                          >
                            {isIndustryOn ? 'ON' : 'OFF'}
                          </span>
                          <button
                            type="button"
                            onClick={() => setIsIndustryOn((v) => !v)}
                            className={`relative h-5 w-9 rounded-full transition-colors ${
                              isIndustryOn ? 'bg-[#2272eb]' : 'bg-gray-300'
                            }`}
                            aria-label="산업 특화 토글"
                          >
                            <span
                              className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                                isIndustryOn ? '' : '-translate-x-4'
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      {isIndustryOn && (
                        <div className="flex flex-col gap-1.5">
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setIsIndustryDropdownOpen((v) => !v)}
                              className="flex w-full items-center justify-between rounded-lg border-[1.5px] border-[#4593e6] px-3 py-2.5"
                            >
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-[#1557a0]" />
                                <span className="text-[13px] font-medium text-gray-900">
                                  {INDUSTRY_LABELS[selectedIndustry]}
                                </span>
                              </div>
                              <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
                            </button>
                            {isIndustryDropdownOpen && (
                              <div className="absolute left-0 right-0 top-full z-10 mt-1 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                                {(Object.keys(INDUSTRY_LABELS) as IndustryType[]).map((ind) => (
                                  <button
                                    key={ind}
                                    type="button"
                                    onClick={() => {
                                      setSelectedIndustry(ind);
                                      setIsIndustryDropdownOpen(false);
                                    }}
                                    className={`flex w-full items-center gap-2 px-3 py-2.5 text-left text-[13px] hover:bg-gray-50 ${
                                      selectedIndustry === ind
                                        ? 'font-semibold text-[#2272eb]'
                                        : 'text-gray-700'
                                    }`}
                                  >
                                    {INDUSTRY_LABELS[ind]}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <Info className="h-3 w-3 text-[#4593e6]" />
                            <span className="text-[11px] text-[#4593e6]">
                              공고 상세 페이지에서 진입 시 자동으로 채워집니다
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="h-px bg-gray-100" />

                    {/* Selected Summary */}
                    <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3.5 py-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[11px] text-gray-500">선택된 경험</span>
                        <span className="text-[13px] font-bold text-gray-900">
                          {selectedCount}개 선택됨
                        </span>
                      </div>
                      <div className="flex flex-col items-end gap-0.5">
                        <span className="text-[11px] text-gray-500">직무 · 산업</span>
                        <span className="text-[12px] font-semibold text-[#1b64da]">
                          {JOB_TYPE_LABELS[selectedJob]}
                          {isIndustryOn ? ` · ${INDUSTRY_LABELS[selectedIndustry]}` : ''}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Usage Card */}
                  <div className="flex items-center justify-between rounded-[10px] border border-blue-100 bg-blue-50 px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[11px] font-medium text-blue-600">오늘 사용 횟수</span>
                      <div className="flex items-center gap-1">
                        <span className="text-[20px] font-bold text-blue-700">1</span>
                        <span className="text-[13px] font-medium text-blue-400">/ 1회</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                      <div className="h-2.5 w-2.5 rounded-full bg-blue-200" />
                      <div className="h-2.5 w-2.5 rounded-full bg-blue-200" />
                    </div>
                  </div>

                  {/* Generate Button */}
                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-blue-600 py-3.5 text-[15px] font-bold text-white hover:bg-blue-700"
                  >
                    <Sparkles className="h-4 w-4" />
                    포트폴리오 전략 생성
                  </button>

                  {/* Button Sub */}
                  <div className="flex items-center justify-center gap-1">
                    <Timer className="h-3 w-3 text-gray-400" />
                    <span className="text-[11px] text-gray-400">
                      생성 후 자동 저장 · 결과 페이지로 이동
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>

      {/* Detail Modal */}
      {detailExp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setDetailExp(null)}
        >
          <div
            className="w-125 overflow-hidden rounded-xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex flex-col gap-1 border-b border-gray-100 px-6 pb-5 pt-6">
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${EXP_TYPE_BADGE_CHECKED[detailExp.experienceType]}`}
                >
                  {EXP_TYPE_LABELS[detailExp.experienceType]}
                </span>
                <div className="flex-1" />
                <button
                  type="button"
                  onClick={() => setDetailExp(null)}
                  className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-gray-100"
                  aria-label="닫기"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </div>
              <h2 className="text-[20px] font-bold text-gray-900">{detailExp.title}</h2>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-gray-400" />
                <span className="text-[13px] text-gray-400">
                  {toDisplayDate(detailExp.startDate)}
                  {detailExp.endDate ? ` – ${toDisplayDate(detailExp.endDate)}` : ' – 현재'}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex flex-col gap-4 p-6">
              <span className="text-[14px] font-semibold text-gray-900">경험 내용</span>
              <div className="h-px bg-gray-100" />
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-[14px] leading-[1.6] text-gray-700">
                  {detailExp.experienceContent ?? '경험 내용이 없습니다.'}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end border-t border-gray-100 px-6 py-4">
              <button
                type="button"
                onClick={() => setDetailExp(null)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-[14px] font-medium text-gray-700 hover:bg-gray-50"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
