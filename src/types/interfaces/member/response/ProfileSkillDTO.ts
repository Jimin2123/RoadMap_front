import { SkillProficiency } from '../../../enums/SkillProficiency';

export interface ProfileSkillDTO {
  id: number;
  name: string;
  proficiency: SkillProficiency;
}
