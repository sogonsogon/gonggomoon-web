'use client';

import { useEffect, useRef, useState } from 'react';
import { EXP_TYPE_LABELS } from '@/features/experience/constants/experienceLabels';
import { Experience, ExperienceType } from '@/features/experience/types';
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
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { Textarea } from '@/shared/components/ui/textarea';

interface ExperienceCardProps {
  experience: Experience;
  defaultEditMode?: boolean;
  onUpdateSuccess: (targetId: number, updatedData: Experience) => void;
  onDeleteSuccess: (targetId: number) => void;
}

const EXP_TYPE_BADGE: Record<ExperienceType, string> = {
  CAREER: 'bg-blue-50 text-blue-700',
  PROJECT: 'bg-[#e8f3ff] text-[#2272eb]',
  EDUCATION: 'bg-[#e6f9f2] text-[#127848]',
  COMPETITION: 'bg-purple-50 text-purple-700',
  OTHER: 'bg-gray-100 text-gray-600',
};

export default function ExperienceCard({
  experience,
  defaultEditMode = false,
  onUpdateSuccess,
  onDeleteSuccess,
}: ExperienceCardProps) {
  const isNew = useRef(defaultEditMode).current;
  // 카드 생성 애니메이션
  const [isShow, setIsShow] = useState(!isNew);

  // 카드 삭제 애니메이션
  const [isExiting, setIsExiting] = useState(false);

  // 수정 상태
  const [isEditing, setIsEditing] = useState(defaultEditMode);

  useEffect(() => {
    if (!isNew) return;
    const raf = requestAnimationFrame(() => setIsShow(true));
    return () => cancelAnimationFrame(raf);
  }, [isNew]);

  // 클라이언트 폼 상태
  const [draft, setDraft] = useState<Experience>(() => ({
    id: experience.id,
    title: experience.title,
    experienceType: experience.experienceType,
    startDate: toDisplayDate(experience.startDate),
    endDate: experience.endDate ? toDisplayDate(experience.endDate) : '',
    experienceContent: experience.experienceContent ?? '',
  }));

  const handleUpdateDraft = (key: keyof Experience, value: string | ExperienceType) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleCancel = () => {
    if (experience.id < 0) {
      onDeleteSuccess(experience.id);
      return;
    }
    // 기존 데이터로 복구
    setDraft({
      id: experience.id,
      title: experience.title,
      experienceType: experience.experienceType,
      startDate: toDisplayDate(experience.startDate),
      endDate: experience.endDate ? toDisplayDate(experience.endDate) : '',
      experienceContent: experience.experienceContent ?? '',
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    // TODO: 저장 API 호출 (신규 생성 또는 수정)

    // API 응답으로 받은 데이터를 기반으로 부모 상태 업데이트 (임시)
    const savedDataFromServer: Experience = {
      ...experience,
      ...draft,
      id: experience.id < 0 ? Math.floor(Math.random() * 1000) : experience.id, // 임시: 서버 ID 대체
    };

    onUpdateSuccess(experience.id, savedDataFromServer);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setIsExiting(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 280));
    if (experience.id > 0) {
      // TODO: 삭제 API 호출
      // await deleteExperienceApi(experience.id);
    }
    onDeleteSuccess(experience.id);
  };

  return (
    // 애니메이션 처리
    <div
      className={`overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 ${
        isExiting
          ? 'ease-in -translate-y-5 opacity-0'
          : isNew
            ? `ease-out ${isShow ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0'}`
            : 'ease-out'
      }`}
    >
      {isEditing ? (
        // 수정 모드
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
              onClick={handleDelete}
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
              <Input
                value={draft.startDate}
                onChange={(e) => handleUpdateDraft('startDate', e.target.value)}
                placeholder="YYYY.MM"
                className="w-50 text-[13px] text-gray-800"
              />

              <span className="text-gray-400">–</span>
              <Input
                value={draft.endDate ?? ''}
                onChange={(e) => handleUpdateDraft('endDate', e.target.value)}
                placeholder="YYYY.MM (미입력 시 현재)"
                className="w-50 text-[13px] text-gray-800"
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
              className="rounded-lg bg-gray-900 text-white hover:bg-gray-800"
            >
              저장
            </Button>
          </div>
        </>
      ) : (
        /* 조회 모드 */
        <div className="flex items-center justify-between gap-3 px-5 py-3.5">
          <div className="flex flex-1 items-center gap-2.5 overflow-hidden">
            {/* 경험 유형 */}
            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-[12px] font-semibold ${
                EXP_TYPE_BADGE[experience.experienceType]
              }`}
            >
              {EXP_TYPE_LABELS[experience.experienceType]}
            </span>

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
              onClick={handleDelete}
              aria-label="삭제"
              className="text-gray-400 hover:text-red-500 hover:bg-red-50"
            >
              <Trash2Icon className="h-3.75 w-3.75 " />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
