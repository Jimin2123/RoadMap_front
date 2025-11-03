export interface ResumeState {
  status: {
    create: 'idle' | 'pending' | 'fulfilled' | 'rejected'; // 로그인
  };
  error: string | null; // 인증 오류 메시지
}
