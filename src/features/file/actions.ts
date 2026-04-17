'use server';

import {
  DeleteFileRequest,
  GetFilesResponse,
  UploadFileRequest,
  UploadFileResponse,
} from '@/features/file/types';
import { privateFetch } from '@/shared/api/httpClient';
import { ApiResponse } from '@/shared/types/api';

export async function getFiles(): Promise<ApiResponse<GetFilesResponse>> {
  const response = await privateFetch<GetFilesResponse>('/api/v2/files');
  return response;
}

export async function uploadFile(
  payload: UploadFileRequest,
): Promise<ApiResponse<UploadFileResponse>> {
  const formData = new FormData();
  formData.append(
    'request',
    new Blob([JSON.stringify({ category: payload.category })], { type: 'application/json' }),
  );
  formData.append('file', payload.file);

  const response = await privateFetch<UploadFileResponse>('/api/v2/files', {
    method: 'POST',
    body: formData,
  });
  return response;
}

export async function deleteFile({ fileAssetId }: DeleteFileRequest): Promise<ApiResponse<null>> {
  const response = await privateFetch<null>(`/api/v2/files/${fileAssetId}`, {
    method: 'DELETE',
  });
  return response;
}
