import { PeriodRequest } from '../common/PeriodRequest';

export interface ActivityRequest {
  title: string; // 활동명
  organization: string; // 기관명
  period: PeriodRequest; // 활동 기간
  description: string; // 활동 내용
}
