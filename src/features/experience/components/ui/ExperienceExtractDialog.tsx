'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useExperienceExtractDialog } from '@/features/experience/stores/useExperienceExtractDialog';
import { useStartExperienceExtraction } from '@/features/experience/hooks/useStartExperienceExtraction';
import ExperienceFileEmpty from '@/features/experience/components/ui/ExperienceFileEmpty';
import ExperienceFileItem from '@/features/experience/components/ui/ExperienceFileItem';
import { File } from '@/features/file/types';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { CircleCheckIcon, FilesIcon, SparklesIcon } from 'lucide-react';
import { toast } from 'sonner';

interface ExperienceExtractDialogProps {
  files: File[];
}

const MAX_FILE_SELECTIONS = 2;

export default function ExperienceExtractDialog({ files }: ExperienceExtractDialogProps) {
  const { isDialogOpen, closeDialog } = useExperienceExtractDialog();
  const { startExperienceExtraction } = useStartExperienceExtraction();
  const [selectedFileIds, setSelectedFileIds] = useState<Set<number>>(new Set());
  const hasFiles = files.length > 0;

  const handleDialogOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedFileIds(new Set());
      closeDialog();
    }
  };

  const handleToggleFile = (fileId: number) => {
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
  };

  const handleExtract = async () => {
    if (selectedFileIds.size === 0) {
      toast.error('파일을 1개 이상 선택해주세요.');
      return;
    }
    await startExperienceExtraction(Array.from(selectedFileIds));
    handleDialogOpenChange(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="max-w-145">
        <DialogHeader>
          <DialogTitle>파일에서 경험 추출</DialogTitle>
          <DialogDescription>추출할 파일을 선택하세요 (최대 2개 선택 가능)</DialogDescription>
        </DialogHeader>

        {!hasFiles ? (
          // 파일 empty 상태
          <ExperienceFileEmpty />
        ) : (
          <div className="flex flex-col gap-2">
            {/* 상단 정보 바 */}
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <FilesIcon className="h-3.5 w-3.5 text-gray-400" />
                  <span className="text-[12px] font-medium text-gray-500">
                    최대 2개 파일 선택 가능
                  </span>
                </div>
                <div className="h-3.5 w-px bg-gray-200" />
                <div className="flex items-center gap-1.5">
                  <SparklesIcon className="h-3.5 w-3.5 text-gray-400" />
                  <span className="text-[12px] font-medium text-gray-500">
                    파일당 경험 최대 10개 추출
                  </span>
                </div>
              </div>
              <Link
                href="/my/file"
                onClick={() => handleDialogOpenChange(false)}
                className="text-[13px] font-semibold text-blue-600 hover:text-blue-800"
              >
                파일 등록하러 가기
              </Link>
            </div>

            {/* 파일 리스트 */}
            <div className="flex flex-col gap-2 py-2">
              {files.map((file) => {
                const isSelected = selectedFileIds.has(file.fileAssetId);
                const isDisabled = !isSelected && selectedFileIds.size >= MAX_FILE_SELECTIONS;
                return (
                  <ExperienceFileItem
                    key={file.fileAssetId}
                    file={file}
                    isSelected={isSelected}
                    isDisabled={isDisabled}
                    handleToggleFile={handleToggleFile}
                  />
                );
              })}
            </div>
          </div>
        )}

        <DialogFooter className="flex-row items-center justify-between sm:justify-between">
          {selectedFileIds.size > 0 ? (
            <div className="flex items-center gap-1.5">
              <CircleCheckIcon className="h-3.75 w-3.75 text-[#2272eb]" />
              <span className="text-[13px] font-semibold text-[#1b64da]">
                {selectedFileIds.size}개 선택됨
              </span>
            </div>
          ) : (
            <div />
          )}
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDialogOpenChange(false)}
              className="rounded-lg border border-gray-200 px-4 py-2 text-[14px] font-medium text-gray-700 hover:bg-gray-50"
            >
              취소
            </Button>
            {hasFiles && (
              <Button
                type="button"
                onClick={handleExtract}
                disabled={selectedFileIds.size === 0}
                className="rounded-lg bg-gray-900 px-4 py-2 text-[14px] font-semibold text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                추출하기
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
