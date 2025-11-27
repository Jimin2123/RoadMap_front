import { useDispatch, useSelector } from 'react-redux';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import styles from '../components/Diagnosis/DiagnosisPage.module.css';
import DiagnosisAlert from '../components/Diagnosis/DiagnosisAlert';
import DiagnosisStart from '../components/Diagnosis/DiagnosisStart';
import DiagnosisView from '../components/Diagnosis/DiagnosisView';
import { startDiagnosis, resetDiagnosis } from '../store/slices/diagnosisSlice';
import { RootState, AppDispatch } from '../store/store';

/**
 * DiagnosisPage - Main diagnosis page that orchestrates the diagnosis flow.
 *
 * This page displays different components based on the diagnosis state:
 * - DiagnosisAlert: Handles profile not found errors and redirects to resume page
 * - DiagnosisStart: Shows initial diagnosis screen with start button
 * - DiagnosisView: Displays diagnosis results with radar chart and recommendations
 */
const DiagnosisPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { status, result, error, profileNotFound } = useSelector((state: RootState) => state.diagnosis);

  const handleStartDiagnosis = () => {
    dispatch(startDiagnosis());
  };

  const handleReset = () => {
    dispatch(resetDiagnosis());
  };

  const renderContent = () => {
    // Show diagnosis results if succeeded
    if (status === 'succeeded' && result) {
      return <DiagnosisView result={result} />;
    }

    // Default view: show the start button
    return (
      <DiagnosisStart
        onStart={handleStartDiagnosis}
        error={error}
        showError={status === 'failed' && !profileNotFound}
      />
    );
  };

  return (
    <div className="layout">
      <Header />
      <main className={styles.main}>
        {/* Alert component handles profile not found errors */}
        <DiagnosisAlert profileNotFound={profileNotFound} onReset={handleReset} />
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default DiagnosisPage;
