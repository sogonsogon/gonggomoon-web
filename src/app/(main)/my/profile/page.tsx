import { User, LogOut } from 'lucide-react';
import Image from 'next/image';
import { mockUser } from '@/mocks/auth.mock';
import Header from '@/shared/components/layout/Header';
import MyNav from '@/features/user/components/MyNav';
import Footer from '@/shared/components/layout/Footer';

// 프로필에 표시할 추가 mock 데이터 (생년월일은 User 타입에 없으므로 별도 관리)
const mockBirthDate = '1998.05.12';

export default function ProfilePage() {
  const user = mockUser;
  const birthDate = mockBirthDate;

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Header />

      {/* Body */}
      <div className="flex flex-1 gap-12 px-30 py-10">
        <MyNav activePath="/my/profile" />

        {/* Right Content */}
        <div className="flex flex-1 flex-col gap-8">
          {/* Page Title */}
          <div className="flex flex-col gap-1">
            <h1 className="text-[22px] font-bold text-gray-900">프로필</h1>
            <p className="text-sm text-gray-500">계정 정보를 확인하고 관리할 수 있습니다</p>
          </div>

          {/* Profile Card */}
          <div className="rounded-xl border border-gray-100 bg-white">
            {/* Card Header */}
            <div className="flex items-center gap-5 border-b border-gray-100 px-7 py-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gray-200">
                {user.profileImageUrl ? (
                  <Image
                    src={user.profileImageUrl}
                    alt={user.name}
                    width={64}
                    height={64}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <User className="h-7 w-7 text-gray-500" />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-lg font-bold text-gray-900">{user.name}</span>
                <span className="text-sm text-gray-500">{user.email}</span>
              </div>
            </div>

            {/* Info Rows */}
            <div className="px-7">
              <div className="flex items-center border-b border-gray-100 py-5">
                <span className="w-30 shrink-0 text-sm font-medium text-gray-500">이름</span>
                <span className="text-sm font-medium text-gray-900">{user.name}</span>
              </div>
              <div className="flex items-center border-b border-gray-100 py-5">
                <span className="w-30 shrink-0 text-sm font-medium text-gray-500">생년월일</span>
                <span className="text-sm font-medium text-gray-900">{birthDate}</span>
              </div>
              <div className="flex items-center py-5">
                <span className="w-30 shrink-0 text-sm font-medium text-gray-500">이메일</span>
                <span className="text-sm font-medium text-gray-900">{user.email}</span>
              </div>
            </div>
          </div>

          {/* Action Section */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-2.5 hover:bg-gray-50"
            >
              <LogOut className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">로그아웃</span>
            </button>
            <button type="button" className="px-2 py-2.5 text-sm text-gray-400 hover:text-gray-600">
              회원 탈퇴
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
