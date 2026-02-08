# 🔮 나만의 패트로누스 찾기 (Patronus Finder)

> 스크롤 비디오 스크러빙 × 몰입형 심리테스트 웹 애플리케이션

해리포터 세계관의 **패트로누스(수호령)**를 심리테스트 기반으로 찾아주는 인터랙티브 웹 애플리케이션입니다.
스크롤로 제어되는 영상 애니메이션이 전체 경험을 관통하며, 사용자는 한 번에 하나의 질문에만 집중하는 몰입형 흐름을 통해 자신만의 패트로누스를 만납니다.

![Patronus Finder Preview](/public/images/intro.png)

---

## ✨ 주요 기능

### 🎬 스크롤 비디오 스크러빙
스크롤 위치에 따라 영상이 재생되는 인터랙티브 경험. 사용자가 직접 영상의 속도를 제어합니다.

### 🎴 1문 1답 집중 UX
한 화면에 하나의 질문만 표시. 답변 선택 시 부드러운 전환 애니메이션과 함께 다음 질문으로 이동합니다.

### ⚡ 글로우 카드 인터랙션
3단계 상태 변화(default → hover → selected)를 가진 은빛 글로우 효과의 답변 카드

### 🌌 몰입형 비주얼 이펙트
- CSS 기반 파티클 배경
- Three.js Simplex Noise 그라데이션
- 비네팅 오버레이
- 스크롤 연동 텍스트 리빌

### 📊 성격 특성 기반 매칭
7개 질문의 답변을 통해 26가지 성격 특성(trait)을 분석하여 15종의 패트로누스 중 가장 적합한 수호령을 매칭합니다.

---

## 🎯 사용자 플로우

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Hero      │ ──▶ │  Question   │ ──▶ │   Loading   │ ──▶ │   Result    │
│             │     │             │     │             │     │             │
│ 🎬 비디오    │     │ 🎴 1문1답    │     │ 🎬 비디오    │     │ 🎬 비디오    │
│ 스크러빙     │     │ 7개 질문    │     │ 스크러빙     │     │ + 슬라이드업  │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
   스크롤 제어         클릭 전환           스크롤 제어          스크롤 제어
```

---

## 🛠 기술 스택

| 분류 | 기술 | 버전 |
|------|------|------|
| **Framework** | React | 19.x |
| **UI Library** | MUI (Material-UI) | 7.x |
| **Animation** | Framer Motion | 12.x |
| **3D Graphics** | Three.js | 0.182.x |
| **Smooth Scroll** | Lenis | 1.3.x |
| **Build Tool** | Vite | 7.x |
| **Documentation** | Storybook | 10.x |
| **Router** | React Router | 7.x |

---

## 🎨 디자인 시스템

### 컬러 팔레트

| 용도 | 색상 | 코드 |
|------|------|------|
| **배경** | Deep Dark | `#0a0a12` |
| **주요 강조** | Patronus Blue | `#87CEEB` |
| **보조 강조** | Accent Blue | `#6495ED` |
| **텍스트 (Primary)** | White | `#FFFFFF` |
| **텍스트 (Secondary)** | White 60% | `rgba(255,255,255,0.6)` |
| **글로우 효과** | Blue Glow | `rgba(135,206,250,0.3~0.6)` |

### 타이포그래피

| 용도 | 폰트 | 스타일 |
|------|------|--------|
| **타이틀/주문** | Cinzel | Serif, 마법적/고전적 |
| **본문/UI** | Noto Sans KR | Sans-serif, 한글 최적화 |

### 비주얼 이펙트

- **파티클** : 떠다니는 은빛 빛 입자 (30~50개)
- **글로우 펄스** : 선택된 요소에 숨 쉬는 듯한 발광 효과
- **비네팅** : 화면 가장자리 어둡게 처리
- **그라데이션 텍스트** : white → Patronus Blue

---

## 🧩 주요 컴포넌트

### 템플릿 컴포넌트

| 컴포넌트 | 설명 |
|---------|------|
| `PatronusHero` | 히어로 섹션 - 스크롤 비디오 스크러빙 + 5단계 내러티브 |
| `PatronusQuestion` | 질문 섹션 - 1문1답, GlowCard 기반 선택 |
| `PatronusLoading` | 로딩 섹션 - "Expecto Patronum" 텍스트 연출 |
| `PatronusResult` | 결과 섹션 - 비디오 + 슬라이드업 결과 카드 |

### 모션 & 시각 효과

| 컴포넌트 | 설명 |
|---------|------|
| `ParticleBackground` | CSS 기반 파티클 배경 효과 |
| `ScrollRandomRevealText` | 스크롤 연동 랜덤 텍스트 리빌 |
| `Vignette` | 비네팅 오버레이 |
| `ResultGradientOverlay` | Three.js Simplex Noise 그라데이션 |
| `GlowCard` | 3단계 상태 글로우 카드 |

### 공통 UI

| 컴포넌트 | 설명 |
|---------|------|
| `ScrollIndicator` | 스크롤 유도 인디케이터 |
| `ProgressIndicator` | 질문 진행률 바 |

---

## 🦌 패트로누스 목록 (15종)

| 이모지 | 한글 | 영문 | 주요 특성 |
|--------|------|------|----------|
| 🦌 | 수사슴 | Stag | 용감함, 리더십, 보호 |
| 🦦 | 수달 | Otter | 유쾌함, 창의적, 적응력 |
| 🔥 | 불사조 | Phoenix | 희망, 회복력, 헌신 |
| 🐺 | 늑대 | Wolf | 충성심, 직관적, 보호 |
| 🦢 | 백조 | Swan | 우아함, 헌신, 평화 |
| 🦁 | 사자 | Lion | 용감함, 리더십, 자신감 |
| 🦅 | 독수리 | Eagle | 자유, 통찰력, 독립 |
| 🐱 | 고양이 | Cat | 독립적, 직관적, 신비 |
| 🦉 | 부엉이 | Owl | 지혜, 통찰력, 경계 |
| 🦊 | 여우 | Fox | 영리함, 창의적, 적응력 |
| 🐬 | 돌고래 | Dolphin | 유쾌함, 사교적, 온화 |
| 🐻 | 곰 | Bear | 보호, 인내심, 회복력 |
| 🦋 | 나비 | Butterfly | 아름다움, 자유, 창의적 |
| 🐉 | 용 | Dragon | 용감함, 신비, 리더십 |
| 🐍 | 뱀 | Snake | 지혜, 신비, 평화 |

---

## 🚀 시작하기

### 설치

```bash
# 저장소 클론
git clone https://github.com/Journey-han/ddd-my-patronus.git

# 디렉토리 이동
cd ddd-my-patronus

# 의존성 설치
pnpm install
```

### 실행

```bash
# 개발 서버 실행
pnpm dev

# Storybook 실행
pnpm storybook

# 프로덕션 빌드
pnpm build
```

---

## 📁 프로젝트 구조

```
src/
├── pages/                    # 페이지 컴포넌트
│   └── PatronusPage.jsx      # 메인 페이지
├── components/
│   ├── templates/            # 섹션 템플릿
│   │   ├── PatronusHero.jsx
│   │   ├── PatronusQuestion.jsx
│   │   ├── PatronusLoading.jsx
│   │   └── PatronusResult.jsx
│   ├── card/                 # 카드 컴포넌트
│   │   └── GlowCard.jsx
│   ├── motion/               # 모션 컴포넌트
│   │   └── ParticleBackground.jsx
│   ├── kinetic-typography/   # 텍스트 애니메이션
│   │   └── ScrollRandomRevealText.jsx
│   └── dynamic-color/        # 동적 색상 효과
│       ├── Vignette.jsx
│       └── ResultGradientOverlay.jsx
├── common/ui/                # 공통 UI
│   ├── ScrollIndicator.jsx
│   └── ProgressIndicator.jsx
├── hooks/                    # 커스텀 훅
│   ├── useSmoothVideoScrub.js
│   └── usePatronusFlow.js
├── data/                     # 데이터
│   ├── questions.js          # 질문 데이터
│   └── resultData.js         # 패트로누스 데이터
├── utils/                    # 유틸리티
│   └── share.js              # 공유 기능
└── App.jsx                   # 앱 진입점
```

---

## 📝 라이선스

MIT License

---

## 🙏 크레딧

- **디자인 & 개발** : Journey Han
- **AI Assistant** : Claude (Anthropic)
- **영감** : Harry Potter Universe by J.K. Rowling

---

*✨ Expecto Patronum! ✨*
