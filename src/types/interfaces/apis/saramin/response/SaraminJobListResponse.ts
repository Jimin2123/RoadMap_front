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
  detail: Detail;
}

export interface Detail {
  href: string;
  name: string;
  logoUrl: string;
}

export interface Position {
  title: string;
  industry: Industry;
  location: Location;
  jobType: JobType;
  jobMidCode: JobMidCode;
  jobCode: JobCode;
  experienceLevel: ExperienceLevel;
  requiredEducationLevel: RequiredEducationLevel;
}

export interface Industry {
  code: string;
  name: string;
}

export interface Location {
  code: string;
  name: string;
}

export interface JobType {
  code: string;
  name: string;
}

export interface JobMidCode {
  code: string;
  name: string;
}

export interface JobCode {
  code: string;
  name: string;
}

export interface ExperienceLevel {
  code: number;
  min: number;
  max: number;
  name: string;
}

export interface RequiredEducationLevel {
  code: string;
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
