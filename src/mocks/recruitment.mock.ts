import type { Recruitment } from '@/features/recruitment/types';

export const mockRecruitments: Recruitment[] = [
  {
    postId: 3001,
    title: '프론트엔드 엔지니어 (커머스 플랫폼 주문/결제 사용자 경험 개선 및 성능 최적화 담당)',
    companyName: '커머스랩',
    companyId: 11,
    jobType: 'FRONTEND',
    industryType: 'COMMERCE',
    experienceLevel: 3,
    status: 'POSTED',
    url: 'https://example.com/jobs/3001',
    deadline: '2026-03-31T23:59:59',
    analysisSummary: '커머스 플랫폼 사용자 경험 개선을 담당할 프론트엔드 엔지니어를 찾습니다.',
    postDescription: `
커머스랩은 대규모 사용자 트래픽 환경에서 더 빠르고 직관적인 쇼핑 경험을 만들어갈 프론트엔드 엔지니어를 찾고 있습니다.
주문/결제, 상품 상세, 장바구니, 프로모션 영역 전반에서 사용자 경험 개선과 성능 최적화를 함께 고민할 분을 기다립니다.

[주요업무]
- React / Next.js 기반 커머스 웹 서비스 프론트엔드 개발
- 주문/결제, 장바구니, 상품 상세 등 핵심 사용자 여정 UI 구현
- 백엔드 API 연동 및 상태 관리 구조 설계
- Lighthouse, Web Vitals 기반 성능 측정 및 최적화
- 디자인 시스템 및 공통 컴포넌트 개선
- QA 및 운영 이슈 대응, 코드 품질 개선

[자격요건]
- React 또는 Next.js 기반 서비스 개발 경험
- TypeScript를 활용한 프로젝트 경험
- REST API 연동 및 비동기 데이터 처리 경험
- 재사용 가능한 컴포넌트 설계 경험
- 협업 도구(Git, Figma, Notion, Slack 등) 사용 경험

[우대사항]
- 대규모 트래픽 서비스 운영 경험
- 커머스 도메인 또는 결제 플로우 관련 프로젝트 경험
- 성능 최적화, 접근성 개선 경험
- 테스트 코드 작성 경험
- 디자인 시스템 구축 또는 운영 경험

[전형안내]
서류 전형 → 직무 인터뷰 → 컬처핏 인터뷰 → 최종 합류`,
    analysis: {
      summary: '커머스 플랫폼 사용자 경험 개선을 담당할 프론트엔드 엔지니어를 찾습니다.',
      companySummary:
        '대규모 트래픽을 처리하는 커머스 플랫폼을 운영하며 데이터 기반 서비스 개선을 진행하는 기업입니다.',
      rolesResponsibilities: [
        '커머스 웹 서비스 프론트엔드 개발',
        '사용자 경험 개선을 위한 UI/UX 구현',
        '백엔드 API 연동 및 데이터 처리',
        '성능 최적화 및 코드 품질 개선',
      ],
      requiredSkills: [
        'React 또는 Next.js 경험',
        'TypeScript 사용 경험',
        'REST API 연동 경험',
        '웹 성능 최적화 경험',
      ],
      highlightPoints: ['대규모 트래픽 서비스 경험', '빠른 실험 및 기능 개선 사이클'],
      hiddenKeywords: ['커머스', '대규모트래픽', 'React', 'Next.js'],
      recommendedActions: [
        '대규모 트래픽 처리 경험 포트폴리오 정리',
        'React 성능 최적화 사례 준비',
      ],
    },
  },

  {
    postId: 3002,
    title: '프론트엔드 인턴 (핀테크 서비스 UI 개발 및 디자인 시스템 기반 컴포넌트 운영 지원)',
    companyName: '페이웨이브',
    companyId: 12,
    jobType: 'FRONTEND',
    industryType: 'FINTECH_FINANCIAL',
    experienceLevel: 0,
    status: 'POSTED',
    url: 'https://example.com/jobs/3002',
    deadline: null,
    analysisSummary: '핀테크 서비스 UI 개발을 지원할 프론트엔드 인턴을 모집합니다.',
    postDescription: `
페이웨이브는 결제와 금융 데이터를 기반으로 더 나은 사용자 경험을 만들어가는 핀테크 스타트업입니다.
프론트엔드 인턴은 실제 서비스 화면 개선과 공통 UI 컴포넌트 운영 업무를 함께 수행하게 됩니다.

[주요업무]
- React 기반 금융 서비스 웹 UI 개발 지원
- 디자인 시스템 기반 공통 컴포넌트 구현 및 유지보수
- 서비스 운영 중 발생하는 UI 이슈 수정
- 기획/디자인/개발팀과의 협업을 통한 화면 개선
- 사용자 관점에서의 UX 문제점 탐색 및 개선안 제안

[자격요건]
- HTML / CSS / JavaScript 기본 이해
- React 기초 사용 경험
- Git 기반 협업 경험
- 맡은 작업을 끝까지 책임감 있게 수행할 수 있는 분
- 사용자 경험에 관심이 많은 분

[우대사항]
- TypeScript 사용 경험
- 개인 프로젝트 또는 팀 프로젝트 경험
- 핀테크 서비스에 대한 관심
- Figma, Notion, Slack 등 협업 툴 사용 경험

[기타사항]
- 3개월 인턴십
- 우수 인턴의 경우 정규직 전환 검토 가능`,
    analysis: {
      summary: '핀테크 서비스 UI 개발을 지원할 프론트엔드 인턴을 모집합니다.',
      companySummary:
        '간편 결제와 금융 데이터를 기반으로 새로운 금융 경험을 제공하는 핀테크 스타트업입니다.',
      rolesResponsibilities: [
        '금융 서비스 웹 UI 개발 지원',
        '디자인 시스템 기반 컴포넌트 개발',
        '프론트엔드 코드 유지보수',
      ],
      requiredSkills: ['HTML / CSS / JavaScript 기본 이해', 'React 기초 경험', 'Git 사용 경험'],
      highlightPoints: ['핀테크 서비스 실무 경험', '주니어 개발자 멘토링 제공'],
      hiddenKeywords: ['핀테크', '결제서비스', 'React', '금융UX'],
      recommendedActions: ['React 프로젝트 포트폴리오 준비', '핀테크 서비스 UX 분석 정리'],
    },
  },

  {
    postId: 3003,
    title: '백엔드 엔지니어 (AI 데이터 처리 파이프라인 및 모델 서빙 플랫폼 구축 담당)',
    companyName: '에이아이코어',
    companyId: 13,
    jobType: 'BACKEND',
    industryType: 'AI',
    experienceLevel: 3,
    status: 'POSTED',
    url: 'https://example.com/jobs/3003',
    deadline: '2026-04-30T23:59:59',
    analysisSummary: 'AI 기반 서비스의 백엔드 시스템을 개발할 엔지니어를 찾습니다.',
    postDescription: `
에이아이코어는 다양한 산업군의 데이터를 분석하고 AI 기반 자동화 솔루션을 제공하는 기술 스타트업입니다.
서비스 확장에 따라 안정적인 API 서버, 데이터 처리 파이프라인, 모델 서빙 환경을 함께 구축할 백엔드 엔지니어를 찾고 있습니다.

[주요업무]
- AI 서비스 백엔드 API 설계 및 개발
- 데이터 수집/처리 파이프라인 구축 및 운영
- 모델 서빙을 위한 서버 아키텍처 설계
- 클라우드 인프라 운영 및 모니터링 환경 개선
- 대용량 요청 처리 및 시스템 안정성 확보
- ML 엔지니어, 프론트엔드 개발자와의 협업

[자격요건]
- Node.js 또는 Python 기반 백엔드 개발 경험
- REST API 설계 및 구현 경험
- Docker, AWS 등 클라우드 환경 사용 경험
- RDB 또는 NoSQL 데이터베이스 사용 경험
- 문제 해결 중심의 커뮤니케이션 역량

[우대사항]
- 데이터 파이프라인 구축 경험
- AI/ML 서비스 운영 경험
- Kubernetes, 메시지 큐, 캐시 시스템 사용 경험
- 대규모 트래픽 처리 또는 장애 대응 경험
- 테스트 자동화 및 CI/CD 구축 경험

[채용절차]
서류 검토 → 기술 인터뷰 → 최종 인터뷰 → 처우 협의`,
    analysis: {
      summary: 'AI 기반 서비스의 백엔드 시스템을 개발할 엔지니어를 찾습니다.',
      companySummary: 'AI 모델을 활용한 데이터 분석 플랫폼을 개발하는 기술 중심 스타트업입니다.',
      rolesResponsibilities: [
        'AI 서비스 백엔드 API 개발',
        '데이터 처리 및 모델 서빙 시스템 구축',
        '클라우드 인프라 운영',
      ],
      requiredSkills: [
        'Node.js 또는 Python 백엔드 개발 경험',
        'REST API 설계 경험',
        'Docker 또는 클라우드 환경 경험',
      ],
      highlightPoints: ['AI 서비스 백엔드 경험', '데이터 파이프라인 구축 경험'],
      hiddenKeywords: ['AI', 'ML', '데이터파이프라인', 'API'],
      recommendedActions: ['AI 서비스 아키텍처 이해 정리', '데이터 처리 프로젝트 경험 정리'],
    },
  },
];
