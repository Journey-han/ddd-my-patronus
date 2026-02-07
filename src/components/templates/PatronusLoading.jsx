import { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ParticleBackground from '../motion/ParticleBackground';
import Vignette from '../dynamic-color/Vignette';
import ScrollIndicator from '../../common/ui/ScrollIndicator';
import ScrollRandomRevealText from '../kinetic-typography/ScrollRandomRevealText';

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

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolled / sectionHeight);

      setScrollProgress(progress);

      // 비디오 시간 업데이트
      if (videoRef.current && videoRef.current.duration) {
        videoRef.current.currentTime = progress * videoRef.current.duration;
      }

      // 스크롤 종료 콜백 (98%에서 호출하여 비디오가 끝까지 재생되도록)
      if (progress >= 0.98 && onScrollEnd) {
        onScrollEnd();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onScrollEnd]);

  // 내러티브 텍스트 단계별 opacity 계산
  // STEP 01 (0-25%): 형체 모임 - 0~5%에서 페이드인, 20~25%에서 페이드아웃
  const step1Opacity = scrollProgress < 0.05
    ? scrollProgress * 20
    : scrollProgress < 0.2
      ? 1
      : scrollProgress < 0.25
        ? Math.max(0, 1 - (scrollProgress - 0.2) * 20)
        : 0;

  // STEP 02 (25-50%): 내면 읽기 - 25~30%에서 페이드인, 45~50%에서 페이드아웃
  const step2Opacity = scrollProgress < 0.25
    ? 0
    : scrollProgress < 0.3
      ? (scrollProgress - 0.25) * 20
      : scrollProgress < 0.45
        ? 1
        : scrollProgress < 0.5
          ? Math.max(0, 1 - (scrollProgress - 0.45) * 20)
          : 0;

  // STEP 03 (50-75%): 유일성 강조 - 50~55%에서 페이드인, 70~75%에서 페이드아웃
  const step3Opacity = scrollProgress < 0.5
    ? 0
    : scrollProgress < 0.55
      ? (scrollProgress - 0.5) * 20
      : scrollProgress < 0.7
        ? 1
        : scrollProgress < 0.75
          ? Math.max(0, 1 - (scrollProgress - 0.7) * 20)
          : 0;

  // STEP 04 (75-90%): 결과 직전 - 75~80%에서 페이드인, 85~90%에서 페이드아웃
  const step4Opacity = scrollProgress < 0.75
    ? 0
    : scrollProgress < 0.8
      ? (scrollProgress - 0.75) * 20
      : scrollProgress < 0.85
        ? 1
        : scrollProgress < 0.9
          ? Math.max(0, 1 - (scrollProgress - 0.85) * 20)
          : 0;

  // 각 STEP의 텍스트 reveal을 위한 localProgress 계산
  const step1Progress = Math.min(1, Math.max(0, scrollProgress / 0.2));
  const step2Progress = Math.min(1, Math.max(0, (scrollProgress - 0.25) / 0.2));
  const step3Progress = Math.min(1, Math.max(0, (scrollProgress - 0.5) / 0.2));
  const step4Progress = Math.min(1, Math.max(0, (scrollProgress - 0.75) / 0.1));

  // Flash: 90~100%에서 페이드인
  const flashOpacity = scrollProgress >= 0.9 ? Math.min(1, (scrollProgress - 0.9) * 10) : 0;

  return (
    <Box
      ref={sectionRef}
      sx={{
        position: 'relative',
        height: '400vh',
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
