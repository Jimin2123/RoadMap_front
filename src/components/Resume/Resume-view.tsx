import React, { useState } from 'react';
import './Resume.css'; // Adjust path if your CSS is in a different location

const Resume: React.FC = () => {
  const [form] = useState({
    name: '김진영',
    email: 'jjy7349@naver.com',
    phone: '010-2688-7349',
    education: '컴퓨터공학과 | 학사',
    experience: '단비교육, 주식회사리멤버에서 프론트엔드 개발',
    introduction: `더 나은 비즈니스에 대해 고민하고, 서비스에 애정을 가진 개발자입니다.
사람을 좋아하고, 커뮤니케이션을 중요하게 생각합니다.
꾸준하게 의심하고 질문하며, 더 좋은 코드를 작성하기 위해 노력합니다.
저는 프론트엔드 개발자로서 사용자 경험을 최우선으로 생각하며, React와 TypeScript를 주로 사용합니다.
저는 팀워크를 중시하며, 협업을 통해 더 나은 결과물을 만들어내는 것을 목표로 합니다.
저는 항상 새로운 기술을 배우고, 성장하는 것을 즐깁니다.`,
    skills: ['JavaScript', 'React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
    certificates: [
      { name: '정보처리기사', year: '2023', issuer: '한국산업인력공단' },
      { name: 'SQLD', year: '2022', issuer: '한국데이터산업진흥원' },
      { name: 'AWS Certified Solutions Architect – Associate', year: '2023', issuer: 'Amazon Web Services' },
      { name: 'React.js 개발자', year: '2022', issuer: '코드스테이츠' },
      { name: '프론트엔드 개발자', year: '2022', issuer: '코드스테이츠' },
      { name: '백엔드 개발자', year: '2022', issuer: '코드스테이츠' },
      { name: 'DevOps 엔지니어', year: '2022', issuer: '코드스테이츠' },
      { name: '풀스택 개발자', year: '2022', issuer: '코드스테이츠' },
      { name: '웹 개발자', year: '2022', issuer: '코드스테이츠' },
      { name: '프론트엔드 마스터', year: '2022', issuer: '코드스테이츠' },
      { name: '백엔드 마스터', year: '2022', issuer: '코드스테이츠' },
      { name: 'DevOps 마스터', year: '2022', issuer: '코드스테이츠' },
      { name: '풀스택 마스터', year: '2022', issuer: '코드스테이츠' },
    ],
    educations: [
      { name: '코드스테이츠 부트캠프', period: '2022.01 ~ 2022.07' },
      { name: '서울대학교 컴퓨터공학과', period: '2018.03 ~ 2022.02' },
      { name: '서울과학기술대학교 컴퓨터공학과', period: '2016.03 ~ 2018.02' },
      { name: '서울과학기술대학교 컴퓨터공학과', period: '2014.03 ~ 2016.02' },
      { name: '서울과학기술대학교 컴퓨터공학과', period: '2012.03 ~ 2014.02' },
      { name: '서울과학기술대학교 컴퓨터공학과', period: '2010.03 ~ 2012.02' },
      { name: '서울과학기술대학교 컴퓨터공학과', period: '2008.03 ~ 2010.02' },
    ],
    activities: [{ name: '구디캠프 프론트엔드 해커톤', role: '참가자', date: '2023.05' }],
  });

  return (
    <div className="resume-page">
      <h1 className="page-title">나의 이력서</h1>

      <div className="resume-wrapper" style={{ position: 'relative' }}>
        <div className="resume-box">
          <div className="top-right-menu">
            {/* You'll need to replace '/edit-menu.svg' with an actual SVG or icon for the "more" menu */}
            <img src="/edit-menu.svg" alt="더보기" className="more-icon" />
          </div>

          <div className="header">
            <div>
              <h2 className="name">{form.name}</h2>
              <p className="contact">전화번호: {form.phone}</p>
              <p className="contact">이메일: {form.email}</p>
              <p className="contact">{form.education}</p>
            </div>
            <div className="avatar-box">
              {/* You'll need to replace '/avatar.jpg' with an actual image for the avatar */}
              <img src="/avatar.jpg" alt="프로필" className="avatar" />
              <button className="edit-btn">수정하기</button>
            </div>
          </div>

          <div id="introduction" className="section">
            <h3>자기소개</h3>
            <p className="paragraph">{form.introduction}</p>
          </div>

          <div id="experience" className="section">
            <h3>경력</h3>
            <p className="paragraph">{form.experience}</p>
          </div>

          <div id="skills" className="section">
            <h3>기술 스택</h3>
            <p className="paragraph">{form.skills.join(', ')}</p>
          </div>

          <div id="certificates" className="section">
            <h3>자격증</h3>
            <ul>
              {form.certificates.map((cert, index) => (
                <li key={index}>
                  {cert.name} ({cert.year}, {cert.issuer})
                </li>
              ))}
            </ul>
          </div>

          <div id="educations" className="section">
            <h3>교육</h3>
            <ul>
              {form.educations.map((edu, index) => (
                <li key={index}>
                  {edu.name} – {edu.period}
                </li>
              ))}
            </ul>
          </div>

          <div id="activities" className="section">
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

        <nav className="bookmark-nav">
          <ul>
            <li>
              <a href="#introduction">자기소개</a>
            </li>
            <li>
              <a href="#experience">경력</a>
            </li>
            <li>
              <a href="#skills">기술 스택</a>
            </li>
            <li>
              <a href="#certificates">자격증</a>
            </li>
            <li>
              <a href="#educations">교육</a>
            </li>
            <li>
              <a href="#activities">대외 활동</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Resume;
