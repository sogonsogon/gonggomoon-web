'use client';

import { useRef, useState } from 'react';
import { FolderOpen, FileText, File, Trash2, Upload, X } from 'lucide-react';
import { mockFiles } from '@/mocks/file.mock';
import type { File as UserFile, FileCategory } from '@/features/file/types';
import Header from '@/shared/components/layout/Header';
import MyNav from '@/shared/components/layout/MyNav';
import Footer from '@/shared/components/layout/Footer';

const MAX_FILES = 10;

function formatFileSize(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  return `${mb < 0.1 ? mb.toFixed(2) : mb.toFixed(1)} MB`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

const categoryLabel: Record<FileCategory, string> = {
  PORTFOLIO: '포폴',
  RESUME: '이력서',
  OTHER: '기타',
};

const categoryBadgeClass: Record<FileCategory, string> = {
  PORTFOLIO: 'bg-[#e8f3ff] text-[#3182f6]',
  RESUME: 'bg-blue-50 text-blue-700',
  OTHER: 'bg-gray-100 text-gray-600',
};

function isPdf(title: string) {
  return title.toLowerCase().endsWith('.pdf');
}

export default function FilePage() {
  const [files, setFiles] = useState<UserFile[]>(mockFiles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<FileCategory | ''>('');
  const [pickedFile, setPickedFile] = useState<globalThis.File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleDelete(fileId: number) {
    setFiles((prev) => prev.filter((f) => f.fileId !== fileId));
  }

  function handleOpenModal() {
    setSelectedCategory('');
    setPickedFile(null);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setPickedFile(f);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0] ?? null;
    setPickedFile(f);
  }

  function handleUpload() {
    if (!selectedCategory || !pickedFile) return;
    const newFile: UserFile = {
      fileId: Date.now(),
      category: selectedCategory,
      title: pickedFile.name,
      sizeBytes: pickedFile.size,
      createdAt: new Date().toISOString(),
    };
    setFiles((prev) => [newFile, ...prev]);
    setIsModalOpen(false);
  }

  const canUpload = files.length < MAX_FILES;

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Header />

      {/* Body */}
      <div className="flex flex-1 gap-12 px-30 py-10">
        <MyNav activePath="/my/file" />

        {/* Right Content */}
        <div className="flex flex-1 flex-col gap-8">
          {/* Page Title */}
          <div className="flex flex-col gap-1">
            <h1 className="text-[22px] font-bold text-gray-900">내 파일</h1>
            <p className="text-sm text-gray-500">
              포트폴리오, 이력서 등 첨부파일을 관리할 수 있습니다
            </p>
          </div>

          {/* Count Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-gray-500">파일</span>
              <span className="text-sm font-bold text-gray-900">{files.length}</span>
              <span className="text-sm text-gray-400">/</span>
              <span className="text-sm text-gray-400">{MAX_FILES}</span>
            </div>
            <button
              type="button"
              onClick={handleOpenModal}
              disabled={!canUpload}
              className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              첨부파일 등록
            </button>
          </div>

          {/* File Table */}
          <div className="overflow-hidden rounded-xl border border-gray-100">
            {/* Table Header */}
            <div className="flex w-full items-center border-b border-gray-100 bg-gray-50">
              <div className="w-25 shrink-0 px-4 py-3">
                <span className="text-sm font-semibold text-gray-600">구분</span>
              </div>
              <div className="flex-1 px-4 py-3">
                <span className="text-sm font-semibold text-gray-600">파일 제목</span>
              </div>
              <div className="w-25 shrink-0 px-4 py-3">
                <span className="text-sm font-semibold text-gray-600">용량</span>
              </div>
              <div className="w-30 shrink-0 px-4 py-3">
                <span className="text-sm font-semibold text-gray-600">등록일</span>
              </div>
              <div className="flex w-18 shrink-0 items-center justify-center px-4 py-3">
                <span className="text-sm font-semibold text-gray-600">삭제</span>
              </div>
            </div>

            {/* Table Body */}
            {files.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 py-16">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                  <FolderOpen className="h-6 w-6 text-gray-400" />
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <p className="text-sm font-semibold text-gray-900">등록된 파일이 없어요</p>
                  <p className="text-sm text-gray-500">
                    포트폴리오, 이력서 등 파일을 등록해 보세요
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
                >
                  파일 등록하기
                </button>
              </div>
            ) : (
              files.map((file, index) => (
                <div
                  key={file.fileId}
                  className={`flex w-full items-center ${index < files.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <div className="w-25 shrink-0 px-4 py-3.5">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${categoryBadgeClass[file.category]}`}
                    >
                      {categoryLabel[file.category]}
                    </span>
                  </div>
                  <div className="flex flex-1 items-center gap-2 px-4 py-3.5">
                    {isPdf(file.title) ? (
                      <FileText className="h-4 w-4 shrink-0 text-gray-500" />
                    ) : (
                      <File className="h-4 w-4 shrink-0 text-gray-500" />
                    )}
                    <span className="text-sm font-medium text-gray-900">{file.title}</span>
                  </div>
                  <div className="w-25 shrink-0 px-4 py-3.5">
                    <span className="text-sm text-gray-600">{formatFileSize(file.sizeBytes)}</span>
                  </div>
                  <div className="w-30 shrink-0 px-4 py-3.5">
                    <span className="text-sm text-gray-600">{formatDate(file.createdAt)}</span>
                  </div>
                  <div className="flex w-18 shrink-0 items-center justify-center px-4 py-3.5">
                    <button
                      type="button"
                      onClick={() => handleDelete(file.fileId)}
                      aria-label="파일 삭제"
                    >
                      <Trash2 className="h-4 w-4 text-red-500 hover:text-red-700" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />

      {/* Upload Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-50"
          onClick={handleCloseModal}
        >
          <div
            className="w-120 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold text-gray-900">첨부파일 등록</h2>
                <p className="text-sm text-gray-500">
                  파일 구분을 선택하고 첨부할 파일을 업로드해주세요
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
            <div className="flex flex-col gap-5 px-6 py-6">
              {/* Category Select */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-800">파일 구분</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as FileCategory | '')}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 focus:border-gray-400 focus:outline-none"
                >
                  <option value="">구분 선택 (포폴 / 이력서 / 기타)</option>
                  <option value="PORTFOLIO">포폴</option>
                  <option value="RESUME">이력서</option>
                  <option value="OTHER">기타</option>
                </select>
              </div>

              {/* File Upload Area */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-800">파일 첨부</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div
                  className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border bg-gray-50 px-6 py-8 transition-colors ${
                    isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                >
                  {pickedFile ? (
                    <>
                      <FileText className="h-8 w-8 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">{pickedFile.name}</span>
                      <span className="text-xs text-gray-400">
                        {formatFileSize(pickedFile.size)}
                      </span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-gray-400" />
                      <span className="text-sm font-medium text-gray-600">
                        클릭하거나 파일을 드래그해서 업로드
                      </span>
                      <span className="text-xs text-gray-400">PDF 최대 20MB</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-2 px-6 pb-6">
              <button
                type="button"
                onClick={handleCloseModal}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleUpload}
                disabled={!selectedCategory || !pickedFile}
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                등록
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
