import { NcsOccupationDto } from '../../apis/ncs/response/NcsOccupationDto';
import { SaraminJobDto } from '../../apis/saramin/response/SaraminJobDto';
import { ProfileSkillDTO } from './ProfileSkillDTO';
import { ResumeResponse } from '../../resume/response/ResumeResponse';
import { CertificateDTO } from '../../common/CertificateDTO';

export interface ProfileResponse {
  currentJob: string;
  educationLevel: string;
  profileImageUrl: string;
  major: string;
  recommendedJobInfoCategoryCode: string;
  recommendedJobInfoAbilityCode: string;
  recommendedEncyclopediaThemeCode: string;
  desiredJob: SaraminJobDto[];
  skills: ProfileSkillDTO[];
  certificates: CertificateDTO[];
  resume: ResumeResponse;
  desiredCapabilities: NcsOccupationDto[];
  userCapabilities: NcsOccupationDto[];
}
