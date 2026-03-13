'use client';

import { useState } from 'react';
import { Headphones } from 'lucide-react';
import { toast } from 'sonner';
import FloatingActionButton from '@/shared/components/ui/FloatingActionButton';
import RecruitmentRequestDialog from '@/features/recruitment/components/ui/RecruitmentRequestDialog';
import { requestRecruitment } from '@/features/recruitment/actions';
import { RecruitmentPlatform } from '@/features/recruitment/types';

interface RecruitmentRequestActionProps {
  platformOptions: RecruitmentPlatform[];
}

export default function RecruitmentRequestAction({
  platformOptions,
}: RecruitmentRequestActionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [dialogKey, setDialogKey] = useState(0);

  const handleOpen = () => {
    setDialogKey((prev) => prev + 1);
    setIsOpen(true);
  };

  const handleSubmit = async (payload: { platformId: number; url: string }) => {
    try {
      setIsPending(true);

      const result = await requestRecruitment({
        platformId: payload.platformId,
        postUrl: payload.url,
      });

      if (!result.success) {
        throw result;
      }

      toast.success('공고 추가 요청이 접수되었어요.');
      setIsOpen(false);
    } catch (error) {
      console.error('공고 추가 요청 실패:', error);
      toast.error('공고 추가 요청에 실패했어요. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <FloatingActionButton
        icon={<Headphones className="h-5 w-5 text-gray-700" />}
        label={
          <>
            공고 추가
            <br />
            요청하기
          </>
        }
        onClick={handleOpen}
      />

      <RecruitmentRequestDialog
        key={dialogKey}
        open={isOpen}
        onOpenChange={setIsOpen}
        platformOptions={platformOptions}
        onSubmit={handleSubmit}
        isPending={isPending}
      />
    </>
  );
}
