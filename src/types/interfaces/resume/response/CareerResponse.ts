import { PeriodResponse } from './PeriodResponse';

export interface CareerResponse {
  title: string; // 직무명
  company: string; // 회사명
  period: PeriodResponse;
  description: string; // 직무 내용
}
