import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * ScrollIndicator 컴포넌트
 *
 * 스크롤 유도 인디케이터.
 * 화살표와 텍스트로 사용자에게 스크롤을 유도한다.
 *
 * 동작 흐름:
 * 1. 화살표가 위아래로 바운스 애니메이션된다
 * 2. 선택적으로 "Scroll Down" 텍스트가 표시된다
 * 3. 스크롤 시 페이드아웃될 수 있다
 *
 * Props:
 * @param {string} text - 표시할 텍스트 [Optional, 기본값: 'Scroll Down']
 * @param {boolean} hasText - 텍스트 표시 여부 [Optional, 기본값: true]
 * @param {string} color - 색상 [Optional, 기본값: '#87CEEB']
 * @param {boolean} isVisible - 표시 여부 [Optional, 기본값: true]
 * @param {object} sx - MUI sx 스타일 [Optional]
 *
 * Example usage:
 * <ScrollIndicator />
 * <ScrollIndicator text="스크롤하세요" hasText={false} />
 */
function ScrollIndicator({
  text = 'Scroll Down',
  hasText = true,
  color = '#87CEEB',
  isVisible = true,
  sx = {},
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1.5,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s ease',
        '@keyframes bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
        ...sx,
      }}
    >
      {/* Arrow Box */}
      <Box
        sx={{
          width: 40,
          height: 40,
          border: `1px solid ${color}`,
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'bounce 2s ease-in-out infinite',
          backgroundColor: 'rgba(135, 206, 235, 0.05)',
        }}
      >
        <Box
          component="svg"
          viewBox="0 0 24 24"
          sx={{
            width: 20,
            height: 20,
            fill: 'none',
            stroke: color,
            strokeWidth: 2,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }}
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </Box>
      </Box>

      {/* Text */}
      {hasText && (
        <Typography
          sx={{
            fontFamily: '"Cinzel", serif',
            fontSize: '0.75rem',
            color: 'rgba(255, 255, 255, 0.5)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          {text}
        </Typography>
      )}
    </Box>
  );
}

export default ScrollIndicator;
