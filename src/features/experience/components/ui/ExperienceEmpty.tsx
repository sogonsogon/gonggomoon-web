'use client';

import { Button } from '@/shared/components/ui/button';
import { BriefcaseIcon } from 'lucide-react';

interface ExperienceEmptyProps {
  onAddCard: () => void;
}

export default function ExperienceEmpty({ onAddCard }: ExperienceEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
        <BriefcaseIcon className="h-6 w-6 text-gray-400" />
      </div>
      <div className="flex flex-col items-center gap-1.5 text-center">
        <p className="text-[15px] font-semibold text-gray-900">아직 등록된 경험이 없어요</p>
        <p className="text-[13px] text-gray-500">
          나의 경험을 기록하고 AI로 의미있게 정리해 보세요
        </p>
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={onAddCard}
        className="rounded-lg bg-gray-900 px-4 py-2 text-[13px] font-semibold text-white hover:bg-gray-800 hover:text-white"
      >
        경험 추가하기
      </Button>
    </div>
  );
}
