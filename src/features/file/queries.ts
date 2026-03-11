import { deleteFile, getFiles, uploadFile } from '@/features/file/actions';
import { UploadFileRequest } from '@/features/file/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const FILE_QUERY_KEY = ['files'];

export const fileQueryOptions = {
  queryKey: FILE_QUERY_KEY,
  queryFn: async () => {
    const result = await getFiles();

    if (!result.success) {
      return Promise.reject(result);
    }

    return result.data;
  },
  // 1분
  staleTime: 60 * 1000,
};

// 파일 목록 조회
export function useFiles() {
  return useQuery(fileQueryOptions);
}

// 파일 업로드
export function useUploadFile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ category, file }: UploadFileRequest) => {
      const result = await uploadFile({ category, file });
      if (!result.success) {
        return Promise.reject(result);
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FILE_QUERY_KEY });
    },
    onError: (error) => {
      console.error('파일 업로드 실패:', error);
    },
  });
}

// 파일 삭제
export function useDeleteFile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (fileAssetId: number) => {
      const result = await deleteFile({ fileAssetId });
      if (!result.success) {
        return Promise.reject(result);
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FILE_QUERY_KEY });
    },
    onError: (error) => {
      console.error('파일 삭제 실패:', error);
    },
  });
}
