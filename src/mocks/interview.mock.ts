import type { Interview, InterviewQuestion, QuestionLevel } from '@/features/interview/types';

const q = (
  questionId: number,
  content: string,
  questionLevel: QuestionLevel,
): InterviewQuestion => ({
  questionId,
  content,
  questionLevel,
});

export const mockInterviewSets: Interview[] = [
  {
    interviewSetId: 7001,
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
  // 목록에서 세트 카드만 보여주고 싶은 케이스 (contents 없음)
  {
    interviewSetId: 7002,
    createdAt: '2026-03-03T11:00:00.000Z',
    basePortfolio: '커머스 과제 기반 포트폴리오',
    questionTotalCount: 10,
  },
];
