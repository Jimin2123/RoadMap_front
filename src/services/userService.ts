import { MemberRequest } from '../types/interfaces/member/request/MemberRequest';
import { MemberResponse } from '../types/interfaces/member/response/MemberResponse';
import { ProfileResponse } from '../types/interfaces/member/response/ProfileResponse';
import { ProfileUpdateRequest } from '../types/interfaces/member/request/ProfileUpdateRequest';
import axiosInstance from '../utils/axiosInstance';
import { normalizeImageUrl } from '../utils/imageUrlUtils';

export const getMemberService = async (): Promise<MemberResponse | null> => {
  const response = await axiosInstance.get<MemberResponse>('/api/v1/member');
  const data = response.data;

  // Normalize profile image URL if it exists
  if (data?.profile?.profileImageUrl) {
    data.profile.profileImageUrl = normalizeImageUrl(data.profile.profileImageUrl);
  }

  return data;
};

export const signUpService = async (memberRequest: MemberRequest): Promise<MemberResponse> => {
  const response = await axiosInstance.post<MemberResponse>('/api/v1/member', memberRequest);
  const data = response.data;

  // Normalize profile image URL if it exists
  if (data?.profile?.profileImageUrl) {
    data.profile.profileImageUrl = normalizeImageUrl(data.profile.profileImageUrl);
  }

  return data;
};

export const updateProfileService = async (profileRequest: ProfileUpdateRequest): Promise<ProfileResponse> => {
  const response = await axiosInstance.put<ProfileResponse>('/api/v1/member/profile', profileRequest);
  const data = response.data;

  // Normalize profile image URL if it exists
  if (data?.profileImageUrl) {
    data.profileImageUrl = normalizeImageUrl(data.profileImageUrl);
  }

  return data;
};
