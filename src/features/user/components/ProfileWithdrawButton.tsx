'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import ProfileWithdrawDialog from './ProfileWithdrawDialog';

interface ProfileWithdrawButtonProps {
  userEmail: string;
}

export default function ProfileWithdrawButton({ userEmail }: ProfileWithdrawButtonProps) {
  const [open, setOpen] = useState(false);

  const handleWithdraw = async () => {
    // TODO: 회원 탈퇴 API 호출 및 리다이렉트
  };

  return (
    <>
      <Button
        type="button"
        variant="link"
        className="text-gray-400 hover:text-red-500 hover:no-underline"
        onClick={() => setOpen(true)}
      >
        회원 탈퇴
      </Button>
      <ProfileWithdrawDialog
        open={open}
        onOpenChange={setOpen}
        userEmail={userEmail}
        onConfirm={handleWithdraw}
      />
    </>
  );
}
