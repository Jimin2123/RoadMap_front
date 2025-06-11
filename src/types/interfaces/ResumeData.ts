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
  content: string;
}

export interface PortfolioCardData {
  title: string;
  url: string;
}

export interface ProjectCardData {
  name: string;
  period: string;
  techStack: string[];
  description: string;
}

export interface BasicCardData {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  currentJob: string;
}
