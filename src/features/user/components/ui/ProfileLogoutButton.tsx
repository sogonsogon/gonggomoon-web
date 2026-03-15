'use client';

import { useLogout } from '@/features/auth/queries';
import { Button } from '@/shared/components/ui/button';
import { LogOutIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfileLogoutButton() {
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = async () => {
    if (isPending) return;
    logout(undefined, {
      onError: (error) => {
        toast.error(error.message || '로그아웃에 실패했습니다. 잠시 후 다시 시도해주세요.');
      },
    });
  };

  return (
    <Button type="button" variant="outline" onClick={handleLogout} disabled={isPending}>
      <LogOutIcon className="h-4 w-4 text-gray-600" />
      <span className="text-sm font-medium text-gray-700">로그아웃</span>
    </Button>
  );
}
