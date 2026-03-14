import { AlertCircleIcon } from 'lucide-react';

interface MyInterviewErrorProps {
  message?: string;
}

export default function MyInterviewError({ message }: MyInterviewErrorProps) {
  return (
    <div className="flex h-90 flex-col items-center justify-center gap-4 rounded-xl border border-gray-200 bg-white">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
        <AlertCircleIcon className="h-6 w-6 text-red-400" />
      </div>
      <div className="flex flex-col items-center gap-1.5 text-center">
        <p className="text-[15px] font-semibold text-gray-900">면접 목록을 불러올 수 없어요</p>
        <p className="text-[13px] text-gray-500">
          {message ?? '일시적인 오류가 발생했어요. 잠시 후 다시 시도해 주세요.'}
        </p>
      </div>
    </div>
  );
}
