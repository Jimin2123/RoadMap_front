import { PeriodRequest } from '../common/PeriodRequest';

export interface EducationRequest {
  school: string; // 학교명
  major: string; // 전공
  gpa: number; // 학점
  period: PeriodRequest; // 재학 기간
  status: string; // 졸업 상태
}
