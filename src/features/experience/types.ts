export type ExperienceType = 'CAREER' | 'PROJECT' | 'EDUCATION' | 'CONTEST' | 'OTHER';

export type Experience = {
  id: number;
  title: string;
  experienceType: ExperienceType;
  experienceContent?: string;
  startDate: string;
  endDate: string | null;
};
