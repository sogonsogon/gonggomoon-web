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
      industryType: formData.isIndustryOn ? formData.selectedIndustry : null,
      experienceIds: formData.selectedExperienceIds,
    };

    startSubmit();

    try {
      const response = await createStrategy(payload);

      addProcessingRequest(response.strategyId);

      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';

      markSubmitFailed(message);
      toast.error(message);
      throw err;
    }
  };

  return { startStrategyGeneration };
}
