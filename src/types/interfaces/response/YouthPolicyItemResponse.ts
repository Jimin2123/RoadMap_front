export interface PolicyItemResponseForInfo {
  plcyNm: string; // 정책명
  aplyUrlAddr: string; // 신청 URL 주소
}

export interface YouthPolicyItemResponse {
  lclsfNm: string; // 정책 대분류명
  mclsfNm: string; // 정책 중분류명
  plcyNm: string; // 정책명
  plcyExplnCn: string; // 정책 설명
  aplyYmd: string; // 신청 기간
  plcyKywdNm: string; // 정책 키워드명
  aplyUrlAddr: string; // 신청 URL 주소
}
