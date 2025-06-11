import React, { useState } from 'react';
import './Resume.css';

const Resume: React.FC = () => {
  const [form] = useState({
    name: '김진영',
    email: 'jjy7349@naver.com',
    phone: '010-2688-7349',
    education: '컴퓨터공학과 | 학사',
    experience: '단비교육, 주식회사리멤버에서 프론트엔드 개발',
    introduction: `더 나은 비즈니스에 대해 고민하고, 서비스에 애정을 가진 개발자입니다.
사람을 좋아하고, 커뮤니케이션을 중요하게 생각합니다.
꾸준하게 의심하고 질문하며, 더 좋은 코드를 작성하기 위해 노력합니다.`,
    skills: ['JavaScript', 'React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
    certificates: [
      { name: '정보처리기사', year: '2023', issuer: '한국산업인력공단' },
      { name: 'SQLD', year: '2022', issuer: '한국데이터산업진흥원' },
    ],
    educations: [{ name: '코드스테이츠 부트캠프', period: '2022.01 ~ 2022.07' }],
    activities: [{ name: '구디캠프 프론트엔드 해커톤', role: '참가자', date: '2023.05' }],
  });

  return (
    <div className="resume-page">
      <h1 className="page-title">나의 이력서</h1>

      <div className="top-right-menu">
        <img src="/public/edit-menu.svg" alt="더보기" className="more-icon" />
      </div>

      <div className="resume-box">
        <div className="header">
          <div>
            <h2 className="name">{form.name}</h2>
            <p className="contact">전화번호: {form.phone}</p>
            <p className="contact">이메일: {form.email}</p>
            <p className="contact">{form.education}</p>
          </div>
          <div className="avatar-box">
            <img src="/avatar.jpg" alt="프로필" className="avatar" />
            <button className="edit-btn">수정하기</button>
          </div>
        </div>
        <div className="section">
          <h3>자기소개</h3>
          <p className="paragraph">{form.introduction}</p>
        </div>

        <div className="section">
          <h3>경력</h3>
          <p className="paragraph">{form.experience}</p>
        </div>

        <div className="section">
          <h3>기술 스택</h3>
          <p className="paragraph">{form.skills.join(', ')}</p>
        </div>

        <div className="section">
          <h3>자격증</h3>
          <ul>
            {form.certificates.map((cert, index) => (
              <li key={index}>
                {cert.name} ({cert.year}, {cert.issuer})
              </li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h3>교육</h3>
          <ul>
            {form.educations.map((edu, index) => (
              <li key={index}>
                {edu.name} – {edu.period}
              </li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h3>대외 활동</h3>
          <ul>
            {form.activities.map((act, index) => (
              <li key={index}>
                {act.name} – {act.role} ({act.date})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Resume;
