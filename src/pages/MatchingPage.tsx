
import React from 'react';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import styles from '../styles/MatchingPage.module.css';
import { useNavigate } from 'react-router-dom';

// Placeholder data for ranked job recommendations
const rankedJobs = [
  {
    rank: 1,
    companyName: '한양이엔지',
    reason: '사용자의 React 및 TypeScript 숙련도와 일치하며, 반도체 장비 산업에 대한 관심사와 부합합니다. 희망 연봉 범위 내에 있습니다.',
  },
  {
    rank: 2,
    companyName: '네이버웹툰',
    reason: 'JavaScript 및 웹 프론트엔드 개발 경험을 중요하게 생각하는 포지션입니다. 대규모 트래픽 서비스 경험을 쌓을 수 있습니다.',
  },
  {
    rank: 3,
    companyName: '토스',
    reason: '핀테크 산업에 대한 높은 이해도와 빠른 학습 능력을 요구하는 포지션입니다. 사용자의 성장 가능성과 부합합니다.',
  },
];

const MatchingPage: React.FC = () => {
    const navigate = useNavigate();

    const handleMoreClick = () => {
        // In a real application, this would navigate to a page with all job listings
        // For now, we can navigate to a placeholder or the main job board page
        navigate('/jobs'); // Assuming '/jobs' is the route for all job postings
        console.log('더 많은 채용 정보 보기');
    };

  return (
    <div className={styles.pageLayout}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.title}>맞춤 채용 정보</h1>
        <p className={styles.subtitle}>회원님의 프로필과 역량을 기반으로 가장 적합한 채용 공고를 추천해 드립니다.</p>

        <section className={styles.rankedSection}>
          <div className={styles.rankedCards}>
            {rankedJobs.map((job) => (
              <div key={job.rank} className={`${styles.rankCard} ${styles[`rank${job.rank}`]}`}>
                <div className={styles.rankHeader}>
                  <span className={styles.rankLabel}>{job.rank}순위</span>
                  <h2 className={styles.companyName}>{job.companyName}</h2>
                </div>
                <div className={styles.reasonSection}>
                  <h3 className={styles.reasonTitle}>추천 근거:</h3>
                  <p className={styles.reasonText}>{job.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

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
