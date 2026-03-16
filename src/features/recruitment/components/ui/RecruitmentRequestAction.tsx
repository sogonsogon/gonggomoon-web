'use client';

import { useState } from 'react';
import { Headphones } from 'lucide-react';
import { toast } from 'sonner';
import FloatingActionButton from '@/shared/components/ui/FloatingActionButton';
import RecruitmentRequestDialog from '@/features/recruitment/components/ui/RecruitmentRequestDialog';
import { useGetRecruitmentPlatforms, useRequestRecruitment } from '@/features/recruitment/queries';
import { useUser } from '@/features/user/queries';

export default function RecruitmentRequestAction() {
  const { data: user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [dialogKey, setDialogKey] = useState(0);

  const {
    data,
    isLoading: isPlatformLoading,
    isError: isPlatformError,
  } = useGetRecruitmentPlatforms({ enabled: !!user });

  const platformOptions = data?.content ?? [];

  const { mutateAsync: submitRecruitment, isPending } = useRequestRecruitment();

  if (!user) {
    return null;
  }

  const handleOpen = () => {
    if (isPlatformLoading) {
      toast.message('플랫폼 목록을 불러오는 중이에요.');
      return;
    }

    if (isPlatformError) {
      toast.error('플랫폼 목록을 불러오지 못했어요. 잠시 후 다시 시도해주세요.');
      return;
    }

    setDialogKey((prev) => prev + 1);
    setIsOpen(true);
  };

  const handleSubmit = async (payload: { platformId: number; url: string }) => {
    try {
      await submitRecruitment({
        platformId: payload.platformId,
        postUrl: payload.url,
      });

      toast.success('공고 추가 요청이 접수되었어요.');
      setIsOpen(false);
    } catch (error) {
      console.error('공고 추가 요청 실패:', error);
      toast.error('공고 추가 요청에 실패했어요. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <>
      <FloatingActionButton
        onClick={handleOpen}
        ariaLabel="공고 추가 요청 다이얼로그 열기"
        icon={<Headphones className="h-5 w-5 text-gray-700" />}
        label={
          <>
            공고 추가
            <br />
            요청하기
          </>
        }
      />

      <RecruitmentRequestDialog
        key={dialogKey}
        open={isOpen}
        onOpenChange={setIsOpen}
        platformOptions={platformOptions}
        onSubmit={handleSubmit}
        isPending={isPending || isPlatformLoading}
      />
    </>
  );
}
