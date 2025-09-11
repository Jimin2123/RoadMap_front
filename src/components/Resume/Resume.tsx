import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  ActivityCardData,
  BasicCardData,
  CertCardData,
  EduCardData,
  IntroCardData,
  PortfolioCardData,
  ProjectCardData,
} from '../../types/interfaces/ResumeData';
import { RootState } from '../../types/store';
import { ResumeRequest } from '../../types/interfaces/request/ResumeRequest';
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
import styles from './Resume.module.css';
import { useAppDispatch } from '../../store/hooks';
import { createResumeThunk } from '../../hooks/useResume';
import { useSubmissionAlert } from '../../hooks/useSubmissionAlert';
import { MemberResponse } from '../../types/interfaces/response/MemberResponse';
import { getMember } from '../../hooks/userUser';
import { resetCreateStatus } from '../../store/slices/resumeSlice';

/**
 * "카드" 컴포넌트에서 사용할 form 전체 Shape
 */
interface ResumeFormState {
  basicInfo: BasicCardData;
  intro: IntroCardData;
  certs: CertCardData[];
  skills: string[];
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
  intro: { content: '' },
  certs: [],
  skills: [],
  education: { school: '', major: '', period: '', status: '' },
  activities: [],
  projects: [],
  portfolios: [],
};

const Resume: React.FC<ResumeProps> = ({ member, onSubmissionSuccess }) => {
  const [form, setForm] = useState<ResumeFormState>(emptyForm);
  const [initialized, setInitialized] = useState(false);

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
      intro: { content: profile?.resume?.introduction ?? '' },
      certs:
        profile?.certificates?.map((cert) => ({
          name: cert.name,
          agency: cert.agency,
          year: cert.year,
        })) ?? [],
      skills: profile?.skills?.map((skill) => skill.name) || [],
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
      await dispatch(createResumeThunk(profileRequest)).unwrap();
      await dispatch(getMember()).unwrap();
      onSubmissionSuccess();
    } catch (err) {
      console.error('이력서 제출 실패:', err);
    }
  };

  return (
    <div className={styles.resumeContainer}>
      <ResumeBasicCard value={form.basicInfo} onChange={(val) => setForm((prev) => ({ ...prev, basicInfo: val }))} />
      <ResumeIntroCard value={form.intro} onChange={(val) => setForm((prev) => ({ ...prev, intro: val }))} />

      {/* 자격증 & 스킬 */}
      <div className={styles.cardRow}>
        <ResumeCertCard value={form.certs} onChange={(val) => setForm((prev) => ({ ...prev, certs: val }))} />
        <ResumeSkillCard value={form.skills} onChange={(val) => setForm((prev) => ({ ...prev, skills: val }))} />
      </div>

      {/* 학력 & 활동 */}
      <div className={styles.cardRow}>
        <ResumeEduCard value={form.education} onChange={(val) => setForm((prev) => ({ ...prev, education: val }))} />
        <ResumeActivityCard
          value={form.activities}
          onChange={(val) => setForm((prev) => ({ ...prev, activities: val }))}
        />
      </div>

      {/* 프로젝트 & 포트폴리오 */}
      <div className={styles.cardRow}>
        <ResumeProjectCard value={form.projects} onChange={(val) => setForm((prev) => ({ ...prev, projects: val }))} />
        <ResumePortfolioCard
          value={form.portfolios}
          onChange={(val) => setForm((prev) => ({ ...prev, portfolios: val }))}
        />
      </div>

      {/* 제출 버튼 */}
      <div className={styles.submitArea}>
        <button type="button" onClick={handleSubmit}>
          이력서 제출
        </button>
      </div>
    </div>
  );
};

export default Resume;
