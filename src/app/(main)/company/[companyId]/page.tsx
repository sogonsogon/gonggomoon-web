import CompanyDetailSection from '@/features/company/components/sections/CompanyDetailSection';
import CompanyIndustryAnalysisSection from '@/features/company/components/sections/CompanyIndustryAnalysisSection';
import { getCompanyDetail } from '@/features/company/actions';
import { getIndustryAnalysis } from '@/features/industry/actions';

interface CompanyDetailPageProps {
  params: Promise<{ companyId: string }>;
}

export default async function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  const companyId = Number((await params).companyId);

  const company = (await getCompanyDetail(companyId)).data;

  if (!company) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-white font-sans">
        <div className="flex flex-1 items-center justify-center">
          <p className="text-gray-500">기업을 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const industryAnalysis = (await getIndustryAnalysis(company.industryId)).data;

  return (
    <div className="flex min-h-screen w-full flex-col bg-white font-sans">
      <div className="mx-auto flex w-full max-w-7xl items-start gap-10 px-4 py-10">
        <CompanyDetailSection company={company} />
        <CompanyIndustryAnalysisSection analysis={industryAnalysis} />
      </div>
    </div>
  );
}
