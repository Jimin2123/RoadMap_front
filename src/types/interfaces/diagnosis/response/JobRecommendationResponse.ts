export interface JobRecommendationResponse {
  jobId: string; // 채용공고 ID
  title: string; // 채용공고 제목
  companyName: string; // 회사명
  companyLogoUrl: string; // 회사 로고 URL
  url: string; // 채용공고 상세 URL
  location: string; // 지역 정보
  experienceLevel: string; // 경력 요구사항
  educationLevel: string; // 학력 요구사항
  jobCode: string; // 직무 코드
  jobName: string; // 직무명
  salary: string; // 급여 정보
  expirationTimestamp: string; // 마감일 (timestamp)
  recommendationReason: string; // 추천 이유 (AI 생성)
  matchScore: number; // 매칭 점수 (0-100)
}
