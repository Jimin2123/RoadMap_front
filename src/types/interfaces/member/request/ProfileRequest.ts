import { EducationLevelType } from '../../../enums/EducationLevelType';
import { SkillRequest } from './SkillRequest';

export interface ProfileRequest {
  desiredJobCodes: number[];
  currentJob: string;
  educationLevel: EducationLevelType;
  profileImageUrl: string;
  skills: SkillRequest[];
}
