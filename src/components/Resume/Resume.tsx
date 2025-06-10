import React, { useState } from 'react';
import styles from './Resume.module.css';
import ResumeBasicCard, { BasicCardData } from './ResumeCards/ResumeBasicCard';
import ResumeIntroCard, { IntroCardData } from './ResumeCards/ResumeIntroCard';
import ResumeCertCard, { CertCardData } from './ResumeCards/ResumeCertCard';
import ResumeEduCard, { EduCardData } from './ResumeCards/ResumeEduCard';
import ResumeSkillCard from './ResumeCards/ResumeSkillCard';
import ResumeActivityCard, { ActivityCardData } from './ResumeCards/ResumeActivityCard';
import ResumeProjectCard, { ProjectCardData } from './ResumeCards/ResumeProjectCard';
import ResumePortfolioCard, { PortfolioCardData } from './ResumeCards/ResumePortfolioCard';

const Resume: React.FC = () => {
  const [basicInfo, setBasicInfo] = useState<BasicCardData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    job: '',
  });
  const [intro, setIntro] = useState<IntroCardData>({ content: '' });
  const [certs, setCerts] = useState<CertCardData[]>([]);
  const [education, setEducation] = useState<EduCardData>({
    school: '',
    major: '',
    period: '',
    status: '',
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [activities, setActivities] = useState<ActivityCardData[]>([]);
  const [projects, setProjects] = useState<ProjectCardData[]>([]);
  const [portfolios, setPortfolios] = useState<PortfolioCardData[]>([]);

  const handleSubmit = () => {
    const resumeData = {
      basicInfo,
      intro,
      certs,
      education,
      skills,
      activities,
      projects,
      portfolios,
    };
    console.log('이력서 데이터:', resumeData);
  };

  return (
    <div className={styles.resumeContainer}>
      <ResumeBasicCard value={basicInfo} onChange={setBasicInfo} />

      <ResumeIntroCard value={intro} onChange={setIntro} />

      <div className={styles.cardRow}>
        <ResumeCertCard value={certs} onChange={setCerts} />
        <ResumeSkillCard value={skills} onChange={setSkills} />
      </div>

      <div className={styles.cardRow}>
        <ResumeEduCard value={education} onChange={setEducation} />
        <ResumeActivityCard value={activities} onChange={setActivities} />
      </div>

      <div className={styles.cardRow}>
        <ResumeProjectCard value={projects} onChange={setProjects} />
        <ResumePortfolioCard value={portfolios} onChange={setPortfolios} />
      </div>

      <div className={styles.submitArea}>
        <button type="button" onClick={handleSubmit}>
          이력서 제출
        </button>
      </div>
    </div>
  );
};

export default Resume;
