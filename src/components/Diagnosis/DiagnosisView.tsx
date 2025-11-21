import { useRef } from 'react';
import { useSelector } from 'react-redux';
import styles from '../../styles/DiagnosisPage.module.css';
import UserProfileCard from './UserProfileCard';
import CertificationCard from './CertificationCard';
import BottomJobCard from './BottomJobCard';
import { DiagnosisResultResponse } from '../../types/interfaces/diagnosis/response/DiagnosisResultResponse';
import { RootState } from '../../store/store';
import { ProfileSkillDTO } from '../../types/interfaces/member/response/ProfileSkillDTO';

interface DiagnosisViewProps {
  result: DiagnosisResultResponse;
}

/**
 * Component that displays the diagnosis results including:
 * - User profile with NCS radar chart
 * - Recommended certifications
 * - Recommended job postings
 */
const DiagnosisView = ({ result }: DiagnosisViewProps) => {
  const jobListRef = useRef<HTMLDivElement>(null);
  const member = useSelector((state: RootState) => state.user.member);

  const handlePrev = () => {
    if (jobListRef.current) {
      jobListRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (jobListRef.current) {
      jobListRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Extract user data from member state
  const userName = member?.name || '사용자';
  const userSkills = member?.profile?.skills?.map((skill: ProfileSkillDTO) => skill.name) || [];

  // Convert RadarChartData to the format expected by UserProfileCard
  const convertToNcsData = () => {
    if (!result.radarChartData) {
      return {
        indicators: [],
        series: [],
      };
    }

    const { userProfile, targetNcsProfiles, competencyAxes } = result.radarChartData;

    // Create indicators from competency axes (max value is 1 since scores are 0-1 range)
    const indicators = competencyAxes.map((axis) => ({
      name: axis,
      max: 1,
    }));

    // Create series data
    const series = [
      {
        name: userProfile.profileName || '나의 역량',
        value: competencyAxes.map((axis) => userProfile.competencyScores[axis] || 0),
      },
      ...targetNcsProfiles.map((ncsProfile) => ({
        name: ncsProfile.ncsName || ncsProfile.ncsCode,
        value: competencyAxes.map((axis) => ncsProfile.competencyScores[axis] || 0),
      })),
    ];

    return {
      indicators,
      series,
    };
  };

  const ncsData = convertToNcsData();

  return (
    <div>
      <div className={styles.container}>
        {/* 왼쪽 섹션 - 사용자 프로필 및 NCS 레이더 차트 */}
        <aside className={styles.leftAside}>
          <UserProfileCard name={userName} skills={userSkills} ncsData={ncsData} summary={result.summary} />
        </aside>
        {/* 오른쪽 섹션 - 추천 자격증 목록 */}
        <section className={styles.rightSection}>
          <h3 className={styles.sectionTitle}>추천 자격증</h3>
          <div className={styles.certificationList}>
            {result.certificationRecommendations && result.certificationRecommendations.length > 0 ? (
              result.certificationRecommendations.map((cert, index) => (
                <CertificationCard key={index} certification={cert} className={styles.certificationCardItem} />
              ))
            ) : (
              <p className={styles.noData}>추천 자격증이 없습니다.</p>
            )}
          </div>
        </section>
      </div>
      {/* 하단 섹션 - 추천 채용 공고 */}
      <section className={styles.bottomSection}>
        <h2 className={styles.bottomTitle}>추천 채용 정보</h2>
        <div className={styles.bottomJobListContainer}>
          <button className={styles.prevButton} onClick={handlePrev}>
            &lt;
          </button>
          <div className={styles.bottomJobList} ref={jobListRef}>
            {result.jobRecommendations && result.jobRecommendations.length > 0 ? (
              result.jobRecommendations.map((job) => <BottomJobCard key={job.jobId} job={job} />)
            ) : (
              <p className={styles.noData}>추천 채용 정보가 없습니다.</p>
            )}
          </div>
          <button className={styles.nextButton} onClick={handleNext}>
            &gt;
          </button>
        </div>
      </section>
    </div>
  );
};

export default DiagnosisView;
