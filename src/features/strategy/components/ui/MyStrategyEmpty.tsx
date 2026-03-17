import { LightbulbIcon } from 'lucide-react';
import Link from 'next/link';

export default function MyStrategyEmpty() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-32">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
        <LightbulbIcon className="h-6 w-6 text-gray-400" />
      </div>
      <div className="flex flex-col items-center gap-1.5 text-center">
        <p className="text-[15px] font-semibold text-gray-900">생성된 포폴 전략이 없어요</p>
        <p className="text-[13px] text-gray-500">
          경험과 조건을 설정해 나만의 포트폴리오 전략을 만들어 보세요
        </p>
      </div>
      <Link
        href="/strategy/create"
        className="rounded-lg bg-gray-900 px-4 py-2 text-[13px] font-semibold text-white hover:bg-gray-700"
      >
        포폴 전략 생성하기
      </Link>
    </div>
  );
}
