import { useState } from 'react';
import SplitText from './SplitText';
import ParticleBackground from '../motion/ParticleBackground';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default {
  title: 'Interactive/11. KineticTypography/SplitText',
  component: SplitText,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#0a0a12' }],
    },
    docs: {
      description: {
        component: '텍스트를 글자 단위로 분해하여 순차적으로 나타나는 애니메이션 컴포넌트. 로딩 화면의 주문 텍스트에 사용됩니다.',
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: '표시할 텍스트',
    },
    isActive: {
      control: 'boolean',
      description: '애니메이션 활성화',
    },
    staggerDelay: {
      control: { type: 'range', min: 20, max: 200 },
      description: '글자 간 딜레이 (ms)',
    },
    duration: {
      control: { type: 'range', min: 100, max: 800 },
      description: '애니메이션 시간 (ms)',
    },
    hasGlow: {
      control: 'boolean',
      description: '글로우 효과',
    },
    variant: {
      control: 'select',
      options: ['title', 'spell'],
      description: '스타일 변형',
    },
  },
};

export const Default = {
  args: {
    text: 'Expecto...',
    isActive: true,
    staggerDelay: 80,
    duration: 400,
    hasGlow: false,
    variant: 'title',
  },
};

export const Spell = {
  args: {
    text: 'PATRONUM!',
    isActive: true,
    staggerDelay: 60,
    duration: 400,
    hasGlow: true,
    variant: 'spell',
  },
};

export const WithReplay = {
  render: () => {
    const [key, setKey] = useState(0);
    const [isActive, setIsActive] = useState(true);

    const handleReplay = () => {
      setIsActive(false);
      setKey((prev) => prev + 1);
      setTimeout(() => setIsActive(true), 100);
    };

    return (
      <Stack spacing={4} alignItems="center">
        <SplitText
          key={key}
          text="Expecto..."
          isActive={isActive}
          staggerDelay={80}
        />
        <Button
          variant="outlined"
          onClick={handleReplay}
          sx={{
            color: '#87CEEB',
            borderColor: '#87CEEB',
            '&:hover': {
              borderColor: '#87CEEB',
              backgroundColor: 'rgba(135, 206, 235, 0.1)',
            },
          }}
        >
          Replay
        </Button>
      </Stack>
    );
  },
};

export const LoadingSequence = {
  render: () => {
    const [phase, setPhase] = useState(0);

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
          gap: 4,
          position: 'relative',
        }}
      >
        <ParticleBackground count={30} isFloating />

        <Box sx={{ textAlign: 'center', zIndex: 10 }}>
          {phase === 0 && (
            <SplitText
              text="Expecto..."
              isActive
              staggerDelay={80}
              variant="title"
            />
          )}
          {phase === 1 && (
            <SplitText
              text="PATRONUM!"
              isActive
              staggerDelay={60}
              variant="spell"
              hasGlow
            />
          )}
        </Box>

        <Stack direction="row" spacing={2} sx={{ mt: 4, zIndex: 10 }}>
          <Button
            variant={phase === 0 ? 'contained' : 'outlined'}
            onClick={() => setPhase(0)}
            sx={{
              color: phase === 0 ? '#0a0a12' : '#87CEEB',
              backgroundColor: phase === 0 ? '#87CEEB' : 'transparent',
              borderColor: '#87CEEB',
            }}
          >
            Phase 1
          </Button>
          <Button
            variant={phase === 1 ? 'contained' : 'outlined'}
            onClick={() => setPhase(1)}
            sx={{
              color: phase === 1 ? '#0a0a12' : '#87CEEB',
              backgroundColor: phase === 1 ? '#87CEEB' : 'transparent',
              borderColor: '#87CEEB',
            }}
          >
            Phase 2
          </Button>
        </Stack>
      </Box>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};
