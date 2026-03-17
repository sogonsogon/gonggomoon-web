'use client';

import { Input } from '@/shared/components/ui/input';
import { formatFileSize } from '@/features/file/utils/formatFileSize';
import { FileTextIcon, UploadIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

interface FileUploadAreaProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  pickedFile: globalThis.File | null;
  setPickedFile: (file: globalThis.File | null) => void;
}

export default function FileUploadArea({
  handleFileChange,
  pickedFile,
  setPickedFile,
}: FileUploadAreaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const validateAndPick = (file: globalThis.File | null) => {
    if (!file) return;
    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast.error('파일 크기는 10MB 이하여야 합니다.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    setPickedFile(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    validateAndPick(event.dataTransfer.files?.[0] ?? null);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (file && file.size > MAX_FILE_SIZE_BYTES) {
      toast.error('파일 크기는 10MB 이하여야 합니다.');
      event.target.value = '';
      return;
    }
    handleFileChange(event);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-800">파일 첨부</label>
      <Input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleInputChange}
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
            <FileTextIcon className="h-8 w-8 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">{pickedFile.name}</span>
            <span className="text-xs text-gray-400">{formatFileSize(pickedFile.size)}</span>
          </>
        ) : (
          <>
            <UploadIcon className="h-8 w-8 text-gray-400" />
            <span className="text-sm font-medium text-gray-600">
              클릭하거나 파일을 드래그해서 업로드
            </span>
            <span className="text-xs text-gray-400">PDF 최대 10MB</span>
          </>
        )}
      </div>
    </div>
  );
}
