// components/LoginForm.tsx
import React from 'react';
import './LoginForm.css';

const LoginForm: React.FC = () => {
  return (
    <div className="login-form-container">
      <h2 className="login-title">로그인</h2>

      <input type="text" placeholder="아이디" className="login-input" />
      <input type="password" placeholder="비밀번호" className="login-input" />

      <button className="login-button">로그인</button>

      <div className="login-links">
        <a href="#">아이디 찾기</a>
        <span>|</span>
        <a href="#">비밀번호 찾기</a>
        <span>|</span>
        <a href="#">회원가입</a>
      </div>

      <div className="login-divider">- 간편 로그인 -</div>

      <div className="sns-login-buttons-horizontal">
        <button className="sns-icon-button kakao" aria-label="카카오 로그인">
          <img src="/icons/kakao.svg" alt="kakao" />
        </button>
        <button className="sns-icon-button google" aria-label="구글 로그인">
          <img src="/icons/google.svg" alt="google" />
        </button>
        <button className="sns-icon-button naver" aria-label="네이버 로그인">
          <img src="/icons/naver.svg" alt="naver" />
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
