import React, { useState } from 'react';
import styles from './JobCard.module.css';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { filterWholeAreas } from '../../utils/locationUtils';

interface JobCardProps {
  jobTitle: string;
  company: string;
  location: string;
  experience: string;
  education: string;
  companyLogoUrl: string;
  url: string;
}

const JobCard: React.FC<JobCardProps> = ({
  jobTitle,
  company,
  location,
  experience,
  education,
  companyLogoUrl,
  url,
}) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited((prev) => !prev);
  };

  // 필터링된 location 생성
  const filteredLocation = filterWholeAreas(location);

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <div className={styles['job-card']}>
        <div className={styles['job-card-top']}>
          <div className={styles['job-card-image']} style={{ backgroundImage: `url(${companyLogoUrl})` }} />
          <button className={styles['favorite-button']} onClick={toggleFavorite}>
            {isFavorited ? <FaStar className={styles['star-icon']} /> : <FaRegStar className={styles['icon']} />}
          </button>
        </div>
        <div className={styles['job-info']}>
          <div className={styles['job-title-section']}>
            <h3 className={styles['job-title']}>{jobTitle}</h3>
          </div>
          <div className={styles['job-company-section']}>
            <p className={styles['job-company']}>{company}</p>
          </div>
          <div className={styles['job-details-section']}>
            <span>{filteredLocation || location}</span> | <span>{experience}</span> | <span>{education}</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default JobCard;
