import { MemberResponse } from './response/MemberResponse';

export interface UserState {
  member: MemberResponse | null;
  status: {
    signUp: 'idle' | 'pending' | 'fulfilled' | 'rejected'; // 회원가입 상태
    getMember: 'idle' | 'pending' | 'fulfilled' | 'rejected'; // 사용자 정보 조회 상태
  };
  error: string | null; // 사용자 관련 오류 메시지
}
