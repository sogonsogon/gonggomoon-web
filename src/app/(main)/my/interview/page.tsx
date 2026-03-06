'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trash2, Calendar, MessageCircle, CirclePlus } from 'lucide-react';
import { mockInterviewSets } from '@/mocks/interview.mock';
import type { Interview } from '@/features/interview/types';
import Title from '@/shared/components/ui/Title';

function formatCreatedDate(isoDate: string): string {
  const d = new Date(isoDate);
  const y = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, '0');
  const da = String(d.getDate()).padStart(2, '0');
  return `${y}.${mo}.${da} 생성`;
}

export default function InterviewPage() {
  const [interviews, setInterviews] = useState<Interview[]>(mockInterviewSets);

  function handleDelete(interviewSetId: number) {
    setInterviews((prev) => prev.filter((i) => i.interviewSetId !== interviewSetId));
  }

  return (
    <div className="flex min-h-screen flex-col w-full bg-white">
      {/* Right Content */}
      <div className="flex flex-1 flex-col gap-8">
        {/* Page Title */}
        <Title
          title={'면접 질문'}
          description={'포트폴리오를 기반으로 생성된 면접 질문을 확인하고 관리하세요'}
        />

        {/* Count Row */}
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-medium text-gray-600">
            총 {interviews.length}개의 면접 질문
          </span>
        </div>

        {/* Card Grid or Empty State */}
        {interviews.length === 0 ? (
          <div className="flex h-90 flex-col items-center justify-center gap-4 rounded-xl border border-gray-200 bg-white">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <MessageCircle className="h-6 w-6 text-gray-400" />
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <p className="text-[15px] font-semibold text-gray-900">생성된 면접 질문이 없어요</p>
              <p className="text-[13px] text-gray-500">
                포트폴리오를 선택하고 맞춤형 면접 질문을 생성해 보세요
              </p>
            </div>
            <Link
              href="/interview/create"
              className="rounded-lg bg-gray-900 px-4 py-2 text-[13px] font-semibold text-white hover:bg-gray-700"
            >
              면접 질문 생성하기
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-5">
            {interviews.map((interview) => (
              <div
                key={interview.interviewSetId}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white"
              >
                {/* Card Top */}
                <div className="flex h-29.75 flex-col justify-between px-5 pb-4 pt-5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="line-clamp-3 text-[15px] font-semibold leading-snug text-gray-900">
                      {interview.basePortfolio ?? '면접 질문'}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDelete(interview.interviewSetId)}
                      aria-label="면접 질문 삭제"
                      className="mt-0.5 shrink-0"
                    >
                      <Trash2 className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-400">
                      {formatCreatedDate(interview.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-100" />

                {/* Card Bottom */}
                <div className="flex h-11 items-center justify-center px-4">
                  <Link
                    href={`/interview/result/${interview.interviewSetId}`}
                    className="flex w-full items-center justify-center rounded-lg py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50"
                  >
                    보기
                  </Link>
                </div>
              </div>
            ))}

            {/* Add Interview Button */}
            <Link
              href="/interview/create"
              className="flex h-41 flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50"
            >
              <CirclePlus className="h-4.5 w-4.5 text-gray-500" />
              <span className="text-[14px] font-semibold text-gray-600">면접 질문 생성</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
