import { ProfileRequest } from '../types/interfaces/member/request/ProfileRequest';
import { ResumeResponse } from '../types/interfaces/resume/response/ResumeResponse';
import axiosInstance from '../utils/axiosInstance';

export const createResumeService = async (profileRequest: ProfileRequest): Promise<ResumeResponse> => {
  const response = await axiosInstance.post<ResumeResponse>('/api/v1/resume', profileRequest);
  return response.data;
};

export const updateResumeService = async (profileRequest: ProfileRequest): Promise<ResumeResponse> => {
  const response = await axiosInstance.put<ResumeResponse>('/api/v1/resume', profileRequest);
  return response.data;
};

export const getResumeService = async (): Promise<ResumeResponse> => {
  const response = await axiosInstance.get<ResumeResponse>('/api/v1/resume');
  return response.data;
};
