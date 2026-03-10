'use client';

import { useLogout } from '@/features/auth/queries';
import { Button } from '@/shared/components/ui/button';
import { LogOutIcon } from 'lucide-react';

export default function ProfileLogoutButton() {
  // const { mutate: logout, isPending } = useLogout();

  const handleLogout = async () => {
    // 로그아웃은 우선 배제하고 진행
    // logout();
  };

  return (
    <Button type="button" variant="outline" onClick={handleLogout}>
      <LogOutIcon className="h-4 w-4 text-gray-600" />
      <span className="text-sm font-medium text-gray-700">로그아웃</span>
    </Button>
  );
}
