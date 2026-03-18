import { Info } from 'lucide-react';
import { DAILY_LIMIT, TODAY_USAGE } from '@/features/interview/constants/limit';

export default function InterviewGuideCard() {
  return (
    <div className="flex w-full flex-1 flex-col gap-4">
      <div className="overflow-hidden rounded-xl border border-blue-100 bg-white">
        <div className="flex items-center gap-3 bg-blue-50 px-4 py-3.5 md:px-5 md:py-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100">
            <Info className="h-4 w-4 text-blue-600" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[14px] font-bold text-blue-800">면접 질문 생성 안내</span>
            <span className="text-[12px] text-blue-600">
              면접 질문은 선택한 포트폴리오를 기반으로 생성됩니다
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex gap-3 border-b border-blue-50 px-4 py-3.5 md:px-5">
            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[13px] font-semibold text-gray-800">면접 질문 5개 제공</span>
              <span className="text-xs leading-normal text-gray-500">
                생성 시 직무와 포트폴리오를 기반으로 한 맞춤형 면접 질문 5개가 제공됩니다
              </span>
            </div>
          </div>

          <div className="flex gap-3 border-b border-blue-50 px-4 py-3.5 md:px-5">
            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[13px] font-semibold text-gray-800">하루 1회 생성 제한</span>
              <span className="text-xs leading-normal text-gray-500">
                면접 질문 생성은 하루 최대 {DAILY_LIMIT}회 가능합니다 (오늘 {TODAY_USAGE}회 사용)
              </span>
            </div>
          </div>

          <div className="flex gap-3 border-b border-blue-50 px-4 py-3.5 md:px-5">
            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[13px] font-semibold text-gray-800">
                포트폴리오 선택 시 맞춤형 질문 생성
              </span>
              <span className="text-xs leading-normal text-gray-500">
                포트폴리오를 선택하면 해당 내용을 분석해 맞춤형 면접 질문을 생성합니다.
              </span>
            </div>
          </div>

          <div className="flex gap-3 rounded-b-xl px-4 py-3.5 md:px-5">
            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-300" />
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5">
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-blue-600">
                  Coming Soon
                </span>
                <span className="text-[13px] font-semibold text-gray-500">
                  AI 모의 면접 기능 제공 예정
                </span>
              </div>
              <span className="text-xs leading-normal text-gray-400">
                생성된 질문에 직접 답변하고 AI 평가를 받는 모의 면접 기능이 추후 제공될 예정입니다
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
