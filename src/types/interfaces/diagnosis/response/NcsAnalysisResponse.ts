import { NcsRecommendationCandidate } from '../common/NcsRecommendationCandidate';

export interface NcsAnalysisResponse {
  candidates: NcsRecommendationCandidate[]; // NCS 추천 후보 목록
  overallConfidence: number; // 전체 신뢰도 점수
  requiresUserSelection: boolean; // 사용자 선택 필요 여부
  selectedNcsCode?: string; // 선택된 NCS 코드 (사용자 선택 시)
}
