interface CompanyIntroProps {
  description?: string | null;
}

export default function CompanyIntro({ description }: CompanyIntroProps) {
  return (
    <div className="flex flex-col gap-4 py-6">
      <h2 className="text-base font-bold text-gray-900">기업 소개</h2>
      <p className="text-sm leading-[1.7] text-gray-700">
        {description ?? '기업 소개 정보가 없습니다.'}
      </p>
    </div>
  );
}
