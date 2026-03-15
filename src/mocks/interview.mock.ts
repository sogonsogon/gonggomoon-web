import type {
  Interview,
  InterviewDetail,
  InterviewQuestion,
  QuestionLevel,
} from '@/features/interview/types';

const q = (
  questionId: number,
  question: string,
  questionLevel: QuestionLevel,
): InterviewQuestion => ({
  questionId,
  question,
  questionLevel,
});

export const mockInterviews: Interview[] = [
  {
    interviewStrategyId: 7001,
    createdAt: '2026-03-01T05:20:00.000Z',
  },
  {
    interviewStrategyId: 7002,
    createdAt: '2026-03-03T11:00:00.000Z',
  },
];

export const mockInterviewDetails: Record<number, InterviewDetail> = {
  7001: {
    interviewStrategyId: 7001,
    createdAt: '2026-03-01T05:20:00.000Z',
    basePortfolio: '프로젝트 관리 OS (MVP1) 중심 포트폴리오',
    questionTotalCount: 6,
    contents: [
      q(1, '상태 관리(Zustand 등)를 선택할 때 기준과 트레이드오프를 설명해 주세요.', 'MIDDLE'),
      q(
        2,
        '리스트/상세 화면에서 Skeleton UI를 설계할 때 가장 중요하게 보는 지표는 무엇인가요?',
        'LOWER',
      ),
      q(3, 'TanStack Query의 캐싱 전략을 어떻게 잡았고, 어떤 버그를 예방했나요?', 'HIGH'),
      q(
        4,
        'Drag & Drop에서 “상태 변경”과 “순서 변경”을 분리해 설계한 이유를 설명해 주세요.',
        'MIDDLE',
      ),
      q(5, 'API 응답 Envelope 구조를 공통화하는 장점/단점을 예시로 말해 주세요.', 'MIDDLE'),
      q(6, '성능 이슈를 발견했을 때 어떤 순서로 원인을 좁히나요?', 'HIGH'),
    ],
  },
  7002: {
    interviewStrategyId: 7002,
    createdAt: '2026-03-03T11:00:00.000Z',
    basePortfolio: '커머스 과제 기반 포트폴리오',
    questionTotalCount: 10,
    contents: [
      q(1, '커머스 서비스에서 장바구니 상태를 관리할 때 고려한 점을 설명해 주세요.', 'LOWER'),
      q(2, '상품 목록 페이지의 성능을 개선했던 경험이 있다면 말해 주세요.', 'MIDDLE'),
      q(3, '디자인 시스템 컴포넌트를 운영할 때 중요하게 본 기준은 무엇인가요?', 'MIDDLE'),
      q(4, '결제/주문 플로우에서 사용자 이탈을 줄이기 위해 어떤 점을 개선할 수 있을까요?', 'HIGH'),
      q(
        5,
        '프론트엔드에서 에러 상태를 사용자에게 어떻게 보여주는 것이 좋다고 생각하나요?',
        'MIDDLE',
      ),
      q(6, '공통 컴포넌트와 도메인 컴포넌트를 나누는 기준을 설명해 주세요.', 'HIGH'),
      q(7, 'API 연동 중 중복 호출 문제를 발견하면 어떤 식으로 디버깅하나요?', 'HIGH'),
      q(8, 'React Query와 전역 상태 관리 도구를 함께 쓸 때 역할을 어떻게 나누나요?', 'MIDDLE'),
      q(9, '실무 협업에서 기획/디자인과 조율이 필요했던 경험을 설명해 주세요.', 'LOWER'),
      q(10, '사용자 경험과 개발 생산성 사이에서 트레이드오프가 생기면 어떻게 판단하나요?', 'HIGH'),
    ],
  },
};
