'use client';

import type {
  GenerationRequestState,
  GenerationRequestType,
  GenerationStatus,
} from '@/shared/types';
import type { StateCreator } from 'zustand';

export type GenerationStore = {
  submitLoading: boolean;
  generationStatus: GenerationStatus;
  submitError: string | null;

  requests: Record<number, GenerationRequestState>;
  requestOrder: number[];

  startSubmit: () => void;
  markSubmitFailed: (error: string) => void;
  addProcessingRequest: (id: number) => void;
  markRequestFailed: (id: number, error: string) => void;
  markRequestCompleted: (id: number) => void;
  removeRequest: (id: number) => void;
  clearCompletedRequests: () => void;
  resetGeneration: () => void;
};

function resolveGenerationStatus(
  submitLoading: boolean,
  submitError: string | null,
  requests: Record<number, GenerationRequestState>,
): GenerationStatus {
  if (submitLoading) return 'PROCESSING';

  const hasProcessing = Object.values(requests).some((request) => request.status === 'PROCESSING');
  if (hasProcessing) return 'PROCESSING';

  const hasFailed =
    submitError !== null || Object.values(requests).some((request) => request.status === 'FAILED');

  if (hasFailed) return 'FAILED';

  return 'READY';
}

export function createGenerationStore(
  requestType: GenerationRequestType,
): StateCreator<GenerationStore> {
  return (set) => ({
    submitLoading: false,
    generationStatus: 'READY',
    submitError: null,

    requests: {},
    requestOrder: [],

    startSubmit: () =>
      set((state) => ({
        submitLoading: true,
        submitError: null,
        generationStatus: resolveGenerationStatus(true, null, state.requests),
      })),

    markSubmitFailed: (error) =>
      set((state) => ({
        submitLoading: false,
        submitError: error,
        generationStatus: resolveGenerationStatus(false, error, state.requests),
      })),

    addProcessingRequest: (id) =>
      set((state) => {
        const nextRequests: Record<number, GenerationRequestState> = {
          ...state.requests,
          [id]: {
            id,
            type: requestType,
            status: 'PROCESSING',
            error: null,
            createdAt: state.requests[id]?.createdAt ?? Date.now(),
          },
        };

        const nextRequestOrder = state.requestOrder.includes(id)
          ? state.requestOrder
          : [...state.requestOrder, id];

        return {
          submitLoading: false,
          submitError: null,
          requests: nextRequests,
          requestOrder: nextRequestOrder,
          generationStatus: resolveGenerationStatus(false, null, nextRequests),
        };
      }),

    markRequestFailed: (id, error) =>
      set((state) => {
        const target = state.requests[id];
        if (!target) return state;

        const nextRequests: Record<number, GenerationRequestState> = {
          ...state.requests,
          [id]: {
            ...target,
            status: 'FAILED',
            error,
          },
        };

        return {
          requests: nextRequests,
          generationStatus: resolveGenerationStatus(
            state.submitLoading,
            state.submitError,
            nextRequests,
          ),
        };
      }),

    markRequestCompleted: (id) =>
      set((state) => {
        const target = state.requests[id];
        if (!target) return state;

        const nextRequests: Record<number, GenerationRequestState> = {
          ...state.requests,
          [id]: {
            ...target,
            status: 'COMPLETED',
            error: null,
          },
        };

        return {
          requests: nextRequests,
          generationStatus: resolveGenerationStatus(
            state.submitLoading,
            state.submitError,
            nextRequests,
          ),
        };
      }),

    removeRequest: (id) =>
      set((state) => {
        const nextRequests = { ...state.requests };
        delete nextRequests[id];

        return {
          requests: nextRequests,
          requestOrder: state.requestOrder.filter((requestId) => requestId !== id),
          generationStatus: resolveGenerationStatus(
            state.submitLoading,
            state.submitError,
            nextRequests,
          ),
        };
      }),

    clearCompletedRequests: () =>
      set((state) => {
        const nextRequests = Object.fromEntries(
          Object.entries(state.requests).filter(([, request]) => request.status !== 'COMPLETED'),
        ) as Record<number, GenerationRequestState>;

        return {
          requests: nextRequests,
          requestOrder: state.requestOrder.filter((id) => nextRequests[id] !== undefined),
          generationStatus: resolveGenerationStatus(
            state.submitLoading,
            state.submitError,
            nextRequests,
          ),
        };
      }),

    resetGeneration: () => ({
      submitLoading: false,
      generationStatus: 'READY',
      submitError: null,
      requests: {},
      requestOrder: [],
    }),
  });
}
