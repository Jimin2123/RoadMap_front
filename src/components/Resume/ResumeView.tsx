import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ResumeView.css';
import { MemberResponse } from '../../types/interfaces/member/response/MemberResponse';
import { ProjectResponse } from '../../types/interfaces/resume/response/ProjectResponse';
import { ActivityResponse } from '../../types/interfaces/resume/response/ActivityResponse';
import { CareerResponse } from '../../types/interfaces/resume/response/CareerResponse';
import { CertCardData } from '../../types/interfaces/ResumeData';
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
  const { resume, skills, major } = profile;
  const { introduction, education, activities, projects, careers, desiredCompany } = resume;

  // certificates는 resume 또는 profile에 있을 수 있음
  const certificates = resume?.certificates || profile?.certificates || [];

  // SkillProficiency enum 값을 한글로 매핑
  const getProficiencyText = (proficiency: string): string => {
    const profMap: Record<string, string> = {
      BEGINNER: '초급',
      INTERMEDIATE: '중급',
      MIDDLE: '중급',
      ADVANCED: '고급',
      EXPERT: '전문가',
      초급: '초급',
      중급: '중급',
      고급: '고급',
      전문가: '전문가',
    };
    return profMap[proficiency] || proficiency;
  };

  // Period 포맷팅 함수
  const formatPeriod = (period: { startDate: Date; endDate: Date } | null | undefined): string => {
    if (!period || !period.startDate || !period.endDate) return '';

    const formatDate = (date: Date): string => {
      const d = new Date(date);
      return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}`;
    };

    return `${formatDate(period.startDate)} ~ ${formatDate(period.endDate)}`;
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
            <p className="paragraph">{introduction?.growthProcess || '작성된 내용이 없습니다.'}</p>
            <h4>강점</h4>
            <p className="paragraph">{introduction?.strengths || '작성된 내용이 없습니다.'}</p>
            <h4>학교 생활 및 교내 활동</h4>
            <p className="paragraph">{introduction?.schoolLife || '작성된 내용이 없습니다.'}</p>
            <h4>지원 동기</h4>
            <p className="paragraph">{introduction?.motivation || '작성된 내용이 없습니다.'}</p>
          </div>
        );
      case 'desiredCompany':
        return desiredCompany ? (
          <div className="content-section">
            <p>
              <strong>희망 기업:</strong> {desiredCompany.desiredCompany1}, {desiredCompany.desiredCompany2}
            </p>
            <p>
              <strong>희망 지역:</strong> {desiredCompany.desiredRegion}
            </p>
            <p>
              <strong>희망 급여:</strong> {desiredCompany.salaryType === 'monthly' ? '월급' : '시급'}{' '}
              {desiredCompany.desiredSalary}만원
            </p>
          </div>
        ) : (
          <div className="empty-state">
            <p>등록된 희망 직장 정보가 없습니다.</p>
            <small>이력서 수정에서 희망 직장 정보를 추가해보세요.</small>
          </div>
        );
      case 'careers':
        return careers && careers.length > 0 ? (
          <ul className="content-section">
            {careers.map((career: CareerResponse, index: number) => (
              <li key={index}>
                <strong>{career.company}</strong>
                <small>
                  {career.title} • {formatPeriod(career.period)}
                </small>
                <p>{career.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state">
            <p>등록된 경력사항이 없습니다.</p>
            <small>이력서 수정에서 경력사항을 추가해보세요.</small>
          </div>
        );
      case 'projects':
        return projects && projects.length > 0 ? (
          <ul className="content-section">
            {projects.map((proj: ProjectResponse, index: number) => (
              <li key={index}>
                <strong>{proj.name}</strong>
                <small>
                  {proj.role} • {formatPeriod(proj.period)}
                </small>
                <small style={{ color: '#007bff', fontWeight: 500 }}>기술 스택: {proj.techStack.join(', ')}</small>
                <p>{proj.description}</p>
                {proj.url && (
                  <a href={proj.url} target="_blank" rel="noopener noreferrer">
                    🔗 프로젝트 링크
                  </a>
                )}
                {proj.achievements && proj.achievements.length > 0 && (
                  <>
                    <div style={{ marginTop: '16px', fontWeight: 600, color: '#495057' }}>주요 성과</div>
                    <ul>
                      {proj.achievements.map((ach: string, i: number) => (
                        <li key={i}>{ach}</li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state">
            <p>등록된 프로젝트가 없습니다.</p>
            <small>이력서 수정에서 프로젝트를 추가해보세요.</small>
          </div>
        );
      case 'activities':
        return activities && activities.length > 0 ? (
          <ul className="content-section">
            {activities.map((act: ActivityResponse, index: number) => (
              <li key={index}>
                <strong>{act.title}</strong>
                <small>
                  {act.organization} • {formatPeriod(act.period)}
                </small>
                <p>{act.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state">
            <p>등록된 외부활동이 없습니다.</p>
            <small>이력서 수정에서 외부활동을 추가해보세요.</small>
          </div>
        );
      case 'certificates':
        return certificates && certificates.length > 0 ? (
          <ul className="content-section certificate-list">
            {certificates.map((cert: CertCardData, index: number) => (
              <li key={index}>
                <strong>{cert.name}</strong>
                <small>
                  {cert.agency} • {cert.year}년 취득
                </small>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state">
            <p>등록된 자격증이 없습니다.</p>
            <small>이력서 수정에서 자격증을 추가해보세요.</small>
          </div>
        );
      case 'education':
        return education ? (
          <ul className="content-section">
            <li>
              <strong>{education.school}</strong>
              <small>
                {major} • {formatPeriod(education.period)}
              </small>
              <p>
                학점: {education.gpa} • 상태: {education.status}
              </p>
            </li>
          </ul>
        ) : (
          <div className="empty-state">
            <p>등록된 학력 정보가 없습니다.</p>
            <small>이력서 수정에서 학력 정보를 추가해보세요.</small>
          </div>
        );
      case 'skills':
        return skills && skills.length > 0 ? (
          <div className="skill-container">
            {skills.map((skill) => (
              <div key={skill.id} className="skill-tag">
                <span className="skill-name">{skill.name}</span>
                <span className={`skill-proficiency ${String(skill.proficiency).toLowerCase()}`}>
                  {getProficiencyText(String(skill.proficiency))}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>등록된 기술 스택이 없습니다.</p>
            <small>이력서 수정에서 보유 기술을 추가해보세요.</small>
          </div>
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
