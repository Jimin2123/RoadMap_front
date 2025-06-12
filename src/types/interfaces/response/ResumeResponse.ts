export interface ResumeResponse {
  introduction: string; // 자기소개
  education: EducationResponse; // 학력 정보
  activities: ActivityResponse[]; // 활동 정보
  portfolios: PortfolioResponse[]; // 포트폴리오 정보
  projects: ProjectResponse[]; // 프로젝트 정보
}

export interface ActivityResponse {
  title: string;
  organization: string;
  period: string;
  description: string;
}

export interface ProjectResponse {
  name: string;
  period: string;
  techStack: string[];
  description: string;
}

export interface PortfolioResponse {
  title: string;
  url: string;
}

export interface EducationResponse {
  school: string;
  major: string;
  period: string;
  status: string;
}
