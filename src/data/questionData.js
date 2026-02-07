// questionData.js
// ──────────────────────────────────────────────────
// 페트로누스 심리테스트 질문 데이터
//
// Trait 축 (A-F):
//   A: 용기/리더십 (Courage/Leadership)
//   B: 감성/공감 (Emotion/Empathy)
//   C: 자유/독립 (Freedom/Independence)
//   D: 지혜/전략 (Wisdom/Strategy)
//   E: 유머/사교 (Humor/Social)
//   F: 안정/헌신 (Stability/Devotion)
// ──────────────────────────────────────────────────

export const TRAITS = ['A', 'B', 'C', 'D', 'E', 'F'];

// 질문 데이터 (7문항)
export const questions = [
  {
    id: 1,
    pattern: 'C',
    question: '어둠 속에서\n가장 먼저 하는 일은?',
    answers: [
      { text: '빛을 찾는다', traits: ['A'] },
      { text: '주변을 살핀다', traits: ['D'] },
      { text: '가만히 기다린다', traits: ['F'] },
      { text: '함께 있는 이를 확인한다', traits: ['B'] },
    ],
  },
  {
    id: 2,
    pattern: 'C',
    question: '가장 소중한 사람을 지킬 때\n당신의 무기는?',
    answers: [
      { text: '용기와 행동력', traits: ['A'] },
      { text: '지혜와 전략', traits: ['D'] },
      { text: '희생과 헌신', traits: ['F', 'B'] },
      { text: '직감과 민첩함', traits: ['C'] },
    ],
  },
  {
    id: 3,
    pattern: 'C',
    question: '당신의 마음속 풍경은?',
    answers: [
      { text: '광활한 하늘', traits: ['C'] },
      { text: '깊은 숲속', traits: ['F'] },
      { text: '끝없는 바다', traits: ['B'] },
      { text: '따뜻한 불빛의 집', traits: ['E'] },
    ],
  },
  {
    id: 4,
    pattern: 'C',
    question: '친구들 사이에서\n당신의 역할은?',
    answers: [
      { text: '분위기 메이커', traits: ['E'] },
      { text: '묵묵한 리더', traits: ['A'] },
      { text: '듬직한 조력자', traits: ['F'] },
      { text: '현명한 조언자', traits: ['D'] },
    ],
  },
  {
    id: 5,
    pattern: 'C',
    question: '가장 강해지는 순간은?',
    answers: [
      { text: '위기가 닥쳤을 때', traits: ['A'] },
      { text: '누군가를 지킬 때', traits: ['B', 'F'] },
      { text: '혼자 집중할 때', traits: ['C'] },
      { text: '자유를 느낄 때', traits: ['C', 'E'] },
    ],
  },
  {
    id: 6,
    pattern: 'C',
    question: '고요한 밤,\n당신에게 들리는 소리는?',
    answers: [
      { text: '바람 소리', traits: ['C'] },
      { text: '심장 박동 소리', traits: ['A'] },
      { text: '먼 곳의 음악', traits: ['B'] },
      { text: '아무것도 — 고요 자체', traits: ['D', 'F'] },
    ],
  },
  {
    id: 7,
    pattern: 'C',
    question: '당신의 페트로누스에게\n바라는 것은?',
    answers: [
      { text: '함께 싸워주는 것', traits: ['A'] },
      { text: '길을 안내하는 것', traits: ['D'] },
      { text: '어둠을 밝히는 것', traits: ['E', 'B'] },
      { text: '곁에 있어주는 것', traits: ['F', 'B'] },
    ],
  },
];

/**
 * trait 점수 초기화
 * @returns {Object} 빈 trait 점수 객체 { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 }
 */
export function initTraitScores() {
  return TRAITS.reduce((acc, trait) => {
    acc[trait] = 0;
    return acc;
  }, {});
}

/**
 * trait 점수 업데이트
 * @param {Object} currentScores - 현재 점수
 * @param {string[]} traits - 추가할 traits (A-F)
 * @returns {Object} 업데이트된 점수
 */
export function updateTraitScores(currentScores, traits) {
  const newScores = { ...currentScores };
  traits.forEach((trait) => {
    if (trait in newScores) {
      newScores[trait] += 1;
    }
  });
  return newScores;
}
