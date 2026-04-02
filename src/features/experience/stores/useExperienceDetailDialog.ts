import { Experience } from '@/features/experience/types';
import { create } from 'zustand';

interface ExperienceDetailDialogStore {
  experience: Experience | null;
  isDialogOpen: boolean;
  setExperience: (experience: Experience) => void;
  openDialog: () => void;
  closeDialog: () => void;
}

export const useExperienceDetailDialog = create<ExperienceDetailDialogStore>()((set) => ({
  experience: null,
  isDialogOpen: false,
  setExperience: (exp) => set({ experience: exp }),
  openDialog: () => set({ isDialogOpen: true }),
  closeDialog: () => set({ experience: null, isDialogOpen: false }),
}));
