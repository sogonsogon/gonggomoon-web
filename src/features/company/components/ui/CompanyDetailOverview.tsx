import type { Company } from '@/features/company/types';
import CompanyDetailHeader from '@/features/company/components/ui/CompanyDetailHeader';
import CompanyIntro from '@/features/company/components/ui/CompanyIntro';
import CompanyMetaGrid from '@/features/company/components/ui/CompanyMetaGrid';

interface CompanyDetailOverviewProps {
  company: Company;
}

export default function CompanyDetailOverview({ company }: CompanyDetailOverviewProps) {
  return (
    <div className="flex flex-col">
      <CompanyDetailHeader company={company} />
      <CompanyMetaGrid company={company} />

      <div className="h-px bg-gray-100" />

      <CompanyIntro description={company.description} />
    </div>
  );
}
