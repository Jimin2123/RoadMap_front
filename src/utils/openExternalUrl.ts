/**
 * 외부 URL을 새 창으로 여는 함수.
 * URL이 공백이거나 유효하지 않으면 알림을 띄웁니다.
 * @param url 열고자 하는 외부 URL
 * @param message 기본 메시지를 커스터마이징할 수 있음
 */
const normalizeUrl = (url: string): string => {
  if (!/^https?:\/\//i.test(url)) {
    return 'https://' + url;
  }
  return url;
};

export const openExternalUrl = (url: string | null | undefined, message?: string) => {
  if (!url || url.trim() === '') {
    alert(message ?? '이 항목은 현재 이동 가능한 링크가 없습니다.');
    return;
  }

  window.open(normalizeUrl(url), '_blank');
};
