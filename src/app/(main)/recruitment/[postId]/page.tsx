import RecruitmentDetailOverview from '@/features/recruitment/components/ui/RecruitmentDetailOverview';
import RecruitmentDetailContent from '@/features/recruitment/components/ui/RecruitmentDetailContent';
import RecruitmentAnalysisSection from '@/features/recruitment/components/sections/RecruitmentAnalysisSection';
import { getRecruitmentDetail } from '@/features/recruitment/actions';
import FloatingActionButton from '@/shared/components/ui/FloatingActionButton';
import { Lightbulb } from 'lucide-react';
import { RecruitmentDetail } from '@/features/recruitment/types';

interface RecruitmentDetailPageProps {
  params: Promise<{ postId: string }>;
}

export default async function RecruitmentDetailPage({ params }: RecruitmentDetailPageProps) {
  const postId = Number((await params).postId);

  const response = await getRecruitmentDetail(postId);
  const recruitment = response.data;

  // const recruitment: RecruitmentDetail = {
  //   postId: 20260506,
  //   companyId: 101,
  //   industryId: 5,
  //   companyName: '한화시스템 (Hanwha Systems)',
  //   industryName: 'IT 서비스 / 방산',
  //   postTitle: 'ICT 부문 프론트엔드 개발자 채용',
  //   postUrl: 'https://www.hanwhain.com/web/apply/notification/view.do?seq=1234',
  //   experienceLevel: 0,
  //   originalContent:
  //     '한화시스템 ICT 부문에서 혁신적인 엔터프라이즈 솔루션을 함께 구축할 프론트엔드 개발자를 모집합니다. 최신 웹 기술 스택을 활용하여 사용자 중심의 인터페이스를 구현합니다.',

  //   // 수정된 타입 반영
  //   jobType: 'FRONTEND',
  //   status: 'ANALYZED',

  //   stateDate: '2026-05-01',
  //   dueDate: '2026-05-20',
  //   analyzedContent: {
  //     summary: '엔터프라이즈 솔루션 고도화를 위한 프론트엔드 신입/경력 채용',
  //     company_intro: '첨단 기술을 통해 안전하고 풍요로운 미래를 만드는 글로벌 솔루션 기업',
  //     rnr: [
  //       'React 기반의 대규모 엔터프라이즈 웹 애플리케이션 개발',
  //       '클라우드 네이티브 환경에서의 프론트엔드 아키텍처 설계',
  //       'UI/UX 개선을 위한 지속적인 코드 리팩터링 및 성능 최적화',
  //     ],
  //     required_skills: [
  //       'React, TypeScript 기반 개발 경험',
  //       '상태 관리 라이브러리(Zustand, TanStack Query) 활용 능력',
  //       'RESTful API 설계에 대한 기본적인 이해',
  //     ],
  //     differentiators: [
  //       'Next.js App Router 기반의 프로젝트 수행 경험',
  //       'CI/CD 파이프라인 및 자동화 테스트 구축 경험',
  //       '컴포넌트 주도 개발(Storybook) 및 디자인 시스템 운영 경험',
  //     ],
  //     hidden_keywords: ['기술적 도전', '체계적인 프로세스', '안정적인 인프라', '협업 역량'],
  //     action_items: [
  //       '기존에 진행한 프론트엔드 프로젝트의 기술 스택 선정 이유 정리',
  //       '대규모 데이터 렌더링 최적화 경험 사례 준비',
  //       '사용자 요구사항을 기술적 명세로 변환했던 경험 구체화',
  //     ],
  //   },
  // };

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
    <>
      <div className="mx-auto w-full max-w-7xl px-4 py-10 max-lg:py-7 max-md:py-6 max-md:pb-[calc(env(safe-area-inset-bottom)+7rem)]">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <RecruitmentDetailOverview recruitment={recruitment} />

          <div className="h-px bg-gray-100" />
          <RecruitmentAnalysisSection analysis={recruitment.analyzedContent} />
        </div>
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
    </>
  );
}
