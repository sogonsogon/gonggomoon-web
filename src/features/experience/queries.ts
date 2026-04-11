import {
  createExperience,
  deleteExperience,
  getExperience,
  getExperienceList,
  updateExperience,
} from '@/features/experience/actions';
import {
  CreateExperienceRequest,
  Experience,
  UpdateExperienceRequest,
} from '@/features/experience/types';
import { toServerDate } from '@/features/experience/utils/toServerDate';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const experienceKeys = {
  all: ['experiences'] as const,
  detail: (exprienceId: number) => [...experienceKeys.all, exprienceId] as const,
};

export const experienceListQueryOptions = () => ({
  queryKey: experienceKeys.all,
  queryFn: async () => {
    const result = await getExperienceList();
    if (!result.success) {
      return Promise.reject(result);
    }
    return result.data;
  },
  staleTime: 10 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
});

export const experienceQueryOptions = (experienceId: number) => ({
  queryKey: experienceKeys.detail(experienceId),
  queryFn: async () => {
    const result = await getExperience({ experienceId });
    if (!result.success) {
      return Promise.reject(result);
    }
    return result.data;
  },
  staleTime: 10 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
});

// 경험 목록 조회
export function useGetExperienceList() {
  return useQuery(experienceListQueryOptions());
}

// 경험 단건 조회
export function useGetExperience(experienceId: number) {
  return useQuery({
    ...experienceQueryOptions(experienceId),
    enabled: experienceId > 0,
  });
}

// 경험 등록
export function useCreateExperience() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateExperienceRequest) => {
      const result = await createExperience(payload);
      if (!result.success) {
        return Promise.reject(result);
      }
      return result.data;
    },
    onSuccess: (data, variables) => {
      const startDate = variables.startDate as unknown as Date;
      const endDate = variables.endDate as unknown as Date | null;

      const created: Experience = {
        experienceId: data.experienceId,
        title: variables.title,
        experienceType: variables.experienceType,
        startDate: toServerDate(startDate),
        endDate: endDate ? toServerDate(endDate) : null,
        experienceContent: variables.experienceContent ?? '',
      };
      queryClient.setQueryData(experienceKeys.detail(data.experienceId), created);
    },
    onError: (error) => {
      console.error('경험 등록 실패: ', error);
    },
  });
}

// 경험 수정
export function useUpdateExperience() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ experienceId, payload }: UpdateExperienceRequest) => {
      const result = await updateExperience({ experienceId, payload });
      if (!result.success) {
        return Promise.reject(result);
      }
      return result.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(experienceKeys.detail(data.experienceId), data);
    },
    onError: (error) => {
      console.error('경험 수정 실패: ', error);
    },
  });
}

// 경험 삭제
export function useDeleteExperience() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (experienceId: number) => {
      const result = await deleteExperience({ experienceId });
      if (!result.success) {
        return Promise.reject(result);
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: experienceKeys.all });
    },
    onError: (error) => {
      console.error('경험 삭제 실패: ', error);
    },
  });
}
