import { NcsOccupation } from '../NcsOccupation';

export interface ProfileResponse {
  educationLevel: string;
  major: string;
  desiredJob: DesiredJob[];
  certificates: Certificate[];
  skills: Skills[];
  desiredCapabilities: NcsOccupation[];
  userCapabilities: NcsOccupation[];
}

interface DesiredJob {
  code: number;
  name: string;
  groupName: string;
}

interface Certificate {
  jmcd: string;
  qualgbnm: string;
  seriesnm: string;
  qualgbcd: string;
  jmfldnm: string;
}

interface Skills {
  id: number;
  name: string;
}
