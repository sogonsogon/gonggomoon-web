import Title from '@/shared/components/ui/Title';
import ProfileSection from '@/features/user/components/sections/ProfileSection';

export default async function ProfilePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 메인 영역*/}
      <div className="flex flex-1 flex-col gap-6">
        {/* 페이지 타이틀 */}
        <Title title={'프로필'} description={'계정 정보를 확인하고 관리할 수 있습니다'} />

        <ProfileSection />
      </div>
    </div>
  );
}
