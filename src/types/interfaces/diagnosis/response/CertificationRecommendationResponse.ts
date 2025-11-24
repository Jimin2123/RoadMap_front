export interface CertificationRecommendationResponse {
  certificationName: string; // 자격증명
  issuingOrganization: string; // 발급 기관
  category: string; // 자격증 분야
  difficultyLevel: number; // 난이도 (1-5)
  priority: number; // 추천 우선순위 (1-5, 낮을수록 높은 우선순위)
  reason: string; // 추천 이유
  isOwned: boolean; // 현재 보유 여부
  gapResolutionContribution: number; // 역량 gap 해소 기여도 (%)
  relatedNcsCode: string; // 관련 NCS 코드
  estimatedPreparationMonths: number; // 추정 준비 기간 (개월)
}
