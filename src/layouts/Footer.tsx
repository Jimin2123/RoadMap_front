import React from 'react';
import { FaMapMarkedAlt } from 'react-icons/fa';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      {/* 첫 줄 */}
      <div className="footer-top">
        <FaMapMarkedAlt className="footer-icon" />
        <span className="footer-title">
          <span className="footer-gilla">길라</span>
          <span className="footer-job">JOB</span>
          <span className="footer-support">SUPPORT BY</span>
          <span>
            <img src="/icons/shingu-logo.svg" alt="대학교로고" />
          </span>
        </span>
      </div>

      {/* 두 번째 줄 */}
      <div className="footer-links">
        <span>
          <Link to="">기능소개</Link>
        </span>
        <span>|</span>
        <span>
          <Link to="">이용약관</Link>
        </span>
        <span>|</span>
        <span>
          <Link to="">개인정보처리방침</Link>
        </span>
        <span>|</span>
        <span>
          <Link to="">문의하기</Link>
        </span>
      </div>

      {/* 세 번째 줄 */}
      <div className="footer-info">
        <p>Email: gim696816@g.shingu.ac.kr</p>
        <p>주소: 경기도 성남시 중원구 광명로 377</p>
        <p>대표: 정지민</p>
        <p>데이터: 공공데이터 포탈</p>
        <p>개발자: 유우진, 정지민</p>
      </div>
      <div className="saramin">
        Powered by
        <a href="http://www.saramin.co.kr" target="_blank">
          취업 사람인
        </a>
      </div>
    </footer>
  );
};

export default Footer;
