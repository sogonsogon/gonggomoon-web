import type { Recruitment } from '@/features/recruitment/types';
import CompanyRecruitmentListItem from '@/features/company/components/ui/CompanyRecruitmentListItem';

interface CompanyRecruitmentListProps {
  recruitments: Recruitment[];
}

export default function CompanyRecruitmentList({ recruitments }: CompanyRecruitmentListProps) {
  return (
    <div className="flex flex-col gap-4 pt-6">
      <h2 className="text-base font-bold text-gray-900">현재 채용 중인 공고</h2>

      {recruitments.length === 0 ? (
        <p className="text-sm text-gray-400">현재 채용 중인 공고가 없습니다.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {recruitments.map((recruitment) => (
            <CompanyRecruitmentListItem key={recruitment.postId} recruitment={recruitment} />
          ))}
        </div>
      )}
    </div>
  );
}
