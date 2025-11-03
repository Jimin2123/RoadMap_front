import { YouthPolicyItemResponse } from './YouthPolicyItemResponse';

export interface YouthPolicyListResponse {
  resultCode: string; // 결과 코드
  resultMessage: string; // 결과 메시지
  result: ResultResponse; // 결과 데이터
}

export interface ResultResponse {
  pagging: PaggingResponse; // 페이징 정보
  items: YouthPolicyItemResponse[]; // 청년 정책 아이템 목록
}

interface PaggingResponse {
  pageNum: number; // 현재 페이지 번호
  pageSize: number; // 페이지 크기
  totCount: number; // 전체 아이템 수
}
