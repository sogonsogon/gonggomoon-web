'use client';

import { toast } from 'sonner';
import { useCreateStrategy } from '@/features/strategy/queries';
import type { CreateStrategyRequest, CreateStrategyResponse } from '@/features/strategy/types';
import { useStrategyCreateFormStore } from '@/features/strategy/stores/useCreateStrategyFormStore';
import { useStrategyGenerationStore } from '@/features/strategy/stores/useStrategyGenerationStore';

export function useStartStrategyGeneration() {
  const { mutateAsync: createStrategy } = useCreateStrategy();

  const startStrategyGeneration = async (): Promise<CreateStrategyResponse> => {
    const { formData } = useStrategyCreateFormStore.getState();
    const { startSubmit, markSubmitFailed, addProcessingRequest } =
      useStrategyGenerationStore.getState();

    if (formData.selectedExperienceIds.length === 0) {
      const message = '경험을 1개 이상 선택해 주세요.';
      toast.error(message);
      throw new Error(message);
    }

    const payload: CreateStrategyRequest = {
      jobType: formData.selectedJob,
      industryId: formData.isIndustryOn ? formData.selectedIndustryId : null,
      experienceIds: formData.selectedExperienceIds,
    };

    startSubmit();

    let response: CreateStrategyResponse;

    try {
      response = await createStrategy(payload);
    } catch (err) {
      const message = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
      markSubmitFailed(message);
      toast.error(message);
      throw err;
    }

    if (!response?.strategyId) {
      console.error('[Strategy] strategyId missing from API response:', response);
      const message = '포트폴리오 전략 생성 결과를 확인할 수 없습니다. 잠시 후 다시 시도해 주세요.';
      markSubmitFailed(message);
      toast.error(message);
      throw new Error(message);
    }

    addProcessingRequest(response.strategyId);
    return response;
  };

  return { startStrategyGeneration };
}
