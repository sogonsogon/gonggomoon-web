import { mockRecruitments } from '@/mocks/recruitment.mock';
import { TabValue } from '@/features/recruitment/constants/tabs';
import RecruitmentList from '@/features/recruitment/components/ui/RecruitmentList';

interface RecruitmentListSectionProps {
  activeTab: TabValue;
}

export default async function RecruitmentListSection({ activeTab }: RecruitmentListSectionProps) {
  const filtered = mockRecruitments.filter((recruitment) => {
    return activeTab === 'ALL' || recruitment.jobType === activeTab;
  });

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-900">
          <span className="text-blue-500">{filtered.length}개</span>의 공고가 열려있어요.
        </span>
      </div>

      <RecruitmentList recruitments={filtered} />
    </div>
  );
}
