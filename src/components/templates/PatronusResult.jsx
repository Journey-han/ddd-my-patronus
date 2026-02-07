import { useRef, useEffect, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Lenis from 'lenis';
import ParticleBackground from '../motion/ParticleBackground';
import Vignette from '../dynamic-color/Vignette';

/**
 * PatronusResult 컴포넌트
 *
 * 페트로누스 심리테스트의 결과 섹션.
 * 비디오 스크러빙 후 결과 콘텐츠가 body 스크롤로 자연스럽게 표시된다.
 *
 * 동작 흐름:
 * 1. 스크롤에 따라 페트로누스 영상이 스크러빙 재생된다
 * 2. 영상이 끝나면 배경에서 루프 재생된다
 * 3. 스크롤을 계속하면 결과 콘텐츠가 아래에서 위로 올라온다
 * 4. 모든 콘텐츠가 body 스크롤만으로 표시된다
 *
 * Props:
 * @param {object} patronus - 매칭된 페트로누스 데이터 (resultData.js 구조) [Required]
 * @param {string} patronus.name - 페트로누스 이름 (예: "수사슴 (Stag)")
 * @param {string} patronus.emoji - 페트로누스 이모지
 * @param {string[]} patronus.traits - 대표 키워드 2개
 * @param {string} patronus.description - 메인 설명
 * @param {string} patronus.quote - 감성 인용문
 * @param {string} patronus.rarity - 희귀도 (Common, Uncommon, Rare, Legendary)
 * @param {string} patronus.hogwartsHouse - 어울리는 기숙사
 * @param {string} patronus.famousMatch - 같은 페트로누스를 가진 유명 캐릭터
 * @param {string} patronus.advice - 수호령이 전하는 한마디
 * @param {string} patronus.video - 영상 경로
 * @param {function} onShare - 공유 버튼 클릭 콜백 [Optional]
 * @param {function} onRetry - 다시하기 버튼 클릭 콜백 [Optional]
 * @param {object} sx - MUI sx 스타일 [Optional]
 *
 * Example usage:
 * <PatronusResult
 *   patronus={matchPatronus(scores)}
 *   onShare={() => console.log('Share')}
 * />
 */
function PatronusResult({
  patronus,
  onShare,
  onRetry,
  sx = {},
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isVideoComplete, setIsVideoComplete] = useState(false);

  // 부드러운 비디오 스크러빙을 위한 상태
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const rafIdRef = useRef(null);

  // lerp 함수
  const lerp = useCallback((start, end, factor) => {
    return start + (end - start) * factor;
  }, []);

  // 부드러운 스크러빙 애니메이션 프레임
  useEffect(() => {
    const updateFrame = () => {
      if (!videoRef.current || !videoRef.current.duration || isVideoComplete) {
        rafIdRef.current = requestAnimationFrame(updateFrame);
        return;
      }

      const diff = Math.abs(targetTimeRef.current - currentTimeRef.current);

      if (diff < 0.01) {
        currentTimeRef.current = targetTimeRef.current;
      } else {
        currentTimeRef.current = lerp(currentTimeRef.current, targetTimeRef.current, 0.12);
      }

      if (Math.abs(videoRef.current.currentTime - currentTimeRef.current) > 0.001) {
        videoRef.current.currentTime = currentTimeRef.current;
      }

      rafIdRef.current = requestAnimationFrame(updateFrame);
    };

    rafIdRef.current = requestAnimationFrame(updateFrame);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [lerp, isVideoComplete]);

  // Lenis 스크롤 기반 비디오 스크러빙 (첫 500vh 구간)
  useEffect(() => {
    const SCRUB_HEIGHT = window.innerHeight * 5; // 500vh - 영상이 충분히 보이도록

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrolled = Math.max(0, -rect.top);

      // 비디오 스크러빙 (0 ~ 500vh 구간)
      if (videoRef.current && videoRef.current.duration) {
        if (scrolled < SCRUB_HEIGHT) {
          const scrubProgress = scrolled / SCRUB_HEIGHT;
          targetTimeRef.current = scrubProgress * videoRef.current.duration;

          if (currentTimeRef.current === 0 && targetTimeRef.current > 0) {
            currentTimeRef.current = targetTimeRef.current;
          }

          if (!videoRef.current.paused) {
            videoRef.current.pause();
          }
        } else if (!isVideoComplete) {
          setIsVideoComplete(true);
          videoRef.current.currentTime = 0;
          videoRef.current.loop = true;
          videoRef.current.play().catch(() => { });
        }
      }
    };

    // Lenis 인스턴스 생성
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Lenis 스크롤 이벤트 리스너
    lenis.on('scroll', handleScroll);

    // RAF 루프
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // 초기 실행
    handleScroll();

    return () => {
      lenis.off('scroll', handleScroll);
      lenis.destroy();
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isVideoComplete]);

  // 희귀도 색상 매핑
  const rarityColors = {
    Common: '#9CA3AF',
    Uncommon: '#10B981',
    Rare: '#3B82F6',
    Legendary: '#F59E0B',
  };

  if (!patronus) {
    return null;
  }

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        ...sx,
      }}
    >
      {/* Sticky Background - 비디오, 파티클, 비네트 */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: '#0a0a12',
          zIndex: 1,
        }}
      >
        {/* Background Video */}
        {patronus.video && (
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
              opacity: isVideoComplete ? 0.6 : 1,
              transition: 'opacity 0.5s ease',
            }}
          >
            <source src={patronus.video} type="video/mp4" />
          </Box>
        )}

        {/* Gradient Background (fallback) */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(
              ellipse at center,
              ${patronus.color || 'rgba(135, 206, 235, 0.15)'} 0%,
              #0a0a12 70%
            )`,
            zIndex: 0,
            opacity: isVideoComplete ? 0.5 : 0.2,
            transition: 'opacity 0.5s ease',
          }}
        />

        {/* Vignette */}
        <Vignette intensity={0.5} />

        {/* Particles */}
        <ParticleBackground
          count={60}
          color={patronus.color || '#87CEEB'}
          isFloating
          brightness={isVideoComplete ? 1.8 : 1.2}
        />
      </Box>

      {/* Content Area - 배경 위로 올라오는 콘텐츠 */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          mt: '-100vh', // sticky 배경 위로 겹치기
          pt: '500vh', // 스크러빙 구간 (500vh) - 영상 스크러빙 완료 후 콘텐츠 시작
        }}
      >
        {/* 그라데이션 블러 오버레이 */}
        <Box
          sx={{
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '40vh',
              background: `linear-gradient(to bottom,
                transparent 0%,
                rgba(10, 10, 18, 0.05) 10%,
                rgba(10, 10, 18, 0.1) 30%,
                rgba(10, 10, 18, 0.2) 60%,
                rgba(10, 10, 18, 0.3) 100%
              )`,
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(12px)',
              pointerEvents: 'none',
              zIndex: 0,
            },
          }}
        >
          {/* 결과 콘텐츠 컨테이너 */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              px: { xs: 3, sm: 4, md: 6 },
              py: { xs: 6, md: 8 },
              pt: { xs: '15vh', md: '20vh' }, // 블러 영역 지난 후 콘텐츠 시작
              backgroundColor: 'rgba(10, 10, 18, 0.3)', // 배경 opacity 30%
              // 상단 가장자리 blur로 자연스러운 연결
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '15vh',
                background: 'linear-gradient(to bottom, transparent 0%, rgba(10, 10, 18, 0.3) 100%)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                pointerEvents: 'none',
                maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
              },
            }}
          >
            {/* Section 1: Emoji & Rarity */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: { xs: 4, md: 6 },
              }}
            >
              {/* Rarity Badge */}
              <Box
                sx={{
                  px: { xs: 1.5, md: 2 },
                  py: 0.5,
                  mb: { xs: 1.5, md: 2 },
                  borderRadius: '12px',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  border: `1px solid ${rarityColors[patronus.rarity] || '#87CEEB'}`,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Cinzel", serif',
                    fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                    fontWeight: 600,
                    color: rarityColors[patronus.rarity] || '#87CEEB',
                    letterSpacing: '0.15em',
                  }}
                >
                  {patronus.rarity?.toUpperCase()}
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontSize: { xs: '5rem', sm: '7rem', md: '10rem' },
                  textShadow: `0 0 60px ${patronus.color || 'rgba(135, 206, 235, 0.5)'}`,
                  '@keyframes float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                  },
                  animation: 'float 3s ease-in-out infinite',
                }}
              >
                {patronus.emoji}
              </Typography>
            </Box>

            {/* Section 2: Name & Quote */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                mb: { xs: 5, md: 8 },
                maxWidth: 600,
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Noto Sans KR", sans-serif',
                  fontWeight: 300,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  color: 'rgba(255, 255, 255, 0.6)',
                  letterSpacing: '0.3em',
                  mb: 1,
                }}
              >
                YOUR PATRONUS IS
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Cinzel", serif',
                  fontWeight: 700,
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
                  background: `linear-gradient(180deg, #FFFFFF 0%, ${patronus.color || '#87CEEB'} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: `0 0 40px ${patronus.color || 'rgba(135, 206, 235, 0.4)'}`,
                  mb: 3,
                }}
              >
                {patronus.name}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Noto Sans KR", sans-serif',
                  fontWeight: 300,
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontStyle: 'italic',
                }}
              >
                "{patronus.quote}"
              </Typography>
            </Box>

            {/* Section 3: Description */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                mb: { xs: 4, md: 6 },
                maxWidth: 700,
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Noto Sans KR", sans-serif',
                  fontWeight: 300,
                  fontSize: { xs: '1rem', md: '1.15rem' },
                  color: 'rgba(255, 255, 255, 0.85)',
                  lineHeight: 2,
                }}
              >
                {patronus.description}
              </Typography>
            </Box>

            {/* Section 4: Traits */}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: { xs: 1.5, sm: 2, md: 2.5 },
                mb: { xs: 6, md: 10 },
              }}
            >
              {patronus.traits?.map((trait, index) => (
                <Box
                  key={trait}
                  sx={{
                    px: { xs: 2.5, md: 3 },
                    py: { xs: 1, md: 1.25 },
                    border: `1px solid ${patronus.color || 'rgba(135, 206, 235, 0.4)'}`,
                    borderRadius: '24px',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontFamily: '"Noto Sans KR", sans-serif',
                    fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
                    fontWeight: 400,
                    backgroundColor: 'rgba(135, 206, 235, 0.1)',
                    '@keyframes traitPulse': {
                      '0%, 100%': { borderColor: patronus.color || 'rgba(135, 206, 235, 0.4)' },
                      '50%': { borderColor: patronus.color ? `${patronus.color}CC` : 'rgba(135, 206, 235, 0.7)' },
                    },
                    animation: `traitPulse 2s ease-in-out ${index * 0.2}s infinite`,
                  }}
                >
                  {trait}
                </Box>
              ))}
            </Box>

            {/* Section 5: Hogwarts House */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                mb: { xs: 5, md: 8 },
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Cinzel", serif',
                  fontSize: '0.85rem',
                  color: 'rgba(255, 255, 255, 0.5)',
                  letterSpacing: '0.2em',
                  mb: 1.5,
                }}
              >
                BEST HOUSE
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Cinzel", serif',
                  fontSize: { xs: '1.8rem', md: '2.5rem' },
                  fontWeight: 600,
                  color: patronus.color || '#87CEEB',
                }}
              >
                {patronus.hogwartsHouse}
              </Typography>
            </Box>

            {/* Section 6: Famous Match */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                mb: { xs: 6, md: 10 },
                maxWidth: 500,
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Noto Sans KR", sans-serif',
                  fontSize: '0.85rem',
                  color: 'rgba(255, 255, 255, 0.5)',
                  mb: 1.5,
                }}
              >
                같은 페트로누스를 가진 캐릭터
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Noto Sans KR", sans-serif',
                  fontSize: { xs: '1.1rem', md: '1.2rem' },
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 400,
                  lineHeight: 1.6,
                }}
              >
                {patronus.famousMatch}
              </Typography>
            </Box>

            {/* Section 7: Advice */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                mb: { xs: 6, md: 10 },
                maxWidth: 600,
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Noto Sans KR", sans-serif',
                  fontSize: '0.85rem',
                  color: 'rgba(255, 255, 255, 0.5)',
                  mb: 2,
                }}
              >
                당신의 수호령이 전하는 말
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Noto Sans KR", sans-serif',
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 300,
                  lineHeight: 1.9,
                  fontStyle: 'italic',
                }}
              >
                "{patronus.advice}"
              </Typography>
            </Box>

            {/* Section 8: Action Buttons */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 2, sm: 3 },
                width: { xs: '100%', sm: 'auto' },
                maxWidth: 400,
                pb: { xs: 8, md: 12 },
              }}
            >
              <Button
                variant="contained"
                onClick={onShare}
                sx={{
                  flex: { sm: 1 },
                  px: { xs: 4, md: 5 },
                  py: { xs: 1.5, md: 2 },
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  backgroundColor: patronus.color ? `${patronus.color}4D` : 'rgba(135, 206, 235, 0.3)',
                  color: '#fff',
                  fontFamily: '"Noto Sans KR", sans-serif',
                  fontWeight: 500,
                  border: `1px solid ${patronus.color || 'rgba(135, 206, 235, 0.5)'}`,
                  '&:hover': {
                    backgroundColor: patronus.color ? `${patronus.color}80` : 'rgba(135, 206, 235, 0.5)',
                    boxShadow: `0 0 20px ${patronus.color || 'rgba(135, 206, 235, 0.4)'}`,
                  },
                  '@media (hover: none)': {
                    '&:active': {
                      backgroundColor: patronus.color ? `${patronus.color}80` : 'rgba(135, 206, 235, 0.5)',
                    },
                  },
                  transition: 'all 0.3s ease',
                  minHeight: { xs: '52px', md: 'auto' },
                }}
              >
                공유하기
              </Button>
              <Button
                variant="outlined"
                onClick={onRetry}
                sx={{
                  flex: { sm: 1 },
                  px: { xs: 4, md: 5 },
                  py: { xs: 1.5, md: 2 },
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontFamily: '"Noto Sans KR", sans-serif',
                  fontWeight: 400,
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.6)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  },
                  minHeight: { xs: '52px', md: 'auto' },
                }}
              >
                다시하기
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PatronusResult;
