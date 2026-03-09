import { FILE_CATEGORY_LABEL } from '@/features/file/constants/fileCategory';
import { File } from '@/features/file/types';
import { formatFileSize } from '@/features/file/utils/formatFileSize';
import { Button } from '@/shared/components/ui/button';
import { formatDate } from '@/shared/utils/formatDate';
import { CheckIcon, FileTextIcon } from 'lucide-react';

interface ExperienceFileItemProps {
  file: File;
  isDisabled: boolean;
  isSelected: boolean;
  handleToggleFile: (fileId: number) => void;
}

export default function ExperienceFileItem({
  file,
  isDisabled,
  isSelected,
  handleToggleFile,
}: ExperienceFileItemProps) {
  return (
    <Button
      key={file.fileId}
      type="button"
      variant="outline"
      onClick={() => !isDisabled && handleToggleFile(file.fileId)}
      disabled={isDisabled}
      className={`flex h-auto w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors hover:bg-blue-100 ${
        isSelected
          ? 'border-[#90c2ff] bg-[#e8f3ff]'
          : isDisabled
            ? 'cursor-not-allowed border-gray-200 bg-white opacity-50'
            : 'border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50'
      }`}
    >
      {/* 체크박스 */}
      <div
        className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded ${
          isSelected ? 'bg-[#2272eb]' : 'border border-gray-300 bg-white'
        }`}
      >
        {isSelected && <CheckIcon className="h-3 w-3 text-white" strokeWidth={3} />}
      </div>

      {/* 파일 종류 */}
      <div className="flex w-12">
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
      </div>

      {/* 파일 정보 */}
      <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
        <span className="truncate text-[14px] font-medium text-gray-900">{file.title}</span>
        <span className="text-[12px] text-gray-400">
          {formatFileSize(file.sizeBytes)} · {formatDate(file.createdAt)}
        </span>
      </div>

      <FileTextIcon
        className={`h-4 w-4 shrink-0 ${isSelected ? 'text-blue-500' : 'text-gray-400'}`}
      />
    </Button>
  );
}
