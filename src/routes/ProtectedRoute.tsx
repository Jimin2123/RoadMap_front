import { useAppSelector } from '../store/hooks';
import { RootState } from '../state/store';
import { useNavigate } from 'react-router-dom';
import { JSX, useEffect } from 'react';
import Swal from 'sweetalert2';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, status } = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // 초기화가 완전히 완료된 후(fulfilled 또는 rejected)에만 인증 체크
    // idle 상태는 아직 초기화가 시작되지 않았거나 로그아웃 직후 상태이므로 제외
    const isInitializationComplete = status.initialize === 'fulfilled' || status.initialize === 'rejected';

    // 초기화가 완료되고, 인증되지 않은 경우에만 로그인 페이지로 이동
    if (isInitializationComplete && !isAuthenticated) {
      Swal.fire({
        title: '로그인이 필요합니다',
        text: '로그인 하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '로그인하러 가기',
        cancelButtonText: '취소',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        } else {
          navigate('/');
        }
      });
    }
  }, [isAuthenticated, status.initialize, navigate]);

  // 초기화가 진행 중일 때만 로딩 표시
  if (status.initialize === 'pending') {
    return <div className="loading-container">로딩 중...</div>;
  }

  // 인증된 경우에만 자식 컴포넌트 렌더링
  if (isAuthenticated) {
    return children;
  }

  // 인증되지 않은 경우 빈 화면 (useEffect에서 리다이렉트 처리)
  return null;
};

export default ProtectedRoute;
