'use client';

import { useExperienceExtractDialog } from '@/features/experience/stores/useExperienceExtractDialog';
import { useExperienceExtractionStore } from '@/features/experience/stores/useExperienceExtractionStore';
import { Button } from '@/shared/components/ui/button';
import { LoaderCircleIcon } from 'lucide-react';

export default function ExperienceExtractButton() {
  const { openDialog } = useExperienceExtractDialog();
  const generationStatus = useExperienceExtractionStore((state) => state.generationStatus);
  const isExtracting = generationStatus === 'PROCESSING';

  return (
    <Button
      type="button"
      onClick={openDialog}
      disabled={isExtracting}
      className="shrink-0 rounded-lg bg-gray-900 px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isExtracting ? (
        <span className="flex items-center gap-1.5">
          <LoaderCircleIcon className="h-3.5 w-3.5 animate-spin" />
          AI 추출 중...
        </span>
      ) : (
        '파일에서 추출하기'
      )}
    </Button>
  );
}
