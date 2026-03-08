import { mockUser } from '@/mocks/auth.mock';
import Title from '@/shared/components/ui/Title';
import ProfileCard from '@/features/user/components/sections/ProfileCard';
import ProfileLogoutButton from '@/features/user/components/ui/ProfileLogoutButton';
import ProfileWithdrawButton from '@/features/user/components/ui/ProfileWithdrawButton';

export default function ProfilePage() {
  const user = mockUser;

  return (
    <div className="flex min-h-screen flex-col w-full">
      {/* Right Content */}
      <div className="flex flex-1 flex-col gap-8">
        {/* Page Title */}
        <Title title={'프로필'} description={'계정 정보를 확인하고 관리할 수 있습니다'} />

        {/* Profile Card */}
        <ProfileCard user={user} />

        {/* Action Section */}
        <div className="flex items-center gap-3">
          <ProfileLogoutButton />
          <ProfileWithdrawButton userEmail={user.email} />
        </div>
      </div>
    </div>
  );
}
