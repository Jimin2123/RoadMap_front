import { ActivityCardData, EduCardData, IntroCardData, PortfolioCardData, ProjectCardData } from '../ResumeData';

export interface ResumeRequest {
  activities: ActivityCardData[];
  education: EduCardData;
  introduction: IntroCardData;
  portfolios: PortfolioCardData[];
  projects: ProjectCardData[];
}
