'use client';

import { UserIcon } from 'lucide-react';
import { useUser } from '@/features/user/queries';
import Image from 'next/image';

export default function ProfileCard() {
  const { data: user } = useUser();

  return (
    <>
      <div className="rounded-xl border border-gray-100">
        {/* 상단 프로필 정보 */}
        <div className="flex items-center gap-5 border-b border-gray-100 px-7 py-6">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gray-200">
            {user!.profileImageUrl ? (
              <Image
                src={user!.profileImageUrl}
                alt={user!.name}
                width={64}
                height={64}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <UserIcon className="h-7 w-7 text-gray-500" />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-lg font-bold text-gray-900">{user!.name}</span>
            <span className="text-sm text-gray-500">{user!.email}</span>
          </div>
        </div>

        {/* 프로필 정보 리스트 */}
        <div className="px-7">
          <div className="flex items-center border-b border-gray-100 py-5">
            <span className="w-30 shrink-0 text-sm font-medium text-gray-500">이름</span>
            <span className="text-sm font-medium text-gray-900">{user!.name}</span>
          </div>

          <div className="flex items-center py-5">
            <span className="w-30 shrink-0 text-sm font-medium text-gray-500">이메일</span>
            <span className="text-sm font-medium text-gray-900">{user!.email}</span>
          </div>
        </div>
      </div>
    </>
  );
}
