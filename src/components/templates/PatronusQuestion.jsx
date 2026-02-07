import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ParticleBackground from '../motion/ParticleBackground';
import GlowCard from '../card/GlowCard';
import ProgressIndicator from '../../common/ui/ProgressIndicator';
import { questions, initTraitScores, updateTraitScores } from '../../data/questionData';

/**
 * PatronusQuestion 컴포넌트
 *
 * 페트로누스 심리테스트의 질문 섹션.
 * 1문1답 형식으로 7개의 질문을 순차적으로 표시한다.
 *
 * 동작 흐름:
 * 1. 질문과 답변이 화면 바깥에서 중앙으로 모여드는 애니메이션으로 등장
 * 2. 답변을 선택하면 선택된 카드가 강조되고 다른 카드는 흩어짐
 * 3. 다음 질문이 다시 바깥에서 모여드는 애니메이션으로 등장
 * 4. 모든 질문 완료 시 onComplete 콜백이 호출된다
 *
 * Props:
 * @param {function} onComplete - 모든 질문 완료 시 콜백 (traitScores를 전달) [Optional]
 * @param {object} sx - MUI sx 스타일 [Optional]
 *
 * Example usage:
 * <PatronusQuestion onComplete={(scores) => console.log(scores)} />
 */
function PatronusQuestion({
  onComplete,
  sx = {},
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [animationPhase, setAnimationPhase] = useState('entering'); // 'entering' | 'idle' | 'exiting'
  const [traitScores, setTraitScores] = useState(initTraitScores());

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  // 질문이 바뀔 때마다 entering 애니메이션 시작
  useEffect(() => {
    setAnimationPhase('entering');
    const timer = setTimeout(() => {
      setAnimationPhase('idle');
    }, 800);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // 모바일 여부 감지 (간단한 width 체크)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 600;

  // 각 답변 카드의 초기 위치 (바깥에서 들어오는 방향) - 모바일에서는 더 작은 값
  const getInitialPosition = (index) => {
    const offset = isMobile ? 80 : 150;
    const yOffset = isMobile ? 60 : 100;
    const positions = [
      { x: -offset, y: -yOffset },  // 좌상단에서
      { x: offset, y: -yOffset },   // 우상단에서
      { x: -offset, y: yOffset },   // 좌하단에서
      { x: offset, y: yOffset },    // 우하단에서
    ];
    return positions[index] || { x: 0, y: yOffset };
  };

  // 각 답변 카드의 퇴장 위치 (흩어지는 방향) - 모바일에서는 더 작은 값
  const getExitPosition = (index, isSelected) => {
    if (isSelected) {
      return { x: 0, y: -30, scale: 1.05, opacity: 0 };
    }
    const offset = isMobile ? 100 : 200;
    const yOffset = isMobile ? 80 : 150;
    const positions = [
      { x: -offset, y: -yOffset, scale: 0.8, opacity: 0 },
      { x: offset, y: -yOffset, scale: 0.8, opacity: 0 },
      { x: -offset, y: yOffset, scale: 0.8, opacity: 0 },
      { x: offset, y: yOffset, scale: 0.8, opacity: 0 },
    ];
    return positions[index] || { x: 0, y: yOffset, scale: 0.8, opacity: 0 };
  };

  const handleAnswerSelect = (answerIndex) => {
    if (animationPhase !== 'idle' || selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);

    // Trait 점수 업데이트
    const selectedTraits = currentQuestion.answers[answerIndex].traits;
    const newScores = updateTraitScores(traitScores, selectedTraits);
    setTraitScores(newScores);

    // 퇴장 애니메이션 시작
    setTimeout(() => {
      setAnimationPhase('exiting');

      setTimeout(() => {
        if (currentIndex < totalQuestions - 1) {
          setCurrentIndex(currentIndex + 1);
          setSelectedAnswer(null);
          // entering은 useEffect에서 처리됨
        } else {
          // 모든 질문 완료
          if (onComplete) {
            onComplete(newScores);
          }
        }
      }, 600);
    }, 400);
  };

  // 질문 텍스트의 트랜스폼 계산
  const getQuestionTransform = () => {
    if (animationPhase === 'entering') {
      return 'translateY(-80px) scale(0.9)';
    }
    if (animationPhase === 'exiting') {
      return 'translateY(-60px) scale(0.95)';
    }
    return 'translateY(0) scale(1)';
  };

  const getQuestionOpacity = () => {
    if (animationPhase === 'entering') return 0;
    if (animationPhase === 'exiting') return 0;
    return 1;
  };

  // 답변 카드의 트랜스폼 계산
  const getAnswerTransform = (index) => {
    if (animationPhase === 'entering') {
      const pos = getInitialPosition(index);
      return `translate(${pos.x}px, ${pos.y}px) scale(0.8)`;
    }
    if (animationPhase === 'exiting') {
      const pos = getExitPosition(index, selectedAnswer === index);
      return `translate(${pos.x}px, ${pos.y}px) scale(${pos.scale})`;
    }
    return 'translate(0, 0) scale(1)';
  };

  const getAnswerOpacity = (index) => {
    if (animationPhase === 'entering') return 0;
    if (animationPhase === 'exiting') {
      return selectedAnswer === index ? 0.8 : 0;
    }
    if (selectedAnswer !== null && selectedAnswer !== index) {
      return 0.3;
    }
    return 1;
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#0a0a12',
        overflow: 'hidden',
        ...sx,
      }}
    >
      {/* Progress Indicator */}
      <ProgressIndicator
        current={currentIndex + 1}
        total={totalQuestions}
      />

      {/* Particles */}
      <ParticleBackground
        count={25}
        color="#87CEEB"
        brightness={0.8}
      />

      {/* Question Content - Pattern C: 중앙 질문 + 하단 2x2 그리드 */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100vh',
        }}
      >
        {/* Question Text - 상단 중앙 */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: '22%', sm: '25%', md: '28%' },
            left: '50%',
            transform: `translateX(-50%) ${getQuestionTransform()}`,
            opacity: getQuestionOpacity(),
            transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            textAlign: 'center',
            width: { xs: '90%', sm: '85%', md: '80%' },
            maxWidth: '600px',
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Cinzel", serif',
              fontWeight: 700,
              fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
              color: '#87CEEB',
              mb: { xs: 0.5, md: 1 },
              letterSpacing: '0.1em',
            }}
          >
            {`Q${currentQuestion.id}.`}
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Noto Sans KR", sans-serif',
              fontWeight: 500,
              fontSize: { xs: '1rem', sm: '1.15rem', md: '1.5rem' },
              color: '#ffffff',
              lineHeight: { xs: 1.5, md: 1.6 },
              whiteSpace: 'pre-line',
            }}
          >
            {currentQuestion.question}
          </Typography>
        </Box>

        {/* Answer Cards - 하단 2x2 그리드 */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: '42%', sm: '45%', md: '48%' },
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: { xs: 1, sm: 1.25, md: 1.5 },
            width: { xs: '92%', sm: '88%', md: '85%' },
            maxWidth: '500px',
            px: { xs: 1, sm: 2 },
          }}
        >
          {currentQuestion.answers.map((answer, index) => (
            <Box
              key={`${currentIndex}-${index}`}
              sx={{
                transform: getAnswerTransform(index),
                opacity: getAnswerOpacity(index),
                transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.08}s`,
                filter: animationPhase === 'exiting' && selectedAnswer !== index ? 'blur(4px)' : 'blur(0)',
              }}
            >
              <GlowCard
                isSelected={selectedAnswer === index}
                isDismissed={false}
                onClick={() => handleAnswerSelect(index)}
              >
                {answer.text}
              </GlowCard>
            </Box>
          ))}
        </Box>

        {/* Progress */}
        <Typography
          sx={{
            position: 'absolute',
            bottom: { xs: '3%', sm: '4%', md: '5%' },
            right: { xs: '4%', sm: '5%' },
            fontFamily: '"Cinzel", serif',
            fontWeight: 400,
            fontSize: { xs: '0.75rem', md: '0.85rem' },
            color: 'rgba(255, 255, 255, 0.4)',
            opacity: animationPhase === 'idle' ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          {`${currentIndex + 1}/${totalQuestions}`}
        </Typography>
      </Box>
    </Box>
  );
}

export default PatronusQuestion;
