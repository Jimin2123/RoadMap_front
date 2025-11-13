export interface DesiredCompanyResponse {
  id: number;
  desiredCompany1: string;
  desiredCompany2: string;
  desiredRegion: string;
  salaryType: 'monthly' | 'hourly';
  desiredSalary: number;
}
