'use client';

import { create } from 'zustand';
import type { File } from '@/features/file/types';

export type CreateInterviewFormValue = {
  selectedPortfolioId: number | null;
  selectedPortfolio: File | null;
};

type InterviewCreateFormStore = {
  formData: CreateInterviewFormValue;

  updateFormData: <T extends keyof CreateInterviewFormValue>(
    key: T,
    value: CreateInterviewFormValue[T],
  ) => void;

  setSelectedPortfolio: (file: File | null) => void;
  setSelectedPortfolioId: (id: number | null) => void;
  resetForm: () => void;
};

const initialFormData: CreateInterviewFormValue = {
  selectedPortfolioId: null,
  selectedPortfolio: null,
};

export const useInterviewCreateFormStore = create<InterviewCreateFormStore>((set) => ({
  formData: initialFormData,

  updateFormData: (key, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [key]: value,
      },
    })),

  setSelectedPortfolio: (file) =>
    set((state) => ({
      formData: {
        ...state.formData,
        selectedPortfolio: file,
        selectedPortfolioId: file?.fileAssetId ?? null,
      },
    })),

  setSelectedPortfolioId: (id) =>
    set((state) => ({
      formData: {
        ...state.formData,
        selectedPortfolioId: id,
      },
    })),

  resetForm: () =>
    set({
      formData: initialFormData,
    }),
}));
