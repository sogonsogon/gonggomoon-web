'use client';
import MonthYearPicker from '@/features/experience/components/ui/MonthYearPicker';
import { EXP_BADGE_CHECKED } from '@/features/experience/constants/experienceBadgeStyles';
import { EXP_TYPE_LABELS } from '@/features/experience/constants/experienceLabels';
import { useCreateExperience, useUpdateExperience } from '@/features/experience/queries';
import { Experience, ExperienceType } from '@/features/experience/types';
import { dateToString } from '@/features/experience/utils/dateToString';
import { stringToDate } from '@/features/experience/utils/stringToDate';
import { toDisplayDate } from '@/features/experience/utils/toDisplayDate';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Textarea } from '@/shared/components/ui/textarea';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ExperienceCardFormProps {
  experience: Experience;
  isNew: boolean;
  onUpdateSuccess: (targetId: number, updatedData: Experience) => void;
  onDeleteSuccess: (targetId: number) => void;
  onOpenChange: (next: boolean) => void;
}

export default function ExperienceCardForm({
  experience,
  isNew,
  onUpdateSuccess,
  onDeleteSuccess,
  onOpenChange,
}: ExperienceCardFormProps) {
  const [isEditing, setIsEditing] = useState(isNew);

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

  const handleCancel = () => {
    if (draft.experienceId < 0) {
      onDeleteSuccess(draft.experienceId);
      return;
    }
    // 기존 데이터로 복구
    setDraft({
      experienceId: experience.experienceId,
      title: experience.title,
      experienceType: experience.experienceType,
      startDate: experience.startDate ? toDisplayDate(experience.startDate) : '',
      endDate: experience.endDate ? toDisplayDate(experience.endDate) : '',
      experienceContent: experience.experienceContent ?? '',
    });
    setIsEditing(false);
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

    // 경험 생성
    if (draft.experienceId < 0) {
      createExperience(payload, {
        onSuccess: (result) => {
          onUpdateSuccess(draft.experienceId, { ...draft, experienceId: result.experienceId });
          toast.success('경험이 저장되었습니다.');
          setIsEditing(false);
        },
        onError: (error) => {
          toast.error(error.message || '경험 저장에 실패하였습니다.');
        },
      });
    } else {
      // 경험 수정
      updateExperience(
        { experienceId: draft.experienceId, payload },
        {
          onSuccess: (result) => {
            onUpdateSuccess(result.experienceId, result);
            toast.success('경험이 수정되었습니다.');
            setIsEditing(false);
          },
          onError: (error) => {
            toast.error(error.message || '경험 수정에 실패하였습니다.');
          },
        },
      );
    }
  };

  // 수정 용
  if (isEditing) {
    return (
      <>
        <div className="flex items-center justify-between gap-3 border-b-2 border-blue-400 px-5 py-4">
          <div className="flex flex-1 items-center gap-3">
            <div className="flex shrink-0 items-center gap-1.5 rounded-md bg-blue-50 px-2 py-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              <span className="text-[11px] font-semibold text-blue-700">수정 중</span>
            </div>
            {/* 경험 유형 */}
            <Select
              value={draft.experienceType}
              onValueChange={(value) =>
                handleUpdateDraft('experienceType', value as ExperienceType)
              }
            >
              <SelectTrigger className="w-40 shrink-0 text-[13px] text-gray-800">
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

            {/* 경험 제목 */}
            <Input
              value={draft.title}
              onChange={(e) => handleUpdateDraft('title', e.target.value)}
              placeholder="경험 제목을 입력하세요"
              className="flex-1 text-[14px] text-gray-900"
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(true)}
            aria-label="삭제"
            className="text-gray-400 hover:text-red-500 hover:bg-red-50"
          >
            <Trash2Icon className="h-4 w-4 " />
          </Button>
        </div>

        <div className="flex flex-col gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            {/* 경험 기간 */}
            <span className="shrink-0 text-[13px] font-semibold text-gray-600">기간</span>
            <MonthYearPicker
              value={stringToDate(draft.startDate)}
              onChange={(date) => handleUpdateDraft('startDate', dateToString(date))}
            />
            <span className="text-gray-400">–</span>
            <MonthYearPicker
              value={stringToDate(draft.endDate ?? '')}
              onChange={(date) => handleUpdateDraft('endDate', dateToString(date))}
              placeholder="YYYY.MM (미입력 시 현재)"
              className="w-52"
            />
          </div>
          <div className="flex flex-col gap-2">
            {/* 경험 내용 */}
            <span className="text-[13px] font-semibold text-gray-700">경험 내용</span>
            <Textarea
              value={draft.experienceContent}
              onChange={(e) => handleUpdateDraft('experienceContent', e.target.value)}
              placeholder="경험 내용을 입력하세요"
              rows={4}
              className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-3 text-[14px] leading-[1.7] text-gray-700"
            />
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex justify-end gap-2 border-t border-gray-200 px-5 py-3">
          <Button type="button" variant="outline" onClick={handleCancel} className="rounded-lg">
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
      </>
    );
  }

  return (
    /* 조회 용 */
    <div className="flex items-center justify-between gap-3 px-5 py-3.5">
      <div className="flex flex-1 items-center gap-2.5 overflow-hidden">
        {/* 경험 유형 */}
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${EXP_BADGE_CHECKED[experience.experienceType]}`}
        >
          {EXP_TYPE_LABELS[experience.experienceType]}
        </span>

        <div className="flex flex-1 items-baseline gap-2">
          {/* 경험 제목 */}
          <span className="truncate text-[15px] font-semibold text-gray-900">
            {experience.title}
          </span>

          {/* 경험 기간 */}
          <span className="shrink-0 text-[13px] text-gray-400">
            {experience.startDate ? toDisplayDate(experience.startDate) : ''}
            {experience.endDate
              ? ` – ${toDisplayDate(experience.endDate)}`
              : experience.startDate
                ? ' – 현재'
                : ''}
          </span>
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="flex shrink-0 items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-1 rounded-md bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-200"
        >
          <PencilIcon className="h-3 w-3" />
          수정
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onOpenChange(true)}
          aria-label="삭제"
          className="text-gray-400 hover:text-red-500 hover:bg-red-50"
        >
          <Trash2Icon className="h-3.75 w-3.75 " />
        </Button>
      </div>
    </div>
  );
}
