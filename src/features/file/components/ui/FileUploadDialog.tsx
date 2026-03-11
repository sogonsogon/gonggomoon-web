'use client';

import { useState } from 'react';
import { File, FileCategory } from '@/features/file/types';
import { useFileUploadDialog } from '@/features/file/stores/useFileUploadDialog';
import FileUploadArea from '@/features/file/components/ui/FileUploadArea';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { useUploadFile } from '@/features/file/queries';

export default function FileUploadDialog() {
  const { isDialogOpen, openDialog, closeDialog } = useFileUploadDialog();
  const [selectedCategory, setSelectedCategory] = useState<FileCategory | ''>('');
  // 선택된 파일(업로드할 파일)
  const [pickedFile, setPickedFile] = useState<globalThis.File | null>(null);
  const { mutate: uploadFile, isPending } = useUploadFile();

  const resetForm = () => {
    setSelectedCategory('');
    setPickedFile(null);
  };

  const handleDialogOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      resetForm();
      closeDialog();
      return;
    }
    openDialog();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setPickedFile(file);
  };

  const handleUpload = () => {
    if (!selectedCategory || !pickedFile || isPending) return;

    uploadFile({ file: pickedFile, category: selectedCategory });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="max-w-120">
        <DialogHeader>
          <DialogTitle>첨부파일 등록</DialogTitle>
          <DialogDescription>파일 구분을 선택하고 첨부할 파일을 업로드해주세요</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          {/* Category Select */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-800">파일 구분</label>
            <Select
              value={selectedCategory}
              onValueChange={(value) => setSelectedCategory(value as FileCategory)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="구분 선택 (포트폴리오 / 이력서 / 기타)" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="PORTFOLIO">포트폴리오</SelectItem>
                <SelectItem value="RESUME">이력서</SelectItem>
                <SelectItem value="OTHER">기타</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* File Upload Area */}
          <FileUploadArea
            handleFileChange={handleFileChange}
            pickedFile={pickedFile}
            setPickedFile={setPickedFile}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              취소
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={handleUpload}
            disabled={!selectedCategory || !pickedFile}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            등록
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
