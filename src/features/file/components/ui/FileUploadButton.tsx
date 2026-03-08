'use client';

import { Button } from '@/shared/components/ui/button';
import { useFileUpload } from '@/features/file/hooks/useFileUpload';

interface FileUploadButtonProps {
  canUpload: boolean;
}

export default function FileUploadButton({ canUpload }: FileUploadButtonProps) {
  const { openDialog } = useFileUpload();

  return (
    <Button
      type="button"
      disabled={!canUpload}
      onClick={openDialog}
      className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      첨부파일 등록
    </Button>
  );
}
