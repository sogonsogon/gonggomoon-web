import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Banner() {
  return (
    <div
      className="flex items-center justify-between rounded-2xl px-9 py-7 max-md:flex-col max-md:items-start max-md:gap-4 max-md:px-5 max-md:py-5 lg:px-6 lg:py-6 xl:px-9 xl:py-7"
      style={{
        background: 'linear-gradient(90deg, #1B64DA 0%, #3182F6 50%, #64A8FF 100%)',
      }}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-white" />
          <span className="text-lg font-bold text-white max-md:text-base">
            AI 포트폴리오 전략을 세워보세요
          </span>
        </div>
        <p className="text-sm text-white/80 max-md:text-[13px] max-md:leading-relaxed">
          직무와 타겟 산업에 맞는 핵심 역량 3가지부터 키워드 태그, 포트폴리오 체크리스트까지 한 번에
          확인하세요.
        </p>
      </div>
      <Link
        href="/strategy/create"
        className="flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50 max-md:w-full max-md:justify-center max-md:px-4 max-md:py-2.5 lg:px-5 lg:py-2.5 xl:px-6 xl:py-3"
      >
        포폴 전략 생성하기
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
