import { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ParticleBackground from '../motion/ParticleBackground';
import Vignette from '../dynamic-color/Vignette';
import ScrollIndicator from '../../common/ui/ScrollIndicator';
import ScrollRandomRevealText from '../kinetic-typography/ScrollRandomRevealText';
import useSmoothVideoScrub from '../../hooks/useSmoothVideoScrub';

/**
 * PatronusHero 컴포넌트
 *
 * 페트로누스 심리테스트의 히어로 섹션.
 * 스크롤 비디오 스크러빙과 내러티브 텍스트, 파티클 배경을 포함한다.
 *
 * 동작 흐름:
 * 1. 스크롤하면 배경 영상이 재생된다
 * 2. 스크롤 진행에 따라 내러티브 텍스트가 순차적으로 전환된다:
 *    - 타이틀 (0-15%): "PATRONUS" 타이틀
 *    - STEP 01 (0-20%): "모든 사람의 내면에는 아직 깨어나지 않은 수호자가 존재합니다."
 *    - STEP 02 (20-40%): "패트로누스는 당신의 성격, 감정, 그리고 선택이 만들어낸 단 하나의 수호령입니다."
 *    - STEP 03 (40-60%): "몇 가지 질문에 답하는 것만으로 패트로누스가 형체를 갖추기 시작합니다."
 *    - STEP 04 (60-80%): "이 테스트를 통해 당신은 어떤 성향의 사람인지 알게 됩니다."
 *    - STEP 05 (80-100%): "이제, 당신의 패트로누스를 깨울 준비가 되었나요?"
 * 3. 하단 그라데이션으로 다음 섹션과 자연스럽게 연결된다
 *
 * Props:
 * @param {string} videoSrc - 배경 영상 소스 [Optional]
 * @param {function} onScrollEnd - 스크롤 종료 콜백 [Optional]
 * @param {object} sx - MUI sx 스타일 [Optional]
 *
 * Example usage:
 * <PatronusHero videoSrc="/videos/hero.mp4" onScrollEnd={handleStart} />
 */
function PatronusHero({
  videoSrc,
  onScrollEnd,
  sx = {},
}) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // 부드러운 비디오 스크러빙을 위한 훅
  const setTargetProgress = useSmoothVideoScrub(videoRef, 0.12);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolled / sectionHeight);

      setScrollProgress(progress);

      // 부드러운 비디오 스크러빙
      setTargetProgress(progress);

      // 스크롤 종료 콜백 (98%에서 호출하여 비디오가 끝까지 재생되도록)
      if (progress >= 0.98 && onScrollEnd) {
        onScrollEnd();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onScrollEnd, setTargetProgress]);

  // 타이틀 텍스트 스타일 계산 (0~15%에서 표시, 15~25%에서 페이드아웃)
  const titleOpacity = scrollProgress < 0.15
    ? 1
    : scrollProgress < 0.25
      ? Math.max(0, 1 - (scrollProgress - 0.15) * 10)
      : 0;

  // 내러티브 텍스트 단계별 opacity 계산
  // STEP 01 (0-20%): 5%에서 페이드인, 15~20%에서 페이드아웃
  const step1Opacity = scrollProgress < 0.05
    ? scrollProgress * 20
    : scrollProgress < 0.15
      ? 1
      : scrollProgress < 0.2
        ? Math.max(0, 1 - (scrollProgress - 0.15) * 20)
        : 0;

  // STEP 02 (20-40%): 20~25%에서 페이드인, 35~40%에서 페이드아웃
  const step2Opacity = scrollProgress < 0.2
    ? 0
    : scrollProgress < 0.25
      ? (scrollProgress - 0.2) * 20
      : scrollProgress < 0.35
        ? 1
        : scrollProgress < 0.4
          ? Math.max(0, 1 - (scrollProgress - 0.35) * 20)
          : 0;

  // STEP 03 (40-60%): 40~45%에서 페이드인, 55~60%에서 페이드아웃
  const step3Opacity = scrollProgress < 0.4
    ? 0
    : scrollProgress < 0.45
      ? (scrollProgress - 0.4) * 20
      : scrollProgress < 0.55
        ? 1
        : scrollProgress < 0.6
          ? Math.max(0, 1 - (scrollProgress - 0.55) * 20)
          : 0;

  // STEP 04 (60-80%): 60~65%에서 페이드인, 75~80%에서 페이드아웃
  const step4Opacity = scrollProgress < 0.6
    ? 0
    : scrollProgress < 0.65
      ? (scrollProgress - 0.6) * 20
      : scrollProgress < 0.75
        ? 1
        : scrollProgress < 0.8
          ? Math.max(0, 1 - (scrollProgress - 0.75) * 20)
          : 0;

  // STEP 05 (80-100%): 80~85%에서 페이드인, 유지
  const step5Opacity = scrollProgress < 0.8
    ? 0
    : scrollProgress < 0.85
      ? (scrollProgress - 0.8) * 20
      : 1;

  // 각 STEP의 텍스트 reveal을 위한 localProgress 계산
  const step1Progress = Math.min(1, Math.max(0, scrollProgress / 0.15));
  const step2Progress = Math.min(1, Math.max(0, (scrollProgress - 0.2) / 0.15));
  const step3Progress = Math.min(1, Math.max(0, (scrollProgress - 0.4) / 0.15));
  const step4Progress = Math.min(1, Math.max(0, (scrollProgress - 0.6) / 0.15));
  const step5Progress = Math.min(1, Math.max(0, (scrollProgress - 0.8) / 0.15));

  return (
    <Box
      ref={sectionRef}
      sx={{
        position: 'relative',
        height: '500vh',
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
                rgba(135, 206, 235, ${0.1 + scrollProgress * 0.2}) 0%,
                #0a0a12 70%
              )`,
              zIndex: 1,
              transition: 'background 0.1s ease',
            }}
          />
        )}

        {/* Vignette Overlay */}
        <Vignette
          intensity={0.7}
          hasBottomGradient
          bottomGradientOpacity={scrollProgress}
        />

        {/* Particles */}
        <ParticleBackground
          count={40}
          color="#87CEEB"
          isFloating
          brightness={1 + scrollProgress * 0.5}
        />

        {/* Text Content */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 4,
          }}
        >
          {/* Initial Title (0-25%) */}
          <Box
            sx={{
              position: 'absolute',
              opacity: titleOpacity,
              transition: 'opacity 0.5s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Cinzel", serif',
                fontWeight: 400,
                fontSize: { xs: '0.75rem', md: '1rem' },
                color: 'rgba(255, 255, 255, 0.7)',
                letterSpacing: '0.5em',
                textTransform: 'uppercase',
                mb: 2,
              }}
            >
              Discover Your
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Cinzel", serif',
                fontWeight: 900,
                fontSize: { xs: '3rem', md: '6rem' },
                background: 'linear-gradient(180deg, #FFFFFF 0%, #87CEEB 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 60px rgba(135, 206, 235, 0.3)',
                mb: 3,
                '@keyframes titleGlow': {
                  '0%, 100%': { filter: 'brightness(1)' },
                  '50%': { filter: 'brightness(1.2)' },
                },
                animation: 'titleGlow 3s ease-in-out infinite',
              }}
            >
              PATRONUS
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Noto Sans KR", sans-serif',
                fontWeight: 300,
                fontSize: { xs: '0.9rem', md: '1.1rem' },
                color: 'rgba(255, 255, 255, 0.6)',
                textAlign: 'center',
              }}
            >
              당신의 내면에 잠든 수호령을 깨우세요
            </Typography>
          </Box>

          {/* STEP 01 (0-20%): 도입 */}
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
                text="모든 사람의 내면에는"
                progress={step1Progress}
              />
              <br />
              <ScrollRandomRevealText
                text="아직 깨어나지 않은 수호자가 존재합니다."
                progress={step1Progress}
              />
            </Box>
          </Box>

          {/* STEP 02 (20-40%): 개념 설명 */}
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
                fontWeight: 300,
                fontSize: { xs: '1.1rem', md: '1.4rem' },
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: 2,
              }}
            >
              <ScrollRandomRevealText
                text="패트로누스는"
                progress={step2Progress}
              />
              <br />
              <ScrollRandomRevealText
                text="당신의 성격, 감정, 그리고 선택이"
                progress={step2Progress}
              />
              <br />
              <ScrollRandomRevealText
                text="만들어낸 단 하나의 수호령입니다."
                progress={step2Progress}
              />
            </Box>
          </Box>

          {/* STEP 03 (40-60%): 테스트 설명 */}
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
                text="몇 가지 질문에 답하는 것만으로"
                progress={step3Progress}
              />
              <br />
              <ScrollRandomRevealText
                text="당신의 내면에 가장 가까운"
                progress={step3Progress}
              />
              <br />
              <ScrollRandomRevealText
                text="패트로누스가 형체를 갖추기 시작합니다."
                progress={step3Progress}
              />
            </Box>
          </Box>

          {/* STEP 04 (60-80%): 결과 가치 제시 */}
          <Box
            sx={{
              position: 'absolute',
              opacity: step4Opacity,
              transition: 'opacity 0.5s ease',
              textAlign: 'center',
              px: { xs: 3, sm: 4 },
              maxWidth: { xs: '90%', sm: 550, md: 650 },
              width: '100%',
            }}
          >
            <Box
              sx={{
                fontFamily: '"Noto Sans KR", sans-serif',
                fontWeight: 300,
                fontSize: { xs: '1rem', md: '1.3rem' },
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: 2,
              }}
            >
              <ScrollRandomRevealText
                text="이 테스트를 통해"
                progress={step4Progress}
              />
              <br />
              <ScrollRandomRevealText
                text="당신은 어떤 성향의 사람인지,"
                progress={step4Progress}
              />
              <br />
              <ScrollRandomRevealText
                text="위기 앞에서 어떤 선택을 하는지,"
                progress={step4Progress}
              />
              <br />
              <ScrollRandomRevealText
                text="어떤 방식으로 타인을 지키는지를 알게 됩니다."
                progress={step4Progress}
              />
            </Box>
          </Box>

          {/* STEP 05 (80-100%): 행동 유도 */}
          <Box
            sx={{
              position: 'absolute',
              opacity: step5Opacity,
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
                mb: 3,
              }}
            >
              <ScrollRandomRevealText
                text="이제,"
                progress={step5Progress}
              />
              <br />
              <ScrollRandomRevealText
                text="당신의 패트로누스를 깨울 준비가 되었나요?"
                progress={step5Progress}
              />
            </Box>
            <Box
              sx={{
                fontFamily: '"Noto Sans KR", sans-serif',
                fontWeight: 300,
                fontSize: { xs: '0.85rem', md: '1rem' },
                color: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              <ScrollRandomRevealText
                text="스크롤을 계속하면 소환 의식이 시작됩니다."
                progress={step5Progress}
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
      </Box>
    </Box>
  );
}

export default PatronusHero;
