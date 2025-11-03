export interface DesiredCompanyRequest {
  desiredCompany1: string; // 희망 회사 1
  desiredCompany2: string; // 희망 회사 2
  desiredRegion: string; // 희망 지역
  salaryType: 'monthly' | 'hourly'; // 희망 급여 형태
  desiredSalary: number; // 희망 연봉
}
