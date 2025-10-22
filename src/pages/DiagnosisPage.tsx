import React, { useRef } from 'react';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import styles from '../styles/DiagnosisPage.module.css';
import UserProfileCard from '../components/Diagnosis/UserProfileCard';
import JobCard from '../components/Diagnosis/JobCard';
import BottomJobCard from '../components/Diagnosis/BottomJobCard';

// 임시 더미 데이터
const user = {
  name: '김길동',
  skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML'],
};

// Dummy data for the NCS Radar Chart
const ncsCompetencyData = {
  indicators: [
    { name: '의사소통', max: 100 },
    { name: '문제해결', max: 100 },
    { name: '자원관리', max: 100 },
    { name: '기술능력', max: 100 },
    { name: '대인관계', max: 100 },
    { name: '조직이해', max: 100 },
  ],
  series: [
    {
      name: '나의 NCS 역량',
      value: [90, 75, 60, 85, 70, 80],
    },
    {
      name: '평균 NCS 역량',
      value: [70, 80, 75, 80, 75, 70],
    },
  ],
};

const recommendedJobs = [
  {
    id: 1,
    company: '카카오',
    title: '프론트엔드 개발자',
    skills: ['React', 'TypeScript'],
    deadline: '2025-10-24',
  },
  {
    id: 2,
    company: '네이버',
    title: '웹 프론트엔드 개발',
    skills: ['JavaScript', 'Vue.js'],
    deadline: '2025-10-22',
  },
  {
    id: 3,
    company: '라인',
    title: '프론트엔드 개발 인턴',
    skills: ['React', 'JavaScript'],
    deadline: '2025-10-20',
  },
  {
    id: 4,
    company: '이삭토스트',
    title: '프론트엔드 개발 인턴',
    skills: ['', 'JavaScript'],
    deadline: '2025-10-30',
  },
  {
    id: 5,
    company: '배달의민족',
    title: '백엔드 개발자',
    skills: ['Java', 'Spring'],
    deadline: '2025-11-01',
  },
  {
    id: 6,
    company: '쿠팡',
    title: '데이터 분석가',
    skills: ['Python', 'SQL'],
    deadline: '2025-11-05',
  },
  {
    id: 7,
    company: '토스',
    title: 'iOS 개발자',
    skills: ['Swift', 'iOS'],
    deadline: '2025-11-10',
  },
  {
    id: 8,
    company: '네이버웹툰',
    title: 'Android 개발자',
    skills: ['Kotlin', 'Android'],
    deadline: '2025-11-15',
  },
  {
    id: 9,
    company: '당근마켓',
    title: '풀스택 개발자',
    skills: ['Node.js', 'React', 'MongoDB'],
    deadline: '2025-11-20',
  },
  {
    id: 10,
    company: '라인플러스',
    title: 'DevOps 엔지니어',
    skills: ['Docker', 'Kubernetes'],
    deadline: '2025-11-25',
  },
];

const DiagnosisPage = () => {
  const jobListRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="layout">
      <Header />
      <main className={styles.main}>
        <div>
          <div className={styles.container}>
            {/* <div>div영역 추가</div> */}
            {/* 왼쪽 섹션 */}
            <aside className={styles.leftAside}>
              <UserProfileCard name={user.name} skills={user.skills} ncsData={ncsCompetencyData} />
            </aside>
            {/* 오른쪽 섹션 */}
            <section className={styles.rightSection}>
              <div className={styles.jobList}>
                {recommendedJobs.map((job) => (
                  <JobCard key={job.id} job={job} className={styles.rightSectionJobCard} />
                ))}
              </div>
            </section>
          </div>
          <section className={styles.bottomSection}>
            <h2 className={styles.bottomTitle}>더 많은 채용 정보</h2>
            <div className={styles.bottomJobListContainer}>
              <button className={styles.prevButton} onClick={handlePrev}>
                &lt;
              </button>
              <div className={styles.bottomJobList} ref={jobListRef}>
                {recommendedJobs.map((job) => (
                  <BottomJobCard key={job.id} job={job} />
                ))}
              </div>
              <button className={styles.nextButton} onClick={handleNext}>
                &gt;
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DiagnosisPage;
