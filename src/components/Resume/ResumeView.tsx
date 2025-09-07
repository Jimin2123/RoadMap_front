import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ResumeView.css';
import { MemberResponse } from '../../types/interfaces/response/MemberResponse';
import { ActivityResponse, ProjectResponse } from '../../types/interfaces/response/ResumeResponse';
import { CertCardData } from '../../types/interfaces/ResumeData';

interface ResumeViewProps {
  member: MemberResponse;
}

const ResumeView: React.FC<ResumeViewProps> = ({ member }) => {
  const navigate = useNavigate();
  const { profile, name, phoneNumber, email } = member;
  const { resume, skills, certificates, major } = profile;
  const { introduction, education, activities, projects } = resume;

  const handleBookmarkClick = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  const handleEditClick = () => {
    navigate('/resume?mode=edit');
  };

  return (
    <div className="resume-page">
      <h1 className="page-title">나의 이력서</h1>

      <div className="resume-wrapper" style={{ position: 'relative' }}>
        <div className="resume-box">
          <div className="top-right-menu">
            <img src="/edit-menu.svg" alt="더보기" className="more-icon" onClick={handleEditClick} />
          </div>
          <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <h2 className="name">{name}</h2>
              <p className="contact">전화번호: {phoneNumber}</p>
              <p className="contact">이메일: {email}</p>
              {education && <p className="contact">{`${education.school} ${major} | ${education.status}`}</p>}
            </div>
            <div className="avatar-box">
              <img src="/avatar.jpg" alt="프로필" className="avatar" />
              <button className="edit-btn" onClick={handleEditClick}>
                수정하기
              </button>
            </div>
          </div>

          {introduction && (
            <div id="introduction" className="section">
              <h3>자기소개</h3>
              <p className="paragraph">{introduction}</p>
            </div>
          )}

          {projects && projects.length > 0 && (
            <div id="projects" className="section">
              <h3>프로젝트</h3>
              <ul>
                {projects.map((proj: ProjectResponse, index: number) => (
                  <li key={index}>
                    <strong>{proj.name}</strong> ({proj.period})<br />
                    <small>Tech: {proj.techStack.join(', ')}</small>
                    <p>{proj.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {skills && skills.length > 0 && (
            <div id="skills" className="section">
              <h3>기술 스택</h3>
              <p className="paragraph">{skills.map((s) => s.name).join(', ')}</p>
            </div>
          )}

          {certificates && certificates.length > 0 && (
            <div id="certificates" className="section">
              <h3>자격증</h3>
              <ul>
                {certificates.map((cert: CertCardData, index: number) => (
                  <li key={index}>
                    {cert.name} ({cert.date}, {cert.issuer})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {education && (
            <div id="education" className="section">
              <h3>학력</h3>
              <ul>
                <li>
                  {education.school} – {education.major} ({education.period}, {education.status})
                </li>
              </ul>
            </div>
          )}

          {activities && activities.length > 0 && (
            <div id="activities" className="section">
              <h3>대외 활동</h3>
              <ul>
                {activities.map((act: ActivityResponse, index: number) => (
                  <li key={index}>
                    <div>{act.title} at {act.organization} ({act.period})</div>
                    <p>{act.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <nav className="bookmark-nav">
          <ul>
            {introduction && (
              <li>
                <button onClick={() => handleBookmarkClick('introduction')}>자기소개</button>
              </li>
            )}
            {projects && projects.length > 0 && (
              <li>
                <button onClick={() => handleBookmarkClick('projects')}>프로젝트</button>
              </li>
            )}
            {skills && skills.length > 0 && (
              <li>
                <button onClick={() => handleBookmarkClick('skills')}>기술 스택</button>
              </li>
            )}
            {certificates && certificates.length > 0 && (
              <li>
                <button onClick={() => handleBookmarkClick('certificates')}>자격증</button>
              </li>
            )}
            {education && (
              <li>
                <button onClick={() => handleBookmarkClick('education')}>학력</button>
              </li>
            )}
            {activities && activities.length > 0 && (
              <li>
                <button onClick={() => handleBookmarkClick('activities')}>대외 활동</button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ResumeView;
