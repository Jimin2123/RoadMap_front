import { PeriodResponse } from './PeriodResponse';

export interface ActivityResponse {
  title: string; // 활동명
  organization: string; // 기관명
  period: PeriodResponse;
  description: string; // 활동 내용
}
