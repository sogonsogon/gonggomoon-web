interface ProfileErrorProps {
  errorMessage?: string;
}

export default function ProfileError({ errorMessage }: ProfileErrorProps) {
  return (
    <div className="rounded-xl border border-gray-100 px-7 py-10 text-center text-sm text-gray-400">
      {errorMessage || '프로필 정보를 불러오지 못했습니다.'}
    </div>
  );
}
