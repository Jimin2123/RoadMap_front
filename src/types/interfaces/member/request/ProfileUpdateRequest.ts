import { AddressRequest } from './AddressRequest';

export interface SkillRequest {
  name: string;
  level?: string;
}

export interface ProfileUpdateRequest {
  desiredJobCodes?: number[];
  currentJob?: string;
  educationLevel?: string;
  profileImageUrl?: string;
  phoneNumber?: string;
  address?: AddressRequest;
  skills?: SkillRequest[];
}
