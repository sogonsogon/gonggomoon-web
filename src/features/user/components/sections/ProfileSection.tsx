'use client';
import ProfileCard from '@/features/user/components/ui/ProfileCard';
import ProfileLogoutButton from '@/features/user/components/ui/ProfileLogoutButton';
import ProfileWithdrawButton from '@/features/user/components/ui/ProfileWithdrawButton';
import { useUser } from '@/features/user/queries';

export default function ProfileSection() {
  const { data: user } = useUser();

  return (
    <>
      {/* 프로필 카드 */}
      <ProfileCard />

      {/* 액션 버튼 */}
      <div className="flex items-center gap-3">
        <ProfileLogoutButton />
        {user && <ProfileWithdrawButton userEmail={user.email} />}
      </div>
    </>
  );
}
