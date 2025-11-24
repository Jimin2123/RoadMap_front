import { MemberRequest } from '../types/interfaces/member/request/MemberRequest';
import { MemberResponse } from '../types/interfaces/member/response/MemberResponse';
import { ProfileResponse } from '../types/interfaces/member/response/ProfileResponse';
import { ProfileUpdateRequest } from '../types/interfaces/member/request/ProfileUpdateRequest';
import axiosInstance from '../utils/axiosInstance';

export const getMemberService = async (): Promise<MemberResponse | null> => {
  const response = await axiosInstance.get<MemberResponse>('/api/v1/member');
  return response.data;
};

export const signUpService = async (memberRequest: MemberRequest): Promise<MemberResponse> => {
  const response = await axiosInstance.post<MemberResponse>('/api/v1/member', memberRequest);
  return response.data;
};

export const updateProfileService = async (profileRequest: ProfileUpdateRequest): Promise<ProfileResponse> => {
  const response = await axiosInstance.put<ProfileResponse>('/api/v1/member/profile', profileRequest);
  return response.data;
};
