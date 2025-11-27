import styles from './BottomJobCard.module.css';
import { JobRecommendationResponse } from '../../types/interfaces/diagnosis/response/JobRecommendationResponse';

interface BottomJobCardProps {
  job: JobRecommendationResponse;
}

const BottomJobCard = ({ job }: BottomJobCardProps) => {
  // Format expiration date
  const formatDate = (timestamp: string) => {
    const date = new Date(parseInt(timestamp) * 1000); // Convert seconds to milliseconds
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className={styles.bottomJobCard}>
      <div className={styles.header}>
        <h4>{job.companyName}</h4>
        <span className={styles.matchScore}>{job.matchScore}%</span>
      </div>
      <p className={styles.title}>{job.title}</p>
      <div className={styles.info}>
        <span className={styles.location}>{job.location.replace(/&gt;/g, ' > ')}</span>
        <span className={styles.experience}>{job.experienceLevel}</span>
      </div>
      <p className={styles.recommendationReason}>{job.recommendationReason}</p>
      <div className={styles.footer}>
        <span className={styles.salary}>{job.salary}</span>
        <span className={styles.deadline}>마감일: {formatDate(job.expirationTimestamp)}</span>
      </div>
    </div>
  );
};

export default BottomJobCard;
