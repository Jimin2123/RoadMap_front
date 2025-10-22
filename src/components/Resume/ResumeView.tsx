import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ResumeView.css';
import { MemberResponse, DesiredCompanyResponse } from '../../types/interfaces/response/MemberResponse';
import { ActivityResponse, ProjectResponse } from '../../types/interfaces/response/ResumeResponse';
import { CertCardData } from '../../types/interfaces/ResumeData';
import { CareerResponse } from '../../types/interfaces/response/CareerResponse';
import {
  FaUser,
  FaFileAlt,
  FaBriefcase,
  FaProjectDiagram,
  FaUsers,
  FaGraduationCap,
  FaCertificate,
  FaBook,
} from 'react-icons/fa';
interface ResumeViewProps {
  member: MemberResponse;
}

const ResumeView: React.FC<ResumeViewProps> = ({ member }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('introduction');

  const { profile, name, phoneNumber, email } = member;
  const { resume, skills, certificates, major } = profile;
  const { introduction, education, activities, projects, careers, desiredCompany } = resume;

  const proficiencyMap = {
    BEGINNER: '초급',
    MIDDLE: '중급',
    ADVANCED: '고급',
  };

  const TABS = [
    { id: 'introduction', label: '자기소개서', icon: <FaFileAlt /> },
    { id: 'desiredCompany', label: '희망 직장정보', icon: <FaBriefcase /> },
    { id: 'careers', label: '경력사항', icon: <FaBriefcase /> },
    { id: 'projects', label: '프로젝트', icon: <FaProjectDiagram /> },
    { id: 'activities', label: '외부활동', icon: <FaUsers /> },
    { id: 'certificates', label: '자격증', icon: <FaCertificate /> },
    { id: 'education', label: '학력', icon: <FaGraduationCap /> },
    { id: 'skills', label: '기술 스택', icon: <FaBook /> },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    navigate(`${location.pathname}#${id}`, { replace: true });
  };

  const handleEditClick = () => {
    navigate('/resume?mode=edit');
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'introduction':
        return (
          <div className="content-section">
            <h4>성장 과정</h4>
            <p className="paragraph">{introduction?.growthProcess}</p>
            <h4>강점</h4>
            <p className="paragraph">{introduction?.strengths}</p>
          </div>
        );
      case 'desiredCompany':
        return (
          desiredCompany && (
            <div className="content-section">
              <p>
                <strong>희망 기업:</strong> {desiredCompany.desiredCompany1}, {desiredCompany.desiredCompany2}
              </p>
              <p>
                <strong>희망 지역:</strong> {desiredCompany.desiredRegion}
              </p>
              <p>
                <strong>희망 연봉:</strong> {desiredCompany.salaryType} {desiredCompany.desiredSalary}만원
              </p>
              <p>
                <strong>커리어 플랜:</strong> {desiredCompany.careerPlan}
              </p>
            </div>
          )
        );
      case 'careers':
        return (
          careers &&
          careers.length > 0 && (
            <ul className="content-section">
              {careers.map((career: CareerResponse, index: number) => (
                <li key={index}>
                  <strong>{career.companyName}</strong> ({career.period})
                  <br />
                  <small>{career.department}</small>
                  <p>{career.description}</p>
                </li>
              ))}
            </ul>
          )
        );
      case 'projects':
        return (
          projects &&
          projects.length > 0 && (
            <ul className="content-section">
              {projects.map((proj: ProjectResponse, index: number) => (
                <li key={index}>
                  <strong>{proj.name}</strong> ({proj.period})<small>Role: {proj.role}</small>
                  <br />
                  <small>Tech: {proj.techStack.join(', ')}</small>
                  <p>{proj.description}</p>
                  {proj.url && (
                    <p>
                      <a href={proj.url} target="_blank" rel="noopener noreferrer">
                        프로젝트 링크
                      </a>
                    </p>
                  )}
                  {proj.achievements && proj.achievements.length > 0 && (
                    <ul>
                      {proj.achievements.map((ach, i) => (
                        <li key={i}>{ach}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )
        );
      case 'activities':
        return (
          activities &&
          activities.length > 0 && (
            <ul className="content-section">
              {activities.map((act: ActivityResponse, index: number) => (
                <li key={index}>
                  <div>
                    {act.title} at {act.organization} ({act.period})
                  </div>
                  <p>{act.description}</p>
                </li>
              ))}
            </ul>
          )
        );
      case 'certificates':
        return (
          certificates &&
          certificates.length > 0 && (
            <ul className="content-section">
              {certificates.map((cert: CertCardData, index: number) => (
                <li key={index}>
                  {cert.name} ({cert.year}, {cert.agency})
                </li>
              ))}
            </ul>
          )
        );
      case 'education':
        return (
          education && (
            <ul className="content-section">
              <li>
                {education.school} – {major} ({education.period}, {education.status})
              </li>
            </ul>
          )
        );
      case 'skills':
        return (
          skills &&
          skills.length > 0 && (
            <div className="skill-container">
              {skills.map((skill) => (
                <div key={skill.id} className="skill-tag">
                  <span className="skill-name">{skill.name}</span>
                  <span className={`skill-proficiency ${skill.proficiency.toLowerCase()}`}>
                    {proficiencyMap[skill.proficiency]}
                  </span>
                </div>
              ))}
            </div>
          )
        );
      default:
        return <p>내용이 없습니다.</p>;
    }
  };

  return (
    <div className="resume-page">
      <h1 className="page-title">나의 이력서</h1>

      <div className="resume-container">
        <div className="resume-header">
          <div className="resume-header-left">
            <div className="avatar-box">
              {' '}
              <FaUser className="avatar-placeholder" />
              {/* <img src="/avatar.jpg" alt="프로필" className="avatar" /> */}
            </div>
            <div>
              <h2 className="name">{name}</h2>
              <p className="contact">
                <strong>Email:</strong> {email}
              </p>
              <p className="contact">
                <strong>Phone:</strong> {phoneNumber}
              </p>
            </div>
          </div>
          <div className="resume-header-right">
            <button className="edit-btn" onClick={handleEditClick}>
              이력서 수정
            </button>
          </div>
        </div>

        <div className="tab-menu">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="resume-box">
          <div className="tab-content">{renderActiveTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ResumeView;
