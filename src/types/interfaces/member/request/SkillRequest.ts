import { SkillProficiency } from '../../../enums/SkillProficiency';

export interface SkillRequest {
  name: string;
  proficiency: SkillProficiency;
}
