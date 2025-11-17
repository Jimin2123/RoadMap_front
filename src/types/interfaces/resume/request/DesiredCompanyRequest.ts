import { SalaryType } from '../../../enums/SalaryType';

export interface DesiredCompanyRequest {
  desiredCompany1: string; // 희망 회사 1
  desiredCompany2: string; // 희망 회사 2
  desiredRegion: string; // 희망 지역
  salaryType: SalaryType; // 희망 연봉 유형
  desiredSalary: number; // 희망 연봉
}
