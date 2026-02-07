import Box from '@mui/material/Box';

/**
 * Vignette 컴포넌트
 *
 * 화면 가장자리를 어둡게 처리하여 중앙에 집중하게 만드는 오버레이.
 * 영상 위에 사용하여 영화적인 분위기를 연출한다.
 *
 * 동작 흐름:
 * 1. radial-gradient로 가장자리를 어둡게 처리
 * 2. 선택적으로 하단 그라데이션 추가 가능
 *
 * Props:
 * @param {number} intensity - 비네팅 강도 (0-1) [Optional, 기본값: 0.6]
 * @param {string} color - 비네팅 색상 [Optional, 기본값: '#0a0a12']
 * @param {boolean} hasBottomGradient - 하단 그라데이션 추가 여부 [Optional, 기본값: false]
 * @param {number} bottomGradientOpacity - 하단 그라데이션 투명도 (0-1) [Optional, 기본값: 0]
 * @param {object} sx - MUI sx 스타일 [Optional]
 *
 * Example usage:
 * <Vignette />
 * <Vignette intensity={0.8} hasBottomGradient bottomGradientOpacity={0.7} />
 */
function Vignette({
  intensity = 0.6,
  color = '#0a0a12',
  hasBottomGradient = false,
  bottomGradientOpacity = 0,
  sx = {},
}) {
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
        ...sx,
      }}
    >
      {/* Radial Vignette */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(
            ellipse at center,
            transparent 0%,
            transparent 40%,
            ${color}${Math.round(intensity * 0.3 * 255).toString(16).padStart(2, '0')} 70%,
            ${color}${Math.round(intensity * 255).toString(16).padStart(2, '0')} 100%
          )`,
        }}
      />

      {/* Bottom Gradient (for section transitions) */}
      {(hasBottomGradient || bottomGradientOpacity > 0) && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(
              to top,
              ${color} 0%,
              ${color}${Math.round(bottomGradientOpacity * 0.8 * 255).toString(16).padStart(2, '0')} 30%,
              transparent 60%
            )`,
            opacity: bottomGradientOpacity > 0 ? 1 : 0.7,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}
    </Box>
  );
}

export default Vignette;
