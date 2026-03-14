export interface HistorySidebarItem {
  title: string;
  date: string;
  href: string;
}

export type GenerationStatus = 'READY' | 'PROCESSING' | 'FAILED';

export type GenerationRequestType = 'EXPERIENCE_EXTRACTION' | 'STRATEGY' | 'INTERVIEW';

export type GenerationRequestStatus = 'PROCESSING' | 'FAILED' | 'COMPLETED';

export type GenerationRequestState = {
  id: number;
  type: GenerationRequestType;
  status: GenerationRequestStatus;
  error: string | null;
  createdAt: number;
};

export type GetGenerationStatusRequest = {
  type: GenerationRequestType;
  id: number;
};

export type GetGenerationStatusResponse = {
  id: number;
  status: GenerationRequestStatus;
  error: string | null;
};
