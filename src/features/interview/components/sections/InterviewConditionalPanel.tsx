'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, RefreshCw, Sparkles, Timer, Loader2 } from 'lucide-react';
import { formatFileSize } from '@/features/file/utils/formatFileSize';
import PortfolioSelectDialog from '@/features/interview/components/ui/PortfolioSelectDialog';
import { TODAY_USAGE, DAILY_LIMIT, isLimitReached } from '@/features/interview/constants/limit';
import { useInterviewCreateFormStore } from '@/features/interview/stores/useInterviewCreateFormStore';
import { useInterviewGenerationStore } from '@/features/interview/stores/useInterviewGenerationStore';
import { startInterviewGeneration } from '@/features/interview/services/startInterviewGeneration';

export default function InterviewConditionalPanel() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedPortfolio = useInterviewCreateFormStore(
    (state) => state.formData.selectedPortfolio,
  );

  const submitLoading = useInterviewGenerationStore((state) => state.submitLoading);
  const requests = useInterviewGenerationStore((state) => state.requests);
  const requestOrder = useInterviewGenerationStore((state) => state.requestOrder);

  const isFormLocked = submitLoading;

  const processingCount = useMemo(() => {
    return requestOrder.filter((id) => requests[id]?.status === 'PROCESSING').length;
  }, [requestOrder, requests]);

  function handleOpenModal() {
    if (isFormLocked) return;
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  async function handleGenerate() {
    if (!selectedPortfolio || isLimitReached || isFormLocked) return;

    try {
      const response = await startInterviewGeneration();

      const { resetForm } = useInterviewCreateFormStore.getState();
      resetForm();

      router.push(`/interview/result/${response.interviewSetId}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="flex w-80 shrink-0 flex-col gap-4">
        <div className="flex flex-col gap-2.5 rounded-xl border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold text-gray-700">포트폴리오 선택</span>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-500">
              필수
            </span>
          </div>

          {selectedPortfolio ? (
            <>
              <div className="flex items-center gap-2.5 rounded-lg border-[1.5px] border-blue-300 bg-blue-50 px-3.5 py-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-100">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate text-[13px] font-semibold text-gray-900">
                    {selectedPortfolio.originalFileName}
                  </span>
                  <span className="text-[11px] text-gray-500">
                    {formatFileSize(selectedPortfolio.sizeBytes)} · 포폴
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleOpenModal}
                disabled={isFormLocked}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-blue-200 bg-white py-2.5 text-[12px] font-medium text-blue-600 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <RefreshCw className="h-3 w-3 text-blue-500" />
                다른 포트폴리오 선택
              </button>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-10 py-9">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <span className="text-[13px] font-semibold text-gray-700">
                    포트폴리오를 선택해 주세요
                  </span>
                  <span className="text-[12px] text-gray-400">
                    버튼을 눌러 포트폴리오를 선택하세요
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleOpenModal}
                disabled={isFormLocked}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-600 py-2.5 text-[13px] font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                포트폴리오 선택하기
              </button>
            </>
          )}
        </div>

        <div className="h-px bg-gray-100" />

        <div className="flex items-center justify-between rounded-[10px] border border-blue-100 bg-blue-50 px-4 py-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-medium text-blue-600">오늘 사용 횟수</span>
            <div className="flex items-center gap-1">
              <span className="text-[20px] font-bold text-blue-700">{TODAY_USAGE}</span>
              <span className="text-[13px] font-medium text-blue-400">/ {DAILY_LIMIT}회</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: DAILY_LIMIT }).map((_, i) => (
              <div
                key={i}
                className={`h-2.5 w-2.5 rounded-full ${
                  i < TODAY_USAGE ? 'bg-blue-500' : 'bg-blue-200'
                }`}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          disabled={!selectedPortfolio || isLimitReached || isFormLocked}
          className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-blue-600 py-3.5 text-[15px] font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              생성 요청 중...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              면접 질문 생성
            </>
          )}
        </button>

        {processingCount > 0 && (
          <div className="flex items-center justify-center gap-1">
            <Timer className="h-3 w-3 text-gray-400" />
            <span className="text-[11px] text-gray-400">
              현재 생성 중인 질문 {processingCount}건 · 추가 생성은 가능합니다.
            </span>
          </div>
        )}

        {processingCount === 0 && (
          <div className="flex items-center justify-center gap-1">
            <Timer className="h-3 w-3 text-gray-400" />
            <span className="text-[11px] text-gray-400">
              생성 후 자동 저장 · 결과 페이지로 이동
            </span>
          </div>
        )}
      </div>

      <PortfolioSelectDialog isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
