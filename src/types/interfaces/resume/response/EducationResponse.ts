import { PeriodResponse } from './PeriodResponse';

export interface EducationResponse {
  school: string;
  major: string;
  gpa: number;
  period: PeriodResponse;
  status: string;
}
