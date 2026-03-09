import { mockCompanies } from '@/mocks/company.mock';
import { mockIndustries } from '@/mocks/industry.mock';
import { mockRecruitments } from '@/mocks/recruitment.mock';
import CompanyDetailSection from '@/features/company/components/sections/CompanyDetailSection';
import CompanyIndustryAnalysisSection from '@/features/company/components/sections/CompanyIndustryAnalysisSection';

interface CompanyDetailPageProps {
  params: Promise<{ companyId: string }>;
}

export default async function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  const companyId = Number((await params).companyId);
  const company = mockCompanies.find((c) => c.companyId === companyId);
  const companyRecruitments = mockRecruitments.filter((r) => r.companyId === companyId);
  const industry = company
    ? mockIndustries.find((i) => i.industryId === company.industryId)
    : undefined;

  if (!company) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-white font-sans">
        <div className="flex flex-1 items-center justify-center">
          <p className="text-gray-500">기업을 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-white font-sans">
      <div className="mx-auto flex w-full max-w-7xl items-start gap-10 px-4 py-10">
        <CompanyDetailSection company={company} recruitments={companyRecruitments} />
        <CompanyIndustryAnalysisSection analysis={industry?.analysis} />
      </div>
    </div>
  );
}
