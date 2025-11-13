import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { ProfileRequest } from '../types/interfaces/member/request/ProfileRequest';
import { IntroCardData } from '../types/interfaces/ResumeData';
import { EducationLevelType } from '../types/enums/EducationLevelType';
import { SkillProficiency } from '../types/enums/SkillProficiency';
import styles from '../styles/JobMatchPage.module.css';

interface JobPosting {
  id: string;
  title: string;
  company: string;
  skills: string[];
  location: string;
  description: string;
}

const JobMatchPage: React.FC = () => {
  const member = useSelector((state: RootState) => state.user.member);
  const [jobs, setJobs] = useState<JobPosting[]>([]);

  useEffect(() => {
    if (!member) return;

    const profile = member.profile;
    const resume = profile?.resume;

    const profileRequest: ProfileRequest = {
      desiredJobCodes: [82, 84],
      educationLevel:
        EducationLevelType[profile?.educationLevel as keyof typeof EducationLevelType] ??
        EducationLevelType.ASSOCIATE_OR_ABOVE,
      skills:
        profile?.skills?.map((skill) => ({
          name: skill.name,
          proficiency:
            skill.proficiency === '초급'
              ? SkillProficiency.BEGINNER
              : skill.proficiency === '중급'
                ? SkillProficiency.INTERMEDIATE
                : skill.proficiency === '고급'
                  ? SkillProficiency.ADVANCED
                  : SkillProficiency.EXPERT,
        })) || [],
      currentJob: profile?.currentJob ?? '',
      resume: {
        activities: resume?.activities || [],
        education: resume?.education || {
          school: '',
          major: '',
          gpa: 0,
          period: { startDate: new Date(), endDate: new Date() },
          status: '',
        },
        projects: resume?.projects || [],
        careers: resume?.careers ?? [],
        desiredCompany: resume?.desiredCompany ?? {
          desiredCompany1: '',
          desiredCompany2: '',
          desiredRegion: '',
          salaryType: 'monthly',
          desiredSalary: 0,
        },
        introduction: (resume?.introduction as IntroCardData) ?? {
          growthProcess: '',
          strengths: '',
          schoolLife: '',
          motivation: '',
        },
        certificates: profile?.certificates || [],
      },
    };

    fetch('/api/v1/jobs/match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileRequest),
    })
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error('채용공고 불러오기 실패:', err));
  }, [member]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>나에게 맞는 채용공고</h1>
      {jobs.length === 0 ? (
        <p>추천 채용공고를 불러오는 중이거나, 조건에 맞는 공고가 없습니다.</p>
      ) : (
        <ul className={styles.jobList}>
          {jobs.map((job) => (
            <li key={job.id} className={styles.jobCard}>
              <h3>{job.title}</h3>
              <p>
                <strong>회사:</strong> {job.company}
              </p>
              <p>
                <strong>지역:</strong> {job.location}
              </p>
              <p>
                <strong>요구 기술:</strong> {job.skills.join(', ')}
              </p>
              <p className={styles.description}>{job.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobMatchPage;
