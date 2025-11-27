import { LoginRequest } from '../../auth/request/LoginRequest';
import { AddressRequest } from './AddressRequest';

export interface MemberRequest {
  loginRequest: LoginRequest;
  name: string;
  birthDate: string;
  phoneNumber: string;
  addressRequest: AddressRequest;
}
