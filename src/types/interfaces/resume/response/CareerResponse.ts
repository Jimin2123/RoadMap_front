import { PeriodResponse } from './PeriodResponse';

export interface CareerResponse {
  companyName: string; // 회사명
  period: PeriodResponse;
  department: string; // 부서명
  description: string; // 담당 업무
}
