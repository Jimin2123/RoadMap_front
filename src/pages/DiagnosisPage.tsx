import { useRef } from 'react';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import styles from '../styles/DiagnosisPage.module.css';
import UserProfileCard from '../components/Diagnosis/UserProfileCard';
import CertificationCard from '../components/Diagnosis/CertificationCard';
import BottomJobCard from '../components/Diagnosis/BottomJobCard';
import { CertificationRecommendationResponse } from '../types/interfaces/diagnosis/response/CertificationRecommendationResponse';
import { JobRecommendationResponse } from '../types/interfaces/diagnosis/response/JobRecommendationResponse';

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

// Dummy certification recommendations
const certificationRecommendations: CertificationRecommendationResponse[] = [
  {
    certificationName: '정보처리기사',
    issuingOrganization: '한국산업인력공단',
    category: 'IT/소프트웨어',
    difficultyLevel: 3,
    priority: 1,
    reason: 'IT 분야의 기본 자격증으로 개발자 역량 강화에 필수적입니다.',
    isOwned: false,
    gapResolutionContribution: 25,
    relatedNcsCode: '20010201',
    estimatedPreparationMonths: 3,
  },
  {
    certificationName: 'AWS Certified Developer',
    issuingOrganization: 'Amazon Web Services',
    category: '클라우드',
    difficultyLevel: 4,
    priority: 2,
    reason: '클라우드 기반 개발 역량을 향상시키고 현대적인 인프라 지식을 습득할 수 있습니다.',
    isOwned: false,
    gapResolutionContribution: 30,
    relatedNcsCode: '20010202',
    estimatedPreparationMonths: 4,
  },
  {
    certificationName: 'SQLD',
    issuingOrganization: '한국데이터산업진흥원',
    category: '데이터베이스',
    difficultyLevel: 2,
    priority: 3,
    reason: 'SQL 활용 능력을 검증하며 데이터 처리 역량을 강화할 수 있습니다.',
    isOwned: true,
    gapResolutionContribution: 15,
    relatedNcsCode: '20010203',
    estimatedPreparationMonths: 2,
  },
];

// Dummy job recommendations
const jobRecommendations: JobRecommendationResponse[] = [
  {
    jobId: 'job001',
    title: '프론트엔드 개발자',
    companyName: '카카오',
    companyLogoUrl: '/logos/kakao.png',
    url: 'https://careers.kakao.com/jobs/001',
    location: '경기 성남시 분당구',
    experienceLevel: '신입·경력',
    educationLevel: '학력무관',
    jobCode: '20010201',
    jobName: '프론트엔드 개발',
    salary: '회사내규에 따름',
    expirationTimestamp: '2025-12-31',
    recommendationReason: 'React 및 TypeScript 기술 스택이 회원님의 역량과 매우 잘 맞습니다.',
    matchScore: 95,
  },
  {
    jobId: 'job002',
    title: '웹 프론트엔드 개발자',
    companyName: '네이버',
    companyLogoUrl: '/logos/naver.png',
    url: 'https://recruit.navercorp.com/jobs/002',
    location: '경기 성남시 분당구',
    experienceLevel: '경력 3년 이상',
    educationLevel: '대졸 이상',
    jobCode: '20010201',
    jobName: '프론트엔드 개발',
    salary: '면접 후 결정',
    expirationTimestamp: '2025-12-25',
    recommendationReason: 'JavaScript 전문성과 대규모 서비스 개발 경험을 쌓을 수 있는 기회입니다.',
    matchScore: 88,
  },
  {
    jobId: 'job003',
    title: '프론트엔드 개발 인턴',
    companyName: '라인',
    companyLogoUrl: '/logos/line.png',
    url: 'https://linecorp.com/careers/003',
    location: '서울 강남구',
    experienceLevel: '신입',
    educationLevel: '학력무관',
    jobCode: '20010201',
    jobName: '프론트엔드 개발',
    salary: '회사내규에 따름',
    expirationTimestamp: '2025-12-20',
    recommendationReason: 'React 경험을 실무에서 발전시킬 수 있는 좋은 인턴 기회입니다.',
    matchScore: 82,
  },
  {
    jobId: 'job004',
    title: '풀스택 개발자',
    companyName: '당근마켓',
    companyLogoUrl: '/logos/daangn.png',
    url: 'https://daangn.com/careers/004',
    location: '서울 구로구',
    experienceLevel: '경력 2~5년',
    educationLevel: '대졸 이상',
    jobCode: '20010204',
    jobName: '풀스택 개발',
    salary: '4000~6000만원',
    expirationTimestamp: '2025-12-30',
    recommendationReason: 'Node.js와 React를 모두 활용한 풀스택 개발 경험을 쌓을 수 있습니다.',
    matchScore: 79,
  },
  {
    jobId: 'job005',
    title: 'DevOps 엔지니어',
    companyName: '라인플러스',
    companyLogoUrl: '/logos/line.png',
    url: 'https://linecorp.com/careers/005',
    location: '경기 성남시 분당구',
    experienceLevel: '경력 3년 이상',
    educationLevel: '대졸 이상',
    jobCode: '20010205',
    jobName: 'DevOps',
    salary: '면접 후 결정',
    expirationTimestamp: '2026-01-05',
    recommendationReason: '클라우드 및 인프라 관리 역량을 확장할 수 있는 기회입니다.',
    matchScore: 75,
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
            {/* 왼쪽 섹션 - 사용자 프로필 및 NCS 레이더 차트 */}
            <aside className={styles.leftAside}>
              <UserProfileCard name={user.name} skills={user.skills} ncsData={ncsCompetencyData} />
            </aside>
            {/* 오른쪽 섹션 - 추천 자격증 목록 */}
            <section className={styles.rightSection}>
              <h3 className={styles.sectionTitle}>추천 자격증</h3>
              <div className={styles.certificationList}>
                {certificationRecommendations.map((cert, index) => (
                  <CertificationCard key={index} certification={cert} className={styles.certificationCardItem} />
                ))}
              </div>
            </section>
          </div>
          {/* 하단 섹션 - 추천 채용 공고 */}
          <section className={styles.bottomSection}>
            <h2 className={styles.bottomTitle}>추천 채용 정보</h2>
            <div className={styles.bottomJobListContainer}>
              <button className={styles.prevButton} onClick={handlePrev}>
                &lt;
              </button>
              <div className={styles.bottomJobList} ref={jobListRef}>
                {jobRecommendations.map((job) => (
                  <BottomJobCard key={job.jobId} job={job} />
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
