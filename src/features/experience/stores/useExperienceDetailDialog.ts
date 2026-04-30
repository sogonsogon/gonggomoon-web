import { Experience } from '@/features/experience/types';
import { create } from 'zustand';

interface ExperienceDetailDialogStore {
  experience?: Experience;
  openDialog: (experience: Experience) => void;
  closeDialog: () => void;
}

export const useExperienceDetailDialog = create<ExperienceDetailDialogStore>()((set) => ({
  experience: undefined,
  openDialog: (exp) => set({ experience: exp }),
  closeDialog: () => set({ experience: undefined }),
}));
