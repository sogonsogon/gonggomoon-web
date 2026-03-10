'use client';

import type { CreateStrategyRequest, CreateStrategyResponse } from '@/features/strategy/types';
import { useStrategyCreateFormStore } from '@/features/strategy/stores/useCreateStrategyFormStore';
import { useStrategyGenerationStore } from '@/features/strategy/stores/useStrategyGenerationStore';

export async function startStrategyGeneration() {
  const { formData } = useStrategyCreateFormStore.getState();
  const generationStore = useStrategyGenerationStore.getState();

  generationStore.startSubmit();

  const payload: CreateStrategyRequest = {
    jobType: formData.selectedJob,
    industryType: formData.isIndustryOn ? formData.selectedIndustry : null,
    experienceIds: formData.selectedExperienceIds,
  };

  try {
    console.log('전략 생성 요청 payload:', payload);

    // TODO: 실제 전략 생성 API 연동 후 제거
    const response: CreateStrategyResponse = {
      strategyId: 123,
      status: 'PROCESSING',
    };

    generationStore.markProcessing(response.strategyId);

    return response;
  } catch (err) {
    generationStore.markFailed(
      err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.',
    );
    throw err;
  }
}
