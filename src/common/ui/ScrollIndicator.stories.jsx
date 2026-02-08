import ScrollIndicator from './ScrollIndicator';
import ParticleBackground from '../../components/motion/ParticleBackground';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default {
  title: 'Common/ScrollIndicator',
  component: ScrollIndicator,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#0a0a12' }],
    },
    docs: {
      description: {
        component: '스크롤 유도 인디케이터. 히어로 섹션 하단에서 사용자에게 스크롤을 유도합니다.',
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: '표시할 텍스트',
    },
    hasText: {
      control: 'boolean',
      description: '텍스트 표시 여부',
    },
    color: {
      control: 'color',
      description: '색상',
    },
    isVisible: {
      control: 'boolean',
      description: '표시 여부',
    },
  },
};

const CenteredContainer = ({ children }) => (
  <Box
    sx={{
      width: '100%',
      height: '100vh',
      backgroundColor: '#0a0a12',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}
  >
    {children}
  </Box>
);

export const Default = {
  render: (args) => (
    <CenteredContainer>
      <ScrollIndicator {...args} />
    </CenteredContainer>
  ),
  args: {
    text: 'Scroll Down',
    hasText: true,
    color: '#87CEEB',
    isVisible: true,
  },
};

export const NoText = {
  render: (args) => (
    <CenteredContainer>
      <ScrollIndicator {...args} />
    </CenteredContainer>
  ),
  args: {
    hasText: false,
    color: '#87CEEB',
    isVisible: true,
  },
};

export const Korean = {
  render: (args) => (
    <CenteredContainer>
      <ScrollIndicator {...args} />
    </CenteredContainer>
  ),
  args: {
    text: '스크롤하세요',
    hasText: true,
    color: '#87CEEB',
    isVisible: true,
  },
};

export const HeroContext = {
  render: () => (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        backgroundColor: '#0a0a12',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ParticleBackground count={30} />

      {/* Hero Content */}
      <Box sx={{ textAlign: 'center', zIndex: 10, mb: 8 }}>
        <Typography
          sx={{
            fontFamily: '"Cinzel", serif',
            fontWeight: 400,
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: '0.5em',
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
            background: 'linear-gradient(135deg, #87CEEB, #6495ED, #87CEEB)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 60px rgba(135, 206, 235, 0.3)',
            mb: 2,
          }}
        >
          PATRONUS
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Noto Sans KR", sans-serif',
            fontWeight: 300,
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.6)',
          }}
        >
          당신의 내면에 잠든 패트로누스를 깨우세요
        </Typography>
      </Box>

      {/* Scroll Indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 60,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
        }}
      >
        <ScrollIndicator />
      </Box>
    </Box>
  ),
};
