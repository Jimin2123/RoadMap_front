import { DiagnosisStatus } from '../../../enums/DiagnosisStatus';
import { DiagnosisStep } from '../../../enums/DiagnosisStep';

export interface DiagnosisProgressResponse {
  diagnosisId: number;
  status: DiagnosisStatus;
  currentStep: DiagnosisStep;
  progressPercentage: number;
  currentMessage: string;
}
