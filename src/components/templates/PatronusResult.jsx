import { useRef, useEffect, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ParticleBackground from '../motion/ParticleBackground';
import Vignette from '../dynamic-color/Vignette';
import { SlideUpContent } from '../content-transition/SlideUpContent';

/**
 * PatronusResult 컴포넌트
 *
 * 페트로누스 심리테스트의 결과 섹션.
 * 비디오 스크러빙 후 결과 카드가 표시된다.
 *
 * 동작 흐름:
 * 1. 스크롤에 따라 페트로누스 영상이 스크러빙 재생된다 (0-25%)
 * 2. 영상이 끝나면 결과 콘텐츠가 페이드인된다
 * 3. 결과 카드가 아래에서 위로 슬라이드업되며 누적된다
 * 4. 배경에서 비디오가 루프 재생된다
 * 5. 마지막에 공유 버튼이 표시된다
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVideoComplete, setIsVideoComplete] = useState(false);

  // 스크러빙 구간: 0-25%, 결과 콘텐츠 구간: 25-100%
  const SCRUB_END = 0.25;

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

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrollable = containerRef.current.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolled / scrollable);

      setScrollProgress(progress);

      // 비디오 스크러빙 (0-25% 구간)
      if (videoRef.current && videoRef.current.duration) {
        if (progress < SCRUB_END) {
          // 부드러운 스크러빙 모드
          const scrubProgress = progress / SCRUB_END;
          targetTimeRef.current = scrubProgress * videoRef.current.duration;

          // 처음 호출 시 현재 시간 초기화
          if (currentTimeRef.current === 0 && targetTimeRef.current > 0) {
            currentTimeRef.current = targetTimeRef.current;
          }

          if (!videoRef.current.paused) {
            videoRef.current.pause();
          }
        } else if (!isVideoComplete) {
          // 스크러빙 완료 → 루프 재생 시작
          setIsVideoComplete(true);
          videoRef.current.currentTime = 0;
          videoRef.current.loop = true;
          videoRef.current.play().catch(() => {});
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVideoComplete]);

  // 결과 콘텐츠용 진행도 (25-100% → 0-100% 매핑)
  const contentProgress = Math.max(0, Math.min(1, (scrollProgress - SCRUB_END) / (1 - SCRUB_END)));

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
        height: '800vh', // 스크러빙 + 결과 콘텐츠
        ...sx,
      }}
    >
      {/* Fixed Background */}
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
        {/* Background Video - 스크러빙 후 루프 재생 */}
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
              opacity: isVideoComplete ? 0.7 : 1,
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

        {/* Result Content Container - 스크러빙 완료 후 표시 */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 4,
            px: { xs: 2, sm: 3 },
            py: { xs: 3, md: 4 },
            opacity: scrollProgress < SCRUB_END ? 0 : Math.min(1, (scrollProgress - SCRUB_END) / 0.1),
            transition: 'opacity 0.5s ease',
            pointerEvents: scrollProgress < SCRUB_END ? 'none' : 'auto',
          }}
        >
          {/* Dark Popup Box */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              maxWidth: { xs: '100%', sm: 500, md: 600 },
              maxHeight: '80vh',
              backgroundColor: 'rgba(10, 10, 18, 0.5)',
              backdropFilter: 'blur(1px)',
              borderRadius: '0px',
              overflow: 'hidden',
              px: { xs: 2.5, sm: 3, md: 5 },
              py: { xs: 4, md: 5 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Slide 1: Emoji & Rarity */}
            <SlideUpContent
              index={0}
              totalSlides={5}
              progress={contentProgress}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
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
                  fontSize: { xs: '4.5rem', sm: '6rem', md: '10rem' },
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
            </SlideUpContent>

            {/* Slide 2: Name & Quote */}
            <SlideUpContent
              index={1}
              totalSlides={5}
              progress={contentProgress}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
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
                  fontSize: { xs: '2rem', md: '3.5rem' },
                  background: `linear-gradient(180deg, #FFFFFF 0%, ${patronus.color || '#87CEEB'} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: `0 0 40px ${patronus.color || 'rgba(135, 206, 235, 0.4)'}`,
                  mb: 2,
                }}
              >
                {patronus.name}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Noto Sans KR", sans-serif',
                  fontWeight: 300,
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontStyle: 'italic',
                }}
              >
                "{patronus.quote}"
              </Typography>
            </SlideUpContent>

            {/* Slide 3: Description & Traits */}
            <SlideUpContent
              index={2}
              totalSlides={5}
              progress={contentProgress}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                maxWidth: 600,
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Noto Sans KR", sans-serif',
                  fontWeight: 300,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  color: 'rgba(255, 255, 255, 0.85)',
                  lineHeight: 1.8,
                  mb: 4,
                }}
              >
                {patronus.description}
              </Typography>

              {/* Traits */}
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: { xs: 1, sm: 1.25, md: 1.5 },
                }}
              >
                {patronus.traits?.map((trait, index) => (
                  <Box
                    key={trait}
                    sx={{
                      px: { xs: 2, md: 2.5 },
                      py: { xs: 0.75, md: 1 },
                      border: `1px solid ${patronus.color || 'rgba(135, 206, 235, 0.4)'}`,
                      borderRadius: '20px',
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontFamily: '"Noto Sans KR", sans-serif',
                      fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
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
            </SlideUpContent>

            {/* Slide 4: Famous Match & Hogwarts House */}
            <SlideUpContent
              index={3}
              totalSlides={5}
              progress={contentProgress}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                maxWidth: 500,
              }}
            >
              {/* Hogwarts House */}
              <Typography
                sx={{
                  fontFamily: '"Cinzel", serif',
                  fontSize: '0.85rem',
                  color: 'rgba(255, 255, 255, 0.5)',
                  letterSpacing: '0.2em',
                  mb: 1,
                }}
              >
                BEST HOUSE
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Cinzel", serif',
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  fontWeight: 600,
                  color: patronus.color || '#87CEEB',
                  mb: 4,
                }}
              >
                {patronus.hogwartsHouse}
              </Typography>

              {/* Famous Match */}
              <Typography
                sx={{
                  fontFamily: '"Noto Sans KR", sans-serif',
                  fontSize: '0.85rem',
                  color: 'rgba(255, 255, 255, 0.5)',
                  mb: 1,
                }}
              >
                같은 페트로누스를 가진 캐릭터
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Noto Sans KR", sans-serif',
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 400,
                  lineHeight: 1.6,
                }}
              >
                {patronus.famousMatch}
              </Typography>
            </SlideUpContent>

            {/* Slide 5: Advice & Actions */}
            <SlideUpContent
              index={4}
              totalSlides={5}
              progress={contentProgress}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                maxWidth: 500,
              }}
            >
              {/* Advice */}
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
                  fontSize: { xs: '1rem', md: '1.15rem' },
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 300,
                  lineHeight: 1.8,
                  fontStyle: 'italic',
                  mb: 5,
                }}
              >
                "{patronus.advice}"
              </Typography>

              {/* Action Buttons */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 1.5, sm: 2 },
                  width: { xs: '100%', sm: 'auto' },
                }}
              >
                <Button
                  variant="contained"
                  onClick={onShare}
                  sx={{
                    px: { xs: 3, md: 4 },
                    py: { xs: 1.25, md: 1.5 },
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    backgroundColor: patronus.color ? `${patronus.color}4D` : 'rgba(135, 206, 235, 0.3)',
                    color: '#fff',
                    fontFamily: '"Noto Sans KR", sans-serif',
                    fontWeight: 500,
                    border: `1px solid ${patronus.color || 'rgba(135, 206, 235, 0.5)'}`,
                    '&:hover': {
                      backgroundColor: patronus.color ? `${patronus.color}80` : 'rgba(135, 206, 235, 0.5)',
                      boxShadow: `0 0 20px ${patronus.color || 'rgba(135, 206, 235, 0.4)'}`,
                    },
                    // 터치 디바이스 active 상태
                    '@media (hover: none)': {
                      '&:active': {
                        backgroundColor: patronus.color ? `${patronus.color}80` : 'rgba(135, 206, 235, 0.5)',
                      },
                    },
                    transition: 'all 0.3s ease',
                    minHeight: { xs: '48px', md: 'auto' },
                  }}
                >
                  공유하기
                </Button>
                <Button
                  variant="outlined"
                  onClick={onRetry}
                  sx={{
                    px: { xs: 3, md: 4 },
                    py: { xs: 1.25, md: 1.5 },
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontFamily: '"Noto Sans KR", sans-serif',
                    fontWeight: 400,
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.6)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    },
                    minHeight: { xs: '48px', md: 'auto' },
                  }}
                >
                  다시하기
                </Button>
              </Box>
            </SlideUpContent>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PatronusResult;
