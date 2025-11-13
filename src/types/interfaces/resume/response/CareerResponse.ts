import { PeriodResponse } from './PeriodResponse';

export interface CareerResponse {
  companyName: string; // 회사명
  period: PeriodResponse;
  department: string; // 근무부서/직책
  description: string; // 업무 내용
}
