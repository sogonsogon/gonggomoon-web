'use client';

import { useState } from 'react';
import { Headphones } from 'lucide-react';
import FloatingActionButton from '@/shared/components/ui/FloatingActionButton';
import RecruitmentRequestDialog from '@/features/recruitment/components/ui/RecruitmentRequestDialog';
import { PlatformType } from '@/features/recruitment/types';

export default function RecruitmentRequestAction() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (payload: { platform: PlatformType; url: string }) => {
    // TODO: 공고 추가 요청 API 연동 후 성공 시 모달 닫힘 처리
    console.log(payload);
    setOpen(false);
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
        onClick={() => setOpen(true)}
      />

      <RecruitmentRequestDialog open={open} onOpenChange={setOpen} onSubmit={handleSubmit} />
    </>
  );
}
