import { create } from 'zustand';

interface FileUploadDialogStore {
  isDialogOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

export const useFileUploadDialog = create<FileUploadDialogStore>()((set) => ({
  isDialogOpen: false,
  openDialog: () => set({ isDialogOpen: true }),
  closeDialog: () => set({ isDialogOpen: false }),
}));
