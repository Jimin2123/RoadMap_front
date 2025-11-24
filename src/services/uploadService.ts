import axiosInstance from '../utils/axiosInstance';

interface ImageUploadResponse {
  imageUrl: string;
  originalFilename: string;
  savedFilename: string;
  fileSize: number;
}

export const uploadImageService = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.post<ImageUploadResponse>(
    '/api/v1/images/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  let url = response.data.imageUrl;

  // 절대 URL로 올 때: http://localhost:8080/images/xxx.png
  if (url.startsWith('http') && url.includes('/images/')) {
    url = url.replace('/images/', '/api/v1/images/');
  }

  // 혹시 상대 경로로 "/images/xxx.png"만 올 경우
  if (!url.startsWith('http') && url.startsWith('/images/')) {
    url = url.replace('/images/', '/api/v1/images/');
  }

  // 여기서부터는 항상 /api/v1/images/... 형태로 리턴됨
  return url;
};