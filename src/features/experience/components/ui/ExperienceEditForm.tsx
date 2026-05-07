// features/experience/components/ui/ExperienceCardForm.tsx
'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { PencilIcon, SparklesIcon, Trash2Icon } from 'lucide-react';

import { Experience, ExperienceType } from '@/features/experience/types';
import { EXP_TYPE_LABELS } from '@/features/experience/constants/experienceLabels';
import { useCreateExperience, useUpdateExperience } from '@/features/experience/queries';
import { dateToString } from '@/features/experience/utils/dateToString';
import { stringToDate } from '@/features/experience/utils/stringToDate';
import { toDisplayDate } from '@/features/experience/utils/toDisplayDate';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import MonthYearPicker from '@/features/experience/components/ui/MonthYearPicker';
import ExperienceCancelDialog from '@/features/experience/components/ui/ExperienceCancelDialog';

interface ExperienceEditFormProps {
  experience: Experience;
  isAiGenerated?: boolean;
  onUpdateSuccess: (targetId: number, updatedData: Experience) => void;
  onDeleteSuccess: (targetId: number) => void;
  onDeleteDialogOpen: (next: boolean) => void;
  onCancel: () => void;
}

export default function ExperienceEditForm({
  experience,
  isAiGenerated = false,
  onUpdateSuccess,
  onDeleteSuccess,
  onDeleteDialogOpen,
  onCancel,
}: ExperienceEditFormProps) {
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  const { mutate: createExperience, isPending: isCreating } = useCreateExperience();
  const { mutate: updateExperience, isPending: isUpdating } = useUpdateExperience();

  const [draft, setDraft] = useState<Experience>(() => ({
    experienceId: experience.experienceId,
    title: experience.title,
    experienceType: experience.experienceType,
    startDate: experience.startDate ? toDisplayDate(experience.startDate) : '',
    endDate: experience.endDate ? toDisplayDate(experience.endDate) : '',
    experienceContent: experience.experienceContent ?? '',
  }));

  const handleUpdateDraft = (key: keyof Experience, value: string | ExperienceType) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const isDirty =
    (isAiGenerated && experience.experienceId < 0) ||
    draft.title !== experience.title ||
    draft.experienceType !== experience.experienceType ||
    draft.startDate !== (experience.startDate ? toDisplayDate(experience.startDate) : '') ||
    (draft.endDate || null) !== (experience.endDate ? toDisplayDate(experience.endDate) : null) ||
    draft.experienceContent !== (experience.experienceContent ?? '');

  const handleCancelConfirm = () => {
    if (draft.experienceId < 0) {
      onDeleteSuccess(draft.experienceId);
      return;
    }
    onCancel();
  };

  const handleCancelRequest = () => {
    if (isDirty) {
      setIsCancelDialogOpen(true);
      return;
    }
    handleCancelConfirm();
  };

  const handleSave = async () => {
    if (
      !draft.title.trim() ||
      !draft.experienceType ||
      !draft.startDate ||
      !draft.experienceContent?.trim() ||
      stringToDate(draft.startDate) === null
    ) {
      toast.error('모든 입력란을 채워주세요.');
      return;
    }

    const today = new Date();
    const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const parsedStart = stringToDate(draft.startDate)!;
    const parsedEnd = draft.endDate ? stringToDate(draft.endDate) : null;

    if (parsedStart > currentMonth) {
      toast.error('시작일은 현재 날짜 이후일 수 없습니다.');
      return;
    }

    if (parsedEnd && parsedEnd > currentMonth) {
      toast.error('종료일은 현재 날짜 이후일 수 없습니다.');
      return;
    }

    if (parsedEnd && parsedStart > parsedEnd) {
      toast.error('시작일은 종료일보다 이후일 수 없습니다.');
      return;
    }

    const payload = {
      title: draft.title,
      experienceType: draft.experienceType,
      startDate: parsedStart,
      endDate: parsedEnd,
      experienceContent: draft.experienceContent,
    };

    if (draft.experienceId < 0) {
      createExperience(payload, {
        onSuccess: (result) => {
          onUpdateSuccess(draft.experienceId, { ...draft, experienceId: result.experienceId });
          toast.success('경험이 저장되었습니다.');
          onCancel();
        },
        onError: (error) => {
          toast.error(error.message || '경험 저장에 실패하였습니다.');
        },
      });
    } else {
      updateExperience(
        { experienceId: draft.experienceId, payload },
        {
          onSuccess: (result) => {
            onUpdateSuccess(result.experienceId, result);
            toast.success('경험이 수정되었습니다.');
            onCancel();
          },
          onError: (error) => {
            toast.error(error.message || '경험 수정에 실패하였습니다.');
          },
        },
      );
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2 border-b-1 border-gray-400 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <div className="flex shrink-0 items-center gap-1.5 rounded-md bg-blue-50 px-2 py-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            <span className="text-[11px] font-semibold text-blue-700">수정 중</span>
          </div>
          {isAiGenerated && (
            <div className="flex shrink-0 items-center gap-1 rounded-full bg-violet-50 px-2 py-0.5">
              <SparklesIcon className="h-3 w-3 text-violet-500" />
              <span className="text-[11px] font-semibold text-violet-600">AI 생성</span>
            </div>
          )}

          <Select
            value={draft.experienceType}
            onValueChange={(value) => handleUpdateDraft('experienceType', value as ExperienceType)}
          >
            <SelectTrigger className="w-25 md:w-40 shrink-0 text-[13px] text-gray-800">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(EXP_TYPE_LABELS) as ExperienceType[]).map((type) => (
                <SelectItem key={type} value={type}>
                  {EXP_TYPE_LABELS[type]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            value={draft.title}
            onChange={(e) => handleUpdateDraft('title', e.target.value)}
            placeholder="경험 제목"
            className="min-w-0 w-full flex-1 sm:w-auto text-[14px] text-gray-900"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onDeleteDialogOpen(true)}
            className="text-gray-400 hover:text-red-500 hover:bg-red-50"
          >
            <Trash2Icon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-5 py-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <span className="shrink-0 text-[13px] font-semibold text-gray-600">기간</span>
          <div className="flex items-center gap-2">
            <MonthYearPicker
              value={stringToDate(draft.startDate)}
              onChange={(date) => handleUpdateDraft('startDate', date ? dateToString(date) : '')}
              className="flex-1 sm:w-40"
            />
            <span className="text-gray-400">–</span>
            <MonthYearPicker
              value={stringToDate(draft.endDate ?? '')}
              onChange={(date) =>
                setDraft((prev) => ({ ...prev, endDate: date ? dateToString(date) : null }))
              }
              placeholder="종료 (미입력 시 현재)"
              className="flex-1 sm:w-52"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[13px] font-semibold text-gray-700">경험 내용</span>
          <Textarea
            value={draft.experienceContent}
            onChange={(e) => handleUpdateDraft('experienceContent', e.target.value)}
            placeholder="경험 내용"
            rows={4}
            className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-3 text-[14px] leading-[1.7] text-gray-700"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t border-gray-200 px-5 py-3">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancelRequest}
          className="rounded-lg"
        >
          취소
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={handleSave}
          disabled={isCreating || isUpdating}
          className="rounded-lg bg-gray-900 text-white hover:bg-gray-800"
        >
          저장
        </Button>
      </div>

      <ExperienceCancelDialog
        isOpen={isCancelDialogOpen}
        onOpenChange={setIsCancelDialogOpen}
        onConfirm={handleCancelConfirm}
      />
    </>
  );
}
