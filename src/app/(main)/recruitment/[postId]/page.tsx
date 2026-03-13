import RecruitmentDetailOverview from '@/features/recruitment/components/ui/RecruitmentDetailOverview';
import RecruitmentDetailContent from '@/features/recruitment/components/ui/RecruitmentDetailContent';
import RecruitmentAnalysisSection from '@/features/recruitment/components/sections/RecruitmentAnalysisSection';
import { getRecruitmentDetail } from '@/features/recruitment/actions';
import FloatingActionButton from '@/shared/components/ui/FloatingActionButton';
import { Lightbulb } from 'lucide-react';

interface RecruitmentDetailPageProps {
  params: Promise<{ postId: string }>;
}

export default async function RecruitmentDetailPage({ params }: RecruitmentDetailPageProps) {
  const postId = Number((await params).postId);

  const response = await getRecruitmentDetail(postId);
  const recruitment = response.data;

  if (!recruitment) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-white font-sans">
        <div className="flex flex-1 items-center justify-center">
          <p className="text-gray-500">공고를 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white font-sans">
      <div className="mx-auto flex w-full max-w-7xl gap-10 px-4 py-10">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <RecruitmentDetailOverview recruitment={recruitment} />

          <div className="h-px bg-gray-100" />

          <RecruitmentDetailContent
            content={recruitment.originalContent ?? '공고 원문이 없습니다.'}
          />
        </div>

        <RecruitmentAnalysisSection analysis={recruitment.analysis} />
      </div>
      <FloatingActionButton
        href="/strategy/create"
        ariaLabel="포트폴리오 전략 생성 페이지로 이동"
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
