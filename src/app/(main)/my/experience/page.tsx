'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  CirclePlus,
  Pencil,
  Trash2,
  X,
  Briefcase,
  Files,
  FileText,
  CircleCheck,
  FolderOpen,
  Check,
} from 'lucide-react';
import { mockExperiences } from '@/mocks/experience.mock';
import { mockFiles } from '@/mocks/file.mock';
import type { Experience, ExperienceType } from '@/features/experience/types';
import type { FileCategory } from '@/features/file/types';
import MyNav from '@/features/user/components/MyNav';
import MyTitle from '@/features/user/components/MyTitle';

type DraftData = {
  title: string;
  experienceType: ExperienceType;
  startDate: string;
  endDate: string;
  experienceContent: string;
};

type ExperienceCard = Experience & {
  isEditing: boolean;
  draft: DraftData;
};

const EXP_TYPE_LABELS: Record<ExperienceType, string> = {
  CAREER: '경력',
  PROJECT: '프로젝트',
  EDUCATION: '교육',
  COMPETITION: '수상/공모전',
  OTHER: '기타',
};

const EXP_TYPE_BADGE: Record<ExperienceType, string> = {
  CAREER: 'bg-blue-50 text-blue-700',
  PROJECT: 'bg-[#e8f3ff] text-[#2272eb]',
  EDUCATION: 'bg-[#e6f9f2] text-[#127848]',
  COMPETITION: 'bg-purple-50 text-purple-700',
  OTHER: 'bg-gray-100 text-gray-600',
};

const FILE_CATEGORY_LABEL: Record<FileCategory, string> = {
  PORTFOLIO: '포폴',
  RESUME: '이력서',
  OTHER: '기타',
};

const MAX_FILE_SELECTIONS = 2;

function toDisplayDate(date: string): string {
  if (!date) return '';
  return date.slice(0, 7).replace('-', '.');
}

function formatFileSize(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  return `${mb < 0.1 ? mb.toFixed(2) : mb.toFixed(1)} MB`;
}

function formatUploadDate(iso: string): string {
  return iso.slice(0, 10).replace(/-/g, '.');
}

function initDraft(exp: Experience): DraftData {
  return {
    title: exp.title,
    experienceType: exp.experienceType,
    startDate: toDisplayDate(exp.startDate),
    endDate: exp.endDate ? toDisplayDate(exp.endDate) : '',
    experienceContent: exp.experienceContent ?? '',
  };
}

function initCard(exp: Experience): ExperienceCard {
  return { ...exp, isEditing: false, draft: initDraft(exp) };
}

export default function ExperiencePage() {
  const [cards, setCards] = useState<ExperienceCard[]>(mockExperiences.map(initCard));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFileIds, setSelectedFileIds] = useState<Set<number>>(new Set());
  const nextIdRef = useRef(-1);

  function handleStartEdit(id: number) {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isEditing: true, draft: initDraft(c) } : c)),
    );
  }

  function handleSave(id: number) {
    setCards((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        return {
          ...c,
          title: c.draft.title,
          experienceType: c.draft.experienceType,
          startDate: c.draft.startDate || c.startDate,
          endDate: c.draft.endDate || null,
          experienceContent: c.draft.experienceContent,
          isEditing: false,
        };
      }),
    );
  }

  function handleDelete(id: number) {
    setCards((prev) => prev.filter((c) => c.id !== id));
  }

  function updateDraft(id: number, field: keyof DraftData, value: string) {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, draft: { ...c.draft, [field]: value } } : c)),
    );
  }

  function handleAddExperience() {
    const tempId = nextIdRef.current--;
    const newCard: ExperienceCard = {
      id: tempId,
      title: '',
      experienceType: 'PROJECT',
      experienceContent: '',
      startDate: '',
      endDate: null,
      isEditing: true,
      draft: {
        title: '',
        experienceType: 'PROJECT',
        startDate: '',
        endDate: '',
        experienceContent: '',
      },
    };
    setCards((prev) => [...prev, newCard]);
  }

  function handleToggleFile(fileId: number) {
    setSelectedFileIds((prev) => {
      if (prev.has(fileId)) {
        const next = new Set(prev);
        next.delete(fileId);
        return next;
      }
      if (prev.size >= MAX_FILE_SELECTIONS) return prev;
      const next = new Set(prev);
      next.add(fileId);
      return next;
    });
  }

  function handleOpenModal() {
    setSelectedFileIds(new Set());
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleExtract() {
    setIsModalOpen(false);
  }

  const hasFiles = mockFiles.length > 0;

  return (
    <div className="flex min-h-screen flex-col w-full bg-white">
      {/* Right Content */}
      <div className="flex flex-1 flex-col gap-8">
        {/* Page Title */}
        <MyTitle
          title={'내 경험'}
          description={'나의 경험을 기록하고 AI로 의미 있는 단위로 추출해보세요'}
        />

        {/* AI Extract Banner */}
        <div className="flex items-center justify-between gap-4 rounded-xl border border-blue-100 bg-blue-50 px-6 py-5">
          <div className="flex flex-1 items-center gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-blue-100">
              <Sparkles className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[15px] font-bold text-blue-900">AI 경험 추출</span>
              <span className="text-[13px] text-blue-800">
                업로드된 파일에서 AI가 의미 있는 경험 단위를 자동으로 추출해드립니다
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleOpenModal}
            className="shrink-0 rounded-lg bg-gray-900 px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-gray-700"
          >
            파일에서 추출하기
          </button>
        </div>

        {/* Count Row */}
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-medium text-gray-600">총 {cards.length}개의 경험</span>
        </div>

        {/* Experience Card List */}
        {cards.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-24">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <Briefcase className="h-6 w-6 text-gray-400" />
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <p className="text-[15px] font-semibold text-gray-900">아직 등록된 경험이 없어요</p>
              <p className="text-[13px] text-gray-500">
                나의 경험을 기록하고 AI로 의미있게 정리해 보세요
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddExperience}
              className="rounded-lg bg-gray-900 px-4 py-2 text-[13px] font-semibold text-white hover:bg-gray-700"
            >
              경험 추가하기
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {cards.map((card) => (
              <div
                key={card.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white"
              >
                {card.isEditing ? (
                  /* Edit Mode */
                  <>
                    <div className="flex items-center justify-between gap-3 border-b-2 border-blue-400 px-5 py-4">
                      <div className="flex flex-1 items-center gap-3">
                        {/* "수정 중" tag */}
                        <div className="flex shrink-0 items-center gap-1.5 rounded-md bg-blue-50 px-2 py-0.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                          <span className="text-[11px] font-semibold text-blue-700">수정 중</span>
                        </div>
                        {/* Type select */}
                        <select
                          value={card.draft.experienceType}
                          onChange={(e) =>
                            updateDraft(card.id, 'experienceType', e.target.value as ExperienceType)
                          }
                          className="w-40 shrink-0 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[13px] text-gray-800 focus:border-blue-400 focus:outline-none"
                        >
                          {(Object.keys(EXP_TYPE_LABELS) as ExperienceType[]).map((type) => (
                            <option key={type} value={type}>
                              {EXP_TYPE_LABELS[type]}
                            </option>
                          ))}
                        </select>
                        {/* Title input */}
                        <input
                          type="text"
                          value={card.draft.title}
                          onChange={(e) => updateDraft(card.id, 'title', e.target.value)}
                          placeholder="경험 제목을 입력하세요"
                          className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-[14px] text-gray-900 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
                        />
                      </div>
                      <button type="button" onClick={() => handleDelete(card.id)} aria-label="삭제">
                        <Trash2 className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                      </button>
                    </div>

                    {/* Edit Body */}
                    <div className="flex flex-col gap-4 px-5 py-4">
                      {/* Period */}
                      <div className="flex items-center gap-3">
                        <span className="shrink-0 text-[13px] font-semibold text-gray-600">
                          기간
                        </span>
                        <input
                          type="text"
                          value={card.draft.startDate}
                          onChange={(e) => updateDraft(card.id, 'startDate', e.target.value)}
                          placeholder="YYYY.MM"
                          className="w-35 rounded-lg border border-gray-200 px-3 py-1.5 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
                        />
                        <span className="text-gray-400">–</span>
                        <input
                          type="text"
                          value={card.draft.endDate}
                          onChange={(e) => updateDraft(card.id, 'endDate', e.target.value)}
                          placeholder="YYYY.MM (미입력 시 현재)"
                          className="w-50 rounded-lg border border-gray-200 px-3 py-1.5 text-[13px] text-gray-800 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex flex-col gap-2">
                        <span className="text-[13px] font-semibold text-gray-700">경험 내용</span>
                        <textarea
                          value={card.draft.experienceContent}
                          onChange={(e) =>
                            updateDraft(card.id, 'experienceContent', e.target.value)
                          }
                          placeholder="경험 내용을 입력하세요"
                          rows={4}
                          className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-3 text-[14px] leading-[1.7] text-gray-700 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Edit Footer */}
                    <div className="flex justify-end border-t border-gray-200 px-5 py-3">
                      <button
                        type="button"
                        onClick={() => handleSave(card.id)}
                        className="rounded-lg bg-gray-900 px-4 py-2 text-[13px] font-semibold text-white hover:bg-gray-700"
                      >
                        저장
                      </button>
                    </div>
                  </>
                ) : (
                  /* View Mode */
                  <div className="flex items-center justify-between gap-3 px-5 py-3.5">
                    <div className="flex flex-1 items-center gap-2.5 overflow-hidden">
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[12px] font-semibold ${EXP_TYPE_BADGE[card.experienceType]}`}
                      >
                        {EXP_TYPE_LABELS[card.experienceType]}
                      </span>
                      <span className="truncate text-[15px] font-semibold text-gray-900">
                        {card.title}
                      </span>
                      <span className="shrink-0 text-[13px] text-gray-400">
                        {card.startDate ? toDisplayDate(card.startDate) : ''}
                        {card.endDate
                          ? ` – ${toDisplayDate(card.endDate)}`
                          : card.startDate
                            ? ' – 현재'
                            : ''}
                      </span>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleStartEdit(card.id)}
                        className="flex items-center gap-1 rounded-md bg-gray-100 px-2.5 py-1.5 text-[12px] font-medium text-gray-600 hover:bg-gray-200"
                      >
                        <Pencil className="h-3 w-3" />
                        수정
                      </button>
                      <button type="button" onClick={() => handleDelete(card.id)} aria-label="삭제">
                        <Trash2 className="h-3.75 w-3.75 text-gray-400 hover:text-gray-600" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Add Experience Button */}
            <button
              type="button"
              onClick={handleAddExperience}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3.5 hover:bg-gray-50"
            >
              <CirclePlus className="h-4.5 w-4.5 text-gray-500" />
              <span className="text-[14px] font-semibold text-gray-600">경험 추가</span>
            </button>
          </div>
        )}
      </div>

      {/* File Extraction Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={handleCloseModal}
        >
          <div
            className="w-150 overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
              <div className="flex flex-col gap-0.5">
                <h2 className="text-[18px] font-bold text-gray-900">파일에서 경험 추출</h2>
                <p className="text-[13px] text-gray-500">
                  추출할 파일을 선택하세요 (최대 2개 선택 가능)
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="rounded-md p-1 hover:bg-gray-100"
                aria-label="닫기"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            {!hasFiles ? (
              /* Empty state */
              <div className="flex flex-col items-center justify-center gap-4 px-6 py-16">
                <div className="flex h-18 w-18 items-center justify-center rounded-full bg-gray-100">
                  <FolderOpen className="h-8 w-8 text-gray-400" />
                </div>
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <p className="text-[16px] font-semibold text-gray-700">등록된 파일이 없습니다</p>
                  <p className="text-[13px] text-gray-400">
                    파일을 등록하면 경험을 자동으로 추출할 수 있어요
                  </p>
                </div>
                <Link
                  href="/my/file"
                  onClick={handleCloseModal}
                  className="rounded-lg bg-gray-900 px-4 py-2.5 text-[14px] font-semibold text-white hover:bg-gray-700"
                >
                  파일 등록하러 가기
                </Link>
              </div>
            ) : (
              /* File list */
              <div className="flex flex-col gap-2 px-6 py-4">
                {/* Info bar */}
                <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1.5">
                      <Files className="h-3.5 w-3.5 text-gray-400" />
                      <span className="text-[12px] font-medium text-gray-500">
                        최대 2개 파일 선택 가능
                      </span>
                    </div>
                    <div className="h-3.5 w-px bg-gray-200" />
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-gray-400" />
                      <span className="text-[12px] font-medium text-gray-500">
                        파일당 경험 최대 10개 추출
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/my/file"
                    onClick={handleCloseModal}
                    className="text-[13px] font-semibold text-blue-600 hover:text-blue-800"
                  >
                    파일 등록하러 가기
                  </Link>
                </div>

                {/* File rows */}
                <div className="flex flex-col gap-2 py-2">
                  {mockFiles.map((file) => {
                    const isSelected = selectedFileIds.has(file.fileId);
                    const isDisabled = !isSelected && selectedFileIds.size >= MAX_FILE_SELECTIONS;
                    return (
                      <button
                        key={file.fileId}
                        type="button"
                        onClick={() => !isDisabled && handleToggleFile(file.fileId)}
                        disabled={isDisabled}
                        className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors ${
                          isSelected
                            ? 'border-[#90c2ff] bg-[#e8f3ff]'
                            : isDisabled
                              ? 'cursor-not-allowed border-gray-200 bg-white opacity-50'
                              : 'border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50'
                        }`}
                      >
                        {/* Checkbox */}
                        <div
                          className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded ${
                            isSelected ? 'bg-[#2272eb]' : 'border border-gray-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                        </div>

                        {/* Category badge */}
                        <span
                          className={`shrink-0 rounded-full border px-2 py-0.5 text-[12px] font-semibold ${
                            isSelected
                              ? 'border-[#90c2ff] bg-[#e8f3ff] text-[#2272eb]'
                              : file.category === 'OTHER'
                                ? 'border-gray-200 bg-gray-100 text-gray-600'
                                : 'border-blue-200 bg-blue-50 text-blue-700'
                          }`}
                        >
                          {FILE_CATEGORY_LABEL[file.category]}
                        </span>

                        {/* File info */}
                        <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
                          <span className="truncate text-[14px] font-medium text-gray-900">
                            {file.title}
                          </span>
                          <span className="text-[12px] text-gray-400">
                            {formatFileSize(file.sizeBytes)} · {formatUploadDate(file.createdAt)}
                          </span>
                        </div>

                        {/* File icon */}
                        <FileText
                          className={`h-4 w-4 shrink-0 ${isSelected ? 'text-blue-500' : 'text-gray-400'}`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
              {selectedFileIds.size > 0 ? (
                <div className="flex items-center gap-1.5">
                  <CircleCheck className="h-3.75 w-3.75 text-[#2272eb]" />
                  <span className="text-[13px] font-semibold text-[#1b64da]">
                    {selectedFileIds.size}개 선택됨
                  </span>
                </div>
              ) : (
                <div />
              )}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-[14px] font-medium text-gray-700 hover:bg-gray-50"
                >
                  취소
                </button>
                {hasFiles && (
                  <button
                    type="button"
                    onClick={handleExtract}
                    disabled={selectedFileIds.size === 0}
                    className="rounded-lg bg-gray-900 px-4 py-2 text-[14px] font-semibold text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    추출하기
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
