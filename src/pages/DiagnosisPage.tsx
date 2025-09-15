import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import styles from '../styles/DiagnosisPage.module.css';
import UserProfileCard from '../components/Diagnosis/UserProfileCard';
import FilterPanel from '../components/Diagnosis/FilterPanel';
import JobCard from '../components/Diagnosis/JobCard';

// 임시 더미 데이터
const user = {
  name: '김길동',
  skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML'],
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
];

const DiagnosisPage = () => {
  return (
    <div className="layout">
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          {/* 왼쪽 섹션 */}
          <aside className={styles.leftAside}>
            <UserProfileCard name={user.name} skills={user.skills} />
            <FilterPanel />
          </aside>

          {/* 오른쪽 섹션 */}
          <section className={styles.rightSection}>
            <div className={styles.jobList}>
              {recommendedJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DiagnosisPage;
