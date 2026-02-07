import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * ProgressIndicator 컴포넌트
 *
 * 질문 진행률을 표시하는 인디케이터.
 * 상단에 고정되어 진행률 바와 번호를 표시한다.
 *
 * 동작 흐름:
 * 1. 현재 진행 상태에 따라 바의 너비가 변경된다
 * 2. 그라데이션 효과와 글로우로 시각적 피드백을 준다
 * 3. 우측에 현재/전체 번호가 표시된다
 *
 * Props:
 * @param {number} current - 현재 진행 번호 [Required]
 * @param {number} total - 전체 개수 [Required]
 * @param {string} glowColor - 글로우 색상 [Optional, 기본값: '#87CEEB']
 * @param {boolean} isFixed - 상단 고정 여부 [Optional, 기본값: true]
 * @param {object} sx - MUI sx 스타일 [Optional]
 *
 * Example usage:
 * <ProgressIndicator current={3} total={7} />
 */
function ProgressIndicator({
  current,
  total,
  glowColor = '#87CEEB',
  isFixed = true,
  sx = {},
}) {
  const progress = (current / total) * 100;

  return (
    <Box
      sx={{
        position: isFixed ? 'fixed' : 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: { xs: '12px 16px', sm: '14px 20px', md: '16px 24px' },
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 1.5, md: 2 },
        ...sx,
      }}
    >
      {/* Progress Bar Container */}
      <Box
        sx={{
          flex: 1,
          height: { xs: '2px', md: '2px' },
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '1px',
          overflow: 'hidden',
        }}
      >
        {/* Progress Bar Fill */}
        <Box
          sx={{
            width: `${progress}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${glowColor}, #6495ED)`,
            borderRadius: '1px',
            transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: `0 0 10px ${glowColor}`,
          }}
        />
      </Box>

      {/* Progress Text */}
      <Typography
        sx={{
          fontFamily: '"Cinzel", serif',
          fontWeight: 400,
          fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
          color: 'rgba(255, 255, 255, 0.4)',
          minWidth: { xs: '32px', md: '40px' },
          textAlign: 'right',
        }}
      >
        {current}/{total}
      </Typography>
    </Box>
  );
}

export default ProgressIndicator;
