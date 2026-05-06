import { create } from 'zustand';

interface StrategyDeleteDialogStore {
  strategyId?: number;
  openDialog: (strategyId: number) => void;
  closeDialog: () => void;
}

export const useStrategyDeleteDialog = create<StrategyDeleteDialogStore>()((set) => ({
  strategyId: undefined,
  openDialog: (strategyId) => set({ strategyId: strategyId }),
  closeDialog: () => set({ strategyId: undefined }),
}));
