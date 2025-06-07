import { AddressRequest } from './AddressRequest';
import { LoginRequestDTO } from './LoginRequest';

export interface MemberRequest {
  loginRequest: LoginRequestDTO; // 로그인 정보
  name: string; // 회원 이름
  birthDate: string; // 생년월일
  phoneNumber: string; // 전화번호
  addressRequest: AddressRequest; // 주소 정보
}
