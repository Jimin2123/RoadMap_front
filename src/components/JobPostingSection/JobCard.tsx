import React, { useState, useEffect } from 'react';
import styles from './JobCard.module.css';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { filterWholeAreas } from '../../utils/locationUtils';
import { JobRecommendationResponse } from '../../types/interfaces/diagnosis/response/JobRecommendationResponse';

interface JobCardProps {
  jobId: string; // Added jobId
  jobTitle: string;
  company: string;
  location: string;
  experience: string;
  education: string;
  companyLogoUrl: string;
  url: string;
}

const JobCard: React.FC<JobCardProps> = ({
  jobId,
  jobTitle,
  company,
  location,
  experience,
  education,
  companyLogoUrl,
  url,
}) => {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem('job_bookmarks');
      if (savedBookmarks) {
        const bookmarks: string[] = JSON.parse(savedBookmarks);
        setIsFavorited(bookmarks.includes(jobId));
      }
    } catch (error) {
      console.error('Failed to load bookmarks', error);
    }
  }, [jobId]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newStatus = !isFavorited;
    setIsFavorited(newStatus);

    try {
      // Update IDs
      const savedBookmarks = localStorage.getItem('job_bookmarks');
      let bookmarks: string[] = savedBookmarks ? JSON.parse(savedBookmarks) : [];

      if (newStatus) {
        if (!bookmarks.includes(jobId)) bookmarks.push(jobId);
      } else {
        bookmarks = bookmarks.filter((id) => id !== jobId);
      }
      localStorage.setItem('job_bookmarks', JSON.stringify(bookmarks));

      // Update Details
      const savedDetails = localStorage.getItem('bookmarked_jobs_details');
      let details: JobRecommendationResponse[] = savedDetails ? JSON.parse(savedDetails) : [];

      if (newStatus) {
        // Construct JobRecommendationResponse object
        const newJob: JobRecommendationResponse = {
          jobId: jobId,
          title: jobTitle,
          companyName: company,
          companyLogoUrl: companyLogoUrl,
          url: url,
          location: location,
          experienceLevel: experience,
          educationLevel: education,
          jobCode: '',
          jobName: '',
          salary: '',
          expirationTimestamp: '',
          recommendationReason: '메인 페이지 관심 등록',
          matchScore: 0,
        };
        // Avoid duplicates
        if (!details.some((item) => item.jobId === jobId)) {
          details.push(newJob);
        }
      } else {
        details = details.filter((item) => item.jobId !== jobId);
      }
      localStorage.setItem('bookmarked_jobs_details', JSON.stringify(details));
    } catch (error) {
      console.error('Failed to update bookmarks', error);
    }
  };

  // 필터링된 location 생성
  const filteredLocation = filterWholeAreas(location);

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <div className={styles['job-card']}>
        <div className={styles['job-card-top']}>
          <div className={styles['job-card-image']} style={{ backgroundImage: `url(${companyLogoUrl})` }} />
          <button className={styles['favorite-button']} onClick={toggleFavorite}>
            {isFavorited ? (
              <FaBookmark className={styles['star-icon']} />
            ) : (
              <FaRegBookmark className={styles['icon']} />
            )}
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
