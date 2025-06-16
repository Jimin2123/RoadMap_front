import JobFitCard from '../components/Diagnosis/JobFitCard';
import PersonalityRadar from '../components/Diagnosis/PersonalityRader';
import SkillDiagnosis from '../components/Diagnosis/SkillDiagnosis';
import CertDiagnosis from '../components/Diagnosis/CertDiagnosis';
import ProjectDiagnosis from '../components/Diagnosis/ProjectDiagnosis';
import ActivityDiagnosis from '../components/Diagnosis/ActivityDiagnosis';
import styles from '../styles/DiagnosisPage.module.css';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

const DiagnosisPage = () => {
  return (
    <div className="layout">
      <Header />

      <div className={styles.page}>
        <div className={styles.titleBox}>
          <h1>나의역량 진단</h1>
        </div>
        <section className={styles.rowSection}>
          <div className={styles.halfBox}>
            <JobFitCard />
          </div>
          <div className={styles.halfBox}>
            <PersonalityRadar />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.grid}>
            <div className={styles.cardBox}>
              <SkillDiagnosis />
            </div>
            <div className={styles.cardBox}>
              <CertDiagnosis />
            </div>
            <div className={styles.cardBox}>
              <ProjectDiagnosis />
            </div>
            <div className={styles.cardBox}>
              <ActivityDiagnosis />
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default DiagnosisPage;
