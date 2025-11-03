import { MemberRequest } from '../types/interfaces/member/request/MemberRequest';
import { MemberResponse } from '../types/interfaces/member/response/MemberResponse';
import axiosInstance from '../utils/axiosInstance';

export const getMemberService = async (): Promise<MemberResponse | null> => {
  const response = await axiosInstance.get<MemberResponse>('/api/v1/member');
  return response.data;
};

export const signUpService = async (memberRequest: MemberRequest): Promise<MemberResponse> => {
  const response = await axiosInstance.post<MemberResponse>('/api/v1/member', memberRequest);
  return response.data;
};
