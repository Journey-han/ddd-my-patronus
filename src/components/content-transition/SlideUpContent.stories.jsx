import { useState } from 'react';
import { SlideUpContent, SlideUpContainer } from './SlideUpContent';
import ParticleBackground from '../motion/ParticleBackground';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

export default {
  title: 'Interactive/13. ContentTransition/SlideUpContent',
  component: SlideUpContent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '스크롤에 따라 아래에서 위로 슬라이드하며 나타나는 콘텐츠. 결과 화면의 정보 순차 공개에 사용됩니다.',
      },
    },
  },
};

const ResultSlide1 = () => (
  <Box sx={{ textAlign: 'center' }}>
    <Typography sx={{ fontSize: '6rem', mb: 2 }}>🦌</Typography>
    <Typography
      sx={{
        fontFamily: '"Noto Sans KR", sans-serif',
        fontSize: '1rem',
        color: 'rgba(255,255,255,0.7)',
        mb: 1,
      }}
    >
      당신의 페트로누스는
    </Typography>
    <Typography
      sx={{
        fontFamily: '"Cinzel", serif',
        fontSize: '2.5rem',
        fontWeight: 900,
        background: 'linear-gradient(135deg, #87CEEB, #6495ED)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        mb: 0.5,
      }}
    >
      수사슴
    </Typography>
    <Typography
      sx={{
        fontFamily: '"Cinzel", serif',
        fontSize: '1rem',
        color: '#87CEEB',
        letterSpacing: '0.2em',
      }}
    >
      Stag
    </Typography>
  </Box>
);

const ResultSlide2 = () => (
  <Box sx={{ textAlign: 'center', maxWidth: 400, px: 3 }}>
    <Typography
      sx={{
        fontFamily: '"Noto Sans KR", sans-serif',
        fontSize: '1.1rem',
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 1.8,
      }}
    >
      &ldquo;고귀하고 용감한 수호자.
      위기의 순간 누구보다 먼저 앞에 서는 당신의 수사슴은
      강인한 의지와 따뜻한 마음을 상징합니다.&rdquo;
    </Typography>
  </Box>
);

const ResultSlide3 = () => (
  <Box sx={{ textAlign: 'center' }}>
    <Stack direction="row" spacing={1} justifyContent="center" mb={3}>
      {['용감함', '리더십', '보호본능'].map((tag) => (
        <Chip
          key={tag}
          label={tag}
          sx={{
            backgroundColor: 'rgba(135, 206, 235, 0.1)',
            border: '1px solid rgba(135, 206, 235, 0.3)',
            color: '#87CEEB',
            fontFamily: '"Noto Sans KR", sans-serif',
          }}
        />
      ))}
    </Stack>
    <Typography
      sx={{
        fontFamily: '"Cinzel", serif',
        fontSize: '1.5rem',
        fontWeight: 700,
        fontStyle: 'italic',
        color: '#87CEEB',
        textShadow: '0 0 40px rgba(135, 206, 235, 0.5)',
      }}
    >
      &ldquo;Expecto Patronum!&rdquo;
    </Typography>
  </Box>
);

const ResultSlide4 = () => (
  <Stack spacing={2} alignItems="center">
    <Button
      variant="outlined"
      sx={{
        width: 240,
        py: 1.5,
        color: '#87CEEB',
        borderColor: 'rgba(135, 206, 235, 0.4)',
        fontFamily: '"Noto Sans KR", sans-serif',
        '&:hover': {
          borderColor: '#87CEEB',
          backgroundColor: 'rgba(135, 206, 235, 0.1)',
          boxShadow: '0 0 20px rgba(135, 206, 235, 0.3)',
        },
      }}
    >
      🔗 결과 공유하기
    </Button>
    <Button
      variant="text"
      sx={{
        width: 240,
        py: 1.5,
        color: 'rgba(255,255,255,0.5)',
        fontFamily: '"Noto Sans KR", sans-serif',
        '&:hover': {
          color: '#fff',
          backgroundColor: 'rgba(255,255,255,0.05)',
        },
      }}
    >
      ↻ 다시 찾아보기
    </Button>
  </Stack>
);

export const FullResult = {
  render: () => (
    <Box sx={{ backgroundColor: '#0a0a12' }}>
      <SlideUpContainer scrollHeight={400}>
        {(progress) => (
          <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            <ParticleBackground count={30} brightness={1.2} />

            {/* 그라데이션 커튼 */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(to top,
                  #0a0a12 0%,
                  #0a0a12 ${Math.min(100, progress * 150)}%,
                  transparent 100%
                )`,
                zIndex: 4,
              }}
            />

            {/* 슬라이드 콘텐츠 */}
            <Stack
              spacing={4}
              alignItems="center"
              sx={{
                position: 'relative',
                zIndex: 5,
                width: '100%',
                pt: 10,
              }}
            >
              <SlideUpContent index={0} totalSlides={4} progress={progress}>
                <ResultSlide1 />
              </SlideUpContent>

              <SlideUpContent index={1} totalSlides={4} progress={progress}>
                <ResultSlide2 />
              </SlideUpContent>

              <SlideUpContent index={2} totalSlides={4} progress={progress}>
                <ResultSlide3 />
              </SlideUpContent>

              <SlideUpContent index={3} totalSlides={4} progress={progress}>
                <ResultSlide4 />
              </SlideUpContent>
            </Stack>
          </Box>
        )}
      </SlideUpContainer>
    </Box>
  ),
};

export const ManualProgress = {
  render: () => {
    const [progress, setProgress] = useState(0);

    return (
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          backgroundColor: '#0a0a12',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <ParticleBackground count={20} />

        {/* Progress Slider */}
        <Box
          sx={{
            position: 'fixed',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography sx={{ color: '#fff', fontSize: '0.875rem' }}>
            Progress:
          </Typography>
          <input
            type="range"
            min="0"
            max="100"
            value={progress * 100}
            onChange={(e) => setProgress(Number(e.target.value) / 100)}
            style={{ width: 200 }}
          />
          <Typography sx={{ color: '#87CEEB', fontSize: '0.875rem' }}>
            {Math.round(progress * 100)}%
          </Typography>
        </Box>

        {/* Slides */}
        <Stack spacing={4} alignItems="center" sx={{ zIndex: 5 }}>
          <SlideUpContent index={0} totalSlides={4} progress={progress}>
            <ResultSlide1 />
          </SlideUpContent>

          <SlideUpContent index={1} totalSlides={4} progress={progress}>
            <ResultSlide2 />
          </SlideUpContent>

          <SlideUpContent index={2} totalSlides={4} progress={progress}>
            <ResultSlide3 />
          </SlideUpContent>

          <SlideUpContent index={3} totalSlides={4} progress={progress}>
            <ResultSlide4 />
          </SlideUpContent>
        </Stack>
      </Box>
    );
  },
};
