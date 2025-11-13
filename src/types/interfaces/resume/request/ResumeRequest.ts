import { IntroductionRequest } from './IntroductionRequest';
import { ActivityRequest } from './ActivityRequest';
import { ProjectRequest } from './ProjectRequest';
import { CareerRequest } from './CareerRequest';
import { EducationRequest } from './EducationRequest';
import { DesiredCompanyRequest } from './DesiredCompanyRequest';
import { CertificateDTO } from '../../common/CertificateDTO';

export interface ResumeRequest {
  introduction: IntroductionRequest;
  activities: ActivityRequest[];
  projects: ProjectRequest[];
  careers: CareerRequest[];
  education: EducationRequest;
  desiredCompany: DesiredCompanyRequest;
  certificates: CertificateDTO[];
}
