export type ExperienceType = 'CAREER' | 'PROJECT' | 'EDUCATION' | 'COMPETITION' | 'OTHER';

export type Experience = {
  experienceId: number;
  title: string;
  experienceType: ExperienceType;
  experienceContent?: string;
  startDate: string;
  endDate: string | null;
};

export type GetExperienceListResponse = {
  contents: Experience[];
  totalCount: number;
};

export type GetExperienceRequest = {
  experienceId: number;
};

export type GetExperienceResponse = Experience;

export type CreateExperienceRequest = {
  title: string;
  experienceType: ExperienceType;
  experienceContent?: string;
  startDate: Date | null;
  endDate: Date | null;
};

export type CreateExperienceResponse = {
  experienceId: number;
};

export type UpdateExperienceRequest = {
  experienceId: number;
  payload: {
    title: string;
    experienceType: ExperienceType;
    experienceContent?: string;
    startDate: Date | null;
    endDate: Date | null;
  };
};

export type UpdateExperienceResponse = Experience;

export type DeleteExperienceRequest = {
  experienceId: number;
};

export type StartExtractExperienceResponse = {
  extractedExperienceIds: number[];
};

export type GetExtractedExperienceResponse = {
  totalCount: number;
  contents: Omit<Experience, 'experienceId'>[];
};
