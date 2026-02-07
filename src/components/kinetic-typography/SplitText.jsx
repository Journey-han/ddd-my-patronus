import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

/**
 * SplitText 컴포넌트
 *
 * 텍스트를 글자 단위로 분해하여 개별 애니메이션을 적용하는 컴포넌트.
 * 로딩 화면의 주문 텍스트 등에 사용된다.
 *
 * 동작 흐름:
 * 1. 텍스트가 글자 단위로 분해된다
 * 2. 각 글자가 지정된 딜레이로 순차적으로 나타난다
 * 3. 완료 후 글로우 효과가 적용될 수 있다
 *
 * Props:
 * @param {string} text - 분해할 텍스트 [Required]
 * @param {boolean} isActive - 애니메이션 활성화 여부 [Optional, 기본값: true]
 * @param {number} staggerDelay - 글자 간 딜레이 (ms) [Optional, 기본값: 80]
 * @param {number} duration - 각 글자 애니메이션 시간 (ms) [Optional, 기본값: 400]
 * @param {boolean} hasGlow - 완료 후 글로우 효과 [Optional, 기본값: false]
 * @param {string} glowColor - 글로우 색상 [Optional, 기본값: '#87CEEB']
 * @param {string} variant - 스타일 변형 ('title' | 'spell') [Optional, 기본값: 'title']
 * @param {object} sx - MUI sx 스타일 [Optional]
 *
 * Example usage:
 * <SplitText text="Expecto..." />
 * <SplitText text="PATRONUM!" variant="spell" hasGlow />
 */
function SplitText({
  text,
  isActive = true,
  staggerDelay = 80,
  duration = 400,
  hasGlow = false,
  glowColor = '#87CEEB',
  variant = 'title',
  sx = {},
}) {
  const [visibleChars, setVisibleChars] = useState(isActive ? text.length : 0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setVisibleChars(0);
      setIsComplete(false);
      return;
    }

    setVisibleChars(0);
    setIsComplete(false);

    const chars = text.split('');
    let currentChar = 0;

    const interval = setInterval(() => {
      currentChar++;
      setVisibleChars(currentChar);

      if (currentChar >= chars.length) {
        clearInterval(interval);
        setTimeout(() => setIsComplete(true), duration);
      }
    }, staggerDelay);

    return () => clearInterval(interval);
  }, [text, isActive, staggerDelay, duration]);

  const getVariantStyles = () => {
    switch (variant) {
      case 'spell':
        return {
          fontFamily: '"Cinzel", serif',
          fontWeight: 900,
          fontSize: { xs: '2rem', md: '2.5rem' },
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        };
      case 'title':
      default:
        return {
          fontFamily: '"Cinzel", serif',
          fontWeight: 700,
          fontSize: { xs: '1.5rem', md: '2rem' },
          fontStyle: 'italic',
          letterSpacing: '0.1em',
        };
    }
  };

  const chars = text.split('');

  return (
    <Box
      component="span"
      sx={{
        display: 'inline-block',
        color: '#ffffff',
        textShadow: isComplete && hasGlow
          ? `0 0 30px ${glowColor}, 0 0 60px ${glowColor}`
          : 'none',
        transition: 'text-shadow 0.5s ease',
        '@keyframes glowPulse': {
          '0%, 100%': { textShadow: `0 0 30px ${glowColor}, 0 0 60px ${glowColor}` },
          '50%': { textShadow: `0 0 40px ${glowColor}, 0 0 80px ${glowColor}` },
        },
        animation: isComplete && hasGlow ? 'glowPulse 2s ease-in-out infinite' : 'none',
        ...getVariantStyles(),
        ...sx,
      }}
    >
      {chars.map((char, index) => (
        <Box
          key={index}
          component="span"
          sx={{
            display: 'inline-block',
            opacity: index < visibleChars ? 0.9 : 0,
            transform: index < visibleChars ? 'translateY(0)' : 'translateY(10px)',
            transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </Box>
      ))}
    </Box>
  );
}

export default SplitText;
