/**
 * Diagnosis step enum matching backend values.
 * These are the actual values sent by the backend API.
 */
export enum DiagnosisStep {
  RESUME_ANALYSIS = 'RESUME_ANALYSIS', // 이력서 분석
  NCS_CODE_SUGGESTION = 'NCS_CODE_SUGGESTION', // NCS 코드 추천
  JOB_MATCHING = 'JOB_MATCHING', // 직무 매칭
  TRAINING_RECOMMENDATION = 'TRAINING_RECOMMENDATION', // 교육 추천
  FINAL_REPORT = 'FINAL_REPORT', // 최종 보고서 생성
}

/**
 * Gets the Korean display name for a diagnosis step.
 */
export function getDiagnosisStepDisplayName(step: DiagnosisStep): string {
  switch (step) {
    case DiagnosisStep.RESUME_ANALYSIS:
      return '이력서 분석';
    case DiagnosisStep.NCS_CODE_SUGGESTION:
      return 'NCS 코드 추천';
    case DiagnosisStep.JOB_MATCHING:
      return '직무 매칭';
    case DiagnosisStep.TRAINING_RECOMMENDATION:
      return '교육 추천';
    case DiagnosisStep.FINAL_REPORT:
      return '최종 보고서 생성';
    default:
      return '알 수 없음';
  }
}
