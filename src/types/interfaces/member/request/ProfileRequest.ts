import { EducationLevelType } from '../../../enums/EducationLevelType';
import { SkillRequest } from './SkillRequest';
import { ResumeRequest } from '../../resume/request/ResumeRequest';

export interface ProfileRequest {
  desiredJobCodes: number[];
  currentJob: string;
  educationLevel: EducationLevelType;
  profileImageUrl?: string;
  skills: SkillRequest[];
  resume: ResumeRequest;
}
