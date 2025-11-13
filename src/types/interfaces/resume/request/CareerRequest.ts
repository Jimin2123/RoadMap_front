import { PeriodRequest } from '../common/PeriodRequest';

export interface CareerRequest {
  companyName: string; // 회사명
  period: PeriodRequest; // 근무 기간
  department: string; // 근무부서/직책
  description: string; // 업무 내용
}
