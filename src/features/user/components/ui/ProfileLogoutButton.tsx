'use client';

import { useLogout } from '@/features/auth/queries';
import { Button } from '@/shared/components/ui/button';
import { LogOutIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfileLogoutButton() {
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = async () => {
    if (isPending) return;
    logout();
  };

  return (
    <Button type="button" variant="outline" onClick={handleLogout} disabled={isPending}>
      <LogOutIcon className="h-4 w-4 text-gray-600" />
      <span className="text-sm font-medium text-gray-700">로그아웃</span>
    </Button>
  );
}
