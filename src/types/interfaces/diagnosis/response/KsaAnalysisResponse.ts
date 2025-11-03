import { Evidence } from '../common/Evidence';

export interface KsaAnalysisResponse {
  ncsCode: string; // NCS 코드
  knowledgeItems: KsaItem[]; // 지식 항목 리스트
  skillItems: KsaItem[]; // 기술 항목 리스트
  attitudeItems: KsaItem[]; // 태도 항목 리스트
  overallAssessment: string; // 종합 평가
  evidenceList: Evidence[]; // 근거 리스트
}

export interface KsaItem {
  itemName: string; // 지식/기술/태도 항목명
  itemDescription: string; // 항목 설명
  userScore: number; // 사용자 점수
  targetScore: number; // 목표 점수
  scoreGap: number; // 점수 격차
  levelAssessment: string; // 수준 평가
  gapDescription: string; // 격차 설명
  recommendation: string; // 추천 사항
}
