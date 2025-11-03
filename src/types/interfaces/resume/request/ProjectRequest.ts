import { PeriodRequest } from '../common/PeriodRequest';

export interface ProjectRequest {
  name: string; // 프로젝트명
  description: string; // 프로젝트 설명
  period: PeriodRequest; // 프로젝트 기간
  role: string; // 역할
  url: string; // 프로젝트 링크
  achievements: string[]; // 주요 성과
  techStack: string[]; // 사용 기술 스택
}
