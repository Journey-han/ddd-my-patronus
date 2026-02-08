# 패트로누스 프로젝트 컴포넌트 목록

> 이 문서는 Patronus Finder 프로젝트에서 사용된 컴포넌트를 정리한 문서입니다.

---

## 📋 목차

1. [메인 템플릿 컴포넌트](#메인-템플릿-컴포넌트)
2. [카드 컴포넌트](#카드-컴포넌트)
3. [모션 & 시각 효과 컴포넌트](#모션--시각-효과-컴포넌트)
4. [공통 UI 컴포넌트](#공통-ui-컴포넌트)
5. [커스텀 훅](#커스텀-훅)
6. [데이터 & 유틸리티](#데이터--유틸리티)

---

## 메인 템플릿 컴포넌트

패트로누스 테스트의 4개 섹션을 구성하는 핵심 템플릿입니다.

| 컴포넌트 | 경로 | 설명 |
|---------|------|------|
| **PatronusPage** | `src/pages/PatronusPage.jsx` | 4개 섹션을 통합 관리하는 메인 페이지 컨테이너 |
| **PatronusHero** | `src/components/templates/PatronusHero.jsx` | 히어로 섹션 - 스크롤 비디오 스크러빙 + 내러티브 텍스트 |
| **PatronusQuestion** | `src/components/templates/PatronusQuestion.jsx` | 질문 섹션 - 1문1답 형식 7개 질문 |
| **PatronusLoading** | `src/components/templates/PatronusLoading.jsx` | 로딩 섹션 - "Expecto Patronum" 텍스트 연출 |
| **PatronusResult** | `src/components/templates/PatronusResult.jsx` | 결과 섹션 - 비디오 스크러빙 + 슬라이드업 카드 |

### PatronusHero

```jsx
<PatronusHero
  videoSrc="/video/patronus-intro.mp4"
  onScrollEnd={handleHeroComplete}
/>
```

**주요 Props:**
- `videoSrc` - 배경 비디오 경로
- `onScrollEnd` - 스크롤 완료 시 콜백

**구성 요소:**
- 스크롤 연동 비디오 스크러빙
- 5단계 내러티브 텍스트 (ScrollRandomRevealText)
- 파티클 배경 효과
- 비네팅 오버레이

### PatronusQuestion

```jsx
<PatronusQuestion onComplete={handleQuestionComplete} />
```

**주요 Props:**
- `onComplete` - 모든 질문 완료 시 trait 점수와 함께 콜백

**구성 요소:**
- 7개 질문 순차 표시
- GlowCard 기반 답변 선택
- 프로그레스 인디케이터
- 질문 전환 애니메이션

### PatronusLoading

```jsx
<PatronusLoading
  videoSrc="/video/patronus-loading.mp4"
  onScrollEnd={handleLoadingComplete}
/>
```

**주요 Props:**
- `videoSrc` - 로딩 비디오 경로
- `onScrollEnd` - 스크롤 완료 시 콜백

**구성 요소:**
- 스크롤 연동 비디오 스크러빙
- "Expecto..." → "PATRONUM!" 텍스트 전환
- 은빛 플래시 효과

### PatronusResult

```jsx
<PatronusResult
  patronus={matchedPatronus}
  onShare={handleShare}
  onRetry={handleRetry}
/>
```

**주요 Props:**
- `patronus` (Required) - 매칭된 패트로누스 데이터
- `onShare` - 공유 버튼 클릭 콜백
- `onRetry` - 다시하기 버튼 클릭 콜백

**구성 요소:**
- Sticky 배경 비디오 스크러빙
- 슬라이드업 결과 카드 (이모지, 이름, 설명, 태그)
- ResultGradientOverlay (Three.js 그라데이션)
- 공유/다시하기 버튼

---

## 카드 컴포넌트

### GlowCard

답변 선택용 글로우 효과 카드. 3단계 상태 변화 (default → hover → selected)

```jsx
<GlowCard
  isSelected={isSelected}
  isDismissed={isDismissed}
  onClick={handleSelect}
  glowColor="#87CEEB"
>
  답변 텍스트
</GlowCard>
```

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `children` | node | Required | 카드 내용 |
| `isSelected` | boolean | false | 선택 상태 |
| `isDismissed` | boolean | false | 퇴장 애니메이션 상태 |
| `onClick` | function | - | 클릭 핸들러 |
| `glowColor` | string | '#87CEEB' | 글로우 색상 |

**경로:** `src/components/card/GlowCard.jsx`

---

## 모션 & 시각 효과 컴포넌트

### ParticleBackground

CSS 기반 떠다니는 파티클 배경 효과

```jsx
<ParticleBackground
  count={50}
  color="#87CEEB"
  brightness={1.2}
  isFloating={true}
/>
```

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `count` | number | 50 | 파티클 개수 |
| `color` | string | '#87CEEB' | 파티클 색상 |
| `minSize` | number | 2 | 최소 크기 (px) |
| `maxSize` | number | 6 | 최대 크기 (px) |
| `brightness` | number | 1 | 밝기 배수 |
| `isFloating` | boolean | true | 떠다니는 애니메이션 여부 |

**경로:** `src/components/motion/ParticleBackground.jsx`

---

### ScrollRandomRevealText

스크롤 진행도에 연동되어 글자가 랜덤 순서로 나타나는 텍스트

```jsx
<ScrollRandomRevealText
  text="모든 사람의 내면에는 아직 깨어나지 않은 수호자가 존재합니다."
  progress={scrollProgress}
  variant="h4"
/>
```

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `text` | string | Required | 표시할 텍스트 |
| `progress` | number | Required | 스크롤 진행도 (0~1) |
| `variant` | string | 'body1' | Typography variant |

**경로:** `src/components/kinetic-typography/ScrollRandomRevealText.jsx`

---

### Vignette

화면 가장자리 어둡게 처리하는 비네팅 오버레이

```jsx
<Vignette
  intensity={0.6}
  color="#0a0a12"
  hasBottomGradient={true}
  bottomGradientOpacity={0.8}
/>
```

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `intensity` | number | 0.6 | 비네팅 강도 |
| `color` | string | '#0a0a12' | 비네팅 색상 |
| `hasBottomGradient` | boolean | false | 하단 그라데이션 추가 여부 |
| `bottomGradientOpacity` | number | 0.5 | 하단 그라데이션 투명도 |

**경로:** `src/components/dynamic-color/Vignette.jsx`

---

### ResultGradientOverlay

Three.js 기반 Simplex Noise 그라데이션 효과 (결과 섹션용)

```jsx
<ResultGradientOverlay
  containerRef={containerRef}
  isGrain={true}
  grainIntensity={0.02}
  height="100%"
/>
```

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `containerRef` | ref | Required | 컨테이너 참조 |
| `isGrain` | boolean | true | 필름 그레인 효과 |
| `grainIntensity` | number | 0.02 | 그레인 강도 |
| `height` | string | '100%' | 높이 |

**경로:** `src/components/dynamic-color/ResultGradientOverlay.jsx`

---

## 공통 UI 컴포넌트

### ScrollIndicator

스크롤 유도 인디케이터 (바운스 화살표 + 텍스트)

```jsx
<ScrollIndicator
  text="Scroll Down"
  color="#87CEEB"
  isVisible={showIndicator}
  hasText={true}
/>
```

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `text` | string | 'Scroll Down' | 표시 텍스트 |
| `hasText` | boolean | true | 텍스트 표시 여부 |
| `color` | string | '#87CEEB' | 색상 |
| `isVisible` | boolean | true | 표시 여부 |

**경로:** `src/common/ui/ScrollIndicator.jsx`

---

### ProgressIndicator

질문 진행률 표시 바 (글로우 그라데이션 효과)

```jsx
<ProgressIndicator
  current={3}
  total={7}
  glowColor="#87CEEB"
  isFixed={true}
/>
```

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `current` | number | Required | 현재 진행 번호 |
| `total` | number | Required | 전체 개수 |
| `glowColor` | string | '#87CEEB' | 글로우 색상 |
| `isFixed` | boolean | true | 상단 고정 여부 |

**경로:** `src/common/ui/ProgressIndicator.jsx`

---

## 커스텀 훅

### useSmoothVideoScrub

스크롤 위치를 비디오 재생 시간에 부드럽게 매핑하는 훅

```jsx
const { videoRef, progress, isComplete } = useSmoothVideoScrub({
  sectionRef,
  onComplete: handleVideoEnd,
  lerp: 0.1,
});
```

**경로:** `src/hooks/useSmoothVideoScrub.js`

---

### usePatronusFlow

패트로누스 테스트 전체 흐름 상태 관리 훅

```jsx
const {
  currentSection,
  currentQuestion,
  traitScores,
  patronus,
  handleAnswerSelect,
  handleHeroComplete,
  handleLoadingComplete,
  reset,
} = usePatronusFlow();
```

**경로:** `src/hooks/usePatronusFlow.js`

---

## 데이터 & 유틸리티

### 질문 데이터

7개 질문과 답변별 trait 매핑

```javascript
// src/data/questions.js
export const questions = [
  {
    id: 1,
    question: '어둠 속에서 가장 먼저 하는 일은?',
    answers: [
      { text: '빛을 찾는다', traits: ['brave', 'hope'] },
      { text: '주변을 살핀다', traits: ['intuitive', 'alert'] },
      // ...
    ],
  },
  // ...
];
```

**경로:** `src/data/questions.js`

---

### 패트로누스 데이터

15종 패트로누스 정보

```javascript
// src/data/resultData.js
export const patronusData = [
  {
    id: 1,
    name: '수사슴',
    nameEn: 'Stag',
    emoji: '🦌',
    traits: ['brave', 'leader', 'protect'],
    description: '고귀하고 용감한 수호자...',
    quote: '고귀하고 용감한 수호자',
    color: '#87CEEB',
    video: '/video/patronus/stag.mp4',
  },
  // ...
];
```

**경로:** `src/data/resultData.js`

---

### 공유 유틸리티

결과 공유 기능 (클립보드 복사)

```javascript
// src/utils/share.js
import { sharePatronusResult } from '../utils/share';

sharePatronusResult(patronus);
```

**경로:** `src/utils/share.js`

---

## 프로젝트 플로우 다이어그램

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  PatronusHero │ ──▶ │PatronusQuestion│ ──▶ │PatronusLoading│ ──▶ │PatronusResult │
│             │     │             │     │             │     │             │
│ 🎬 비디오    │     │ 🎴 1문1답    │     │ 🎬 비디오    │     │ 🎬 비디오    │
│ 스크러빙     │     │ GlowCard    │     │ 스크러빙     │     │ + 슬라이드업  │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
     ↓                    ↓                    ↓                    ↓
 ParticleBackground   ProgressIndicator   ScrollRandomRevealText   ResultGradientOverlay
 Vignette            ScrollRandomRevealText  Vignette              Vignette
 ScrollIndicator                           ParticleBackground      ScrollIndicator
```

---

## 사용된 주요 라이브러리

| 라이브러리 | 버전 | 용도 |
|-----------|------|------|
| React | 19.x | UI 프레임워크 |
| MUI (Material-UI) | 7.x | UI 컴포넌트 |
| Three.js | - | WebGL 그라데이션 효과 |
| React Router | - | 페이지 라우팅 |
