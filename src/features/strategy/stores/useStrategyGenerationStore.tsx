'use client';

import { create } from 'zustand';
import { GenerationStatus } from '@/shared/types';

type StrategyGenerationStore = {
  submitLoading: boolean;
  generationStatus: GenerationStatus;
  currentStrategyId: number | null;
  error: string | null;

  startSubmit: () => void;
  markProcessing: (strategyId: number) => void;
  markFailed: (error: string) => void;
  resetGeneration: () => void;
};

export const useStrategyGenerationStore = create<StrategyGenerationStore>((set) => ({
  submitLoading: false,
  generationStatus: 'READY',
  currentStrategyId: null,
  error: null,

  startSubmit: () =>
    set({
      submitLoading: true,
      generationStatus: 'READY',
      currentStrategyId: null,
      error: null,
    }),

  markProcessing: (strategyId) =>
    set({
      submitLoading: false,
      generationStatus: 'PROCESSING',
      currentStrategyId: strategyId,
      error: null,
    }),

  markFailed: (error) =>
    set({
      submitLoading: false,
      generationStatus: 'FAILED',
      currentStrategyId: null,
      error,
    }),

  resetGeneration: () =>
    set({
      submitLoading: false,
      generationStatus: 'READY',
      currentStrategyId: null,
      error: null,
    }),
}));
