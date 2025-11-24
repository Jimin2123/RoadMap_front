import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBuilding, FaLightbulb, FaArrowRight, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import styles from '../styles/MatchingPage.module.css';

// Job 데이터 타입 정의
interface Job {
  rank: number;
  companyName: string;
  reason: string;
}

// 1. API 호출 실패 시 보여줄 임시 목업 데이터입니다.
const placeholderJobs: Job[] = [
  {
    rank: 1,
    companyName: '한양이엔지',
    reason:
      '사용자의 React 및 TypeScript 숙련도와 일치하며, 반도체 장비 산업에 대한 관심사와 부합합니다. 희망 연봉 범위 내에 있습니다.',
  },
  {
    rank: 2,
    companyName: '네이버웹툰',
    reason:
      'JavaScript 및 웹 프론트엔드 개발 경험을 중요하게 생각하는 포지션입니다. 대규모 트래픽 서비스 경험을 쌓을 수 있습니다.',
  },
  {
    rank: 3,
    companyName: '토스',
    reason:
      '핀테크 산업에 대한 높은 이해도와 빠른 학습 능력을 요구하는 포지션입니다. 사용자의 성장 가능성과 부합합니다.',
  },
  {
    rank: 4,
    companyName: '카카오뱅크',
    reason: '안정적인 서비스 운영 경험과 MSA에 대한 이해도를 필요로 하는 포지션으로, 백엔드 역량을 강화할 수 있습니다.',
  },
  {
    rank: 5,
    companyName: '당근마켓',
    reason:
      '사용자 중심의 서비스 개발 경험과 커뮤니티 서비스에 대한 열정을 중요하게 생각합니다. TypeScript, React Native 경험을 활용할 수 있습니다.',
  },
  {
    rank: 6,
    companyName: '쿠팡',
    reason:
      '대규모 이커머스 플랫폼의 백엔드 시스템을 경험할 수 있는 기회입니다. Java와 Spring Framework에 대한 깊은 이해가 필요합니다.',
  },
  {
    rank: 7,
    companyName: '우아한형제들',
    reason: '배달 서비스의 핵심 로직을 개발하고 운영하는 포지션입니다. MSA 환경에서의 개발 경험을 쌓을 수 있습니다.',
  },
  {
    rank: 8,
    companyName: 'SK텔레콤',
    reason:
      'AI 및 데이터 분석 기술을 활용한 신규 서비스 개발에 참여할 수 있습니다. Python 및 관련 라이브러리 활용 능력이 중요합니다.',
  },
  {
    rank: 9,
    companyName: '삼성SDS',
    reason:
      '클라우드 기반 솔루션 개발 및 운영 경험을 쌓을 수 있는 포지션입니다. AWS, Azure 등 클라우드 플랫폼에 대한 이해가 필요합니다.',
  },
  {
    rank: 10,
    companyName: 'LG CNS',
    reason:
      '스마트 팩토리, 스마트 시티 등 대규모 IT 프로젝트에 참여할 수 있는 기회입니다. 시스템 통합 및 아키텍처 설계 역량이 요구됩니다.',
  },
];

// 2. 스켈레톤 UI 컴포넌트: 데이터 로딩 중에 보여줄 카드 형태의 UI입니다.
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
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState<number[]>(() => {
    // 1. 페이지 로드 시 localStorage에서 북마크 데이터를 가져와 초기 상태로 설정합니다.
    try {
      const savedBookmarks = localStorage.getItem('bookmarks');
      return savedBookmarks ? JSON.parse(savedBookmarks) : [];
    } catch (error) {
      console.error('Failed to load bookmarks from localStorage', error);
      return [];
    }
  });
  const [error, setError] = useState<string | null>(null);
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 6;
  const VISIBLE_PAGE_COUNT = 5;

  // 3. API를 통해 실제 채용 추천 데이터를 불러옵니다.
  useEffect(() => {
    // NOTE: 현재 백엔드 API가 없으므로, 임시 목업 데이터를 사용합니다.
    // 2초의 로딩 시뮬레이션을 적용합니다.
    const timer = setTimeout(() => {
      setJobs(placeholderJobs);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // 2. 북마크 상태가 변경될 때마다 localStorage에 저장합니다.
  useEffect(() => {
    try {
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Failed to save bookmarks to localStorage', error);
    }
  }, [bookmarks]);

  const handleMoreClick = () => {
    navigate('/jobs');
  };

  const handleCardClick = (companyName: string) => {
    console.log(`${companyName} 상세 페이지로 이동합니다.`);
    navigate(`/jobs/${companyName}`);
  };

  const handleBookmarkClick = (e: React.MouseEvent, rank: number) => {
    e.stopPropagation(); // 카드 클릭 이벤트가 부모로 전파되는 것을 방지합니다.
    setBookmarks((prev) => (prev.includes(rank) ? prev.filter((r) => r !== rank) : [...prev, rank]));
    console.log(`채용 공고 ${rank}번 북마크 상태 변경`);
  };

  // 북마크 필터링 로직
  const filteredJobs = showBookmarkedOnly ? jobs.filter((job) => bookmarks.includes(job.rank)) : jobs;

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
          ) : error ? (
            <div className={styles.noResults}>
              <p>{error}</p>
            </div>
          ) : paginatedJobs.length > 0 ? (
            paginatedJobs.map((job) => (
              <div key={job.rank} className={styles.card} onClick={() => handleCardClick(job.companyName)}>
                <div className={styles.cardHeader}>
                  <div className={styles.companyLogo}>
                    <FaBuilding />
                  </div>
                  <h2 className={styles.companyName}>{job.companyName}</h2>
                  <button
                    className={styles.bookmarkButton}
                    onClick={(e) => handleBookmarkClick(e, job.rank)}
                    aria-label="북마크"
                  >
                    {bookmarks.includes(job.rank) ? <FaBookmark /> : <FaRegBookmark />}
                  </button>
                  <span className={styles.rankBadge}>Top {job.rank}</span>
                </div>
                <p className={styles.reason}>
                  <FaLightbulb className={styles.reasonIcon} /> {job.reason}
                </p>
                <div className={styles.cardFooter}>
                  <span>자세히 보기</span> <FaArrowRight />{' '}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              <p>{showBookmarkedOnly ? '북마크한 채용 정보가 없습니다.' : '추천 채용 정보가 없습니다.'}</p>
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

        <div className={styles.moreButtonContainer}>
          <button className={styles.moreButton} onClick={handleMoreClick}>
            더 많은 채용정보 보기
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MatchingPage;
