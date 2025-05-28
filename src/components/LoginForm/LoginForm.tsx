import React from 'react';
import { Link } from 'react-router-dom'; // 추가
import './LoginForm.css';

interface LoginFormProps {
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
  return (
    <div className={`login-form-container ${className}`}>
      <span className="login-title">
        길라<span className="logo-job">JOB</span>
      </span>

      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <input type="email" placeholder="이메일" className="login-input" required />
        <input type="password" placeholder="비밀번호" className="login-input" required />
        <button className="login-button">로그인</button>
      </form>

      <div className="login-links">
        <a href="#">아이디 찾기</a>
        <span>|</span>
        <a href="#">비밀번호 찾기</a>
        <span>|</span>
        <Link to="/signup">회원가입</Link> {/* 이 부분만 수정 */}
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
