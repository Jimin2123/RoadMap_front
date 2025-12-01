import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBuilding, FaArrowRight, FaTrash } from 'react-icons/fa';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import styles from '../styles/MatchingPage.module.css'; // Reuse existing styles for consistency
import { JobRecommendationResponse } from '../types/interfaces/diagnosis/response/JobRecommendationResponse';

const InterestedCompaniesPage: React.FC = () => {
  const navigate = useNavigate();
  const [bookmarkedJobs, setBookmarkedJobs] = useState<JobRecommendationResponse[]>([]);

  useEffect(() => {
    try {
      const savedDetails = localStorage.getItem('bookmarked_jobs_details');
      if (savedDetails) {
        setBookmarkedJobs(JSON.parse(savedDetails));
      }
    } catch (error) {
      console.error('Failed to load bookmarked jobs', error);
    }
  }, []);

  const handleRemoveBookmark = (e: React.MouseEvent, jobId: string) => {
    e.stopPropagation();
    const updatedJobs = bookmarkedJobs.filter((job) => job.jobId !== jobId);
    setBookmarkedJobs(updatedJobs);
    localStorage.setItem('bookmarked_jobs_details', JSON.stringify(updatedJobs));

    // Also update the ID list to keep them in sync
    try {
      const savedIds = localStorage.getItem('job_bookmarks');
      if (savedIds) {
        const ids: string[] = JSON.parse(savedIds);
        const updatedIds = ids.filter((id) => id !== jobId);
        localStorage.setItem('job_bookmarks', JSON.stringify(updatedIds));
      }
    } catch (error) {
      console.error('Failed to sync bookmark IDs', error);
    }
  };

  const handleCardClick = (job: JobRecommendationResponse) => {
    if (job.url) {
      window.open(job.url, '_blank', 'noopener,noreferrer');
    } else {
      console.log(`${job.companyName} 상세 페이지로 이동합니다.`);
    }
  };

  return (
    <div className="layout">
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.introSection}>
          <h1 className={styles.title}>관심 기업 리스트</h1>
          <p className={styles.subtitle}>내가 찜한 기업들을 모아보세요.</p>
        </div>

        <div className={styles.cardsContainer}>
          {bookmarkedJobs.length > 0 ? (
            bookmarkedJobs.map((job) => (
              <div key={job.jobId} className={styles.card} onClick={() => handleCardClick(job)}>
                <div className={styles.cardHeader}>
                  <div className={styles.companyLogo}>
                    {job.companyLogoUrl ? (
                      <img
                        src={job.companyLogoUrl}
                        alt={job.companyName}
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    ) : (
                      <FaBuilding />
                    )}
                  </div>
                  <h2 className={styles.companyName}>{job.companyName}</h2>
                  <button
                    className={styles.bookmarkButton}
                    onClick={(e) => handleRemoveBookmark(e, job.jobId)}
                    aria-label="삭제"
                    title="관심 기업에서 삭제"
                  >
                    <FaTrash />
                  </button>
                </div>
                <div className={styles.jobTitle} style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '1.1em' }}>
                  {job.title}
                </div>
                <div className={styles.cardFooter}>
                  <span>자세히 보기</span> <FaArrowRight />
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              <p>관심 등록한 기업이 없습니다.</p>
              <button className={styles.moreButton} onClick={() => navigate('/matching')} style={{ marginTop: '1rem' }}>
                채용 공고 보러가기
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InterestedCompaniesPage;
