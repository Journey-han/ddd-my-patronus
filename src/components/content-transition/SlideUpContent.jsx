import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';

/**
 * SlideUpContent 컴포넌트
 *
 * 스크롤에 따라 아래에서 위로 슬라이드하며 나타나는 콘텐츠 컨테이너.
 * 각 슬라이드는 순차적으로 등장하고, 이전 슬라이드는 화면에 남아 누적된다.
 *
 * 동작 흐름:
 * 1. 스크롤 진행에 따라 각 슬라이드가 아래에서 위로 올라오며 페이드인
 * 2. 슬라이드가 완전히 등장하면 그 자리에 유지
 * 3. 다음 슬라이드가 아래에서 올라옴
 * 4. 최종적으로 모든 슬라이드가 한 페이지에 누적되어 보임
 *
 * Props:
 * @param {React.ReactNode} children - 슬라이드할 콘텐츠 [Required]
 * @param {number} index - 슬라이드 인덱스 (0부터 시작) [Required]
 * @param {number} totalSlides - 전체 슬라이드 개수 [Required]
 * @param {number} progress - 스크롤 진행도 (0-1) [Required]
 * @param {object} sx - MUI sx 스타일 [Optional]
 *
 * Example usage:
 * <SlideUpContent index={0} totalSlides={4} progress={scrollProgress}>
 *   <ResultCard />
 * </SlideUpContent>
 */
function SlideUpContent({
  children,
  index,
  totalSlides,
  progress,
  sx = {},
}) {
  // 각 슬라이드가 등장을 시작하는 진행도
  const slideRange = 1 / totalSlides;
  const slideStart = index * slideRange;

  // 슬라이드 등장 진행도 (0-1)
  // 0: 아직 등장 전, 1: 완전히 등장 완료
  const enterProgress = Math.max(0, Math.min(1,
    (progress - slideStart) / (slideRange * 0.5) // 슬라이드 범위의 절반 동안 등장
  ));

  // 슬라이드 상태 계산
  const isFuture = progress < slideStart;
  const isEntering = progress >= slideStart && enterProgress < 1;
  const isVisible = enterProgress > 0;

  // 스타일 계산 - 등장 후에는 사라지지 않음
  let opacity = 0;
  let translateY = 80; // 아래에서 시작

  if (isFuture) {
    // 아직 등장 전
    opacity = 0;
    translateY = 80;
  } else {
    // 등장 중이거나 등장 완료
    opacity = Math.min(1, enterProgress);
    translateY = 80 * (1 - enterProgress);
  }

  return (
    <Box
      sx={{
        opacity,
        transform: `translateY(${translateY}px)`,
        transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
        willChange: 'transform, opacity',
        pointerEvents: isVisible ? 'auto' : 'none',
        mb: { xs: 4, sm: 5, md: 6 }, // 반응형 슬라이드 간 간격
        width: '100%',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

/**
 * SlideUpContainer 컴포넌트
 *
 * 스크롤 기반 슬라이드업 콘텐츠의 컨테이너.
 * 내부적으로 스크롤 진행도를 계산하여 자식에게 전달한다.
 *
 * Props:
 * @param {React.ReactNode} children - 슬라이드 콘텐츠들 [Required]
 * @param {number} scrollHeight - 스크롤 높이 (vh) [Optional, 기본값: 400]
 * @param {object} sx - MUI sx 스타일 [Optional]
 */
function SlideUpContainer({
  children,
  scrollHeight = 400,
  sx = {},
}) {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrollable = containerRef.current.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const newProgress = Math.min(1, scrolled / scrollable);

      setProgress(newProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        height: `${scrollHeight}vh`,
        ...sx,
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {typeof children === 'function' ? children(progress) : children}
      </Box>
    </Box>
  );
}

export { SlideUpContent, SlideUpContainer };
export default SlideUpContent;
