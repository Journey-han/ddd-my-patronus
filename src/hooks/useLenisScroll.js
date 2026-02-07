import { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';

/**
 * useLenisScroll 훅
 *
 * Lenis 라이브러리를 사용하여 부드러운 스크롤을 제공하는 커스텀 훅.
 * 섹션 기반 스크롤 진행률을 계산하여 비디오 스크러빙에 활용.
 *
 * 동작 흐름:
 * 1. Lenis 인스턴스 생성 및 RAF 루프 시작
 * 2. 스크롤 이벤트마다 섹션 기준 진행률 계산
 * 3. 콜백으로 진행률 전달
 *
 * @param {React.RefObject} sectionRef - 스크롤 진행률을 계산할 섹션 ref
 * @param {function} onProgress - 진행률 변경 시 호출될 콜백 (0-1)
 * @param {object} options - Lenis 옵션 [Optional]
 * @returns {object} { lenis } - Lenis 인스턴스
 *
 * Example usage:
 * const { lenis } = useLenisScroll(sectionRef, (progress) => {
 *   setScrollProgress(progress);
 *   setTargetProgress(progress);
 * });
 */
function useLenisScroll(sectionRef, onProgress, options = {}) {
  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);

  // 진행률 계산 함수
  const calculateProgress = useCallback(() => {
    if (!sectionRef.current) return 0;

    const section = sectionRef.current;
    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight - window.innerHeight;
    const scrolled = Math.max(0, -rect.top);
    const progress = Math.min(1, scrolled / sectionHeight);

    return progress;
  }, [sectionRef]);

  useEffect(() => {
    // Lenis 인스턴스 생성
    const lenis = new Lenis({
      duration: 1.2,           // 스크롤 지속 시간 (부드러움 정도)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      ...options,
    });

    lenisRef.current = lenis;

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
      const progress = calculateProgress();
      if (onProgress) {
        onProgress(progress);
      }
    };

    // Lenis 스크롤 이벤트 리스너
    lenis.on('scroll', handleScroll);

    // RAF 루프
    const raf = (time) => {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };

    rafIdRef.current = requestAnimationFrame(raf);

    // 초기 진행률 계산
    handleScroll();

    return () => {
      lenis.off('scroll', handleScroll);
      lenis.destroy();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [calculateProgress, onProgress, options]);

  return { lenis: lenisRef.current };
}

export default useLenisScroll;
