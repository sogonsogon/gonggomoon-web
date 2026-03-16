import CompanyDetailSection from '@/features/company/components/sections/CompanyDetailSection';
import CompanyIndustryAnalysisSection from '@/features/company/components/sections/CompanyIndustryAnalysisSection';
import { getCompanyDetail } from '@/features/company/actions';
import { getIndustryAnalysis } from '@/features/industry/actions';
import FloatingActionButton from '@/shared/components/ui/FloatingActionButton';
import { Lightbulb } from 'lucide-react';

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
      <div className="mx-auto flex w-full max-w-7xl items-start gap-10 px-4 py-10 max-lg:flex-col max-lg:items-stretch max-lg:gap-6 max-lg:py-7 max-md:py-6 max-md:pb-[calc(env(safe-area-inset-bottom)+7rem)]">
        <CompanyDetailSection company={company} />
        <CompanyIndustryAnalysisSection analysis={industryAnalysis} />
      </div>
      <FloatingActionButton
        href="/strategy/create"
        ariaLabel="포트폴리오 전략 생성 페이지로 이동"
        wrapperClassName="max-md:right-4 max-md:bottom-[calc(env(safe-area-inset-bottom)+1rem)]"
        buttonClassName="bg-[#3182f6] hover:bg-[#2c74dd] border-transparent"
        icon={<Lightbulb className="h-5 w-5 text-white" />}
        label={
          <>
            포폴 전략
            <br />
            생성하러 가기
          </>
        }
      />
    </div>
  );
}
