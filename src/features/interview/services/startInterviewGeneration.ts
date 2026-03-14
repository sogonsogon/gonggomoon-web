import type { CreateInterviewRequest, CreateInterviewResponse } from '@/features/interview/types';
import { useInterviewCreateFormStore } from '@/features/interview/stores/useInterviewCreateFormStore';
import { useInterviewGenerationStore } from '@/features/interview/stores/useInterviewGenerationStore';

export async function startInterviewGeneration(): Promise<CreateInterviewResponse> {
  const { formData } = useInterviewCreateFormStore.getState();
  const { startSubmit, markSubmitFailed, addProcessingRequest } =
    useInterviewGenerationStore.getState();

  if (!formData.selectedPortfolioId) {
    throw new Error('포트폴리오를 선택해 주세요.');
  }

  const payload: CreateInterviewRequest = {
    fileAssetId: formData.selectedPortfolioId,
  };

  startSubmit();

  try {
    console.log('면접 질문 생성 요청 payload:', payload);

    // TODO: 실제 면접 질문 생성 API 연동 후 제거
    const response: CreateInterviewResponse = {
      interviewStrategyId: Date.now(),
      status: 'PROCESSING',
    };

    addProcessingRequest(response.interviewStrategyId);

    return response;
  } catch (err) {
    const message = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';

    markSubmitFailed(message);
    throw err;
  }
}
