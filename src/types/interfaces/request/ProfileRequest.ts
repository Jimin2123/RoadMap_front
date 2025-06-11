import { EducationLevelType } from '../../enums/EducationLevelType';
import { CertCardData } from '../ResumeData';
import { ResumeRequest } from './ResumeRequest';

export interface ProfileRequest {
  desiredJobCodes: number[];
  educationLevel: EducationLevelType;
  skills: string[];
  certificates: CertCardData[];
  currentJob: string;
  resume: ResumeRequest;
}
