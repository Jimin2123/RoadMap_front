import { PeriodRequest } from '../common/PeriodRequest';

export interface CareerRequest {
  title: string; // 직무명
  company: string; // 회사명
  period: PeriodRequest; // 근무 기간
  description: string; // 직무 내용
}
