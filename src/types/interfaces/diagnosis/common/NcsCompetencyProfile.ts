export interface NcsCompetencyProfile {
  ncsCode: string; // NCS 코드
  ncsName: string; // NCS 명칭
  competencyScores: Record<string, number>; // 역량별 점수 맵
  matchRate: number; // NCS 코드와의 적합도
}
