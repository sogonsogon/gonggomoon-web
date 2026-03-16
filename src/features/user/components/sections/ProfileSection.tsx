'use client';

import ProfileCard from '@/features/user/components/ui/ProfileCard';
import ProfileError from '@/features/user/components/ui/ProfileError';
import ProfileLoading from '@/features/user/components/ui/ProfileLoading';
import ProfileLogoutButton from '@/features/user/components/ui/ProfileLogoutButton';
import ProfileWithdrawButton from '@/features/user/components/ui/ProfileWithdrawButton';
import { useUser } from '@/features/user/queries';

export default function ProfileSection() {
  const { data: user, isLoading, isError, error } = useUser();

  if (isLoading) {
    return <ProfileLoading />;
  }

  if (isError) {
    return <ProfileError errorMessage={error.message} />;
  }

  return (
    <>
      {/* 프로필 카드 */}
      <ProfileCard user={user!} />

      {/* 액션 버튼 */}
      <div className="flex items-center gap-3">
        <ProfileLogoutButton />
        {user && <ProfileWithdrawButton userEmail={user.email} />}
      </div>
    </>
  );
}
