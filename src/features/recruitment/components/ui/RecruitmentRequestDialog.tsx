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
import { RecruitmentPlatform } from '@/features/recruitment/types';

interface RecruitmentRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  platformOptions: RecruitmentPlatform[];
  onSubmit: (payload: { platformId: number; url: string }) => void | Promise<void>;
  isPending?: boolean;
}

export default function RecruitmentRequestDialog({
  open,
  onOpenChange,
  platformOptions,
  onSubmit,
  isPending = false,
}: RecruitmentRequestDialogProps) {
  const [platformId, setPlatformId] = useState<number | null>(null);
  const [url, setUrl] = useState('');

  const isValid = platformId !== null && url.trim() !== '';

  const handleOpenChange = (nextOpen: boolean) => {
    if (isPending) return;
    onOpenChange(nextOpen);
  };

  const handleSubmit = async () => {
    if (!isValid || platformId === null || isPending) return;

    await onSubmit({
      platformId,
      url: url.trim(),
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-[min(92vw,520px)] rounded-2xl border border-gray-200 bg-white p-0 shadow-xl max-md:top-auto max-md:left-1/2 max-md:bottom-[calc(env(safe-area-inset-bottom)+0.5rem)] max-md:w-[calc(100%-1rem)] max-md:max-w-none max-md:-translate-x-1/2 max-md:translate-y-0 max-md:rounded-2xl max-md:border max-md:border-gray-200 max-md:gap-0 max-md:max-h-[85dvh] max-md:flex max-md:flex-col"
      >
        <DialogHeader className="border-b border-gray-100 px-6 pb-4 pt-5 max-md:px-4 max-md:pb-3 max-md:pt-4">
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
              disabled={isPending}
              className="rounded-md p-1 text-gray-400 transition hover:bg-gray-50 hover:text-gray-600 disabled:opacity-50"
              aria-label="닫기"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-6 px-6 py-5 max-md:flex-1 max-md:overflow-y-auto max-md:px-4 max-md:py-4">
          <div className="space-y-2.5">
            <Label className="text-sm font-semibold text-gray-900">플랫폼</Label>

            <Select
              value={platformId !== null ? String(platformId) : ''}
              onValueChange={(value) => setPlatformId(Number(value))}
              disabled={isPending}
            >
              <SelectTrigger className="h-11 w-full rounded-lg border-gray-200 text-sm text-gray-900">
                <SelectValue placeholder="플랫폼을 선택해주세요" />
              </SelectTrigger>
              <SelectContent position="popper">
                {platformOptions.map((option) => (
                  <SelectItem key={option.platformId} value={String(option.platformId)}>
                    {option.platformName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              disabled={isPending}
              className="h-11 rounded-lg border-gray-200 text-sm"
            />

            <p className="text-xs text-gray-400">공고 페이지의 전체 URL을 붙여넣어 주세요</p>
          </div>
        </div>

        <DialogFooter className="border-t border-gray-100 px-6 py-4 max-md:sticky max-md:bottom-0 max-md:bg-white max-md:px-4 max-md:py-3 max-md:pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
          <div className="flex w-full justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isPending}
              className="h-10 rounded-lg border-gray-200 px-4 text-sm max-md:hidden"
            >
              취소
            </Button>

            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!isValid || isPending || platformOptions.length === 0}
              className="h-10 rounded-lg bg-gray-900 px-4 text-sm text-white hover:bg-gray-800 max-md:h-11 max-md:w-full"
            >
              {isPending ? '요청 중...' : '요청하기'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
