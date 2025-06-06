import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginForm.css';
import { useAppDispatch } from '../../store/hooks';
import { login } from '../../hooks/useAuth';

interface LoginFormProps {
  className?: string;
  onLoginSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ className, onLoginSuccess }) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      await dispatch(login({ email, password })).unwrap();
      if (onLoginSuccess) onLoginSuccess();
    } catch (error) {
      console.error('로그인 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`login-form-container ${className}`}>
      <span className="login-title">
        길라<span className="logo-job">JOB</span>
      </span>

      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="이메일"
          className="login-input"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="login-input"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </form>

      <div className="login-links">
        <a href="#">아이디 찾기</a>
        <span>|</span>
        <a href="#">비밀번호 찾기</a>
        <span>|</span>
        <Link to="/signup">회원가입</Link>
      </div>

      <div className="login-divider">간편 로그인</div>

      <div className="sns-login-buttons-horizontal">
        <button className="sns-icon-button naver" aria-label="네이버 로그인">
          <img src="/icons/naver.svg" alt="naver" />
        </button>
        <button className="sns-icon-button kakao" aria-label="카카오 로그인">
          <img src="/icons/kakao.svg" alt="kakao" />
        </button>
        <button className="sns-icon-button google" aria-label="구글 로그인">
          <img src="/icons/google.svg" alt="google" />
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
