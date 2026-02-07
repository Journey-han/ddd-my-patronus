import { useState, useEffect } from 'react';
import ProgressIndicator from './ProgressIndicator';
import Box from '@mui/material/Box';

export default {
  title: 'Common/ProgressIndicator',
  component: ProgressIndicator,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#0a0a12' }],
    },
    docs: {
      description: {
        component: '질문 진행률을 표시하는 인디케이터. 페트로누스 심리테스트의 상단 진행률 바에 사용됩니다.',
      },
    },
  },
  argTypes: {
    current: {
      control: { type: 'range', min: 1, max: 7 },
      description: '현재 진행 번호',
    },
    total: {
      control: { type: 'range', min: 1, max: 10 },
      description: '전체 개수',
    },
    glowColor: {
      control: 'color',
      description: '글로우 색상',
    },
    isFixed: {
      control: 'boolean',
      description: '상단 고정 여부',
    },
  },
};

const DarkContainer = ({ children }) => (
  <Box
    sx={{
      width: '100%',
      height: '100vh',
      backgroundColor: '#0a0a12',
      position: 'relative',
    }}
  >
    {children}
  </Box>
);

export const Default = {
  render: (args) => (
    <DarkContainer>
      <ProgressIndicator {...args} />
    </DarkContainer>
  ),
  args: {
    current: 3,
    total: 7,
    glowColor: '#87CEEB',
    isFixed: false,
  },
};

export const Start = {
  render: (args) => (
    <DarkContainer>
      <ProgressIndicator {...args} />
    </DarkContainer>
  ),
  args: {
    current: 1,
    total: 7,
    glowColor: '#87CEEB',
    isFixed: false,
  },
};

export const Middle = {
  render: (args) => (
    <DarkContainer>
      <ProgressIndicator {...args} />
    </DarkContainer>
  ),
  args: {
    current: 4,
    total: 7,
    glowColor: '#87CEEB',
    isFixed: false,
  },
};

export const End = {
  render: (args) => (
    <DarkContainer>
      <ProgressIndicator {...args} />
    </DarkContainer>
  ),
  args: {
    current: 7,
    total: 7,
    glowColor: '#87CEEB',
    isFixed: false,
  },
};

export const Animated = {
  render: () => {
    const [current, setCurrent] = useState(1);
    const total = 7;

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev >= total ? 1 : prev + 1));
      }, 1500);
      return () => clearInterval(interval);
    }, []);

    return (
      <DarkContainer>
        <ProgressIndicator current={current} total={total} isFixed={false} />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'rgba(255,255,255,0.5)',
            fontFamily: '"Cinzel", serif',
          }}
        >
          Question {current}
        </Box>
      </DarkContainer>
    );
  },
};
