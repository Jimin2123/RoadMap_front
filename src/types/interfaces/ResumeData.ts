// Card component data types - matches the new interface structure

export interface BasicCardData {
  name: string;
  email: string;
  phoneNumber: string;
  currentJob: string;
  address: string;
}

export interface IntroCardData {
  growthProcess: string;
  strengths: string;
  schoolLife: string;
  motivation: string;
}

export interface CertCardData {
  name: string;
  agency: string;
  year: string;
}

export interface PeriodData {
  startDate: string;
  endDate: string;
}

export interface EduCardData {
  school: string;
  major: string;
  gpa: number;
  period: PeriodData;
  status: string;
}

export interface ActivityCardData {
  title: string;
  organization: string;
  period: PeriodData;
  description: string;
}

export interface ProjectCardData {
  name: string;
  description: string;
  period: PeriodData;
  role: string;
  url: string;
  achievements: string[];
  techStack: string[];
}

export interface CareerCardData {
  companyName: string;
  period: PeriodData;
  department: string;
  description: string;
}

export interface DesiredJobCardData {
  desiredCompany1: string;
  desiredCompany2: string;
  desiredRegion: string;
  salaryType: 'monthly' | 'hourly';
  desiredSalary: number;
}

export interface PortfolioCardData {
  title: string;
  url: string;
  description: string;
}
