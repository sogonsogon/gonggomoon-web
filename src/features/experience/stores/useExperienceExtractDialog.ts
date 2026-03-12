import { create } from 'zustand';

interface ExperienceExtractDialogStore {
  isDialogOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

export const useExperienceExtractDialog = create<ExperienceExtractDialogStore>()((set) => ({
  isDialogOpen: false,
  openDialog: () => set({ isDialogOpen: true }),
  closeDialog: () => set({ isDialogOpen: false }),
}));
