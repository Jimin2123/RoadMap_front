export interface CompetencyProfile {
  profileName: string; // 역량 프로필 이름
  competencyScores: Record<string, number>; // 역량별 점수 맵
}
