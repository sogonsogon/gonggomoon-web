import { create } from 'zustand';

interface FileUploadStore {
  isDialogOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

export const useFileUpload = create<FileUploadStore>()((set) => ({
  isDialogOpen: false,
  openDialog: () => set({ isDialogOpen: true }),
  closeDialog: () => set({ isDialogOpen: false }),
}));
