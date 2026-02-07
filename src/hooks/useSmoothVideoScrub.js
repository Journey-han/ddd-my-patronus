import { useEffect, useRef, useCallback } from 'react';

/**
 * useSmoothVideoScrub 훅
 *
 * 비디오 스크러빙을 부드럽게 처리하는 커스텀 훅.
 * requestAnimationFrame과 선형 보간(lerp)을 사용하여 프레임 전환을 부드럽게 한다.
 *
 * 동작 흐름:
 * 1. 타겟 시간이 설정되면 현재 시간에서 타겟 시간으로 부드럽게 보간
 * 2. requestAnimationFrame으로 매 프레임마다 업데이트
 * 3. lerp factor로 보간 속도 조절
 *
 * @param {React.RefObject} videoRef - 비디오 요소 ref
 * @param {number} lerpFactor - 보간 계수 (0-1, 높을수록 빠름) [기본값: 0.15]
 * @returns {function} setTargetProgress - 타겟 진행률 설정 함수 (0-1)
 *
 * Example usage:
 * const setTargetProgress = useSmoothVideoScrub(videoRef, 0.12);
 * setTargetProgress(scrollProgress);
 */
function useSmoothVideoScrub(videoRef, lerpFactor = 0.15) {
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const rafIdRef = useRef(null);
  const isRunningRef = useRef(false);

  // 선형 보간 함수
  const lerp = useCallback((start, end, factor) => {
    return start + (end - start) * factor;
  }, []);

  // 애니메이션 프레임 업데이트
  const updateFrame = useCallback(() => {
    if (!videoRef.current || !videoRef.current.duration) {
      rafIdRef.current = requestAnimationFrame(updateFrame);
      return;
    }

    const diff = Math.abs(targetTimeRef.current - currentTimeRef.current);

    // 차이가 충분히 작으면 타겟으로 직접 설정
    if (diff < 0.01) {
      currentTimeRef.current = targetTimeRef.current;
    } else {
      // lerp로 부드럽게 보간
      currentTimeRef.current = lerp(
        currentTimeRef.current,
        targetTimeRef.current,
        lerpFactor
      );
    }

    // 비디오 시간 업데이트 (변화가 있을 때만)
    if (Math.abs(videoRef.current.currentTime - currentTimeRef.current) > 0.001) {
      videoRef.current.currentTime = currentTimeRef.current;
    }

    if (isRunningRef.current) {
      rafIdRef.current = requestAnimationFrame(updateFrame);
    }
  }, [videoRef, lerp, lerpFactor]);

  // 타겟 진행률 설정 함수
  const setTargetProgress = useCallback((progress) => {
    if (!videoRef.current || !videoRef.current.duration) return;

    const targetTime = progress * videoRef.current.duration;
    targetTimeRef.current = targetTime;

    // 처음 호출 시 현재 시간 초기화
    if (currentTimeRef.current === 0 && targetTime > 0) {
      currentTimeRef.current = targetTime;
    }
  }, [videoRef]);

  // 애니메이션 루프 시작/정지
  useEffect(() => {
    isRunningRef.current = true;
    rafIdRef.current = requestAnimationFrame(updateFrame);

    return () => {
      isRunningRef.current = false;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [updateFrame]);

  return setTargetProgress;
}

export default useSmoothVideoScrub;
