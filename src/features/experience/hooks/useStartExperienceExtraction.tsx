'use client';

import { startExtractExperience } from '@/features/experience/actions';
import { useExperienceExtractionStore } from '@/features/experience/stores/useExperienceExtractionStore';

export function useStartExperienceExtraction() {
  const startExperienceExtraction = async (fileAssetIds: number[]): Promise<void> => {
    const { startSubmit, markSubmitFailed, addProcessingRequest, addBatch } =
      useExperienceExtractionStore.getState();

    if (fileAssetIds.length === 0) {
      throw new Error('파일을 1개 이상 선택해 주세요.');
    }

    startSubmit();

    try {
      const response = await startExtractExperience(fileAssetIds);

      if (!response.success) {
        throw response;
      }
      const batchId = `batch_${Date.now()}`;
      addBatch(batchId, response.data.extractedExperienceIds);
      response.data.extractedExperienceIds.forEach((id) => addProcessingRequest(id));
    } catch (err) {
      const message = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';

      markSubmitFailed(message);
      throw err;
    }
  };

  return { startExperienceExtraction };
}
