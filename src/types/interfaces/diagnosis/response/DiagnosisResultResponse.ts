import { RadarChartData } from '../common/RadarChartData';
import { CertificationRecommendationResponse } from './CertificationRecommendationResponse';
import { JobRecommendationResponse } from './JobRecommendationResponse';

export interface DiagnosisResultResponse {
  diagnosisId: number;
  summary: string; // 진단 요약
  ncsAnalyses: string[]; // NCS 코드 분석 결과
  confidenceScore: number; // 신뢰도 점수
  radarChartData: RadarChartData; // 레이더 차트 데이터
  jobRecommendations?: JobRecommendationResponse[]; // 추천 채용공고 목록
  certificationRecommendations?: CertificationRecommendationResponse[]; // 추천 자격증 목록
}
