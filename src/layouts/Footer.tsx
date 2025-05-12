import React from 'react';
import { FaMapMarkedAlt, FaUniversity } from 'react-icons/fa';
import './Footer.css';

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
        </span>
        <FaUniversity className="footer-icon" />
      </div>

      {/* 두 번째 줄 */}
      <div className="footer-links">
        <span>기능소개</span>
        <span>|</span>
        <span>이용약관</span>
        <span>|</span>
        <span>개인정보처리방침</span>
        <span>|</span>
        <span>문의하기</span>
        <span>|</span>
        <span>고객센터</span>
      </div>

      {/* 세 번째 줄 */}
      <div className="footer-info">
        <p>Email: gim696816@g.shingu.ac.kr</p>
        <p>주소: 경기도 성남시 중원구 광명로 377</p>
        <p>대표: 정지민</p>
        <p>데이터: 공공데이터 포탈</p>
        <p>개발자: 유우진, 정지민</p>
      </div>
    </footer>
  );
};

export default Footer;
