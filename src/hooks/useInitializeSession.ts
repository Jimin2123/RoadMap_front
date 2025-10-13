import { useEffect, useRef } from 'react';
import { useAppDispatch } from '../store/hooks';
import { initializeAuth } from './useAuth';
import { getMember } from './userUser';
import { getAccessToken } from '../utils/tokenManager';

const useInitializeSession = () => {
  const dispatch = useAppDispatch();
  const initialized = useRef(false);

  useEffect(() => {
    // 세션 스토리지에 토큰이 없으면 아예 시도하지 않음
    if (!getAccessToken()) {
      return;
    }

    // StrictMode로 인한 중복 실행 방지
    if (initialized.current) {
      return;
    }
    initialized.current = true;

    const init = async () => {
      try {
        // 1. 먼저 토큰 갱신을 시도하고, 성공하면 accessToken을 반환받습니다.
        const accessToken = await dispatch(initializeAuth()).unwrap();

        // 2. 토큰 갱신이 성공했을 경우에만 사용자 정보를 가져옵니다.
        if (accessToken) {
          await dispatch(getMember()).unwrap();
        }
      } catch (err) {
        // initializeAuth 실패(세션 만료) 시에는 axios 인터셉터가 로그아웃을 처리하므로
        // 여기서는 별도 처리가 필요 없습니다.
        console.warn('Session could not be initialized.', err);
      }
    };

    init();
  }, [dispatch]); // 의존성 배열에서 isAuthenticated를 제거하여 한 번만 실행
};

export default useInitializeSession;
