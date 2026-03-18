'use client';

import { create } from 'zustand';
import type { StrategyJobType } from '@/features/strategy/types';

export type CreateStrategyFormValue = {
  selectedJob: StrategyJobType;
  isIndustryOn: boolean;
  selectedIndustryId: number | null;
  selectedExperienceIds: number[];
};

type StrategyCreateFormStore = {
  formData: CreateStrategyFormValue;
  updateFormData: <T extends keyof CreateStrategyFormValue>(
    key: T,
    value: CreateStrategyFormValue[T],
  ) => void;
  resetForm: () => void;
  setSelectedExperienceIds: (ids: number[]) => void;
  initializeSelectedExperienceIds: (ids: number[]) => void;
};

const initialFormData: CreateStrategyFormValue = {
  selectedJob: 'FRONTEND',
  isIndustryOn: false,
  selectedIndustryId: null,
  selectedExperienceIds: [],
};

export const useStrategyCreateFormStore = create<StrategyCreateFormStore>((set) => ({
  formData: initialFormData,

  updateFormData: (key, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [key]: value,
      },
    })),

  setSelectedExperienceIds: (ids) =>
    set((state) => ({
      formData: {
        ...state.formData,
        selectedExperienceIds: ids,
      },
    })),

  initializeSelectedExperienceIds: (ids) =>
    set((state) => {
      if (state.formData.selectedExperienceIds.length > 0) return state;

      return {
        formData: {
          ...state.formData,
          selectedExperienceIds: ids,
        },
      };
    }),

  resetForm: () =>
    set({
      formData: initialFormData,
    }),
}));
