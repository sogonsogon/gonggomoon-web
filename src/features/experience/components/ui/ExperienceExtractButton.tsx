'use client';

import { useExperienceExtractDialog } from '@/features/experience/hooks/useExperienceExtractDialog';
import { Button } from '@/shared/components/ui/button';

export default function ExperienceExtractButton() {
  const { openDialog } = useExperienceExtractDialog();

  return (
    <Button
      type="button"
      onClick={openDialog}
      className="shrink-0 rounded-lg bg-gray-900 px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-gray-700"
    >
      파일에서 추출하기
    </Button>
  );
}
