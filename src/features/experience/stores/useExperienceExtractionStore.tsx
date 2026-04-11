'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
  removeCompletedExtractionId: (id: number) => void;
  removeCompletedExtractionIds: (ids: number[]) => void;
};

export const useExperienceExtractionStore = create<ExperienceExtractionStore>()(
  persist(
    (set, get, api) => ({
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

      removeCompletedExtractionId: (id) =>
        set((state) => ({
          completedExtractionIds: state.completedExtractionIds.filter((cid) => cid !== id),
        })),

      removeCompletedExtractionIds: (idsToRemove) =>
        set((state) => ({
          completedExtractionIds: state.completedExtractionIds.filter(
            (cid) => !idsToRemove.includes(cid),
          ),
        })),
    }),
    {
      name: 'experience-extraction-state',
      partialize: (state) => ({
        generationStatus: state.generationStatus,
        requests: state.requests,
        requestOrder: state.requestOrder,
        batches: state.batches,
        batchOrder: state.batchOrder,
        completedExtractionIds: state.completedExtractionIds,
      }),
    },
  ),
);
