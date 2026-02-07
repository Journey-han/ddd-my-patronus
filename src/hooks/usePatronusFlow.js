import { useState, useRef, useCallback } from 'react';
import { matchPatronus } from '../data/resultData';

/**
 * usePatronusFlow 훅
 *
 * 페트로누스 심리테스트의 섹션 전환 흐름과 상태를 관리하는 커스텀 훅.
 *
 * 동작 흐름:
 * 1. 히어로 섹션 스크롤 완료 → 질문 섹션으로 전환
 * 2. 질문 완료 → 로딩 섹션으로 전환 + 페트로누스 계산
 * 3. 로딩 스크롤 완료 → 결과 섹션으로 전환
 * 4. 다시하기 → 히어로 섹션으로 리셋
 *
 * @returns {object} 섹션 상태, refs, 핸들러 함수들
 *
 * Example usage:
 * const { currentSection, patronus, refs, handlers } = usePatronusFlow();
 */
function usePatronusFlow() {
  // 섹션 상태
  const [currentSection, setCurrentSection] = useState('hero');
  const [traitScores, setTraitScores] = useState(null);
  const [patronus, setPatronus] = useState(null);

  // 섹션 refs
  const questionRef = useRef(null);
  const loadingRef = useRef(null);
  const resultRef = useRef(null);

  // 섹션으로 스크롤
  const scrollToSection = useCallback((ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // 히어로 스크롤 완료 → 질문 섹션으로
  const handleHeroEnd = useCallback(() => {
    if (currentSection === 'hero') {
      setCurrentSection('question');
    }
  }, [currentSection]);

  // 질문 완료 → 로딩 섹션으로
  const handleQuestionComplete = useCallback((scores) => {
    setTraitScores(scores);
    setCurrentSection('loading');

    // 결과 미리 계산
    const result = matchPatronus(scores);
    setPatronus(result);

    // 로딩 섹션으로 스크롤
    setTimeout(() => {
      scrollToSection(loadingRef);
    }, 100);
  }, [scrollToSection]);

  // 로딩 스크롤 완료 → 결과 섹션으로
  const handleLoadingEnd = useCallback(() => {
    if (currentSection === 'loading') {
      setCurrentSection('result');
    }
  }, [currentSection]);

  // 다시하기
  const handleRetry = useCallback(() => {
    setCurrentSection('hero');
    setTraitScores(null);
    setPatronus(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return {
    // 상태
    currentSection,
    traitScores,
    patronus,

    // Refs
    refs: {
      questionRef,
      loadingRef,
      resultRef,
    },

    // 핸들러
    handlers: {
      handleHeroEnd,
      handleQuestionComplete,
      handleLoadingEnd,
      handleRetry,
    },
  };
}

export default usePatronusFlow;
