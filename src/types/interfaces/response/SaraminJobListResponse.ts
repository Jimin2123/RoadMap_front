export interface SaraminJobListResponse {
  jobs: Jobs;
}

export interface Jobs {
  count: number;
  start: number;
  total: string;
  job: Job[];
}

export interface Job {
  id: string;
  url: string;
  active: number;
  postingTimestamp: string;
  company: Company;
  position: Position;
  keyword: string;
  salary: Salary;
  modificationTimestamp: string;
  openingTimestamp: string;
  expirationTimestamp: string;
  closeType: CloseType;
}

export interface Company {
  detail: CompanyDetail;
}

export interface CompanyDetail {
  href: string;
  name: string;
  logoUrl: string;
}

export interface Position {
  title: string;
  industry: CodeName;
  location: CodeName;
  jobType: CodeName;
  jobMidCode: CodeName;
  jobCode: CodeName;
  experienceLevel: ExperienceLevel;
  requiredEducationLevel: CodeName;
}

export interface CodeName {
  code: string;
  name: string;
}

export interface ExperienceLevel {
  code: number;
  min: number;
  max: number;
  name: string;
}

export interface Salary {
  code: string;
  name: string;
}

export interface CloseType {
  code: string;
  name: string;
}
