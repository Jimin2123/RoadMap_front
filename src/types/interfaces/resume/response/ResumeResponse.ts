import { IntroductionResponse } from './IntroductionResponse';
import { EducationResponse } from './EducationResponse';
import { DesiredCompanyResponse } from './DesiredCompanyResponse';
import { ActivityResponse } from './ActivityResponse';
import { CertificateDTO } from '../../common/CertificateDTO';
import { CareerResponse } from './CareerResponse';
import { ProjectResponse } from './ProjectResponse';

export { ActivityResponse, ProjectResponse };

export interface ResumeResponse {
  introduction: IntroductionResponse;
  education: EducationResponse;
  desiredCompany: DesiredCompanyResponse;
  activities: ActivityResponse[];
  projects: ProjectResponse[];
  careers: CareerResponse[];
  certificates: CertificateDTO[];
}
