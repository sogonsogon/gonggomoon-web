export type GenerationStatus = 'PROCESSING' | 'FAILED' | 'READY';

export type GenerationRequestType =
  | 'EXTRACT_EXPERIENCE'
  | 'PORTFOLIO_STRATEGY'
  | 'INTERVIEW_STRATEGY';

export type GenerationRequestStatus = 'PROCESSING' | 'FAILED' | 'READY';

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
  type: GenerationRequestType;
  id: number;
  status: GenerationRequestStatus;
  error: string | null;
};
