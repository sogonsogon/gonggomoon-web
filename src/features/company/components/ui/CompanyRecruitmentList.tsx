'use client';

import CompanyRecruitmentListItem from '@/features/company/components/ui/CompanyRecruitmentListItem';
import { useGetRecruitments } from '@/features/recruitment/queries';
import { useParams } from 'next/navigation';

export default function CompanyRecruitmentList() {
  const params = useParams<{ companyId: string }>();
  const companyId = Number(params.companyId);

  const { data } = useGetRecruitments();

  const recruitments = data?.items ?? [];
  const companyRecruitments = recruitments.filter(
    (recruitment) => recruitment.companyId === companyId,
  );

  return (
    <div className="flex flex-col gap-4 pt-6">
      <h2 className="text-base font-bold text-gray-900">현재 채용 중인 공고</h2>

      {companyRecruitments.length === 0 ? (
        <p className="text-sm text-gray-400">현재 채용 중인 공고가 없습니다.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {companyRecruitments.map((recruitment) => (
            <CompanyRecruitmentListItem key={recruitment.postId} recruitment={recruitment} />
          ))}
        </div>
      )}
    </div>
  );
}
