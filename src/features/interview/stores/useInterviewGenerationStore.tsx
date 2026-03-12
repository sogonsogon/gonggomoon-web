'use client';

import { create } from 'zustand';
import { createGenerationStore, type GenerationStore } from '@/shared/stores/createGenerationStore';

export const useInterviewGenerationStore = create<GenerationStore>(
  createGenerationStore('INTERVIEW'),
);
