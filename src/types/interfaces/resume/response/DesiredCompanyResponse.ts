import { SalaryType } from '../../../enums/SalaryType';

export interface DesiredCompanyResponse {
  id: number;
  desiredCompany1: string;
  desiredCompany2: string;
  desiredRegion: string;
  salaryType: SalaryType;
  desiredSalary: number;
  careerPlan: string;
}
