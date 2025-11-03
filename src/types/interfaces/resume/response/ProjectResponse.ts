import { PeriodResponse } from './PeriodResponse';

export interface ProjectResponse {
  name: string; // 프로젝트명
  period: PeriodResponse; // 프로젝트 기간
  role: string; // 역할
  url: string; // 프로젝트 링크
  description: string; // 프로젝트 설명
  achievements: string[]; // 주요 성과
  techStack: string[]; // 사용 기술 스택
}
