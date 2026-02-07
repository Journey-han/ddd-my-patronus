import { useMemo } from 'react';
import Box from '@mui/material/Box';

/**
 * ParticleBackground 컴포넌트
 *
 * CSS animation 기반의 파티클 배경 효과.
 * 반짝이는 별/빛 입자가 떠다니는 판타지 분위기를 연출한다.
 *
 * 동작 흐름:
 * 1. 지정된 개수만큼 파티클이 랜덤 위치에 생성된다
 * 2. 각 파티클이 개별적인 속도와 딜레이로 깜빡인다
 * 3. 선택적으로 위로 떠오르는 애니메이션이 적용된다
 *
 * Props:
 * @param {number} count - 파티클 개수 [Optional, 기본값: 50]
 * @param {string} color - 파티클 색상 [Optional, 기본값: '#87CEEB']
 * @param {number} minSize - 최소 크기 (px) [Optional, 기본값: 2]
 * @param {number} maxSize - 최대 크기 (px) [Optional, 기본값: 6]
 * @param {boolean} isFloating - 위로 떠오르는 애니메이션 여부 [Optional, 기본값: false]
 * @param {number} brightness - 밝기 (0-2) [Optional, 기본값: 1]
 * @param {object} sx - MUI sx 스타일 [Optional]
 *
 * Example usage:
 * <ParticleBackground />
 * <ParticleBackground count={30} color="#87CEEB" isFloating />
 */
function ParticleBackground({
  count = 50,
  color = '#87CEEB',
  minSize = 2,
  maxSize = 6,
  isFloating = false,
  brightness = 1,
  sx = {},
}) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: minSize + Math.random() * (maxSize - minSize),
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 3,
      floatDuration: 10 + Math.random() * 20,
      floatDelay: Math.random() * 10,
    }));
  }, [count, minSize, maxSize]);

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 3,
        filter: `brightness(${brightness})`,
        '@keyframes particleTwinkle': {
          '0%, 100%': { opacity: 0.2, transform: 'scale(0.8)' },
          '50%': { opacity: 1, transform: 'scale(1.2)' },
        },
        '@keyframes particleFloat': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0)' },
        },
        ...sx,
      }}
    >
      {particles.map((p) => (
        <Box
          key={p.id}
          sx={{
            position: 'absolute',
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            backgroundColor: color,
            boxShadow: `0 0 ${p.size * 2}px ${color}, 0 0 ${p.size * 4}px ${color}`,
            animation: isFloating
              ? `particleTwinkle ${p.duration}s ease-in-out ${p.delay}s infinite, particleFloat ${p.floatDuration}s ease-in-out ${p.floatDelay}s infinite`
              : `particleTwinkle ${p.duration}s ease-in-out ${p.delay}s infinite`,
            willChange: 'opacity, transform',
          }}
        />
      ))}
    </Box>
  );
}

export default ParticleBackground;
