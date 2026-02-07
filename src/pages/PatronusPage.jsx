import { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import PatronusHero from '../components/templates/PatronusHero';
import PatronusQuestion from '../components/templates/PatronusQuestion';
import PatronusLoading from '../components/templates/PatronusLoading';
import PatronusResult from '../components/templates/PatronusResult';
import { matchPatronus } from '../data/resultData';

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
 *
 * 상태:
 * - currentSection: 현재 활성화된 섹션 ('hero' | 'question' | 'loading' | 'result')
 * - traitScores: 질문 답변으로 누적된 trait 점수
 * - patronus: 매칭된 페트로누스 데이터
 */
function PatronusPage() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [traitScores, setTraitScores] = useState(null);
  const [patronus, setPatronus] = useState(null);

  const questionRef = useRef(null);
  const loadingRef = useRef(null);
  const resultRef = useRef(null);

  // 섹션 전환 시 해당 섹션으로 스크롤
  const scrollToSection = (ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 히어로 스크롤 완료 → 질문 섹션으로
  const handleHeroEnd = () => {
    if (currentSection === 'hero') {
      setCurrentSection('question');
    }
  };

  // 질문 완료 → 로딩 섹션으로
  const handleQuestionComplete = (scores) => {
    setTraitScores(scores);
    setCurrentSection('loading');

    // 결과 미리 계산
    const result = matchPatronus(scores);
    setPatronus(result);

    // 로딩 섹션으로 스크롤
    setTimeout(() => {
      scrollToSection(loadingRef);
    }, 100);
  };

  // 로딩 스크롤 완료 → 결과 섹션으로
  const handleLoadingEnd = () => {
    if (currentSection === 'loading') {
      setCurrentSection('result');
    }
  };

  // 공유하기
  const handleShare = () => {
    if (navigator.share && patronus) {
      navigator.share({
        title: '나의 페트로누스',
        text: `나의 페트로누스는 ${patronus.emoji} ${patronus.name}입니다! 당신의 페트로누스도 찾아보세요.`,
        url: window.location.href,
      }).catch(() => {
        // 공유 취소 시 무시
      });
    } else {
      // Web Share API 미지원 시 URL 복사
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 복사되었습니다!');
    }
  };

  // 다시하기
  const handleRetry = () => {
    setCurrentSection('hero');
    setTraitScores(null);
    setPatronus(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        videoSrc="/src/assets/video/main_hero.mp4"
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
            videoSrc="/src/assets/video/loading.mp4"
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
