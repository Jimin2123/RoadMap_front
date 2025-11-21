import styles from '../../styles/DiagnosisPage.module.css';

interface DiagnosisStartProps {
  onStart: () => void;
  error?: string | null;
  showError: boolean;
}

/**
 * Component that displays the initial diagnosis screen with a start button.
 * Shows error messages if diagnosis has failed.
 */
const DiagnosisStart = ({ onStart, error, showError }: DiagnosisStartProps) => {
  return (
    <div className={styles.startContainer}>
      <h2>역량 진단 시작하기</h2>
      <p>버튼을 눌러 당신의 커리어에 대한 심층 분석을 시작하세요.</p>
      <button onClick={onStart} className={styles.startButton}>
        진단 시작
      </button>
      {showError && (
        <div className={styles.errorContainer}>
          <p>{error || '알 수 없는 오류가 발생했습니다.'}</p>
        </div>
      )}
    </div>
  );
};

export default DiagnosisStart;
