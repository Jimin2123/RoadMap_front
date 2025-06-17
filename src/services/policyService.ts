import { YouthPolicyListResponse } from '../types/interfaces/response/YouthPolicyResponse';
import axiosInstance from '../utils/axiosInstance';

export const getPolicyListServiceForMember = async (): Promise<YouthPolicyListResponse> => {
  const response = await axiosInstance.get<YouthPolicyListResponse>(`/api/v1/policy/for-member`);

  return response.data;
};

export const getPolicyListService = async (page: number): Promise<YouthPolicyListResponse> => {
  const response = await axiosInstance.get<YouthPolicyListResponse>(`/api/v1/policy?page=${page}`);
  console.log('정책 목록 불러오기 성공:', response.data);
  return response.data;
};
