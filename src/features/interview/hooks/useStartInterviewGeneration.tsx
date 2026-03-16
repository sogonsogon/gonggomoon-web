'use client';

import { toast } from 'sonner';
import { useCreateInterview } from '@/features/interview/queries';
import { useInterviewCreateFormStore } from '@/features/interview/stores/useInterviewCreateFormStore';
import { useInterviewGenerationStore } from '@/features/interview/stores/useInterviewGenerationStore';
import { CreateInterviewResponse, CreateInterviewRequest } from '@/features/interview/types';

export function useStartInterviewGeneration() {
  const { mutateAsync: createInterview } = useCreateInterview();

  const startInterviewGeneration = async (): Promise<CreateInterviewResponse> => {
    const { formData } = useInterviewCreateFormStore.getState();
    const { startSubmit, markSubmitFailed, addProcessingRequest } =
      useInterviewGenerationStore.getState();

    if (!formData.selectedPortfolioId) {
      const message = '포트폴리오를 선택해 주세요.';
      toast.error(message);
      throw new Error(message);
    }

    const payload: CreateInterviewRequest = {
      fileAssetId: formData.selectedPortfolioId,
    };

    startSubmit();

    try {
      const response = await createInterview(payload);

      addProcessingRequest(response.interviewStrategyId);

      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';

      markSubmitFailed(message);
      toast.error(message);
      throw err;
    }
  };

  return { startInterviewGeneration };
}
