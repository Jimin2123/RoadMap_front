import {
  ActivityCardData,
  CareerCardData,
  DesiredJobCardData,
  EduCardData,
  IntroCardData,
  PortfolioCardData,
  ProjectCardData,
} from '../ResumeData';

export interface SkillRequest {
  name: string;
  proficiency: 'BEGINNER' | 'MIDDLE' | 'ADVANCED';
}

export interface ResumeRequest {
  activities: ActivityCardData[];
  education: EduCardData;
  introduction: IntroCardData;
  portfolios: PortfolioCardData[];
  projects: ProjectCardData[];
  careers: CareerCardData[];
  desiredCompany: DesiredJobCardData;
}
