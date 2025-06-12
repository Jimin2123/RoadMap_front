/**
 * location 문자열에서 처리한 결과를 반환.
 * - '전체'가 있으면 그 항목들만 사용 (여기서 '>' 앞의 부분만 남김).
 * - '전체' 없으면 '>' 앞의 문자열만.
 * - 종류가 2개 이상이면 ' 외' 붙임.
 */
export const filterWholeAreas = (rawLocation: string): string => {
  // &gt; 디코딩
  const decoded = rawLocation.replace(/&gt;/g, '>');

  // 쉼표로 분리
  const parts = decoded.split(',').map((s) => s.trim());

  let extractedParts: string[];

  // 1) '전체'가 있는 항목들만 추출
  const wholeParts = parts.filter((loc) => loc.includes('전체'));

  if (wholeParts.length > 0) {
    // '>' 앞부분만 남기기 (혹시 '>'가 있으면 앞부분만, 없으면 그대로)
    extractedParts = wholeParts.map((loc) => {
      const index = loc.indexOf('>');
      return index !== -1 ? loc.slice(0, index).trim() : loc.trim();
    });
  } else {
    // '전체'가 없으면 '>' 앞부분만 남기기
    extractedParts = parts.map((loc) => {
      const index = loc.indexOf('>');
      return index !== -1 ? loc.slice(0, index).trim() : loc.trim();
    });
  }

  // 중복 제거
  const uniqueParts = new Set(extractedParts);

  // 결과: 첫 번째 항목 + (종류 2개 이상이면 ' 외' 붙이기)
  const firstPart = extractedParts[0];
  return uniqueParts.size > 1 ? `${firstPart} 외` : firstPart;
};
