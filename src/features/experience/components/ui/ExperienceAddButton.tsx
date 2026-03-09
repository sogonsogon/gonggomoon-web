import { Button } from '@/shared/components/ui/button';
import { CirclePlusIcon } from 'lucide-react';

interface ExperienceAddButtonProps {
  onAddCard: () => void;
}

export default function ExperienceAddButton({ onAddCard }: ExperienceAddButtonProps) {
  return (
    <Button
      type="button"
      onClick={onAddCard}
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3.5 hover:bg-gray-50"
    >
      <CirclePlusIcon className="h-4.5 w-4.5 text-gray-500" />
      <span className="text-[14px] font-semibold text-gray-600">경험 추가</span>
    </Button>
  );
}
