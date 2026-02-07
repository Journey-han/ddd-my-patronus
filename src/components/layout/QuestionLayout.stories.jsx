import { useState } from 'react';
import QuestionLayout from './QuestionLayout';
import GlowCard from '../card/GlowCard';
import ParticleBackground from '../motion/ParticleBackground';
import Box from '@mui/material/Box';

export default {
  title: 'Component/8. Layout/QuestionLayout',
  component: QuestionLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '비정형 레이아웃 5패턴을 지원하는 질문 화면 레이아웃. 페트로누스 심리테스트의 1문1답 UI에 사용됩니다.',
      },
    },
  },
  argTypes: {
    pattern: {
      control: 'select',
      options: ['A', 'B', 'C', 'D', 'E'],
      description: '레이아웃 패턴',
    },
  },
};

const sampleAnswers = [
  '빛을 찾는다',
  '주변을 살핀다',
  '가만히 기다린다',
  '함께 있는 이를 확인한다',
];

const AnswerCards = ({ answers = sampleAnswers }) => {
  const [selected, setSelected] = useState(null);

  return (
    <>
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
    </>
  );
};

const WithParticles = ({ children }) => (
  <Box sx={{ position: 'relative' }}>
    <ParticleBackground count={30} />
    {children}
  </Box>
);

export const PatternA = {
  render: () => (
    <WithParticles>
      <QuestionLayout
        pattern="A"
        questionNumber="Q1."
        questionText={`어둠 속에서\n가장 먼저\n하는 일은?`}
        answers={<AnswerCards />}
        currentProgress="1/7"
      />
    </WithParticles>
  ),
};

export const PatternB = {
  render: () => (
    <WithParticles>
      <QuestionLayout
        pattern="B"
        questionNumber="Q2."
        questionText={`가장 소중한 사람을\n지킬 때\n당신의 무기는?`}
        answers={
          <AnswerCards
            answers={[
              '용기와 행동력',
              '지혜와 전략',
              '희생과 헌신',
              '직감과 민첩함',
            ]}
          />
        }
        currentProgress="2/7"
      />
    </WithParticles>
  ),
};

export const PatternC = {
  render: () => (
    <WithParticles>
      <QuestionLayout
        pattern="C"
        questionNumber="Q3."
        questionText="당신의 마음속 풍경은?"
        answers={
          <AnswerCards
            answers={[
              '광활한 하늘',
              '깊은 숲속',
              '끝없는 바다',
              '따뜻한 불빛의 집',
            ]}
          />
        }
        currentProgress="3/7"
      />
    </WithParticles>
  ),
};

export const PatternD = {
  render: () => (
    <WithParticles>
      <QuestionLayout
        pattern="D"
        questionNumber="Q4."
        questionText={`친구가\n위험에\n처했을 때\n당신은?`}
        answers={
          <AnswerCards
            answers={[
              '분위기 메이커',
              '묵묵한 리더',
              '듬직한 조력자',
              '현명한 조언자',
            ]}
          />
        }
        currentProgress="4/7"
      />
    </WithParticles>
  ),
};

export const PatternE = {
  render: () => (
    <WithParticles>
      <QuestionLayout
        pattern="E"
        questionNumber="Q5."
        questionText={`가장 강해지는\n순간은?`}
        answers={
          <AnswerCards
            answers={[
              '위기가 닥쳤을 때',
              '누군가를 지킬 때',
              '혼자 집중할 때',
              '자유를 느낄 때',
            ]}
          />
        }
        currentProgress="5/7"
      />
    </WithParticles>
  ),
};

export const AllPatterns = {
  render: () => {
    const patterns = ['A', 'B', 'C', 'D', 'E'];
    const [currentPattern, setCurrentPattern] = useState(0);

    return (
      <Box>
        <Box
          sx={{
            position: 'fixed',
            top: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
            display: 'flex',
            gap: 1,
          }}
        >
          {patterns.map((p, i) => (
            <Box
              key={p}
              onClick={() => setCurrentPattern(i)}
              sx={{
                px: 2,
                py: 1,
                backgroundColor: currentPattern === i ? '#87CEEB' : 'rgba(255,255,255,0.1)',
                color: currentPattern === i ? '#0a0a12' : '#fff',
                borderRadius: 1,
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontFamily: '"Cinzel", serif',
              }}
            >
              Pattern {p}
            </Box>
          ))}
        </Box>
        <WithParticles>
          <QuestionLayout
            pattern={patterns[currentPattern]}
            questionNumber={`Q${currentPattern + 1}.`}
            questionText="샘플 질문 텍스트입니다"
            answers={<AnswerCards />}
            currentProgress={`${currentPattern + 1}/7`}
          />
        </WithParticles>
      </Box>
    );
  },
};
