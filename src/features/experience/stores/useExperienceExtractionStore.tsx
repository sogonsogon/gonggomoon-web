'use client';

import { create } from 'zustand';
import { createGenerationStore, type GenerationStore } from '@/shared/stores/createGenerationStore';

type BatchState = {
  ids: number[];
};

export type ExperienceExtractionStore = GenerationStore & {
  batches: Record<string, BatchState>;
  batchOrder: string[];
  addBatch: (batchId: string, ids: number[]) => void;
  removeBatch: (batchId: string) => void;

  completedExtractionIds: number[];
  addCompletedExtractionIds: (ids: number[]) => void;
  consumeCompletedExtractionIds: () => number[];
};

export const useExperienceExtractionStore = create<ExperienceExtractionStore>((set, get, api) => ({
  ...createGenerationStore('EXTRACT_EXPERIENCE')(set, get, api),

  batches: {},
  batchOrder: [],

  addBatch: (batchId, ids) =>
    set((state) => ({
      batches: { ...state.batches, [batchId]: { ids } },
      batchOrder: [...state.batchOrder, batchId],
    })),

  removeBatch: (batchId) =>
    set((state) => {
      const next = { ...state.batches };
      delete next[batchId];
      return {
        batches: next,
        batchOrder: state.batchOrder.filter((id) => id !== batchId),
      };
    }),

  completedExtractionIds: [],

  addCompletedExtractionIds: (ids) =>
    set((state) => ({
      completedExtractionIds: [...state.completedExtractionIds, ...ids],
    })),

  consumeCompletedExtractionIds: () => {
    const ids = get().completedExtractionIds;
    set({ completedExtractionIds: [] });
    return ids;
  },
}));
