import { MessageCircleIcon } from 'lucide-react';
import Link from 'next/link';

export default function MyInterviewEmpty() {
  return (
    <div className="flex h-90 flex-col items-center justify-center gap-4 rounded-xl border border-gray-200 bg-white">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
        <MessageCircleIcon className="h-6 w-6 text-gray-400" />
      </div>
      <div className="flex flex-col items-center gap-1.5 text-center">
        <p className="text-[15px] font-semibold text-gray-900">생성된 면접 질문이 없어요</p>
        <p className="text-[13px] text-gray-500">
          포트폴리오를 선택하고 맞춤형 면접 질문을 생성해 보세요
        </p>
      </div>
      <Link
        href="/interview/create"
        className="rounded-lg bg-gray-900 px-4 py-2 text-[13px] font-semibold text-white hover:bg-gray-700"
      >
        면접 질문 생성하기
      </Link>
    </div>
  );
}
