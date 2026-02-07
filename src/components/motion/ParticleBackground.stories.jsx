import ParticleBackground from './ParticleBackground';
import Box from '@mui/material/Box';

export default {
  title: 'Interactive/14. Motion/ParticleBackground',
  component: ParticleBackground,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'CSS animation 기반의 파티클 배경 효과. 반짝이는 별/빛 입자가 떠다니는 판타지 분위기를 연출합니다.',
      },
    },
  },
  argTypes: {
    count: {
      control: { type: 'range', min: 10, max: 100, step: 5 },
      description: '파티클 개수',
    },
    color: {
      control: 'color',
      description: '파티클 색상',
    },
    minSize: {
      control: { type: 'range', min: 1, max: 5 },
      description: '최소 크기 (px)',
    },
    maxSize: {
      control: { type: 'range', min: 3, max: 10 },
      description: '최대 크기 (px)',
    },
    isFloating: {
      control: 'boolean',
      description: '위로 떠오르는 애니메이션',
    },
    brightness: {
      control: { type: 'range', min: 0.5, max: 2, step: 0.1 },
      description: '밝기 (0-2)',
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
      <ParticleBackground {...args} />
    </DarkContainer>
  ),
  args: {
    count: 50,
    color: '#87CEEB',
    minSize: 2,
    maxSize: 6,
    isFloating: false,
    brightness: 1,
  },
};

export const PatronusBlue = {
  render: (args) => (
    <DarkContainer>
      <ParticleBackground {...args} />
    </DarkContainer>
  ),
  args: {
    count: 40,
    color: '#87CEEB',
    minSize: 2,
    maxSize: 8,
    isFloating: true,
    brightness: 1.2,
  },
};

export const Floating = {
  render: (args) => (
    <DarkContainer>
      <ParticleBackground {...args} />
    </DarkContainer>
  ),
  args: {
    count: 30,
    color: '#ffffff',
    minSize: 1,
    maxSize: 4,
    isFloating: true,
    brightness: 0.8,
  },
};

export const Dense = {
  render: (args) => (
    <DarkContainer>
      <ParticleBackground {...args} />
    </DarkContainer>
  ),
  args: {
    count: 100,
    color: '#87CEEB',
    minSize: 1,
    maxSize: 3,
    isFloating: false,
    brightness: 1,
  },
};

export const GoldenMagic = {
  render: (args) => (
    <DarkContainer>
      <ParticleBackground {...args} />
    </DarkContainer>
  ),
  args: {
    count: 60,
    color: '#FFD700',
    minSize: 2,
    maxSize: 5,
    isFloating: true,
    brightness: 1.3,
  },
};
