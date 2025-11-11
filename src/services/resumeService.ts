import { ResumeRequest } from '../types/interfaces/resume/request/ResumeRequest';
import { ResumeResponse } from '../types/interfaces/resume/response/ResumeResponse';
import axiosInstance from '../utils/axiosInstance';

export const createResumeService = async (resumeRequest: ResumeRequest): Promise<ResumeResponse> => {
  const response = await axiosInstance.post<ResumeResponse>('/api/v1/resume', resumeRequest);
  return response.data;
};

export const updateResumeService = async (resumeRequest: ResumeRequest): Promise<ResumeResponse> => {
  const response = await axiosInstance.put<ResumeResponse>('/api/v1/resume', resumeRequest);
  return response.data;
};

export const getResumeService = async (): Promise<ResumeResponse> => {
  const response = await axiosInstance.get<ResumeResponse>('/api/v1/resume');
  return response.data;
};
