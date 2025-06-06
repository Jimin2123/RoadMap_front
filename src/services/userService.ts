import { MemberResponse } from '../types/interfaces/response/MemberResponse';
import axiosInstance from '../utils/axiosInstance';

export const getMemberService = async (): Promise<MemberResponse | null> => {
  const response = await axiosInstance.get<MemberResponse>('/api/v1/member');
  return response.data;
};
