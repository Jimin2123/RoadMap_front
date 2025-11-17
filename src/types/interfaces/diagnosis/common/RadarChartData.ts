import { CompetencyProfile } from './CompetencyProfile';
import { NcsCompetencyProfile } from './NcsCompetencyProfile';

export interface RadarChartData {
  userProfile: CompetencyProfile;
  targetNcsProfiles: NcsCompetencyProfile[];
  competencyAxes: string[];
}
