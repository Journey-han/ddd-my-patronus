/**
 * 페트로누스 심리테스트 데이터
 *
 * 질문, 답변, 페트로누스 매칭 정보를 포함
 */

// Trait 목록
export const TRAITS = {
  brave: 'brave',
  leader: 'leader',
  protect: 'protect',
  playful: 'playful',
  creative: 'creative',
  wise: 'wise',
  free: 'free',
  loyal: 'loyal',
  mysterious: 'mysterious',
  independent: 'independent',
  intuitive: 'intuitive',
  hope: 'hope',
  resilient: 'resilient',
  devote: 'devote',
  clever: 'clever',
  agile: 'agile',
  calm: 'calm',
  social: 'social',
  warm: 'warm',
  confident: 'confident',
  adapt: 'adapt',
  patient: 'patient',
  insight: 'insight',
  alert: 'alert',
  beauty: 'beauty',
  graceful: 'graceful',
};

// 질문 데이터 (7문항)
export const questions = [
  {
    id: 1,
    pattern: 'A',
    question: '어둠 속에서\n가장 먼저\n하는 일은?',
    answers: [
      { text: '빛을 찾는다', traits: ['brave', 'hope'] },
      { text: '주변을 살핀다', traits: ['intuitive', 'alert'] },
      { text: '가만히 기다린다', traits: ['wise', 'calm'] },
      { text: '함께 있는 이를 확인한다', traits: ['protect', 'loyal'] },
    ],
  },
  {
    id: 2,
    pattern: 'B',
    question: '가장 소중한 사람을\n지킬 때\n당신의 무기는?',
    answers: [
      { text: '용기와 행동력', traits: ['brave', 'leader'] },
      { text: '지혜와 전략', traits: ['wise', 'clever'] },
      { text: '희생과 헌신', traits: ['loyal', 'devote'] },
      { text: '직감과 민첩함', traits: ['intuitive', 'agile'] },
    ],
  },
  {
    id: 3,
    pattern: 'C',
    question: '당신의 마음속\n풍경은?',
    answers: [
      { text: '광활한 하늘', traits: ['free', 'independent'] },
      { text: '깊은 숲속', traits: ['mysterious', 'calm'] },
      { text: '끝없는 바다', traits: ['creative', 'adapt'] },
      { text: '따뜻한 불빛의 집', traits: ['protect', 'warm'] },
    ],
  },
  {
    id: 4,
    pattern: 'D',
    question: '친구들 사이에서\n당신의 역할은?',
    answers: [
      { text: '분위기 메이커', traits: ['playful', 'social'] },
      { text: '묵묵한 리더', traits: ['leader', 'confident'] },
      { text: '듬직한 조력자', traits: ['protect', 'patient'] },
      { text: '현명한 조언자', traits: ['wise', 'insight'] },
    ],
  },
  {
    id: 5,
    pattern: 'E',
    question: '가장 강해지는\n순간은?',
    answers: [
      { text: '위기가 닥쳤을 때', traits: ['brave', 'resilient'] },
      { text: '누군가를 지킬 때', traits: ['protect', 'devote'] },
      { text: '혼자 집중할 때', traits: ['independent', 'intuitive'] },
      { text: '자유를 느낄 때', traits: ['free', 'graceful'] },
    ],
  },
  {
    id: 6,
    pattern: 'A',
    question: '고요한 밤,\n당신에게\n들리는 소리는?',
    answers: [
      { text: '바람 소리', traits: ['free', 'agile'] },
      { text: '심장 박동 소리', traits: ['brave', 'resilient'] },
      { text: '먼 곳의 음악', traits: ['creative', 'beauty'] },
      { text: '아무것도 — 고요 자체', traits: ['mysterious', 'calm'] },
    ],
  },
  {
    id: 7,
    pattern: 'B',
    question: '당신의 페트로누스에게\n바라는 것은?',
    answers: [
      { text: '함께 싸워주는 것', traits: ['brave', 'leader'] },
      { text: '길을 안내하는 것', traits: ['wise', 'insight'] },
      { text: '어둠을 밝히는 것', traits: ['hope', 'warm'] },
      { text: '곁에 있어주는 것', traits: ['loyal', 'devote'] },
    ],
  },
];

// 페트로누스 데이터 (11종 - 영상 파일과 매칭)
export const patronusList = [
  {
    id: 1,
    name: '수사슴',
    nameEn: 'Stag',
    emoji: '🦌',
    traits: ['brave', 'leader', 'protect'],
    description: '고귀하고 용감한 수호자. 위기의 순간 누구보다 먼저 앞에 서는 당신의 수사슴은 강인한 의지와 따뜻한 마음을 상징합니다.',
    quote: '고귀하고 용감한 수호자',
    video: '/src/assets/video/result_stag.mp4',
  },
  {
    id: 2,
    name: '수달',
    nameEn: 'Otter',
    emoji: '🦦',
    traits: ['playful', 'creative', 'adapt'],
    description: '장난기 넘치는 빛의 친구. 어떤 상황에서도 유연하게 적응하며 주변을 밝게 만드는 당신의 수달은 창의적인 영혼을 대변합니다.',
    quote: '장난기 넘치는 빛의 친구',
    video: '/src/assets/video/result_otter.mp4',
  },
  {
    id: 3,
    name: '늑대',
    nameEn: 'Wolf',
    emoji: '🐺',
    traits: ['loyal', 'intuitive', 'protect'],
    description: '어둠 속에서 곁을 지키는 그림자. 본능적인 직감과 깊은 충성심을 가진 당신의 늑대는 진정한 수호자의 상징입니다.',
    quote: '어둠 속에서 곁을 지키는 그림자',
    video: '/src/assets/video/result_wolf.mp4',
  },
  {
    id: 4,
    name: '암사슴',
    nameEn: 'Doe',
    emoji: '🦌',
    traits: ['graceful', 'calm', 'devote'],
    description: '고요한 숲의 우아한 정령. 헌신적이고 평화로운 당신의 암사슴은 깊은 사랑과 부드러운 강인함을 상징합니다.',
    quote: '고요한 숲의 우아한 정령',
    video: '/src/assets/video/result_doe.mp4',
  },
  {
    id: 5,
    name: '여우',
    nameEn: 'Fox',
    emoji: '🦊',
    traits: ['clever', 'creative', 'adapt'],
    description: '어떤 상황도 빠져나가는 영리한 빛. 기지와 창의력으로 가득한 당신의 여우는 지혜로운 생존자의 상징입니다.',
    quote: '어떤 상황도 빠져나가는 영리한 빛',
    video: '/src/assets/video/result_fox.mp4',
  },
  {
    id: 6,
    name: '매',
    nameEn: 'Hawk',
    emoji: '🦅',
    traits: ['free', 'insight', 'independent'],
    description: '가장 높은 곳에서 모든 것을 보는 눈. 자유로운 영혼과 날카로운 통찰력을 가진 당신의 매는 하늘의 지배자입니다.',
    quote: '가장 높은 곳에서 모든 것을 보는 눈',
    video: '/src/assets/video/result_hawk.mp4',
  },
  {
    id: 7,
    name: '고양이',
    nameEn: 'Cat',
    emoji: '🐱',
    traits: ['independent', 'intuitive', 'mysterious'],
    description: '고요히 곁을 지키는 신비로운 존재. 독립적이면서도 직관적인 당신의 고양이는 신비로운 동반자입니다.',
    quote: '고요히 곁을 지키는 신비로운 존재',
    video: '/src/assets/video/result_cat.mp4',
  },
  {
    id: 8,
    name: '고슴도치',
    nameEn: 'Hedgehog',
    emoji: '🦔',
    traits: ['protect', 'patient', 'warm'],
    description: '작지만 강인한 수호자. 따뜻한 마음을 감춘 채 묵묵히 곁을 지키는 당신의 고슴도치는 진정한 보호자입니다.',
    quote: '작지만 강인한 수호자',
    video: '/src/assets/video/result_hedgehog.mp4',
  },
  {
    id: 9,
    name: '펭귄',
    nameEn: 'Penguin',
    emoji: '🐧',
    traits: ['social', 'loyal', 'resilient'],
    description: '극한의 환경에서도 함께하는 동료. 사교적이고 충성스러운 당신의 펭귄은 공동체의 힘을 상징합니다.',
    quote: '극한의 환경에서도 함께하는 동료',
    video: '/src/assets/video/result_penguin.mp4',
  },
  {
    id: 10,
    name: '토끼',
    nameEn: 'Rabbit',
    emoji: '🐰',
    traits: ['agile', 'alert', 'hope'],
    description: '빠르고 기민한 희망의 상징. 민첩함과 경계심으로 위험을 피하는 당신의 토끼는 새로운 시작을 의미합니다.',
    quote: '빠르고 기민한 희망의 상징',
    video: '/src/assets/video/result_rabbit.mp4',
  },
  {
    id: 11,
    name: '고래',
    nameEn: 'Whale',
    emoji: '🐋',
    traits: ['wise', 'calm', 'mysterious'],
    description: '깊은 바다의 현자. 고요하고 신비로운 당신의 고래는 깊은 지혜와 내면의 평화를 상징합니다.',
    quote: '깊은 바다의 현자',
    video: '/src/assets/video/result_whale.mp4',
  },
];

/**
 * 페트로누스 매칭 알고리즘
 * @param {Object} traitScores - trait별 점수 객체
 * @returns {Object} 매칭된 페트로누스
 */
export function matchPatronus(traitScores) {
  const sorted = Object.entries(traitScores)
    .filter(([, score]) => score > 0)
    .sort(([, a], [, b]) => b - a);

  const topTraits = sorted.slice(0, 3).map(([trait]) => trait);

  const scores = patronusList.map((p) => {
    let score = 0;
    p.traits.forEach((trait) => {
      if (traitScores[trait]) {
        score += traitScores[trait];
      }
    });
    const directMatch = p.traits.filter((t) => topTraits.includes(t)).length;
    score += directMatch * 2;

    return { ...p, score };
  });

  return scores.sort((a, b) => b.score - a.score)[0];
}

/**
 * trait 점수 초기화
 * @returns {Object} 빈 trait 점수 객체
 */
export function initTraitScores() {
  return Object.keys(TRAITS).reduce((acc, trait) => {
    acc[trait] = 0;
    return acc;
  }, {});
}

/**
 * trait 점수 업데이트
 * @param {Object} currentScores - 현재 점수
 * @param {string[]} traits - 추가할 traits
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
