'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  PanelLeftClose,
  Plus,
  Settings2,
  CircleCheck,
  Trash2,
  CircleHelp,
  Star,
} from 'lucide-react';
import { mockInterviewSets } from '@/mocks/interview.mock';
import type { QuestionLevel } from '@/features/interview/types';
import Header from '@/shared/components/layout/Header';
import Footer from '@/shared/components/layout/Footer';

const LEVEL_LABELS: Record<QuestionLevel, string> = {
  LOWER: '난이도 하',
  MIDDLE: '난이도 중',
  HIGH: '난이도 상',
};

function formatHistoryDate(iso: string): string {
  return iso.slice(0, 10).replace(/-/g, '.');
}

function formatHistoryTitle(iso: string): string {
  const d = new Date(iso);
  const date = d.toISOString().slice(0, 10).replace(/-/g, '');
  const time = d.toISOString().slice(11, 19).replace(/:/g, '');
  return `면접질문_${date}_${time}`;
}

function formatCreatedDate(iso: string): string {
  return iso.slice(0, 10).replace(/-/g, '.') + ' 생성';
}

const TIPS = [
  {
    title: 'STAR 기법 활용',
    desc: '경험 기반 질문에는 상황·과제·행동·결과를 구체적으로 서술하세요.',
  },
  {
    title: '숫자로 표현하기',
    desc: '성과는 가능한 한 수치로 표현해 신뢰도를 높이세요.',
  },
  {
    title: '역질문 준비',
    desc: '면접 말미에 기업과 직무에 대한 역질문을 1~2개 준비해 두세요.',
  },
];

export default function InterviewResultPage() {
  const params = useParams();
  const router = useRouter();
  const interviewId = Number(params.interviewId);

  const [interviewSets, setInterviewSets] = useState(mockInterviewSets);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const interview = interviewSets.find((s) => s.interviewSetId === interviewId);

  function handleDelete() {
    setInterviewSets((prev) => prev.filter((s) => s.interviewSetId !== interviewId));
    router.push('/interview/create');
  }

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
                <span className="text-[13px] font-semibold text-gray-700">면접 질문</span>
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
                href="/interview/create"
                className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2.5 text-[13px] font-semibold text-white hover:bg-blue-700"
              >
                <Plus className="h-3.5 w-3.5" />새 면접 생성
              </Link>
            </div>

            {/* History Section */}
            <div className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-2">
              <span className="px-3 py-1 text-[11px] font-semibold text-gray-400">히스토리</span>
              {interviewSets.map((s) => {
                const isActive = s.interviewSetId === interviewId;
                return (
                  <Link
                    key={s.interviewSetId}
                    href={`/interview/result/${s.interviewSetId}`}
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
                        className={`text-xs font-semibold ${isActive ? 'text-[#1b64da]' : 'text-gray-700'}`}
                      >
                        {formatHistoryTitle(s.createdAt)}
                      </span>
                      <span
                        className={`text-[11px] ${isActive ? 'text-[#4593e6]' : 'text-gray-400'}`}
                      >
                        {formatHistoryDate(s.createdAt)}
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
                href="/my/interview"
                className="text-xs font-medium text-gray-500 hover:text-gray-700"
              >
                면접 질문 관리
              </Link>
            </div>
          </div>
        )}

        {/* Body */}
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 overflow-y-auto">
            {!interview ? (
              <div className="flex flex-1 items-center justify-center">
                <p className="text-gray-500">면접 결과를 찾을 수 없습니다.</p>
              </div>
            ) : (
              <div className="flex flex-1 flex-col gap-8 px-14 py-10">
                {/* Page Title */}
                <div className="flex flex-col gap-1">
                  <h1 className="text-[22px] font-bold text-gray-900">면접 생성 결과</h1>
                  <p className="text-sm text-gray-500">
                    AI가 생성한 맞춤형 면접 질문입니다. 생성 시 자동으로 저장됩니다.
                  </p>
                </div>

                {/* Meta Bar */}
                <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-5 py-3.5">
                  <div className="flex items-center gap-5">
                    {/* 면접 제목 */}
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[11px] font-medium text-gray-400">면접 제목</span>
                      <span className="text-[13px] font-semibold text-gray-800">
                        {formatHistoryTitle(interview.createdAt)}
                      </span>
                    </div>
                    <div className="h-7 w-px bg-gray-200" />
                    {/* 기반 포트폴리오 */}
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[11px] font-medium text-gray-400">기반 포트폴리오</span>
                      <span className="text-[13px] font-semibold text-gray-800">
                        {interview.basePortfolio ?? '—'}
                      </span>
                    </div>
                    <div className="h-7 w-px bg-gray-200" />
                    {/* 질문 수 */}
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[11px] font-medium text-gray-400">질문 수</span>
                      <span className="text-[13px] font-semibold text-gray-800">
                        {interview.questionTotalCount ?? interview.contents?.length ?? 0}개
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 rounded-full bg-[#e6f9f2] px-2.5 py-1.5">
                      <CircleCheck className="h-3 w-3 text-[#127848]" />
                      <span className="text-[11px] font-semibold text-[#127848]">저장됨</span>
                    </div>
                    <span className="text-[12px] text-gray-400">
                      {formatCreatedDate(interview.createdAt)}
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

                {/* Content Area */}
                <div className="flex flex-1 gap-6">
                  {/* Left Col: Question List */}
                  <div className="flex flex-1 flex-col gap-4">
                    {/* Header */}
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100">
                        <CircleHelp className="h-3.5 w-3.5 text-blue-600" />
                      </div>
                      <span className="text-[15px] font-bold text-gray-900">면접 질문 목록</span>
                    </div>

                    {/* Questions */}
                    {!interview.contents || interview.contents.length === 0 ? (
                      <div className="flex flex-1 items-center justify-center py-20">
                        <p className="text-gray-400">질문이 없습니다.</p>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2.5">
                        {interview.contents.map((q, idx) => (
                          <div
                            key={q.questionId}
                            className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white px-5 py-4.5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-600">
                                Q{idx + 1}
                              </span>
                              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600">
                                {LEVEL_LABELS[q.questionLevel]}
                              </span>
                            </div>
                            <p className="text-[14px] font-medium leading-[1.6] text-gray-800">
                              {q.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right Panel: Tips */}
                  <div className="flex w-75 shrink-0 flex-col gap-4">
                    <div className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-white px-4 py-4.5">
                      {/* Tips Header */}
                      <div className="flex items-center gap-1.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#fff3e0]">
                          <Star className="h-3.5 w-3.5 text-amber-500" />
                        </div>
                        <span className="text-sm font-bold text-gray-900">면접 대비 팁</span>
                      </div>

                      {/* Tips List */}
                      <div className="flex flex-col gap-3.5">
                        {TIPS.map((tip) => (
                          <div key={tip.title} className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5">
                              <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                              <span className="text-xs font-bold text-gray-800">{tip.title}</span>
                            </div>
                            <p className="pl-3 text-[11px] leading-[1.6] text-gray-500">
                              {tip.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}
