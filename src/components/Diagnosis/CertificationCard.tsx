import { useState } from 'react';
import styles from './CertificationCard.module.css';
import { CertificationRecommendationResponse } from '../../types/interfaces/diagnosis/response/CertificationRecommendationResponse';
import { FaStar, FaRegStar } from 'react-icons/fa';

interface CertificationCardProps {
  certification: CertificationRecommendationResponse;
  className?: string;
}

const CertificationCard = ({ certification, className }: CertificationCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const difficultyStars = '★'.repeat(certification.difficultyLevel) + '☆'.repeat(5 - certification.difficultyLevel);
  const priorityLabel = ['최우선', '높음', '보통', '낮음', '참고'][certification.priority - 1] || '보통';

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click if necessary
    setIsFavorited((prev) => !prev);
  };

  return (
    <div className={`${styles.certificationCard} ${className || ''} ${certification.isOwned ? styles.owned : ''}`}>
      <div className={styles.header}>
        <h4>{certification.certificationName}</h4>
        <button className={styles['favorite-button']} onClick={toggleFavorite}>
          {isFavorited ? (
            <FaStar className={styles['star-icon']} style={{ color: '#ffb618ff' }} />
          ) : (
            <FaRegStar className={styles['icon']} />
          )}
        </button>
        {certification.isOwned && <span className={styles.ownedBadge}>보유</span>}
      </div>
      <p className={styles.organization}>{certification.issuingOrganization}</p>
      <div className={styles.metadata}>
        <span className={styles.category}>{certification.category}</span>
        <span className={styles.difficulty} title={`난이도 ${certification.difficultyLevel}/5`}>
          {difficultyStars}
        </span>
      </div>
      <p className={styles.reason}>{certification.reason}</p>
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>우선순위</span>
          <span className={styles.statValue}>{priorityLabel}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>역량 기여도</span>
          <span className={styles.statValue}>{certification.gapResolutionContribution}%</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>준비 기간</span>
          <span className={styles.statValue}>{certification.estimatedPreparationMonths}개월</span>
        </div>
      </div>
      <p className={styles.ncsCode}>관련 NCS: {certification.relatedNcsCode}</p>
    </div>
  );
};

export default CertificationCard;
