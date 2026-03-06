import { Recruitment } from '@/features/recruitment/types';
import RecruitmentListItem from '@/features/recruitment/components/ui/RecruitmentListItem';

type RecruitmentListProps = {
  recruitments: Recruitment[];
};

export default function RecruitmentList({ recruitments }: RecruitmentListProps) {
  return (
    <div className="flex flex-col">
      {recruitments.map((job) => {
        return (
          <RecruitmentListItem
            key={job.postId}
            postId={job.postId}
            title={job.title}
            deadline={job.deadline}
            experienceLevel={job.experienceLevel}
            companyName={job.companyName}
            analysisSummary={job.analysisSummary}
          />
        );
      })}
    </div>
  );
}
