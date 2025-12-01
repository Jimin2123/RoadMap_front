import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBuilding, FaLightbulb, FaArrowRight, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import styles from '../styles/MatchingPage.module.css';
import { RootState } from '../store/store';
import { JobRecommendationResponse } from '../types/interfaces/diagnosis/response/JobRecommendationResponse';

// 스켈레톤 UI 컴포넌트: 데이터 로딩 중에 보여줄 카드 형태의 UI입니다.
const SkeletonCard: React.FC = () => (
  <div className={`${styles.card} ${styles.skeleton}`}>
    <div className={styles.cardHeader}>
      <div className={`${styles.companyLogo} ${styles.skeletonItem}`} />
      <div className={`${styles.skeletonItem} ${styles.skeletonText}`} style={{ width: '50%', height: '24px' }} />
    </div>
    <div className={`${styles.skeletonItem} ${styles.skeletonText}`} style={{ height: '16px', marginBottom: '8px' }} />
    <div className={`${styles.skeletonItem} ${styles.skeletonText}`} style={{ height: '16px', marginBottom: '8px' }} />
    <div className={`${styles.skeletonItem} ${styles.skeletonText}`} style={{ height: '16px' }} />
    <div className={styles.cardFooter} style={{ borderTop: 'none', paddingTop: '20px' }}>
      <div
        className={`${styles.skeletonItem} ${styles.skeletonText}`}
        style={{
          width: '30%',
          height: '14px',
          marginLeft: 'auto',
        }}
      />
    </div>
  </div>
);

const MatchingPage: React.FC = () => {
  const navigate = useNavigate();
  const { result, status } = useSelector((state: RootState) => state.diagnosis);

  const [jobs, setJobs] = useState<JobRecommendationResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    // 1. 페이지 로드 시 localStorage에서 북마크 데이터를 가져와 초기 상태로 설정합니다.
    try {
      const savedBookmarks = localStorage.getItem('job_bookmarks');
      return savedBookmarks ? JSON.parse(savedBookmarks) : [];
    } catch (error) {
      console.error('Failed to load bookmarks from localStorage', error);
      return [];
    }
  });
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 6;
  const VISIBLE_PAGE_COUNT = 5;

  // 3. Redux Store에서 데이터 가져오기
  useEffect(() => {
    if (status === 'loading') {
      setLoading(true);
    } else {
      // 약간의 로딩 효과를 주어 자연스럽게 전환 (선택 사항)
      const timer = setTimeout(() => {
        if (result && result.jobRecommendations) {
          setJobs(result.jobRecommendations);
        } else {
          setJobs([]);
        }
        setLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [result, status]);

  // 2. 북마크 상태가 변경될 때마다 localStorage에 저장합니다.
  useEffect(() => {
    try {
      localStorage.setItem('job_bookmarks', JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Failed to save bookmarks to localStorage', error);
    }
  }, [bookmarks]);

  const handleCardClick = (job: JobRecommendationResponse) => {
    if (job.url) {
      window.open(job.url, '_blank', 'noopener,noreferrer');
    } else {
      console.log(`${job.companyName} 상세 페이지로 이동합니다.`);
      // navigate(`/jobs/${job.jobId}`); // 상세 페이지가 있다면 이동
    }
  };

  const handleBookmarkClick = (e: React.MouseEvent, job: JobRecommendationResponse) => {
    e.stopPropagation(); // 카드 클릭 이벤트가 부모로 전파되는 것을 방지합니다.
    const jobId = job.jobId;

    setBookmarks((prev) => {
      const newBookmarks = prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId];
      return newBookmarks;
    });

    // 상세 정보 저장 로직 추가
    try {
      const savedDetails = localStorage.getItem('bookmarked_jobs_details');
      let details: JobRecommendationResponse[] = savedDetails ? JSON.parse(savedDetails) : [];

      if (details.some((item) => item.jobId === jobId)) {
        details = details.filter((item) => item.jobId !== jobId);
      } else {
        details.push(job);
      }
      localStorage.setItem('bookmarked_jobs_details', JSON.stringify(details));
    } catch (error) {
      console.error('Failed to update bookmarked job details', error);
    }

    console.log(`채용 공고 ${jobId} 북마크 상태 변경`);
  };

  // 북마크 필터링 로직
  const filteredJobs = showBookmarkedOnly ? jobs.filter((job) => bookmarks.includes(job.jobId)) : jobs;

  // 페이지네이션 로직
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0); // 페이지 변경 시 맨 위로 스크롤
    }
  };

  const startPage = Math.max(
    1,
    Math.min(currentPage - Math.floor(VISIBLE_PAGE_COUNT / 2), totalPages - VISIBLE_PAGE_COUNT + 1)
  );
  const endPage = Math.min(startPage + VISIBLE_PAGE_COUNT - 1, totalPages);

  return (
    <div className="layout">
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.introSection}>
          <h1 className={styles.title}>맞춤 채용 정보</h1>
          <p className={styles.subtitle}>회원님의 프로필과 역량을 기반으로 가장 적합한 채용 공고를 추천해 드립니다.</p>
        </div>

        <div className={styles.filterSection}>
          <label className={styles.filterLabel}>
            <input
              type="checkbox"
              checked={showBookmarkedOnly}
              onChange={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
              className={styles.filterCheckbox}
            />
            북마크한 항목만 보기
          </label>
        </div>

        <div className={styles.cardsContainer}>
          {loading ? (
            Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => <SkeletonCard key={index} />)
          ) : paginatedJobs.length > 0 ? (
            paginatedJobs.map((job, index) => (
              <div key={job.jobId} className={styles.card} onClick={() => handleCardClick(job)}>
                <div className={styles.cardHeader}>
                  <div className={styles.companyLogo}>
                    {/* 로고 이미지가 있으면 표시, 없으면 아이콘 표시 */}
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
                    onClick={(e) => handleBookmarkClick(e, job)}
                    aria-label="북마크"
                  >
                    {bookmarks.includes(job.jobId) ? <FaBookmark /> : <FaRegBookmark />}
                  </button>
                  <span className={styles.rankBadge}>Top {index + 1 + (currentPage - 1) * ITEMS_PER_PAGE}</span>
                </div>
                <div className={styles.jobTitle} style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '1.1em' }}>
                  {job.title}
                </div>
                <p className={styles.reason}>
                  <FaLightbulb className={styles.reasonIcon} /> {job.recommendationReason}
                </p>
                <div className={styles.cardFooter}>
                  <span>자세히 보기</span> <FaArrowRight />{' '}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              <p>
                {showBookmarkedOnly
                  ? '북마크한 채용 정보가 없습니다.'
                  : !result
                    ? '진단 결과가 없습니다. 역량 진단을 먼저 진행해주세요.'
                    : '추천 채용 정보가 없습니다.'}
              </p>
              {!result && !showBookmarkedOnly && (
                <button
                  className={styles.moreButton}
                  onClick={() => navigate('/diagnosis')}
                  style={{ marginTop: '1rem' }}
                >
                  역량 진단하러 가기
                </button>
              )}
            </div>
          )}
        </div>

        {!loading && totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.pageButton}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              이전
            </button>
            {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
              const page = startPage + i;
              return (
                <button
                  key={page}
                  className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              );
            })}
            <button
              className={styles.pageButton}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              다음
            </button>
          </div>
        )}

        {/* <div className={styles.moreButtonContainer}>
          <button className={styles.moreButton} onClick={handleMoreClick}>
            더 많은 채용정보 보기
          </button>
        </div> */}
      </main>
      <Footer />
    </div>
  );
};

export default MatchingPage;
