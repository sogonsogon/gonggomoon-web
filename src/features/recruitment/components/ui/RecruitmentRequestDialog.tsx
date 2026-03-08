'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { PLATFORM_OPTIONS } from '@/features/recruitment/constants/platformOptions';
import { PlatformType } from '@/features/recruitment/types';

interface RecruitmentRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: { platform: PlatformType; url: string }) => void;
}

export default function RecruitmentRequestDialog({
  open,
  onOpenChange,
  onSubmit,
}: RecruitmentRequestDialogProps) {
  const [platform, setPlatform] = useState<PlatformType | ''>('');
  const [url, setUrl] = useState('');

  const selectedLabel = PLATFORM_OPTIONS.find((option) => option.value === platform)?.label ?? '';

  const isValid = platform !== '' && url.trim() !== '';

  const resetForm = () => {
    setPlatform('');
    setUrl('');
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetForm();
    }
    onOpenChange(nextOpen);
  };

  const handleRemovePlatform = () => {
    setPlatform('');
  };

  const handleSubmit = () => {
    if (!isValid || !platform) return;

    // TODO: 플랫폼 다중 선택 요구가 확정되면 Select 기반 멀티셀렉트 UI로 확장 검토
    onSubmit({
      platform,
      url: url.trim(),
    });

    resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-[min(92vw,520px)] rounded-2xl border border-gray-200 bg-white p-0 shadow-xl"
      >
        <DialogHeader className="border-b border-gray-100 px-6 pb-4 pt-5">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <DialogTitle className="text-base font-semibold text-gray-900">
                공고 추가 요청
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                추가를 원하는 채용 공고 정보를 입력해주세요
              </DialogDescription>
            </div>

            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              className="rounded-md p-1 text-gray-400 transition hover:bg-gray-50 hover:text-gray-600"
              aria-label="닫기"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-6 px-6 py-5">
          <div className="space-y-2.5">
            <Label className="text-sm font-semibold text-gray-900">플랫폼</Label>

            <Select value={platform} onValueChange={(value) => setPlatform(value as PlatformType)}>
              <SelectTrigger className="h-11 w-full rounded-lg border-gray-200 text-sm text-gray-900">
                <SelectValue placeholder="플랫폼을 선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                {PLATFORM_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* TODO: 시안상 선택 플랫폼 태그 노출이 있으나, 현재 단일 선택 API 명세 기준으로 우선 제외 */}
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="recruitment-url" className="text-sm font-semibold text-gray-900">
              공고 원본 URL
            </Label>

            <Input
              id="recruitment-url"
              type="url"
              placeholder="https://www.wanted.co.kr/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="h-11 rounded-lg border-gray-200 text-sm"
            />

            <p className="text-xs text-gray-400">공고 페이지의 전체 URL을 붙여넣어 주세요</p>
          </div>
        </div>

        <DialogFooter className="border-t border-gray-100 px-6 py-4">
          <div className="flex w-full justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              className="h-10 rounded-lg border-gray-200 px-4 text-sm"
            >
              취소
            </Button>

            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!isValid}
              className="h-10 rounded-lg bg-gray-900 px-4 text-sm text-white hover:bg-gray-800"
            >
              요청하기
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
