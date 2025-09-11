import { EducationLevelType } from '../../enums/EducationLevelType';
import { NcsOccupation } from '../NcsOccupation';
import { CertCardData } from '../ResumeData';
import { ResumeResponse } from './ResumeResponse';

export interface ProfileResponse {
  educationLevel: EducationLevelType;
  major: string; // 전공
  desiredJob: DesiredJob[]; // 희망직무
  certificates: CertCardData[]; // 자격증 정보
  skills: Skills[]; // 기술 스택
  desiredCapabilities: NcsOccupation[]; // 희망직무 NCS
  userCapabilities: NcsOccupation[]; // 사용자의 NCS
  resume: ResumeResponse; // 이력서 정보
  currentJob: string;
}

interface DesiredJob {
  code: number;
  name: string;
  groupName: string;
}

export interface Certificate {
  jmcd: string; // 자격증 코드
  qualgbnm: string; // 자격증 이름
  seriesnm: string; // 자격증 시리즈 이름
  qualgbcd: string; // 자격증 종류 코드
  jmfldnm: string; // 자격증 필드 이름
}

interface Skills {
  id: number;
  name: string;
}
