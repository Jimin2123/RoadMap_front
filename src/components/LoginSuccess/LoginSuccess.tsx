import React from 'react';
import './LoginSuccess.css';

const skills = ['JAVA', 'Git', '노력', 'RDBMS', 'Spring Boot', 'Vue'];
const certifications = [
  { name: '정보처리기사', type: '국가공인' },
  { name: '토익 800+', type: '공인민간' },
  { name: 'SQLD', type: '국가공인' },
  { name: '컴활 1급', type: '국가공인' },
];

const LoginSuccess: React.FC = () => {
  return (
    <div className="login-form-container">
      {/* 상단 영역 */}
      <div className="login-top-section">
        {/* 왼쪽: 프로필 */}
        <div className="profile-image-section">
          <img src="/avatar.jpg" alt="Profile" className="avatar" />
        </div>

        {/* 오른쪽: 이름, 태그, 자격증 */}
        <div className="profile-info-section">
          <div className="profile-header">
            <h2 className="username">정지민님</h2>
            <div className="icon-buttons">
              <button>⚙️</button>
              <button>🔄</button>
            </div>
          </div>

          <p className="skills-label">보유중인 스킬셋</p>
          <div className="skill-tags-wrapper">
            <div className="skill-tags">
              {skills.map((skill, index) => (
                <span className="tag" key={index}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="certificate-slider-wrapper">
            <div className="certificate-slider">
              {certifications.map((cert, index) => (
                <div className="certificate-card" key={index}>
                  <div className="certificate-icon">🎓</div>
                  <h4>{cert.name}</h4>
                  <p>{cert.type}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 하단 영역 */}
      <div className="policy-box">
        <h3>청년 지원 정책 안내 리스트</h3>
        <ul>
          <li>● 청년 도약 프로젝트 안내</li>
          <li>● 국가 기술 자격 지원 제도</li>
          <li>● 구직활동 지원금 신청</li>
          <li>● 청년 맞춤형 일자리 매칭</li>
        </ul>
      </div>
    </div>
  );
};

export default LoginSuccess;
