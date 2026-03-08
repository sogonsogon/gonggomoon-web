'use client';

import { Button } from '@/shared/components/ui/button';
import { LogOutIcon } from 'lucide-react';

export default function ProfileLogoutButton() {
  const handleLogout = async () => {
    // TODO: 로그아웃 API 호출 및 리다이렉트
  };

  return (
    <Button type="button" variant="outline" onClick={handleLogout}>
      <LogOutIcon className="h-4 w-4 text-gray-600" />
      <span className="text-sm font-medium text-gray-700">로그아웃</span>
    </Button>
  );
}
