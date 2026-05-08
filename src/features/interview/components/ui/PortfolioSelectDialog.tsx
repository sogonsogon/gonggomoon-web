'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ListFilter, ExternalLink, CircleCheck, FileText } from 'lucide-react';
import type { File } from '@/features/file/types';
import { formatHistoryDate } from '@/shared/utils/formatHistoryDate';
import { formatFileSize } from '@/features/file/utils/formatFileSize';
import { useInterviewCreateFormStore } from '@/features/interview/stores/useInterviewCreateFormStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { useFiles } from '@/features/file/queries';
import PortfolioEmpty from '@/features/interview/components/ui/PortfolioEmpty';
import FileSkeleton from '@/features/file/components/ui/FileSkeleton';

interface PortfolioSelectDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PortfolioSelectDialog({ isOpen, onClose }: PortfolioSelectDialogProps) {
  const selectedPortfolio = useInterviewCreateFormStore(
    (state) => state.formData.selectedPortfolio,
  );
  const setSelectedPortfolio = useInterviewCreateFormStore((state) => state.setSelectedPortfolio);

  const [pendingPortfolio, setPendingPortfolio] = useState<File | null>(selectedPortfolio);

  const { data: fileData, isLoading } = useFiles();

  const portfolioFiles = useMemo(() => {
    return fileData?.contents.filter((file) => file.category === 'PORTFOLIO') || [];
  }, [fileData]);

  function handleConfirm() {
    setSelectedPortfolio(pendingPortfolio);
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="flex max-h-150 w-full max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl p-0 sm:max-w-150">
        <DialogHeader className="border-b border-gray-100 px-6 py-5 text-left">
          <DialogTitle className="text-[18px] font-bold text-gray-900">포트폴리오 선택</DialogTitle>
          <DialogDescription className="text-[13px] text-gray-500">
            면접 질문 생성에 사용할 포트폴리오를 선택하세요
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <ListFilter className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-500">포트폴리오 파일만 표시 중</span>
            </div>

            <Button asChild variant="outline" size="sm" className="h-7 px-2.5 text-[11px]">
              <Link href="/resource/file" onClick={onClose}>
                <ExternalLink className="h-3 w-3 text-gray-500" />내 파일 관리
              </Link>
            </Button>
          </div>
          {isLoading ? (
            <>
              {Array.from({ length: 3 }, (_, idx) => (
                <FileSkeleton key={idx} variant="card" />
              ))}
            </>
          ) : portfolioFiles.length === 0 ? (
            <PortfolioEmpty />
          ) : (
            <div className="flex flex-col gap-2">
              {portfolioFiles.map((file) => {
                const isPending = pendingPortfolio?.fileAssetId === file.fileAssetId;

                return (
                  <button
                    key={file.fileAssetId}
                    type="button"
                    onClick={() => setPendingPortfolio(file)}
                    className={`flex w-full items-center gap-3 rounded-[10px] border px-4 py-3.5 text-left transition-colors ${
                      isPending
                        ? 'border-[1.5px] border-blue-300 bg-blue-50'
                        : 'border-gray-100 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div
                      className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border-[1.5px] ${
                        isPending ? 'border-blue-600 bg-blue-600' : 'border-gray-300 bg-white'
                      }`}
                    >
                      {isPending && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </div>

                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
                        isPending ? 'bg-blue-100' : 'bg-gray-100'
                      }`}
                    >
                      <FileText
                        className={`h-3.75 w-3.75 ${isPending ? 'text-blue-600' : 'text-gray-400'}`}
                      />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span
                        className={`truncate text-[13px] font-semibold ${
                          isPending ? 'text-gray-900' : 'text-gray-700'
                        }`}
                      >
                        {file.originalFileName}
                      </span>
                      <span className="text-[11px] text-gray-400">
                        {formatFileSize(file.sizeBytes)} · {formatHistoryDate(file.createdAt)} 등록
                      </span>
                    </div>

                    {isPending && (
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100">
                        <CircleCheck className="h-3 w-3 text-blue-600" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
          <div className="flex items-center gap-1.5">
            {pendingPortfolio && portfolioFiles.length > 0 && (
              <>
                <CircleCheck className="h-3.5 w-3.5 text-blue-600" />
                <span className="text-xs font-semibold text-blue-700">
                  {pendingPortfolio.originalFileName} 선택됨
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              disabled={isLoading || !pendingPortfolio || portfolioFiles.length === 0}
            >
              선택 완료
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
