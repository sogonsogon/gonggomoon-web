'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  PanelLeftClose,
  Plus,
  Settings2,
  Info,
  Sparkles,
  Timer,
  FileText,
  RefreshCw,
  X,
  ListFilter,
  ExternalLink,
  CircleCheck,
  FolderOpen,
} from 'lucide-react';
import { mockInterviewSets } from '@/mocks/interview.mock';
import { mockFiles } from '@/mocks/file.mock';
import type { File } from '@/features/file/types';

function formatHistoryDate(iso: string): string {
  return iso.slice(0, 10).replace(/-/g, '.');
}

function formatHistoryTitle(iso: string): string {
  const d = new Date(iso);
  const date = d.toISOString().slice(0, 10).replace(/-/g, '');
  const time = d.toISOString().slice(11, 19).replace(/:/g, '');
  return `면접질문_${date}_${time}`;
}

function formatFileSize(bytes: number): string {
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`;
  if (bytes >= 1_000) return `${(bytes / 1_000).toFixed(0)} KB`;
  return `${bytes} B`;
}

function formatFileDate(iso: string): string {
  return iso.slice(0, 10).replace(/-/g, '.');
}

const portfolioFiles = mockFiles.filter((f) => f.category === 'PORTFOLIO');

export default function InterviewCreatePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedPortfolio, setSelectedPortfolio] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingPortfolio, setPendingPortfolio] = useState<File | null>(null);

  const todayUsage = 1;
  const dailyLimit = 1;
  const isLimitReached = todayUsage >= dailyLimit;

  function handleOpenModal() {
    setPendingPortfolio(selectedPortfolio);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setPendingPortfolio(null);
  }

  function handleConfirmModal() {
    setSelectedPortfolio(pendingPortfolio);
    setIsModalOpen(false);
    setPendingPortfolio(null);
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
              <button
                type="button"
                className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2.5 text-[13px] font-semibold text-white hover:bg-blue-700"
              >
                <Plus className="h-3.5 w-3.5" />새 면접 생성
              </button>
            </div>

            {/* History Section */}
            <div className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-2">
              <span className="px-3 py-1 text-[11px] font-semibold text-gray-400">히스토리</span>
              {mockInterviewSets.map((s) => (
                <Link
                  key={s.interviewSetId}
                  href={`/interview/result/${s.interviewSetId}`}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 hover:bg-gray-100"
                >
                  <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[12px] font-semibold text-gray-700">
                      {formatHistoryTitle(s.createdAt)}
                    </span>
                    <span className="text-[11px] text-gray-400">
                      {formatHistoryDate(s.createdAt)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Sidebar Bottom */}
            <div className="flex items-center gap-1.5 border-t border-gray-100 px-4 py-3.5">
              <Settings2 className="h-3.5 w-3.5 text-gray-400" />
              <Link
                href="/my/interview"
                className="text-[12px] font-medium text-gray-500 hover:text-gray-700"
              >
                면접 질문 관리
              </Link>
            </div>
          </div>
        )}

        {/* Body */}
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1">
            {/* Main Area */}
            <div className="flex flex-1 flex-col gap-8 overflow-y-auto px-14 py-10">
              {/* Page Title */}
              <div className="flex flex-col gap-1">
                <h1 className="text-[22px] font-bold text-gray-900">면접 질문 생성</h1>
                <p className="text-sm text-gray-500">
                  포트폴리오를 선택하고 맞춤형 면접 질문을 생성하세요
                </p>
              </div>

              {/* Two Col */}
              <div className="flex flex-1 gap-7">
                {/* Left Col: Info Card */}
                <div className="flex flex-1 flex-col gap-4">
                  <div className="overflow-hidden rounded-xl border border-blue-100 bg-white">
                    {/* Info Card Header */}
                    <div className="flex items-center gap-3 bg-blue-50 px-5 py-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                        <Info className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[14px] font-bold text-blue-800">
                          면접 질문 생성 안내
                        </span>
                        <span className="text-[12px] text-blue-600">
                          면접 질문은 선택한 포트폴리오를 기반으로 생성됩니다
                        </span>
                      </div>
                    </div>

                    {/* Info List */}
                    <div className="flex flex-col">
                      {/* Info 1 */}
                      <div className="flex gap-3 border-b border-blue-50 px-5 py-3.5">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[13px] font-semibold text-gray-800">
                            면접 질문 5개 제공
                          </span>
                          <span className="text-xs leading-normal text-gray-500">
                            생성 시 직무와 포트폴리오를 기반으로 한 맞춤형 면접 질문 5개가
                            제공됩니다
                          </span>
                        </div>
                      </div>

                      {/* Info 2 */}
                      <div className="flex gap-3 border-b border-blue-50 px-5 py-3.5">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[13px] font-semibold text-gray-800">
                            하루 1회 생성 제한
                          </span>
                          <span className="text-xs leading-normal text-gray-500">
                            면접 질문 생성은 하루 최대 1회 가능합니다 (오늘 1회 사용)
                          </span>
                        </div>
                      </div>

                      {/* Info 3 */}
                      <div className="flex gap-3 border-b border-blue-50 px-5 py-3.5">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[13px] font-semibold text-gray-800">
                            포트폴리오 선택 시 맞춤형 질문 생성
                          </span>
                          <span className="text-xs leading-normal text-gray-500">
                            포트폴리오를 선택하면 해당 내용을 분석하여 더 정교한 면접 질문을
                            생성합니다. 선택하지 않으면 직무 기반 일반 질문이 제공됩니다
                          </span>
                        </div>
                      </div>

                      {/* Info 4: Coming Soon */}
                      <div className="flex gap-3 rounded-b-xl px-5 py-3.5">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-300" />
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-blue-600">
                              Coming Soon
                            </span>
                            <span className="text-[13px] font-semibold text-gray-500">
                              AI 모의 면접 기능 제공 예정
                            </span>
                          </div>
                          <span className="text-xs leading-normal text-gray-400">
                            생성된 질문에 직접 답변하고 AI 평가를 받는 모의 면접 기능이 추후 제공될
                            예정입니다
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Panel */}
                <div className="flex w-80 shrink-0 flex-col gap-4">
                  {/* Portfolio Section */}
                  <div className="flex flex-col gap-2.5 rounded-xl border border-gray-100 p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-bold text-gray-700">포트폴리오 선택</span>
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-500">
                        필수
                      </span>
                    </div>

                    {selectedPortfolio ? (
                      /* Selected State */
                      <>
                        <div className="flex items-center gap-2.5 rounded-lg border-[1.5px] border-blue-300 bg-blue-50 px-3.5 py-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-100">
                            <FileText className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[13px] font-semibold text-gray-900">
                              {selectedPortfolio.title}
                            </span>
                            <span className="text-[11px] text-gray-500">
                              {formatFileSize(selectedPortfolio.sizeBytes)} · 포폴
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleOpenModal}
                          className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-blue-200 bg-white py-2.5 text-[12px] font-medium text-blue-600 hover:bg-blue-50"
                        >
                          <RefreshCw className="h-3 w-3 text-blue-500" />
                          다른 포트폴리오 선택
                        </button>
                      </>
                    ) : (
                      /* Empty State (US-12-Empty) */
                      <>
                        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-10 py-9">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                            <FileText className="h-5 w-5 text-gray-400" />
                          </div>
                          <div className="flex flex-col items-center gap-1 text-center">
                            <span className="text-[13px] font-semibold text-gray-700">
                              포트폴리오를 선택해 주세요
                            </span>
                            <span className="text-[12px] text-gray-400">
                              우측 버튼을 눌러 포트폴리오를 선택하세요
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleOpenModal}
                          className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-600 py-2.5 text-[13px] font-semibold text-white hover:bg-blue-700"
                        >
                          포트폴리오 선택하기
                        </button>
                      </>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gray-100" />

                  {/* Usage Card */}
                  <div className="flex items-center justify-between rounded-[10px] border border-blue-100 bg-blue-50 px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[11px] font-medium text-blue-600">오늘 사용 횟수</span>
                      <div className="flex items-center gap-1">
                        <span className="text-[20px] font-bold text-blue-700">{todayUsage}</span>
                        <span className="text-[13px] font-medium text-blue-400">
                          / {dailyLimit}회
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: dailyLimit }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-2.5 w-2.5 rounded-full ${i < todayUsage ? 'bg-blue-500' : 'bg-blue-200'}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Generate Button */}
                  <button
                    type="button"
                    disabled={!selectedPortfolio || isLimitReached}
                    className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-blue-600 py-3.5 text-[15px] font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Sparkles className="h-4 w-4" />
                    면접 질문 생성
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
        </div>
      </div>

      {/* Portfolio Selection Modal (US-12-Modal / US-12-Modal-Empty) */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={handleCloseModal}
        >
          <div
            className="flex w-150 max-h-160 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <div className="flex flex-col gap-0.5">
                <span className="text-[18px] font-bold text-gray-900">포트폴리오 선택</span>
                <span className="text-[13px] text-gray-500">
                  면접 질문 생성에 사용할 포트폴리오를 선택하세요
                </span>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                aria-label="닫기"
                className="rounded-md p-1 hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-6 py-4">
              {portfolioFiles.length === 0 ? (
                /* US-12-Modal-Empty */
                <div className="flex flex-1 flex-col items-center justify-center gap-4 py-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                    <FolderOpen className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="flex flex-col items-center gap-1.5 text-center">
                    <span className="text-[15px] font-semibold text-gray-900">
                      등록된 포트폴리오가 없어요
                    </span>
                    <span className="text-[13px] text-gray-500">
                      내 파일 페이지에서 포트폴리오를 먼저 등록해 주세요
                    </span>
                  </div>
                  <Link
                    href="/my/file"
                    onClick={handleCloseModal}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-[13px] font-semibold text-white hover:bg-blue-700"
                  >
                    파일 등록하러 가기
                  </Link>
                </div>
              ) : (
                /* US-12-Modal */
                <>
                  {/* Filter Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <ListFilter className="h-3 w-3 text-gray-400" />
                      <span className="text-[12px] text-gray-500">포트폴리오 파일만 표시 중</span>
                    </div>
                    <Link
                      href="/my/file"
                      onClick={handleCloseModal}
                      className="flex items-center gap-1 rounded-md border border-gray-200 px-2.5 py-1 text-[11px] font-medium text-gray-600 hover:bg-gray-50"
                    >
                      <ExternalLink className="h-3 w-3 text-gray-500" />내 파일 관리
                    </Link>
                  </div>

                  {/* File List */}
                  <div className="flex flex-col gap-2">
                    {portfolioFiles.map((file) => {
                      const isPending = pendingPortfolio?.fileId === file.fileId;
                      return (
                        <button
                          key={file.fileId}
                          type="button"
                          onClick={() => setPendingPortfolio(file)}
                          className={`flex w-full items-center gap-3 rounded-[10px] border px-4 py-3.5 text-left transition-colors ${
                            isPending
                              ? 'border-[1.5px] border-blue-300 bg-blue-50'
                              : 'border-gray-100 bg-white hover:bg-gray-50'
                          }`}
                        >
                          {/* Radio */}
                          <div
                            className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border-[1.5px] ${
                              isPending ? 'border-blue-600 bg-blue-600' : 'border-gray-300 bg-white'
                            }`}
                          >
                            {isPending && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                          </div>

                          {/* File Icon */}
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
                              isPending ? 'bg-blue-100' : 'bg-gray-100'
                            }`}
                          >
                            <FileText
                              className={`h-3.75 w-3.75 ${isPending ? 'text-blue-600' : 'text-gray-400'}`}
                            />
                          </div>

                          {/* File Info */}
                          <div className="flex flex-1 flex-col gap-0.5">
                            <span
                              className={`text-[13px] font-semibold ${isPending ? 'text-gray-900' : 'text-gray-700'}`}
                            >
                              {file.title}
                            </span>
                            <span className="text-[11px] text-gray-400">
                              {formatFileSize(file.sizeBytes)} · {formatFileDate(file.createdAt)}{' '}
                              등록
                            </span>
                          </div>

                          {/* Check Badge */}
                          {isPending && (
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100">
                              <CircleCheck className="h-3 w-3 text-blue-600" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
              {/* Left: selection status */}
              <div className="flex items-center gap-1.5">
                {pendingPortfolio && portfolioFiles.length > 0 && (
                  <>
                    <CircleCheck className="h-3.5 w-3.5 text-blue-600" />
                    <span className="text-[12px] font-semibold text-blue-700">
                      {pendingPortfolio.title} 선택됨
                    </span>
                  </>
                )}
              </div>

              {/* Right: action buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-[14px] font-medium text-gray-700 hover:bg-gray-50"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleConfirmModal}
                  disabled={!pendingPortfolio || portfolioFiles.length === 0}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-[14px] font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  선택 완료
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
