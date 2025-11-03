import { useAppSelector } from '../store/hooks';
import { RootState } from '../state/store';
import { useNavigate } from 'react-router-dom';
import { JSX, useEffect } from 'react';
import Swal from 'sweetalert2';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, status } = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && status.initialize === 'rejected') {
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

  if (status.initialize === 'pending' || status.initialize === 'idle') {
    return <div className="loading-container">로딩 중...</div>;
  }

  return children;
};

export default ProtectedRoute;
