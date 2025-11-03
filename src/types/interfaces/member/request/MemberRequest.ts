import { LoginRequest } from '../../auth/request/LoginRequest';
import { AddressRequest } from './AddressRequest';

export interface MemberRequest {
  loginRequest: LoginRequest;
  name: string;
  birthDate: Date;
  phoneNumber: string;
  addressRequest: AddressRequest;
}
