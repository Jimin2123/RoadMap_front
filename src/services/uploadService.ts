import axiosInstance from '../utils/axiosInstance';
import { normalizeImageUrl } from '../utils/imageUrlUtils';

interface ImageUploadResponse {
  imageUrl: string;
  originalFilename: string;
  savedFilename: string;
  fileSize: number;
}

export const uploadImageService = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.post<ImageUploadResponse>('/api/v1/images/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return normalizeImageUrl(response.data.imageUrl);
};
