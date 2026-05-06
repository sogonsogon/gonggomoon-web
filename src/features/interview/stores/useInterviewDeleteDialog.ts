import { create } from 'zustand';

interface InterviewDeleteDialogStore {
  interviewId?: number;
  openDialog: (strategyId: number) => void;
  closeDialog: () => void;
}

export const useInterviewDeleteDialog = create<InterviewDeleteDialogStore>()((set) => ({
  interviewId: undefined,
  openDialog: (interviewId) => set({ interviewId: interviewId }),
  closeDialog: () => set({ interviewId: undefined }),
}));
