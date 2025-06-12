export interface AuthState {
  isAuthenticated: boolean; // 인증 상태
  accessToken: string | null; // 액세스 토큰
  status: {
    login: 'idle' | 'pending' | 'fulfilled' | 'rejected'; // 로그인
    initialize: 'idle' | 'pending' | 'fulfilled' | 'rejected'; // 초기화 상태
  };
  error: string | null; // 인증 오류 메시지
}
