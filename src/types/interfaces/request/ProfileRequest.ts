import { EducationLevelType } from '../../enums/EducationLevelType';
import { CertCardData as CertificateRequest } from '../ResumeData';
import { ResumeRequest } from './ResumeRequest';

interface SkillRequest {
  name: string;
  proficiency: 'BEGINNER' | 'MIDDLE' | 'ADVANCED';
}

export interface ProfileRequest {
  desiredJobCodes: number[];
  educationLevel: EducationLevelType;
  skills: SkillRequest[];
  certificates: CertificateRequest[];
  currentJob: string;
  resume: ResumeRequest;
}
