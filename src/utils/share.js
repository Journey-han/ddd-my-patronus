/**
 * 콘텐츠 공유 유틸리티
 *
 * Web Share API를 지원하는 경우 네이티브 공유 다이얼로그를 열고,
 * 미지원 시 클립보드에 URL을 복사한다.
 *
 * @param {object} options - 공유 옵션
 * @param {string} options.title - 공유 제목
 * @param {string} options.text - 공유 텍스트
 * @param {string} [options.url] - 공유 URL (기본값: 현재 페이지 URL)
 * @param {function} [options.onFallback] - 클립보드 복사 시 콜백 (기본값: alert)
 * @returns {Promise<boolean>} 공유 성공 여부
 *
 * Example usage:
 * await shareContent({
 *   title: '나의 페트로누스',
 *   text: '나의 페트로누스는 🦌 수사슴입니다!',
 * });
 */
export async function shareContent({
  title,
  text,
  url = window.location.href,
  onFallback = () => alert('링크가 복사되었습니다!'),
}) {
  // Web Share API 지원 여부 확인
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return true;
    } catch (error) {
      // 사용자가 공유 취소 시 무시
      if (error.name === 'AbortError') {
        return false;
      }
      // 다른 에러는 폴백으로 처리
    }
  }

  // Web Share API 미지원 또는 에러 시 클립보드 복사
  try {
    await navigator.clipboard.writeText(url);
    onFallback();
    return true;
  } catch {
    return false;
  }
}

/**
 * 페트로누스 결과 공유
 *
 * @param {object} patronus - 페트로누스 데이터
 * @param {string} patronus.emoji - 이모지
 * @param {string} patronus.name - 이름
 * @returns {Promise<boolean>} 공유 성공 여부
 *
 * Example usage:
 * await sharePatronusResult({ emoji: '🦌', name: '수사슴' });
 */
export async function sharePatronusResult(patronus) {
  if (!patronus) return false;

  return shareContent({
    title: '나의 페트로누스',
    text: `나의 페트로누스는 ${patronus.emoji} ${patronus.name}입니다! 당신의 페트로누스도 찾아보세요.`,
  });
}
