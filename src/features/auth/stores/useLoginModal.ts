import { create } from 'zustand';

interface LoginModalStore {
  isDialogOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

export const useLoginModal = create<LoginModalStore>()((set) => ({
  isDialogOpen: false,
  openDialog: () => set({ isDialogOpen: true }),
  closeDialog: () => set({ isDialogOpen: false }),
}));
