import NcsRadar from './NcsRadar';
import styles from './UserProfileCard.module.css';

interface NcsData {
  indicators: { name: string; max: number }[];
  series: { name: string; value: number[] }[];
}

interface UserProfileCardProps {
  name: string;
  skills: string[];
  ncsData: NcsData;
  summary?: string;
}

const UserProfileCard = ({ name, skills, ncsData, summary }: UserProfileCardProps) => {
  return (
    <div className={styles.profileCard}>
      <h2>{name}님의 역량 분석</h2>

      {/* ECharts 레이더 차트 */}
      <div className={styles.chartContainer}>
        <NcsRadar data={ncsData} />
      </div>

      <div className={styles.skillTags}>
        <p>보유 기술</p>
        {skills.length > 0 ? (
          skills.map((skill) => (
            <span key={skill} className={styles.tag}>
              #{skill}
            </span>
          ))
        ) : (
          <span className={styles.noSkills}>보유 기술 정보가 없습니다</span>
        )}
      </div>

      <div className={styles.aiAnalysisSection}>
        <h3>AI 분석 결과</h3>
        <p>
          {summary ||
            'AI 분석 결과에 대한 요약 내용이 여기에 표시됩니다. 사용자의 역량과 추천 직무에 대한 심층적인 분석을 제공합니다.'}
        </p>
      </div>
    </div>
  );
};

export default UserProfileCard;
