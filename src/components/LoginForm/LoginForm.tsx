import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './LoginForm.module.css';
import { useAppDispatch } from '../../store/hooks';
import { login } from '../../hooks/useAuth';
import { getMember } from '../../hooks/userUser';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface LoginFormProps {
  className?: string;
  onLoginSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ className, onLoginSuccess }) => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      await dispatch(login({ email, password })).unwrap();
      // 로그인 성공 후, 페이지 이동 전에 사용자 정보를 가져옵니다.
      await dispatch(getMember()).unwrap();

      navigate('/');
      if (onLoginSuccess) onLoginSuccess();
    } catch (error) {
      // 로그인 실패 시 SweetAlert2를 사용하여 사용자에게 알림
      await Swal.fire({
        icon: 'error',
        title: '로그인 실패',
        text: error as string,
      });
    } finally {
      // 성공/실패 여부와 관계없이 로딩 상태를 해제
      setLoading(false);
    }
  };

  const containerClassName = `${styles['login-form-container']} ${className || ''}`.trim();

  return (
    <div className={containerClassName}>
      <span className={styles['login-title']}>
        길라<span className={styles['logo-job']}>JOB</span>
      </span>

      <form className={styles['login-form']} onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="이메일"
          className={styles['login-input']}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="비밀번호"
          className={styles['login-input']}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <button type="submit" className={styles['login-button']} disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </form>

      <div className={styles['login-links']}>
        <a href="#">아이디 찾기</a>
        <span>|</span>
        <Link to="/find-password">비밀번호 찾기</Link>
        <span>|</span>
        <Link to="/signup">회원가입</Link>
      </div>

      <div className={styles['login-divider']}>간편 로그인</div>

      <div className={styles['sns-login-buttons-horizontal']}>
        <button className={`${styles['sns-icon-button']} ${styles.naver}`} aria-label="네이버 로그인">
          <img src="/icons/naver.svg" alt="naver" />
        </button>
        <button className={`${styles['sns-icon-button']} ${styles.kakao}`} aria-label="카카오 로그인">
          <img src="/icons/kakao.svg" alt="kakao" />
        </button>
        <button className={`${styles['sns-icon-button']} ${styles.google}`} aria-label="구글 로그인">
          <img src="/icons/google.svg" alt="google" />
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
