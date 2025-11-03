import { EvidenceSourceType } from '../../../enums/EvidenceSourceType';
import { KsaAnalysisResponse } from '../response/KsaAnalysisResponse';

export interface NcsRecommendationCandidate {
  ncsCode: string; // NCS 코드
  ncsName: string; // NCS 명칭
  confidenceScore: number; // 신뢰도 점수
  reason: string; // 추천 사유
  evidenceList: EvidenceSourceType[]; // 근거 출처 리스트
  sourceDetail: string; // 출처 상세 설명
  content: string; // 내용
  reasoning: string; // 추론 과정
  ksaAnalysis: KsaAnalysisResponse; // KSA 분석 결과
}
