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
import { RootState } from '../../state/store';
import { ResumeRequest } from '../../types/interfaces/resume/request/ResumeRequest';
import { ActivityRequest } from '../../types/interfaces/resume/request/ActivityRequest';
import { ProjectRequest } from '../../types/interfaces/resume/request/ProjectRequest';
import { CareerRequest } from '../../types/interfaces/resume/request/CareerRequest';
import { EducationRequest } from '../../types/interfaces/resume/request/EducationRequest';
import { PeriodRequest } from '../../types/interfaces/resume/common/PeriodRequest';
import { ProfileRequest } from '../../types/interfaces/member/request/ProfileRequest';
import { SkillRequest } from '../../types/interfaces/member/request/SkillRequest';
import { EducationLevelType } from '../../types/enums/EducationLevelType';
import { SkillProficiency } from '../../types/enums/SkillProficiency';
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
import { createResumeThunk, updateResumeThunk } from '../../hooks/useResume';
import { useSubmissionAlert } from '../../hooks/useSubmissionAlert';
import { MemberResponse } from '../../types/interfaces/member/response/MemberResponse';
import { ProfileSkillDTO } from '../../types/interfaces/member/response/ProfileSkillDTO';
import { CareerResponse } from '../../types/interfaces/resume/response/CareerResponse';
import { ActivityResponse } from '../../types/interfaces/resume/response/ActivityResponse';
import { ProjectResponse } from '../../types/interfaces/resume/response/ProjectResponse';
import { SkillData } from './ResumeCards/ResumeSkillCard';
import { getMember } from '../../hooks/userUser';
import { resetCreateStatus, resetUpdateStatus } from '../../store/slices/resumeSlice';
import { FaUser, FaFileAlt, FaBriefcase, FaProjectDiagram, FaUsers, FaGraduationCap } from 'react-icons/fa';
import { SalaryType } from '../../types/enums/SalaryType';

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
    salaryType: SalaryType.MONTHLY,
    desiredSalary: 0,
  },
  skills: [],
  education: { school: '', major: '', gpa: 0, period: { startDate: '', endDate: '' }, status: '' },
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

  // 이력서 존재 여부에 따라 create/update 결정
  const hasResume = !!member?.profile?.resume;

  useSubmissionAlert({
    status,
    target: hasResume ? 'update' : 'create',
    error,
    successMessage: '이력서가 성공적으로 제출되었습니다.',
    errorMessage: '이력서 제출에 실패했습니다.',
  });

  useEffect(() => {
    // 컴포넌트가 언마운트될 때 상태를 초기화합니다.
    return () => {
      if (hasResume) {
        dispatch(resetUpdateStatus());
      } else {
        dispatch(resetCreateStatus());
      }
    };
  }, [dispatch, hasResume]);

  useEffect(() => {
    if (!member || initialized) return;

    const profile = member.profile;
    const resume = profile?.resume;

    const nextForm: ResumeFormState = {
      basicInfo: {
        name: member.name ?? '',
        email: member.email ?? '',
        phoneNumber: member.phoneNumber ?? '',
        currentJob: profile?.currentJob ?? '',
        address: member.address?.address ?? '',
      },
      intro: {
        growthProcess: resume?.introduction?.growthProcess ?? '',
        strengths: resume?.introduction?.strengths ?? '',
        schoolLife: resume?.introduction?.schoolLife ?? '',
        motivation: resume?.introduction?.motivation ?? '',
      },
      certs:
        resume?.certificates?.map((cert) => ({
          name: cert.name,
          agency: cert.agency,
          year: cert.year,
        })) ?? [],
      skills:
        profile?.skills?.map((skill: ProfileSkillDTO) => {
          // Map SkillProficiency to SkillData proficiency
          let proficiency: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' = 'INTERMEDIATE';
          const skillProf = String(skill.proficiency);
          if (skillProf === '초급') proficiency = 'BEGINNER';
          else if (skillProf === '중급') proficiency = 'INTERMEDIATE';
          else if (skillProf === '고급' || skillProf === '전문가') proficiency = 'ADVANCED';

          return {
            name: skill.name,
            proficiency,
          };
        }) || [],
      careers:
        resume?.careers?.map((career: CareerResponse) => ({
          companyName: career.companyName,
          period: {
            startDate: career.period?.startDate ? new Date(career.period.startDate).toISOString().split('T')[0] : '',
            endDate: career.period?.endDate ? new Date(career.period.endDate).toISOString().split('T')[0] : '',
          },
          department: career.department,
          description: career.description,
        })) || [],
      desiredJob: resume?.desiredCompany
        ? {
            desiredCompany1: resume.desiredCompany.desiredCompany1,
            desiredCompany2: resume.desiredCompany.desiredCompany2,
            desiredRegion: resume.desiredCompany.desiredRegion,
            salaryType: resume.desiredCompany.salaryType,
            desiredSalary: resume.desiredCompany.desiredSalary,
          }
        : emptyForm.desiredJob,
      education: resume?.education
        ? {
            school: resume.education.school,
            major: resume.education.major,
            gpa: resume.education.gpa,
            period: {
              startDate: resume.education.period?.startDate
                ? new Date(resume.education.period.startDate).toISOString().split('T')[0]
                : '',
              endDate: resume.education.period?.endDate
                ? new Date(resume.education.period.endDate).toISOString().split('T')[0]
                : '',
            },
            status: resume.education.status,
          }
        : emptyForm.education,
      activities:
        resume?.activities?.map((activity: ActivityResponse) => ({
          title: activity.title,
          organization: activity.organization,
          period: {
            startDate: activity.period?.startDate
              ? new Date(activity.period.startDate).toISOString().split('T')[0]
              : '',
            endDate: activity.period?.endDate ? new Date(activity.period.endDate).toISOString().split('T')[0] : '',
          },
          description: activity.description,
        })) || [],
      projects:
        resume?.projects?.map((project: ProjectResponse) => ({
          name: project.name,
          description: project.description,
          period: {
            startDate: project.period?.startDate ? new Date(project.period.startDate).toISOString().split('T')[0] : '',
            endDate: project.period?.endDate ? new Date(project.period.endDate).toISOString().split('T')[0] : '',
          },
          role: project.role,
          url: project.url,
          achievements: project.achievements,
          techStack: project.techStack,
        })) || [],
      portfolios: [],
    };

    setForm(nextForm);
    setInitialized(true);
  }, [member, initialized]);

  const convertPeriodToDate = (period: { startDate: string; endDate: string }): PeriodRequest => {
    return {
      startDate: period.startDate ? new Date(period.startDate) : new Date(),
      endDate: period.endDate ? new Date(period.endDate) : new Date(),
    };
  };

  const buildResumeRequest = (): ResumeRequest => {
    if (!form) throw new Error('폼 정보가 없습니다');

    const activities: ActivityRequest[] = form.activities.map((activity) => ({
      title: activity.title,
      organization: activity.organization,
      period: convertPeriodToDate(activity.period),
      description: activity.description,
    }));

    const projects: ProjectRequest[] = form.projects.map((project) => ({
      name: project.name,
      description: project.description,
      period: convertPeriodToDate(project.period),
      role: project.role,
      url: project.url,
      achievements: project.achievements,
      techStack: project.techStack,
    }));

    const careers: CareerRequest[] = form.careers.map((career) => ({
      companyName: career.companyName,
      period: convertPeriodToDate(career.period),
      department: career.department,
      description: career.description,
    }));

    const education: EducationRequest = {
      school: form.education.school,
      major: form.education.major,
      gpa: form.education.gpa,
      period: convertPeriodToDate(form.education.period),
      status: form.education.status,
    };

    return {
      introduction: form.intro,
      activities,
      projects,
      careers,
      education,
      desiredCompany: form.desiredJob,
      certificates: form.certs,
    };
  };

  const buildProfileRequest = (): ProfileRequest => {
    if (!form) throw new Error('폼 정보가 없습니다');

    // Convert skills to SkillRequest format
    const skillRequests: SkillRequest[] = form.skills.map((skill) => ({
      name: skill.name,
      proficiency: skill.proficiency as SkillProficiency,
    }));

    // Get education level from member profile or use default
    const educationLevel = member?.profile?.educationLevel
      ? (EducationLevelType[member.profile.educationLevel as keyof typeof EducationLevelType] ??
        EducationLevelType.NO_REQUIREMENT)
      : EducationLevelType.NO_REQUIREMENT;

    // Get desired job codes from member profile or use empty array
    const desiredJobCodes: number[] =
      member?.profile?.desiredCapabilities?.map((cap) => Number(cap.code)).filter((c): c is number => !isNaN(c)) ?? [];

    // Build resume request
    const resumeRequest = buildResumeRequest();

    return {
      desiredJobCodes,
      currentJob: form.basicInfo.currentJob || '',
      educationLevel,
      profileImageUrl: member?.profile?.profileImageUrl,
      skills: skillRequests,
      resume: resumeRequest,
    };
  };

  const handleSubmit = async () => {
    const profileRequest = buildProfileRequest();

    // 디버깅: 전송되는 데이터 확인
    console.log('=== 이력서 제출 데이터 ===');
    console.log('ProfileRequest:', JSON.stringify(profileRequest, null, 2));
    console.log('Careers 데이터:', JSON.stringify(form.careers, null, 2));

    try {
      // 1. 이력서 생성/수정 API를 호출합니다.
      // 이력서가 이미 있으면 update, 없으면 create
      const hasResume = !!member?.profile?.resume;
      if (hasResume) {
        await dispatch(updateResumeThunk(profileRequest)).unwrap();
      } else {
        await dispatch(createResumeThunk(profileRequest)).unwrap();
      }
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
            <ResumeBasicCard
              value={form.basicInfo}
              onChange={(val: BasicCardData) => setForm((prev) => ({ ...prev, basicInfo: val }))}
            />
            <ResumePortfolioCard
              value={form.portfolios}
              onChange={(val) => setForm((prev) => ({ ...prev, portfolios: val }))}
            />
          </>
        );
      case 'intro':
        return (
          <ResumeIntroCard
            value={form.intro}
            onChange={(val: IntroCardData) => setForm((prev) => ({ ...prev, intro: val }))}
          />
        );
      case 'career':
        return (
          <>
            <ResumeDesiredJobCard
              value={form.desiredJob}
              onChange={(val: DesiredJobCardData) => setForm((prev) => ({ ...prev, desiredJob: val }))}
            />
            <ResumeCareerCard
              value={form.careers}
              onChange={(val: CareerCardData[]) => setForm((prev) => ({ ...prev, careers: val }))}
            />
          </>
        );
      case 'project':
        return (
          <ResumeProjectCard
            value={form.projects}
            onChange={(val: ProjectCardData[]) => setForm((prev) => ({ ...prev, projects: val }))}
          />
        );
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
            <ResumeEduCard
              value={form.education}
              onChange={(val: EduCardData) => setForm((prev) => ({ ...prev, education: val }))}
            />
            <ResumeCertCard value={form.certs} onChange={(val) => setForm((prev) => ({ ...prev, certs: val }))} />
            <ResumeSkillCard
              value={form.skills}
              onChange={(val: SkillData[]) => setForm((prev) => ({ ...prev, skills: val }))}
            />
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

      <div className={styles.tabContent}>{renderActiveTabContent()}</div>

      <div className={styles.submitArea}>
        <button type="button" onClick={handleSubmit} disabled={status.create === 'pending'}>
          {status.create === 'pending' ? <div className={styles.spinner}></div> : '이력서 제출'}
        </button>
      </div>
    </div>
  );
};

export default Resume;
