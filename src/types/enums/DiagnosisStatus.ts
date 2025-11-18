/**
 * Diagnosis status enum matching backend values.
 * These are the actual values sent by the backend API.
 */
export enum DiagnosisStatus {
  PENDING = 'PENDING', // 대기 중
  IN_PROGRESS = 'IN_PROGRESS', // 진행 중
  COMPLETED = 'COMPLETED', // 완료
  FAILED = 'FAILED', // 실패
  AWAITING_USER_INPUT = 'AWAITING_USER_INPUT', // 사용자 입력 대기 (Human-in-the-loop)
}

/**
 * Gets the Korean display name for a diagnosis status.
 */
export function getDiagnosisStatusDisplayName(status: DiagnosisStatus): string {
  switch (status) {
    case DiagnosisStatus.PENDING:
      return '대기중';
    case DiagnosisStatus.IN_PROGRESS:
      return '진행중';
    case DiagnosisStatus.COMPLETED:
      return '완료';
    case DiagnosisStatus.FAILED:
      return '실패';
    case DiagnosisStatus.AWAITING_USER_INPUT:
      return '사용자 입력 대기';
    default:
      return '알 수 없음';
  }
}
