'use client';

import { create } from 'zustand';
import { createGenerationStore, type GenerationStore } from '@/shared/stores/createGenerationStore';

export const useStrategyGenerationStore = create<GenerationStore>(
  createGenerationStore('PORTFOLIO_STRATEGY'),
);
