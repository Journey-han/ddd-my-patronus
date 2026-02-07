import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * QuestionLayout 컴포넌트
 *
 * 비정형 레이아웃 5패턴을 지원하는 질문 화면 레이아웃.
 * 질문마다 텍스트와 답변의 위치가 달라지는 다이나믹한 배치를 제공한다.
 *
 * 패턴 설명:
 * - A: 좌상단 질문 + 우하단 답변 흘림 (Q1, Q6)
 * - B: 우하단 질문 + 좌측 답변 산개 (Q2, Q7)
 * - C: 중앙 질문 + 하단 2x2 그리드 (Q3)
 * - D: 좌측 수직 질문 + 우측 수직 답변 (Q4)
 * - E: 대각선 산개 (Q5)
 *
 * Props:
 * @param {string} pattern - 레이아웃 패턴 ('A' | 'B' | 'C' | 'D' | 'E') [Required]
 * @param {string} questionNumber - 질문 번호 표시 (예: 'Q1.') [Required]
 * @param {string|React.ReactNode} questionText - 질문 텍스트 [Required]
 * @param {React.ReactNode} answers - 답변 카드들 [Required]
 * @param {string} currentProgress - 진행률 표시 (예: '1/7') [Optional]
 * @param {object} sx - MUI sx 스타일 [Optional]
 *
 * Example usage:
 * <QuestionLayout
 *   pattern="A"
 *   questionNumber="Q1."
 *   questionText="어둠 속에서 가장 먼저 하는 일은?"
 *   answers={<>{...answerCards}</>}
 *   currentProgress="1/7"
 * />
 */
function QuestionLayout({
  pattern = 'A',
  questionNumber,
  questionText,
  answers,
  currentProgress,
  sx = {},
}) {
  const getQuestionStyles = () => {
    switch (pattern) {
      case 'A':
        return {
          position: 'absolute',
          top: '15%',
          left: '8%',
          textAlign: 'left',
          maxWidth: '40%',
        };
      case 'B':
        return {
          position: 'absolute',
          bottom: '12%',
          right: '8%',
          textAlign: 'right',
          maxWidth: '45%',
        };
      case 'C':
        return {
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          maxWidth: '60%',
        };
      case 'D':
        return {
          position: 'absolute',
          top: '20%',
          left: '8%',
          textAlign: 'left',
          maxWidth: '35%',
        };
      case 'E':
        return {
          position: 'absolute',
          top: '12%',
          left: '8%',
          textAlign: 'left',
          maxWidth: '40%',
        };
      default:
        return {};
    }
  };

  const getAnswerContainerStyles = () => {
    switch (pattern) {
      case 'A':
        return {
          position: 'absolute',
          top: '45%',
          right: '8%',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'flex-end',
          '& > *:nth-of-type(1)': { marginRight: '20%' },
          '& > *:nth-of-type(2)': { marginRight: '5%' },
          '& > *:nth-of-type(3)': { marginRight: '15%' },
          '& > *:nth-of-type(4)': { marginRight: '30%' },
        };
      case 'B':
        return {
          position: 'absolute',
          top: '15%',
          left: '5%',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'flex-start',
          '& > *:nth-of-type(1)': { marginLeft: '0%' },
          '& > *:nth-of-type(2)': { marginLeft: '15%' },
          '& > *:nth-of-type(3)': { marginLeft: '5%' },
          '& > *:nth-of-type(4)': { marginLeft: '25%' },
        };
      case 'C':
        return {
          position: 'absolute',
          bottom: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 2,
          width: '70%',
          maxWidth: '500px',
        };
      case 'D':
        return {
          position: 'absolute',
          top: '18%',
          right: '10%',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          width: '45%',
          '& > *': {
            borderBottom: '1px solid rgba(135, 206, 235, 0.1)',
            '&:last-child': { borderBottom: 'none' },
          },
        };
      case 'E':
        return {
          position: 'absolute',
          inset: 0,
          '& > *:nth-of-type(1)': {
            position: 'absolute',
            top: '28%',
            left: '35%',
          },
          '& > *:nth-of-type(2)': {
            position: 'absolute',
            top: '48%',
            right: '15%',
          },
          '& > *:nth-of-type(3)': {
            position: 'absolute',
            bottom: '35%',
            left: '10%',
          },
          '& > *:nth-of-type(4)': {
            position: 'absolute',
            bottom: '18%',
            right: '25%',
          },
        };
      default:
        return {};
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: '#0a0a12',
        overflow: 'hidden',
        ...sx,
      }}
    >
      {/* Question */}
      <Box sx={getQuestionStyles()}>
        <Typography
          sx={{
            fontFamily: '"Cinzel", serif',
            fontWeight: 700,
            fontSize: '0.85rem',
            color: '#87CEEB',
            mb: 1,
            letterSpacing: '0.1em',
          }}
        >
          {questionNumber}
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Noto Sans KR", sans-serif',
            fontWeight: 500,
            fontSize: { xs: '1.25rem', md: '1.5rem' },
            color: '#ffffff',
            lineHeight: 1.6,
            whiteSpace: 'pre-line',
          }}
        >
          {questionText}
        </Typography>
      </Box>

      {/* Answers */}
      <Box sx={getAnswerContainerStyles()}>
        {answers}
      </Box>

      {/* Progress */}
      {currentProgress && (
        <Typography
          sx={{
            position: 'absolute',
            bottom: '5%',
            right: '5%',
            fontFamily: '"Cinzel", serif',
            fontWeight: 400,
            fontSize: '0.85rem',
            color: 'rgba(255, 255, 255, 0.4)',
          }}
        >
          {currentProgress}
        </Typography>
      )}
    </Box>
  );
}

export default QuestionLayout;
