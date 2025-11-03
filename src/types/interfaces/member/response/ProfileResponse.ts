import { NcsOccupationDto } from '../../apis/ncs/response/NcsOccupationDto';
import { SaraminJobDto } from '../../apis/saramin/response/SaraminJobDto';
import { ProfileSkillDTO } from './ProfileSkillDTO';

export interface ProfileResponse {
  educationLevel: string;
  profileImageUrl: string;
  recommendedJobInfoCategoryCode: string;
  recommendedJobInfoAbilityCode: string;
  recommendedEncyclopediaThemeCode: string;
  desiredJob: SaraminJobDto[];
  skills: ProfileSkillDTO[];
  desiredCapabilities: NcsOccupationDto[];
  userCapabilities: NcsOccupationDto[];
}
