import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * GlowCard 컴포넌트
 *
 * 글로우 효과가 있는 답변 카드.
 * default → hover → selected 3단계 상태 변화가 있다.
 *
 * 동작 흐름:
 * 1. 기본 상태: 반투명 배경 + 희미한 테두리
 * 2. 호버 시: 배경 밝아지고 테두리 강조, 살짝 위로 이동
 * 3. 선택 시: 글로우 효과 확산, 스케일 바운스 애니메이션
 * 4. 선택 후: 다른 카드들은 페이드아웃
 *
 * Props:
 * @param {React.ReactNode} children - 카드 내용 [Required]
 * @param {boolean} isSelected - 선택 상태 [Optional, 기본값: false]
 * @param {boolean} isDismissed - 다른 카드 선택으로 인한 페이드아웃 [Optional, 기본값: false]
 * @param {function} onClick - 클릭 핸들러 [Optional]
 * @param {string} glowColor - 글로우 색상 [Optional, 기본값: '#87CEEB']
 * @param {object} sx - MUI sx 스타일 [Optional]
 *
 * Example usage:
 * <GlowCard onClick={handleSelect}>빛을 찾는다</GlowCard>
 * <GlowCard isSelected>선택된 답변</GlowCard>
 */
function GlowCard({
  children,
  isSelected = false,
  isDismissed = false,
  onClick,
  glowColor = '#87CEEB',
  sx = {},
}) {
  const [isHovered, setIsHovered] = useState(false);

  const getBackgroundColor = () => {
    if (isSelected) return `rgba(135, 206, 235, 0.15)`;
    if (isHovered) return `rgba(135, 206, 235, 0.08)`;
    return 'rgba(255, 255, 255, 0.03)';
  };

  const getBorderColor = () => {
    if (isSelected) return `rgba(135, 206, 235, 0.6)`;
    if (isHovered) return `rgba(135, 206, 235, 0.3)`;
    return 'rgba(135, 206, 235, 0.15)';
  };

  const getBoxShadow = () => {
    if (isSelected) {
      return `0 0 25px rgba(135, 206, 235, 0.4), 0 0 50px rgba(135, 206, 235, 0.2)`;
    }
    if (isHovered) {
      return `0 0 15px rgba(135, 206, 235, 0.2)`;
    }
    return 'none';
  };

  return (
    <Box
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      sx={{
        position: 'relative',
        padding: { xs: '12px 14px', sm: '14px 18px', md: '16px 24px' },
        backgroundColor: getBackgroundColor(),
        border: `1px solid ${getBorderColor()}`,
        borderRadius: '4px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isSelected
          ? 'translateY(-2px)'
          : isHovered
            ? 'translateY(-2px) scale(1.01)'
            : isDismissed
              ? 'scale(0.95)'
              : 'translateY(0)',
        opacity: isDismissed ? 0 : 1,
        boxShadow: getBoxShadow(),
        // 터치 디바이스에서 hover 효과 개선
        '@media (hover: none)': {
          '&:active': {
            backgroundColor: `rgba(135, 206, 235, 0.08)`,
            borderColor: `rgba(135, 206, 235, 0.3)`,
          },
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: { xs: '10px', md: '16px' },
          width: { xs: '4px', md: '8px' },
          height: '100%',
          background: isSelected
            ? `linear-gradient(180deg, transparent, ${glowColor}, transparent)`
            : 'transparent',
          opacity: 0.6,
          transition: 'background 0.3s ease',
        },
        '@keyframes selectBounce': {
          '0%': { transform: 'scale(0.97)' },
          '50%': { transform: 'scale(1.03)' },
          '100%': { transform: 'scale(1) translateY(-2px)' },
        },
        animation: isSelected ? 'selectBounce 0.3s ease-out' : 'none',
        // 터치 영역 확대
        minHeight: { xs: '48px', md: 'auto' },
        ...sx,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 0.5, md: 1 },
        }}
      >
        <Typography
          component="span"
          sx={{
            color: glowColor,
            fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
            opacity: 0.8,
          }}
        >
          ✧
        </Typography>
        <Typography
          sx={{
            color: '#ffffff',
            fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
            fontFamily: '"Noto Sans KR", sans-serif',
            fontWeight: 400,
            lineHeight: 1.4,
          }}
        >
          {children}
        </Typography>
      </Box>
    </Box>
  );
}

export default GlowCard;
