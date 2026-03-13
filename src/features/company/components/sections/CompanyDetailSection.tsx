import type { Company } from '@/features/company/types';
import CompanyDetailOverview from '@/features/company/components/ui/CompanyDetailOverview';
import CompanyRecruitmentList from '@/features/company/components/ui/CompanyRecruitmentList';

interface CompanyDetailSectionProps {
  company: Company;
}

export default function CompanyDetailSection({ company }: CompanyDetailSectionProps) {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <CompanyDetailOverview company={company} />

      <div className="h-px bg-gray-100" />

      <CompanyRecruitmentList />
    </div>
  );
}
