import { EvidenceSourceType } from '../../../enums/EvidenceSourceType';

export interface Evidence {
  sourceType: EvidenceSourceType;
  sourceDetail: string;
  content: string;
  reasoning: string;
}
