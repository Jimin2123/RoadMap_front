import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  ActivityCardData,
  BasicCardData,
  CertCardData,
  EduCardData,
  DesiredJobCardData,
  IntroCardData,
  PortfolioCardData,
  ProjectCardData,
  CareerCardData,
} from '../../types/interfaces/ResumeData';
import { RootState } from '../../types/store';
import { ResumeRequest, SkillRequest } from '../../types/interfaces/request/ResumeRequest';
import { ProfileRequest } from '../../types/interfaces/request/ProfileRequest';
import { EducationLevelType } from '../../types/enums/EducationLevelType';
import ResumeBasicCard from './ResumeCards/ResumeBasicCard';
import ResumeIntroCard from './ResumeCards/ResumeIntroCard';
import ResumeCertCard from './ResumeCards/ResumeCertCard';
import ResumeSkillCard from './ResumeCards/ResumeSkillCard';
import ResumeEduCard from './ResumeCards/ResumeEduCard';
import ResumeActivityCard from './ResumeCards/ResumeActivityCard';
import ResumeProjectCard from './ResumeCards/ResumeProjectCard';
import ResumePortfolioCard from './ResumeCards/ResumePortfolioCard';
import ResumeCareerCard from './ResumeCards/ResumeCareerCard';
import ResumeDesiredJobCard from './ResumeCards/ResumeDesiredJobCard';
import styles from './Resume.module.css';
import { useAppDispatch } from '../../store/hooks';
import { createResumeThunk } from '../../hooks/useResume';
import { useSubmissionAlert } from '../../hooks/useSubmissionAlert';
import { MemberResponse } from '../../types/interfaces/response/MemberResponse';
import { SkillData } from './ResumeCards/ResumeSkillCard';
import { getMember } from '../../hooks/userUser';
import { resetCreateStatus } from '../../store/slices/resumeSlice';
import { FaUser, FaFileAlt, FaBriefcase, FaProjectDiagram, FaUsers, FaGraduationCap } from 'react-icons/fa';

/**
 * "카드" 컴포넌트에서 사용할 form 전체 Shape
 */
interface ResumeFormState {
  basicInfo: BasicCardData;
  intro: IntroCardData;
  certs: CertCardData[];
  skills: SkillData[];
  careers: CareerCardData[];
  desiredJob: DesiredJobCardData;
  education: EduCardData;
  activities: ActivityCardData[];
  projects: ProjectCardData[];
  portfolios: PortfolioCardData[];
}

interface ResumeProps {
  member: MemberResponse | null;
  onSubmissionSuccess: () => void;
}

const emptyForm: ResumeFormState = {
  basicInfo: { name: '', email: '', phoneNumber: '', currentJob: '', address: '' },  
  intro: {
    growthProcess: '',
    strengths: '',
    schoolLife: '',
    motivation: '',
  },
  certs: [],
  careers: [],
  desiredJob: {
    desiredCompany1: '',
    desiredCompany2: '',
    desiredRegion: '',
    salaryType: '연봉',
    desiredSalary: 0,
    careerPlan: '',
  },
  skills: [],
  education: { school: '', major: '', period: '', status: '' },
  activities: [],
  projects: [],
  portfolios: [],
};

const Resume: React.FC<ResumeProps> = ({ member, onSubmissionSuccess }) => {
  const [form, setForm] = useState<ResumeFormState>(emptyForm);
  const [initialized, setInitialized] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  const { status, error } = useSelector((state: RootState) => state.resume);
  const dispatch = useAppDispatch();

  useSubmissionAlert({
    status,
    target: 'create',
    error,
    successMessage: '이력서가 성공적으로 제출되었습니다.',
    errorMessage: '이력서 제출에 실패했습니다.',
  });

  useEffect(() => {
    // 컴포넌트가 언마운트될 때 상태를 초기화합니다.
    return () => {
      dispatch(resetCreateStatus());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!member) return;

    const profile = member.profile;
    const resume = profile?.resume;

    const nextForm: ResumeFormState = {
      basicInfo: {
        name: member.name ?? '',
        email: member.email ?? '',
        phoneNumber: member.phoneNumber ?? '',
        currentJob: '',
        address: member.address?.address ?? '',
      },
      intro: {
        growthProcess: (profile?.resume?.introduction as any)?.growthProcess || '',
        strengths: (profile?.resume?.introduction as any)?.strengths || '',
        schoolLife: (profile?.resume?.introduction as any)?.schoolLife || '',
        motivation: (profile?.resume?.introduction as any)?.motivation || '',
      },
      certs:
        profile?.certificates?.map((cert) => ({
          name: cert.name,
          agency: cert.agency,
          year: cert.year,
        })) ?? [],
      skills: profile?.skills || [],
      careers: resume?.careers || [],
      desiredJob: resume?.desiredCompany || emptyForm.desiredJob,
      education: resume?.education || { school: '', major: '', period: '', status: '' },
      activities: resume?.activities || [],
      projects: resume?.projects || [],
      portfolios: resume?.portfolios || [],
    };

    setForm(nextForm);
    setInitialized(true);
  }, [member, initialized]);

  const buildProfileRequest = (): ProfileRequest => {
    if (!form || !member) throw new Error('폼이나 사용자 정보가 없습니다');

    const resumeRequest: ResumeRequest = {
      activities: form.activities,
      education: form.education,
      introduction: form.intro,
      portfolios: form.portfolios,
      projects: form.projects,
      careers: form.careers,
      desiredCompany: form.desiredJob,
    };

    return {
      desiredJobCodes: [82, 84],
      educationLevel: (member?.profile?.educationLevel as EducationLevelType) ?? EducationLevelType.ASSOCIATE_OR_ABOVE,
      skills: form.skills,
      certificates: form.certs,
      currentJob: form.basicInfo.currentJob,
      resume: resumeRequest,
    };
  };

  const handleSubmit = async () => {
    const profileRequest = buildProfileRequest();

    try {
      // 1. 이력서 생성/수정 API를 호출합니다.
      await dispatch(createResumeThunk(profileRequest)).unwrap();
      // 2. 성공 시, 최신 멤버 정보를 다시 불러옵니다.
      await dispatch(getMember()).unwrap();
      // 3. 부모 컴포넌트에 성공을 알리고 페이지 전환을 트리거합니다.
      onSubmissionSuccess();
    } catch (err) {
      console.error('이력서 제출 실패:', err);
    }
  };

  const TABS = [
    { id: 'basic', label: '기본정보', icon: <FaUser /> },
    { id: 'intro', label: '자기소개서', icon: <FaFileAlt /> },
    { id: 'career', label: '경력/희망직무', icon: <FaBriefcase /> },
    { id: 'project', label: '프로젝트', icon: <FaProjectDiagram /> },
    { id: 'activity', label: '외부활동', icon: <FaUsers /> },
    { id: 'education', label: '학력/자격/스킬', icon: <FaGraduationCap /> },
  ];

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return (
          <>
            <ResumeBasicCard value={form.basicInfo} onChange={(val: BasicCardData) => setForm((prev) => ({ ...prev, basicInfo: val }))} />
            <ResumePortfolioCard value={form.portfolios} onChange={(val) => setForm((prev) => ({ ...prev, portfolios: val }))} />
          </>
        );
      case 'intro':
        return <ResumeIntroCard value={form.intro} onChange={(val: IntroCardData) => setForm((prev) => ({ ...prev, intro: val }))} />
      case 'career':
        return (
          <>
            <ResumeDesiredJobCard
              value={form.desiredJob}
              onChange={(val: DesiredJobCardData) => setForm((prev) => ({ ...prev, desiredJob: val }))}
            />
            <ResumeCareerCard value={form.careers} onChange={(val: CareerCardData[]) => setForm((prev) => ({ ...prev, careers: val }))} />
          </>
        );
      case 'project':
        return <ResumeProjectCard value={form.projects} onChange={(val: ProjectCardData[]) => setForm((prev) => ({ ...prev, projects: val }))} />;
      case 'activity':
        return (
          <ResumeActivityCard
            value={form.activities}
            onChange={(val: ActivityCardData[]) => setForm((prev) => ({ ...prev, activities: val }))}
          />
        );
      case 'education': {
        return (
          <> 
            <ResumeEduCard value={form.education} onChange={(val: EduCardData) => setForm((prev) => ({ ...prev, education: val }))} />
            <ResumeCertCard value={form.certs} onChange={(val) => setForm((prev) => ({ ...prev, certs: val }))} />
            <ResumeSkillCard value={form.skills} onChange={(val: SkillData[]) => setForm((prev) => ({ ...prev, skills: val }))} />
          </>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div className={styles.resumeContainer}>
      <div className={styles.tabMenu}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className={styles.tabContent}>
        {renderActiveTabContent()}
      </div>
      
      <div className={styles.submitArea}>
        <button type="button" onClick={handleSubmit} disabled={status.create === 'pending'}>
          {status.create === 'pending' ? (
            <div className={styles.spinner}></div>
          ) : (
            '이력서 제출'
          )}
        </button>
      </div>
    </div>
  );
};

export default Resume;
