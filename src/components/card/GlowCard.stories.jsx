import { useState } from 'react';
import GlowCard from './GlowCard';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

export default {
  title: 'Component/3. Card/GlowCard',
  component: GlowCard,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#0a0a12' }],
    },
    docs: {
      description: {
        component: '글로우 효과가 있는 답변 카드. 페트로누스 심리테스트의 답변 선택 UI에 사용됩니다.',
      },
    },
  },
  argTypes: {
    isSelected: {
      control: 'boolean',
      description: '선택 상태',
    },
    isDismissed: {
      control: 'boolean',
      description: '페이드아웃 상태',
    },
    glowColor: {
      control: 'color',
      description: '글로우 색상',
    },
  },
};

export const Default = {
  args: {
    children: '빛을 찾는다',
    isSelected: false,
    isDismissed: false,
    glowColor: '#87CEEB',
  },
};

export const Selected = {
  args: {
    children: '빛을 찾는다',
    isSelected: true,
    isDismissed: false,
    glowColor: '#87CEEB',
  },
};

export const Dismissed = {
  args: {
    children: '주변을 살핀다',
    isSelected: false,
    isDismissed: true,
    glowColor: '#87CEEB',
  },
};

export const AnswerList = {
  render: () => {
    const [selected, setSelected] = useState(null);
    const answers = [
      '빛을 찾는다',
      '주변을 살핀다',
      '가만히 기다린다',
      '함께 있는 이를 확인한다',
    ];

    return (
      <Box sx={{ width: 320, p: 2 }}>
        <Stack spacing={2}>
          {answers.map((answer, index) => (
            <GlowCard
              key={index}
              isSelected={selected === index}
              isDismissed={selected !== null && selected !== index}
              onClick={() => setSelected(index)}
            >
              {answer}
            </GlowCard>
          ))}
        </Stack>
      </Box>
    );
  },
};

export const AllStates = {
  render: () => (
    <Box sx={{ width: 320, p: 2 }}>
      <Stack spacing={3}>
        <Box>
          <Box sx={{ color: 'grey.500', fontSize: '0.75rem', mb: 1 }}>Default</Box>
          <GlowCard>빛을 찾는다</GlowCard>
        </Box>
        <Box>
          <Box sx={{ color: 'grey.500', fontSize: '0.75rem', mb: 1 }}>Selected</Box>
          <GlowCard isSelected>주변을 살핀다</GlowCard>
        </Box>
        <Box>
          <Box sx={{ color: 'grey.500', fontSize: '0.75rem', mb: 1 }}>Dismissed</Box>
          <GlowCard isDismissed>가만히 기다린다</GlowCard>
        </Box>
      </Stack>
    </Box>
  ),
};
