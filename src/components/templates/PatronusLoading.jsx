import { useRef, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import ParticleBackground from '../motion/ParticleBackground';
import Vignette from '../dynamic-color/Vignette';
import ScrollIndicator from '../../common/ui/ScrollIndicator';
import ScrollRandomRevealText from '../kinetic-typography/ScrollRandomRevealText';
import useSmoothVideoScrub from '../../hooks/useSmoothVideoScrub';
import useLenisScroll from '../../hooks/useLenisScroll';

/**
 * PatronusLoading 컴포넌트
 *
 * 페트로누스 심리테스트의 로딩 섹션.
 * 스크롤 비디오 스크러빙과 내러티브 텍스트 애니메이션을 포함한다.
 *
 * 동작 흐름:
 * 1. 스크롤하면 배경 영상이 재생된다
 * 2. 스크롤 진행에 따라 내러티브 텍스트가 순차적으로 전환된다:
 *    - STEP 01 (0-25%): "당신의 선택이 하나의 형체로 모이고 있습니다."
 *    - STEP 02 (25-50%): "패트로누스가 당신의 내면을 읽고 있습니다."
 *    - STEP 03 (50-75%): "모든 사람에게는 단 하나의 패트로누스만이 응답합니다."
 *    - STEP 04 (75-90%): "이제, 당신의 수호자가 모습을 드러냅니다."
 * 3. 마지막에 은빛 플래시 효과로 결과 섹션과 연결된다
 *
 * Props:
 * @param {string} videoSrc - 배경 영상 소스 [Optional]
 * @param {function} onScrollEnd - 스크롤 종료 콜백 [Optional]
 * @param {object} sx - MUI sx 스타일 [Optional]
 *
 * Example usage:
 * <PatronusLoading videoSrc="/videos/loading.mp4" />
 */
function PatronusLoading({
  videoSrc,
  onScrollEnd,
  sx = {},
}) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // 부드러운 비디오 스크러빙을 위한 훅
  const setTargetProgress = useSmoothVideoScrub(videoRef, 0.12);

  // 스크롤 종료 체크용 ref
  const hasCalledScrollEnd = useRef(false);

  // Lenis 스크롤 진행률 콜백
  const handleScrollProgress = useCallback((progress) => {
    setScrollProgress(progress);

    // 비디오는 스크롤에 따라 자연스럽게 계속 스크러빙
    setTargetProgress(progress);

    // 스크롤 종료 콜백 (98%에서 호출하여 비디오가 끝까지 재생되도록)
    if (progress >= 0.98 && onScrollEnd && !hasCalledScrollEnd.current) {
      hasCalledScrollEnd.current = true;
      onScrollEnd();
    }
    // 다시 스크롤 올라가면 리셋
    if (progress < 0.95) {
      hasCalledScrollEnd.current = false;
    }
  }, [onScrollEnd, setTargetProgress]);

  // Lenis 부드러운 스크롤 적용
  useLenisScroll(sectionRef, handleScrollProgress);

  // 내러티브 텍스트 단계별 opacity 계산
  // 구조: 빠른 리빌 → 오래 유지(pause) → 페이드아웃
  // 비디오는 계속 자연스럽게 스크러빙됨

  // STEP 01 (0-25%): 0~3%에서 빠른 리빌, 3~22%에서 pause(유지), 22~25%에서 페이드아웃
  const step1Opacity = scrollProgress < 0.03
    ? Math.min(1, scrollProgress * (1 / 0.03))
    : scrollProgress < 0.22
      ? 1
      : scrollProgress < 0.25
        ? Math.max(0, 1 - (scrollProgress - 0.22) * (1 / 0.03))
        : 0;

  // STEP 02 (25-50%): 25~28%에서 빠른 리빌, 28~47%에서 pause(유지), 47~50%에서 페이드아웃
  const step2Opacity = scrollProgress < 0.25
    ? 0
    : scrollProgress < 0.28
      ? Math.min(1, (scrollProgress - 0.25) * (1 / 0.03))
      : scrollProgress < 0.47
        ? 1
        : scrollProgress < 0.50
          ? Math.max(0, 1 - (scrollProgress - 0.47) * (1 / 0.03))
          : 0;

  // STEP 03 (50-75%): 50~53%에서 빠른 리빌, 53~72%에서 pause(유지), 72~75%에서 페이드아웃
  const step3Opacity = scrollProgress < 0.50
    ? 0
    : scrollProgress < 0.53
      ? Math.min(1, (scrollProgress - 0.50) * (1 / 0.03))
      : scrollProgress < 0.72
        ? 1
        : scrollProgress < 0.75
          ? Math.max(0, 1 - (scrollProgress - 0.72) * (1 / 0.03))
          : 0;

  // STEP 04 (75-90%): 75~78%에서 빠른 리빌, 78~87%에서 pause(유지), 87~90%에서 페이드아웃
  const step4Opacity = scrollProgress < 0.75
    ? 0
    : scrollProgress < 0.78
      ? Math.min(1, (scrollProgress - 0.75) * (1 / 0.03))
      : scrollProgress < 0.87
        ? 1
        : scrollProgress < 0.90
          ? Math.max(0, 1 - (scrollProgress - 0.87) * (1 / 0.03))
          : 0;

  // 각 STEP의 텍스트 reveal을 위한 localProgress 계산
  // 빠르게 리빌되도록 짧은 구간(3%)에서 0→100% 진행
  const step1Progress = Math.min(1, Math.max(0, scrollProgress / 0.03));
  const step2Progress = Math.min(1, Math.max(0, (scrollProgress - 0.25) / 0.03));
  const step3Progress = Math.min(1, Math.max(0, (scrollProgress - 0.50) / 0.03));
  const step4Progress = Math.min(1, Math.max(0, (scrollProgress - 0.75) / 0.03));

  // Flash: 90~100%에서 페이드인
  const flashOpacity = scrollProgress >= 0.9 ? Math.min(1, (scrollProgress - 0.9) * 10) : 0;

  return (
    <Box
      ref={sectionRef}
      sx={{
        position: 'relative',
        height: '700vh', // 영상이 충분히 보이도록 스크롤 구간 확대
        ...sx,
      }}
    >
      {/* Fixed Container */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: '#0a0a12',
        }}
      >
        {/* Background Video or Gradient */}
        {videoSrc ? (
          <Box
            component="video"
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 1,
            }}
          >
            <source src={videoSrc} type="video/mp4" />
          </Box>
        ) : (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(
                ellipse at center,
                rgba(135, 206, 235, ${0.05 + scrollProgress * 0.3}) 0%,
                #0a0a12 60%
              )`,
              zIndex: 1,
              transition: 'background 0.1s ease',
            }}
          />
        )}

        {/* Vignette */}
        <Vignette intensity={0.6} />

        {/* Particles */}
        <ParticleBackground
          count={50}
          color="#87CEEB"
          isFloating
          brightness={1 + scrollProgress * 1.5}
        />

        {/* Text Content */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 4,
          }}
        >
          {/* STEP 01 (0-25%): 형체 모임 */}
          <Box
            sx={{
              position: 'absolute',
              opacity: step1Opacity,
              transition: 'opacity 0.5s ease',
              textAlign: 'center',
              px: { xs: 3, sm: 4 },
              maxWidth: { xs: '90%', sm: 500, md: 600 },
              width: '100%',
            }}
          >
            <Box
              sx={{
                fontFamily: '"Noto Sans KR", sans-serif',
                fontWeight: 300,
                fontSize: { xs: '1.1rem', md: '1.4rem' },
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: 2,
              }}
            >
              <ScrollRandomRevealText
                text="당신의 선택이"
                progress={step1Progress}
              />
              <br />
              <ScrollRandomRevealText
                text="하나의 형체로 모이고 있습니다."
                progress={step1Progress}
              />
            </Box>
          </Box>

          {/* STEP 02 (25-50%): 내면 읽기 */}
          <Box
            sx={{
              position: 'absolute',
              opacity: step2Opacity,
              transition: 'opacity 0.5s ease',
              textAlign: 'center',
              px: { xs: 3, sm: 4 },
              maxWidth: { xs: '90%', sm: 500, md: 600 },
              width: '100%',
            }}
          >
            <Box
              sx={{
                fontFamily: '"Noto Sans KR", sans-serif',
                fontWeight: 400,
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                color: 'rgba(255, 255, 255, 0.95)',
                lineHeight: 2,
                mb: 2,
              }}
            >
              <ScrollRandomRevealText
                text="패트로누스가"
                progress={step2Progress}
              />
              <br />
              <ScrollRandomRevealText
                text="당신의 내면을 읽고 있습니다."
                progress={step2Progress}
              />
            </Box>
            <Box
              sx={{
                fontFamily: '"Noto Sans KR", sans-serif',
                fontWeight: 300,
                fontSize: { xs: '0.9rem', md: '1rem' },
                color: 'rgba(255, 255, 255, 0.5)',
                fontStyle: 'italic',
              }}
            >
              <ScrollRandomRevealText
                text="감정, 성향, 그리고 선택의 흔적을 따라…"
                progress={step2Progress}
              />
            </Box>
          </Box>

          {/* STEP 03 (50-75%): 유일성 강조 */}
          <Box
            sx={{
              position: 'absolute',
              opacity: step3Opacity,
              transition: 'opacity 0.5s ease',
              textAlign: 'center',
              px: { xs: 3, sm: 4 },
              maxWidth: { xs: '90%', sm: 500, md: 600 },
              width: '100%',
            }}
          >
            <Box
              sx={{
                fontFamily: '"Noto Sans KR", sans-serif',
                fontWeight: 300,
                fontSize: { xs: '1.1rem', md: '1.4rem' },
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: 2,
              }}
            >
              <ScrollRandomRevealText
                text="모든 사람에게는"
                progress={step3Progress}
              />
              <br />
              <ScrollRandomRevealText
                text="단 하나의 패트로누스만이 응답합니다."
                progress={step3Progress}
              />
            </Box>
          </Box>

          {/* STEP 04 (75-90%): 결과 직전 */}
          <Box
            sx={{
              position: 'absolute',
              opacity: step4Opacity,
              transition: 'opacity 0.5s ease',
              textAlign: 'center',
              px: { xs: 3, sm: 4 },
              maxWidth: { xs: '90%', sm: 500, md: 600 },
              width: '100%',
            }}
          >
            <Box
              sx={{
                fontFamily: '"Cinzel", serif',
                fontWeight: 600,
                fontSize: { xs: '1.3rem', md: '1.8rem' },
                color: '#87CEEB',
                lineHeight: 2,
                textShadow: '0 0 30px rgba(135, 206, 235, 0.5)',
              }}
            >
              <ScrollRandomRevealText
                text="이제,"
                progress={step4Progress}
              />
              <br />
              <ScrollRandomRevealText
                text="당신의 수호자가 모습을 드러냅니다."
                progress={step4Progress}
              />
            </Box>
          </Box>
        </Box>

        {/* Scroll Indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: 40, sm: 50, md: 60 },
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 5,
            opacity: Math.max(0, 1 - scrollProgress * 5),
            transition: 'opacity 0.3s ease',
          }}
        >
          <ScrollIndicator />
        </Box>

        {/* Silver Flash Overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(200, 220, 255, 0.9)',
            opacity: flashOpacity,
            zIndex: 10,
            pointerEvents: 'none',
            transition: 'opacity 0.1s ease',
          }}
        />
      </Box>
    </Box>
  );
}

export default PatronusLoading;
