import { AddressResponse } from './AddressResponse';
import { ProfileResponse } from './ProfileResponse';

export interface MemberResponse {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  profile: ProfileResponse;
  address: AddressResponse;
}
