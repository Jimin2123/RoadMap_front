export interface ActivityCardData {
  title: string;
  organization: string;
  period: string;
  description: string;
}

export interface CertCardData {
  name: string;
  agency: string;
  year: string;
}

export interface EduCardData {
  school: string;
  major: string;
  period: string;
  status: string;
}

export interface IntroCardData {
  growthProcess: string;
  strengths: string;
  schoolLife: string;
  motivation: string;
}

export interface PortfolioCardData {
  title: string;
  url: string;
}
export interface ProjectCardData {
  name: string;
  period: string;
  description: string;
  role: string;
  techStack: string[];
  achievements: string[];
  url: string;
}

export interface BasicCardData {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  currentJob: string;
}

export interface CareerCardData {
  companyName: string;
  department: string;
  period: {
    startDate: string;
    endDate: string;
  };
  description: string;
}

export interface DesiredJobCardData {
  desiredCompany1: string;
  desiredCompany2: string;
  desiredRegion: string;
  salaryType: '연봉' | '월급';
  desiredSalary: number;
  careerPlan: string;
}

