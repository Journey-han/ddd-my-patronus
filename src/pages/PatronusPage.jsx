import Box from '@mui/material/Box';
import PatronusHero from '../components/templates/PatronusHero';
import PatronusQuestion from '../components/templates/PatronusQuestion';
import PatronusLoading from '../components/templates/PatronusLoading';
import PatronusResult from '../components/templates/PatronusResult';
import usePatronusFlow from '../hooks/usePatronusFlow';
import { sharePatronusResult } from '../utils/share';

/**
 * PatronusPage 컴포넌트
 *
 * 페트로누스 심리테스트 전체 페이지.
 * 4개의 섹션을 순차적으로 진행하며 사용자의 페트로누스를 찾아준다.
 *
 * 동작 흐름:
 * 1. 히어로 섹션: 스크롤 비디오 스크러빙으로 시작
 * 2. 질문 섹션: 7개 질문에 1문1답 형식으로 답변
 * 3. 로딩 섹션: "Expecto... PATRONUM!" 연출
 * 4. 결과 섹션: 매칭된 페트로누스 결과 표시
 */
function PatronusPage() {
  const {
    currentSection,
    patronus,
    refs: { questionRef, loadingRef, resultRef },
    handlers: { handleHeroEnd, handleQuestionComplete, handleLoadingEnd, handleRetry },
  } = usePatronusFlow();

  // 공유하기
  const handleShare = () => {
    sharePatronusResult(patronus);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#0a0a12',
        minHeight: '100vh',
      }}
    >
      {/* ① 히어로 섹션 */}
      <PatronusHero
        videoSrc="/video/main_hero.mp4"
        onScrollEnd={handleHeroEnd}
      />

      {/* ② 질문 섹션 */}
      <Box ref={questionRef}>
        <PatronusQuestion
          onComplete={handleQuestionComplete}
        />
      </Box>

      {/* ③ 로딩 섹션 */}
      {(currentSection === 'loading' || currentSection === 'result') && (
        <Box ref={loadingRef}>
          <PatronusLoading
            videoSrc="/video/loading.mp4"
            onScrollEnd={handleLoadingEnd}
          />
        </Box>
      )}

      {/* ④ 결과 섹션 */}
      {currentSection === 'result' && patronus && (
        <Box ref={resultRef}>
          <PatronusResult
            patronus={patronus}
            onShare={handleShare}
            onRetry={handleRetry}
          />
        </Box>
      )}
    </Box>
  );
}

export default PatronusPage;
