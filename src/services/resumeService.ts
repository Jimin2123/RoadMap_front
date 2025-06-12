import { ProfileRequest } from '../types/interfaces/request/ProfileRequest';
import { MemberResponse } from '../types/interfaces/response/MemberResponse';
import axiosInstance from '../utils/axiosInstance';

export const createResumeService = async (profileRequest: ProfileRequest): Promise<MemberResponse> => {
  const response = await axiosInstance.post<MemberResponse>('/api/v1/resume', profileRequest);
  return response.data;
};
