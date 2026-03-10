'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { useWithdrawUser } from '@/features/user/queries';

interface ProfileWithdrawDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userEmail: string;
}

export default function ProfileWithdrawDialog({
  open,
  onOpenChange,
  userEmail,
}: ProfileWithdrawDialogProps) {
  // 회원 탈퇴도 우선 제외하고 진행
  // const { mutate: withdraw, isPending } = useWithdrawUser();

  const [emailInput, setEmailInput] = useState('');

  const isMatch = emailInput === userEmail;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setEmailInput('');
    }
    onOpenChange(nextOpen);
  };

  const handleConfirm = () => {
    if (!isMatch) return;
    // withdraw();
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>회원 탈퇴</DialogTitle>
          <DialogDescription>
            탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.
            <br />
            계속하려면 아래에 {userEmail}을 입력해 주세요.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email-confirm" className="text-sm font-medium text-gray-700">
            이메일 주소
          </Label>
          <Input
            id="email-confirm"
            type="email"
            placeholder={userEmail}
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            autoComplete="off"
          />
          {emailInput && !isMatch && (
            <p className="text-xs text-destructive">이메일이 일치하지 않습니다.</p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            취소
          </Button>
          <Button variant="destructive" disabled={!isMatch} onClick={handleConfirm}>
            회원 탈퇴
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
