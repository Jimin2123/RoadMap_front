export interface DiagnosisResultResponse {
  diagnosisId: number;
  summary: string; // 진단 요약
  ncsAnalyses: string[]; // NCS 코드 분석 결과
  confidenceScore: number; // 신뢰도 점수
  radarChartData: number[]; // 레이더 차트 데이터
}
