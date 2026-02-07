import { useMemo } from 'react';
import Box from '@mui/material/Box';

/**
 * ScrollRandomRevealText 컴포넌트
 *
 * 스크롤 progress에 따라 글자를 랜덤 순서로 reveal하는 키네틱 타이포그래피.
 * Fisher-Yates 셔플로 랜덤 순서를 생성하고, progress 값에 따라 reveal 수 결정.
 *
 * 동작 흐름:
 * 1. 컴포넌트가 마운트되면 공백을 제외한 글자의 랜덤 순서를 생성한다
 * 2. progress (0-1) 값에 따라 reveal할 글자 수가 결정된다
 * 3. 랜덤 순서대로 해당 수만큼의 글자가 blur(12px) → blur(0) 전환
 * 4. progress가 1이 되면 모든 글자가 reveal된다
 *
 * Props:
 * @param {string} text - 표시할 텍스트 [Required]
 * @param {number} progress - 스크롤 진행 비율 (0-1) [Required]
 * @param {string} variant - MUI Typography variant [Optional, 기본값: 'body1']
 * @param {object} sx - MUI sx 스타일 [Optional]
 *
 * Example usage:
 * <ScrollRandomRevealText text="Hello World" progress={scrollProgress} />
 */
function ScrollRandomRevealText({
  text,
  progress = 0,
  variant = 'body1',
  sx = {},
}) {
  /** 공백을 제외한 글자의 랜덤 순서 생성 (Fisher-Yates shuffle) */
  const randomOrder = useMemo(() => {
    const indices = text
      .split('')
      .map((char, i) => (char !== ' ' ? i : -1))
      .filter((i) => i !== -1);

    // Fisher-Yates shuffle with seeded random for consistency
    const seededRandom = (seed) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(seededRandom(i + text.length) * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  }, [text]);

  /** progress에 따른 reveal된 글자 인덱스 Set 계산 */
  const revealedIndices = useMemo(() => {
    const revealCount = Math.floor(progress * randomOrder.length);
    const revealed = new Set();
    for (let i = 0; i < revealCount; i++) {
      revealed.add(randomOrder[i]);
    }
    return revealed;
  }, [progress, randomOrder]);

  return (
    <Box
      component="span"
      sx={{
        typography: variant,
        ...sx,
      }}
    >
      {text.split('').map((char, index) => {
        const isRevealed = char === ' ' || revealedIndices.has(index);
        return (
          <Box
            component="span"
            key={index}
            sx={{
              display: 'inline-block',
              opacity: isRevealed ? 1 : 0,
              // 모바일에서는 blur 효과를 줄여 성능 최적화
              filter: {
                xs: isRevealed ? 'blur(0px)' : 'blur(4px)',
                md: isRevealed ? 'blur(0px)' : 'blur(8px)',
              },
              transition: 'opacity 0.4s ease-out, filter 0.4s ease-out',
              minWidth: char === ' ' ? '0.3em' : undefined,
              willChange: 'opacity, filter',
            }}
          >
            {char}
          </Box>
        );
      })}
    </Box>
  );
}

export default ScrollRandomRevealText;
