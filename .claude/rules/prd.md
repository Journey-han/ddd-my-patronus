# 🔮 Patronus Finder PRD v2

> **바이브코딩용 기획 문서**
> 스크롤 비디오 스크러빙 × 몰입형 심리테스트 웹 애플리케이션

---

## 1. 프로젝트 개요

### 1.1 프로젝트 소개

해리포터 세계관의 **페트로누스(수호령)**를 심리테스트 기반으로 찾아주는 인터랙티브 웹 애플리케이션. 스크롤로 제어되는 영상 애니메이션이 전체 경험을 관통하며, 사용자는 한 번에 하나의 질문에만 집중하는 몰입형 흐름을 통해 자신만의 페트로누스를 만난다.

| 항목 | 내용 |
|------|------|
| **프로젝트명** | Patronus Finder (페트로누스 파인더) |
| **컨셉** | 스크롤 비디오 스크러빙 기반 몰입형 심리테스트 |
| **타겟 유저** | 해리포터 팬, MBTI/심리테스트를 좋아하는 MZ세대 |
| **핵심 가치** | 영상 스크러빙의 몰입감 + 1문 1답 집중 UX + 비정형 레이아웃의 시각적 긴장감 |

### 1.2 핵심 차별점

- **스크롤 비디오 스크러빙**: 히어로 → 로딩 → 결과까지 영상이 스크롤에 반응하여 재생. 사용자가 영상의 속도를 직접 제어하는 경험
- **1문 1답 집중 UX**: 한 화면에 하나의 질문만 표시. 답변 시 다음 질문으로 전환
- **비정형 레이아웃**: 질문 섹션에서 정형 그리드를 벗어난 자유로운 배치로 시각적 몰입과 집중 유도
- **마법 세계관 톤**: 다크 판타지 + 은빛 페트로누스 빛의 일관된 무드

### 1.3 전체 플로우

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  ① 히어로   │ ──▶ │  ② 질문     │ ──▶ │  ③ 로딩     │ ──▶ │  ④ 결과     │
│  (비디오    │     │  (1문 1답   │     │  (비디오    │     │  (비디오    │
│   스크러빙)  │     │   비정형)   │     │   스크러빙)  │     │   스크러빙   │
│             │     │             │     │             │     │   + 슬라이드) │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
   스크롤 제어         클릭 전환           스크롤 제어          스크롤 제어
```

---

## 2. 디자인 시스템

### 2.1 톤 & 무드

> *"어두운 숲속, 지팡이 끝에서 은빛 빛이 피어오르는 순간"*

전체 사이트는 어둠 속에서 빛이 드러나는 경험을 시뮬레이션한다. 영상이 어둠을 배경으로 하되, 스크롤이 진행될수록 페트로누스의 빛이 점점 강해지는 서사를 따른다.

| 요소 | 상세 |
|------|------|
| **전체 톤** | 다크 판타지, 신비로움, 의식(ritual)적 분위기 |
| **레퍼런스 무드** | StringTune의 스크롤 서사 + Jesko Jets의 레이어드 깊이감 |
| **핵심 감정선** | 긴장(히어로) → 집중(질문) → 기대(로딩) → 경이(결과) |

### 2.2 컬러 팔레트

```
[배경]
Primary Background:    #0a0a12    딥 다크 (영상이 없는 영역)
Secondary Background:  #0d1117    UI 요소 배경
Overlay Gradient:      #0a0a12 → transparent    영상 위 그라데이션

[강조]
Patronus Blue:         #87CEEB    라이트 블루 (주요 강조색)
Accent Blue:           #6495ED    코넬리아 블루 (보조)
Glow:                  rgba(135, 206, 250, 0.3~0.6)    발광 효과

[텍스트]
Text Primary:          #FFFFFF
Text Secondary:        rgba(255, 255, 255, 0.6)
Text Muted:            rgba(255, 255, 255, 0.4)

[상태]
Selected:              rgba(135, 206, 250, 0.15)    선택된 답변 배경
Hover:                 rgba(135, 206, 250, 0.08)    호버 상태
```

### 2.3 타이포그래피

| 용도 | 폰트 | 스타일 | 비고 |
|------|------|--------|------|
| **타이틀/주문** | Cinzel | 400/700/900 | 세리프, 마법적/고전적 |
| **본문/UI** | Noto Sans KR | 300/400/500/700 | 한글 가독성 |
| **히어로 메인** | Cinzel 900 | 6rem~3rem (반응형) | 그라데이션 텍스트 |
| **질문 텍스트** | Noto Sans KR 500 | 1.5rem~1.2rem | 중앙 또는 비정형 배치 |
| **답변 선택지** | Noto Sans KR 400 | 1rem~0.95rem | 칩/카드 내부 |

```css
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Noto+Sans+KR:wght@300;400;500;700&display=swap');
```

### 2.4 비주얼 이펙트

| 효과 | 적용 위치 | 설명 |
|------|-----------|------|
| **파티클** | 전역 배경 | 떠다니는 은빛 빛 입자 (30~50개, 느린 float) |
| **글로우 펄스** | 선택된 답변, 결과 이모지 | 은빛 발광이 천천히 숨 쉬듯 밝아졌다 어두워짐 |
| **블러 오버레이** | 섹션 전환 경계 | 영상 위에 backdrop-filter: blur로 콘텐츠 분리 |
| **그라데이션 텍스트** | 히어로 타이틀, 결과 타이틀 | white → Patronus Blue 그라데이션 |
| **비네팅** | 영상 스크러빙 섹션 | 화면 가장자리 어둡게 처리하여 영상에 집중 유도 |

---

## 3. 스크롤 비디오 스크러빙 시스템

### 3.1 핵심 원리

스크롤 위치(scrollY)를 영상의 currentTime에 매핑하여, 사용자가 스크롤을 내리면 영상이 재생되고 올리면 되감기되는 효과를 구현한다. 히어로, 로딩, 결과 세 구간에서 각각 독립적인 영상이 사용된다.

```
[스크롤 ↔ 영상 매핑 원리]

scrollProgress = (scrollY - sectionStart) / sectionHeight
video.currentTime = scrollProgress * video.duration

┌──────────────────────────────────────────┐
│  scroll 0%   ──▶  video 0:00            │
│  scroll 25%  ──▶  video 0:02            │
│  scroll 50%  ──▶  video 0:04            │
│  scroll 75%  ──▶  video 0:06            │
│  scroll 100% ──▶  video 0:08 (끝)       │
└──────────────────────────────────────────┘
```

### 3.2 기술 구현 방식

```javascript
// 스크롤 비디오 스크러빙 기본 구조
const videoRef = useRef(null);
const sectionRef = useRef(null);

useEffect(() => {
  const handleScroll = () => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video || !video.duration) return;

    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight - window.innerHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / sectionHeight));

    video.currentTime = progress * video.duration;
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### 3.3 영상 스펙 가이드

| 항목 | 권장 값 | 비고 |
|------|---------|------|
| **포맷** | MP4 (H.264) + WebM (VP9) | 브라우저 호환 이중 소스 |
| **해상도** | 1920×1080 (데스크탑), 1080×1920 (모바일) | 반응형 대응 시 별도 소스 |
| **프레임레이트** | 30fps | 스크러빙 부드러움을 위해 최소 24fps |
| **길이** | 5~10초 (섹션당) | 길수록 스크롤 구간이 넓어짐 |
| **파일 크기** | 5MB 이하 권장 | 프리로딩 고려 |
| **오디오** | 없음 (무음) | 스크러빙 시 오디오 불가 |

### 3.4 영상 콘텐츠 가이드

| 섹션 | 영상 내용 | 분위기 |
|------|-----------|--------|
| **① 히어로** | 어둠 속에서 지팡이 끝의 빛이 점점 밝아지는 장면. 안개/파티클이 흩어지며 "PATRONUS" 텍스트가 드러남 | 긴장 → 기대 |
| **③ 로딩** | 은빛 빛 입자가 모여들며 동물 형상을 만들어가는 과정. 추상적이고 신비로운 빛의 움직임 | 기대 → 고조 |
| **④ 결과** | 완성된 페트로누스가 은빛으로 빛나며 달리거나/날거나/헤엄치는 장면. 페트로누스별로 다른 영상이 이상적이나, 범용 실루엣 영상으로 대체 가능 | 경이 → 감동 |

---

## 4. 섹션별 상세 기획

### 4.1 ① 히어로 섹션 — 스크롤 비디오 스크러빙

#### 개요
사이트 진입 시 첫 화면. 스크롤을 내리면 배경 영상이 재생되며, 텍스트와 UI가 영상 위에 오버레이된다. CTA 버튼 없이 스크롤 자체가 여정의 시작.

#### 레이아웃

```
[전체 구조]
height: 300vh (스크롤 영역 확보)

┌─────────────────────────────────────┐
│  ┌─────────────────────────────┐    │
│  │                             │    │
│  │      🎬 배경 영상           │    │  ← position: fixed (뷰포트 고정)
│  │      (풀스크린)              │    │
│  │                             │    │
│  │   ┌───────────────────┐     │    │
│  │   │  Discover Your    │     │    │  ← 서브타이틀 (Cinzel 400)
│  │   │                   │     │    │
│  │   │    PATRONUS       │     │    │  ← 메인타이틀 (Cinzel 900, 그라데이션)
│  │   │                   │     │    │
│  │   │ 당신의 내면에 잠든  │     │    │  ← 설명 (Noto Sans KR 300)
│  │   │ 수호령을 깨우세요   │     │    │
│  │   └───────────────────┘     │    │
│  │                             │    │
│  │      ↓ Scroll Down          │    │  ← 스크롤 인디케이터 (바운스)
│  │                             │    │
│  └─────────────────────────────┘    │
│                                     │
│  ... (스크롤 빈 공간)               │  ← 영상 재생을 위한 스크롤 여유
│                                     │
└─────────────────────────────────────┘
```

#### 스크롤 연동 동작

```
[스크롤 진행도별 상태]

0%    텍스트 opacity: 1, scale: 1
      영상 0:00 (어둠, 정적)
      스크롤 인디케이터 표시

0~40% 텍스트 opacity: 1 → 0.5
      영상 재생 중 (빛이 서서히 밝아짐)
      스크롤 인디케이터 fadeOut

40~80% 텍스트 opacity: 0.5 → 0, blur: 0 → 8px, scale: 1 → 0.95
       영상 재생 중 (빛이 최고조)

80~100% 전체 히어로 fadeOut
        아래쪽 그라데이션 오버레이 진해짐
        질문 섹션으로 자연스럽게 연결
```

#### 구성 요소 스펙

| 요소 | 스펙 |
|------|------|
| **배경 영상** | `<video>` 풀스크린, `object-fit: cover`, `position: fixed`, `playsinline`, `muted`, `preload="auto"` |
| **서브 타이틀** | "Discover Your" — Cinzel 400, 1rem, letter-spacing: 0.5em, text-transform: uppercase |
| **메인 타이틀** | "PATRONUS" — Cinzel 900, 6rem, background: linear-gradient(white, #87CEEB), text-shadow glow |
| **설명** | "당신의 내면에 잠든 수호령을 깨우세요" — Noto Sans KR 300, 1.1rem, rgba(255,255,255,0.6) |
| **스크롤 인디케이터** | 마우스 아이콘 SVG + "Scroll Down" 텍스트, bounce animation 2s infinite |
| **비네팅** | radial-gradient(transparent 50%, #0a0a12 100%) 오버레이 |

---

### 4.2 ② 질문 섹션 — 1문 1답 비정형 레이아웃

#### 개요
한 화면에 하나의 질문만 표시한다. 답변을 선택하면 페이드/슬라이드 전환으로 다음 질문이 나타난다. 비정형(Asymmetric) 레이아웃으로 질문마다 다른 구도를 적용하여 단조로움을 방지하고 집중도를 높인다.

#### 비정형 레이아웃 패턴

질문마다 텍스트와 선택지의 위치가 달라진다. 5가지 레이아웃 패턴을 순환 적용한다.

```
[패턴 A: 좌측 상단 정렬]
┌──────────────────────────────────┐
│                                  │
│  Q1.                             │
│  당신이 어둠 속에서               │
│  가장 먼저 하는 일은?             │
│                                  │
│         ┌──────────┐             │
│         │ 답변 1    │             │
│         └──────────┘             │
│              ┌──────────┐        │
│              │ 답변 2    │        │
│              └──────────┘        │
│         ┌──────────┐             │
│         │ 답변 3    │             │
│         └──────────┘        3/7  │
│                                  │
└──────────────────────────────────┘

[패턴 B: 우측 하단 정렬]
┌──────────────────────────────────┐
│                                  │
│                                  │
│         ┌──────────┐             │
│         │ 답변 1    │             │
│         └──────────┘             │
│    ┌──────────┐                  │
│    │ 답변 2    │                  │
│    └──────────┘                  │
│              ┌──────────┐        │
│              │ 답변 3    │        │
│              └──────────┘        │
│                                  │
│              가장 소중한 사람을    │
│                   지킬 때         │
│                당신의 무기는?  Q2. │
│                             3/7  │
└──────────────────────────────────┘

[패턴 C: 중앙 집중]
┌──────────────────────────────────┐
│                                  │
│                                  │
│                                  │
│       당신의 마음속 풍경은?       │
│              Q3.                 │
│                                  │
│  ┌────────┐ ┌────────┐          │
│  │ 답변 1  │ │ 답변 2  │          │
│  └────────┘ └────────┘          │
│       ┌────────┐                 │
│       │ 답변 3  │           3/7  │
│       └────────┘                 │
│                                  │
│                                  │
└──────────────────────────────────┘

[패턴 D: 좌측 수직 스택]
┌──────────────────────────────────┐
│                                  │
│  Q4.                             │
│                                  │
│  친구가 위험에                    │
│  처했을 때                        │
│  당신은?                          │
│                                  │
│  ┌──────────────┐                │
│  │ 답변 1        │                │
│  ├──────────────┤                │
│  │ 답변 2        │                │
│  ├──────────────┤                │
│  │ 답변 3        │                │
│  ├──────────────┤                │
│  │ 답변 4        │           3/7 │
│  └──────────────┘                │
│                                  │
└──────────────────────────────────┘

[패턴 E: 대각선 배치]
┌──────────────────────────────────┐
│                                  │
│  Q5.                             │
│     고요한 밤,                    │
│                                  │
│          ┌──────────┐            │
│          │ 답변 1    │            │
│          └──────────┘            │
│     당신에게                      │
│     들리는 소리는?                │
│                ┌──────────┐      │
│                │ 답변 2    │      │
│                └──────────┘      │
│  ┌──────────┐                    │
│  │ 답변 3    │                    │
│  └──────────┘               3/7 │
│                                  │
└──────────────────────────────────┘
```

#### 질문 데이터 (7문항)

각 질문의 답변은 특정 성격 특성(trait)에 점수를 부여한다. 모든 질문 완료 후 누적 점수가 가장 높은 trait 조합으로 페트로누스를 매칭한다.

| # | 질문 | 답변 → trait |
|---|------|-------------|
| **Q1** | 어둠 속에서 가장 먼저 하는 일은? | ① 빛을 찾는다 → brave, hope ② 주변을 살핀다 → intuitive, alert ③ 가만히 기다린다 → wise, calm ④ 함께 있는 이를 확인한다 → protect, loyal |
| **Q2** | 가장 소중한 사람을 지킬 때 당신의 무기는? | ① 용기와 행동력 → brave, leader ② 지혜와 전략 → wise, clever ③ 희생과 헌신 → loyal, devote ④ 직감과 민첩함 → intuitive, agile |
| **Q3** | 당신의 마음속 풍경은? | ① 광활한 하늘 → free, independent ② 깊은 숲속 → mysterious, calm ③ 끝없는 바다 → creative, adapt ④ 따뜻한 불빛의 집 → protect, warm |
| **Q4** | 친구들 사이에서 당신의 역할은? | ① 분위기 메이커 → playful, social ② 묵묵한 리더 → leader, confident ③ 듬직한 조력자 → protect, patient ④ 현명한 조언자 → wise, insight |
| **Q5** | 가장 강해지는 순간은? | ① 위기가 닥쳤을 때 → brave, resilient ② 누군가를 지킬 때 → protect, devote ③ 혼자 집중할 때 → independent, intuitive ④ 자유를 느낄 때 → free, graceful |
| **Q6** | 고요한 밤, 당신에게 들리는 소리는? | ① 바람 소리 → free, agile ② 심장 박동 소리 → brave, resilient ③ 먼 곳의 음악 → creative, beauty ④ 아무것도 — 고요 자체 → mysterious, calm |
| **Q7** | 당신의 페트로누스에게 바라는 것은? | ① 함께 싸워주는 것 → brave, leader ② 길을 안내하는 것 → wise, insight ③ 어둠을 밝히는 것 → hope, warm ④ 곁에 있어주는 것 → loyal, devote |

#### Trait 목록 & 점수 시스템

```javascript
const TRAITS = {
  brave: 0,      // 용감함
  leader: 0,     // 리더십
  protect: 0,    // 보호본능
  playful: 0,    // 유쾌함
  creative: 0,   // 창의적
  wise: 0,       // 지혜로움
  free: 0,       // 자유로움
  loyal: 0,      // 충성심
  mysterious: 0, // 신비로움
  independent: 0,// 독립적
  intuitive: 0,  // 직관적
  hope: 0,       // 희망적
  resilient: 0,  // 회복력
  devote: 0,     // 헌신
  clever: 0,     // 영리함
  agile: 0,      // 민첩함
  calm: 0,       // 평화로움
  social: 0,     // 사교적
  warm: 0,       // 온화함
  confident: 0,  // 자신감
  adapt: 0,      // 적응력
  patient: 0,    // 인내심
  insight: 0,    // 통찰력
  alert: 0,      // 경계심
  beauty: 0,     // 아름다움
  graceful: 0    // 우아함
};

// 답변 선택 시 해당 trait에 +1
// 7문항 완료 후 상위 3~5개 trait를 기준으로 페트로누스 매칭
```

#### 전환 애니메이션

```
[답변 선택 시 전환 흐름]

1. 선택한 답변에 글로우 효과 (0.3s)
2. 현재 질문 전체 fadeOut + translateY(-30px) (0.5s)
3. 짧은 공백 (0.2s)
4. 다음 질문 fadeIn + translateY(30px → 0) (0.6s)
5. 다음 질문은 다른 레이아웃 패턴 적용

[마지막 질문 답변 시]
1. 선택한 답변에 글로우 효과
2. 전체 질문 섹션 fadeOut
3. 로딩 비디오 섹션으로 스크롤 트리거 (자동 스크롤 또는 스크롤 유도)
```

#### 답변 선택지 UI 스펙

```
[기본 상태]
- background: rgba(255, 255, 255, 0.03)
- border: 1px solid rgba(135, 206, 250, 0.15)
- border-radius: 16px
- padding: 16px 24px
- font: Noto Sans KR 400, 1rem
- color: rgba(255, 255, 255, 0.8)
- cursor: pointer
- transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)

[호버 상태]
- background: rgba(135, 206, 250, 0.08)
- border-color: rgba(135, 206, 250, 0.3)
- transform: translateY(-2px)

[선택 상태 (0.3s 유지 후 전환)]
- background: rgba(135, 206, 250, 0.15)
- border-color: rgba(135, 206, 250, 0.6)
- box-shadow: 0 0 20px rgba(135, 206, 250, 0.3)
- color: #FFFFFF
```

#### 진행 인디케이터

```
[위치] 화면 우측 하단 또는 하단 중앙
[형태] 현재 번호 / 전체 번호 (예: 3/7)
[스타일] Cinzel 400, 0.85rem, rgba(255,255,255,0.4)
[옵션] 얇은 프로그레스 바 (하단 또는 상단 고정)
       width: (currentQ / totalQ) * 100%
       height: 2px
       background: linear-gradient(90deg, #87CEEB, #6495ED)
```

---

### 4.3 ③ 로딩 섹션 — 스크롤 비디오 스크러빙

#### 개요
질문 완료 후, 페트로누스가 형체를 갖추어가는 과정을 영상으로 보여준다. 히어로와 동일한 스크롤 비디오 스크러빙 방식. 결과 도출의 기대감을 극대화하는 브릿지 역할.

#### 레이아웃

```
[전체 구조]
height: 250vh (히어로보다 짧은 스크롤 구간)

┌──────────────────────────────────────┐
│                                      │
│  ┌──────────────────────────────┐    │
│  │                              │    │
│  │    🎬 로딩 영상              │    │  ← position: fixed (풀스크린)
│  │    (빛 입자가 모여드는 장면)  │    │
│  │                              │    │
│  │                              │    │
│  │    ┌─────────────────┐       │    │
│  │    │ "Expecto..."    │       │    │  ← 스크롤 0~50% 구간 텍스트
│  │    └─────────────────┘       │    │
│  │                              │    │
│  │    ┌─────────────────┐       │    │
│  │    │ "Patronum!"     │       │    │  ← 스크롤 50~80% 구간 텍스트
│  │    └─────────────────┘       │    │
│  │                              │    │
│  └──────────────────────────────┘    │
│                                      │
└──────────────────────────────────────┘
```

#### 스크롤 연동 동작

```
0~30%   영상 재생 (입자 흩어진 상태 → 모이기 시작)
        "Expecto..." 텍스트 fadeIn (Cinzel 700, 이탤릭)

30~60%  영상 재생 (입자가 형체를 만들어감)
        "Expecto..." fadeOut
        "Patronum!" 텍스트 fadeIn + 글로우 폭발 효과

60~90%  영상 재생 (형체 거의 완성)
        "Patronum!" fadeOut
        화면 전체에 은빛 플래시 효과

90~100% 흰색 오버레이 fadeIn → 결과 섹션으로 전환
```

---

### 4.4 ④ 결과 섹션 — 스크롤 비디오 + 슬라이드업

#### 개요
매칭된 페트로누스의 영상이 배경에서 재생되고, 결과 정보가 아래에서 위로 슬라이드하여 올라온다. 영상은 스크롤 비디오 스크러빙, 결과 카드는 스크롤 진행에 따라 단계적으로 올라오는 이중 레이어 구조.

#### 레이아웃

```
[전체 구조]
height: 400vh (결과 콘텐츠 양에 따라 조절)

┌─────────────────────────────────────────────┐
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │                                     │    │
│  │     🎬 결과 영상                    │    │  ← position: fixed (풀스크린)
│  │     (페트로누스가 빛나며 움직이는)   │    │
│  │                                     │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │                                     │    │  ← 스크롤 시 아래→위로 슬라이드
│  │  [슬라이드 1] 이모지 + 이름         │    │
│  │                                     │    │
│  │  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   │    │
│  │                                     │    │
│  │  [슬라이드 2] 설명                  │    │
│  │                                     │    │
│  │  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   │    │
│  │                                     │    │
│  │  [슬라이드 3] 성격 태그 + 주문      │    │
│  │                                     │    │
│  │  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   │    │
│  │                                     │    │
│  │  [슬라이드 4] 공유 + 다시하기       │    │
│  │                                     │    │
│  └─────────────────────────────────────┘    │
│                                             │
└─────────────────────────────────────────────┘
```

#### 슬라이드업 콘텐츠 단계

```
[슬라이드 1: 페트로누스 정체]
스크롤 0~25%

  ┌──────────────────────────┐
  │                          │
  │           🦌             │  ← 이모지 6rem, glow animation
  │                          │
  │    당신의 페트로누스는     │  ← Noto Sans KR 300, 1rem
  │         수사슴            │  ← Cinzel 900, 2.5rem, 그라데이션
  │          Stag             │  ← Cinzel 400, 1rem, #87CEEB
  │                          │
  └──────────────────────────┘

  진입: opacity 0→1, translateY(60px→0), 0.8s ease-out


[슬라이드 2: 설명]
스크롤 25~50%

  ┌──────────────────────────┐
  │                          │
  │   "고귀하고 용감한       │
  │    수호자. 위기의 순간   │
  │    누구보다 먼저 앞에    │
  │    서는 당신의 수사슴은  │
  │    강인한 의지와 따뜻한  │
  │    마음을 상징합니다."   │  ← Noto Sans KR 300, 1.1rem
  │                          │
  └──────────────────────────┘

  진입: opacity 0→1, translateY(40px→0), 0.8s ease-out, delay 0.2s


[슬라이드 3: 성격 태그 + 주문]
스크롤 50~75%

  ┌──────────────────────────┐
  │                          │
  │  ┌────┐ ┌────┐ ┌────┐   │
  │  │용감 │ │리더 │ │보호 │   │  ← 성격 trait 태그 (칩 스타일)
  │  └────┘ └────┘ └────┘   │
  │                          │
  │  "Expecto Patronum!"     │  ← Cinzel 700 이탤릭, 글로우
  │                          │
  └──────────────────────────┘

  진입: 태그 하나씩 stagger fadeIn (0.1s 간격), 주문 텍스트 glow pulse


[슬라이드 4: 액션]
스크롤 75~100%

  ┌──────────────────────────┐
  │                          │
  │   [ 🔗 결과 공유하기 ]   │  ← 공유 버튼 (글로우 보더)
  │                          │
  │   [ ↻ 다시 찾아보기 ]    │  ← 리셋 버튼 (고스트 스타일)
  │                          │
  └──────────────────────────┘

  진입: opacity 0→1, translateY(30px→0), 0.6s
```

#### 결과 카드 오버레이 스펙

```css
/* 결과 콘텐츠 오버레이 */
.result-overlay {
  position: relative;
  z-index: 10;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(10, 10, 18, 0.6) 20%,
    rgba(10, 10, 18, 0.9) 40%,
    #0a0a12 60%
  );
  /* 영상 위에 그라데이션으로 자연스럽게 겹침 */
}
```

---

## 5. 페트로누스 데이터

### 5.1 데이터 구조

```javascript
{
  id: number,
  name: string,           // "수사슴"
  nameEn: string,         // "Stag"
  emoji: string,          // "🦌"
  traits: string[],       // ["brave", "leader", "protect"]
  description: string,    // 2~3문장의 감성적 설명
  quote: string,          // 페트로누스 한줄 표현
}
```

### 5.2 페트로누스 목록 (15종)

| # | 이모지 | 한글명 | 영문명 | 주요 Traits | 한줄 표현 |
|---|--------|--------|--------|-------------|-----------|
| 1 | 🦌 | 수사슴 | Stag | brave, leader, protect | 고귀하고 용감한 수호자 |
| 2 | 🦦 | 수달 | Otter | playful, creative, adapt | 장난기 넘치는 빛의 친구 |
| 3 | 🔥 | 불사조 | Phoenix | hope, resilient, devote | 재에서 다시 피어나는 불멸의 빛 |
| 4 | 🐺 | 늑대 | Wolf | loyal, intuitive, protect | 어둠 속에서 곁을 지키는 그림자 |
| 5 | 🦢 | 백조 | Swan | graceful, devote, calm | 고요한 물 위의 우아한 빛 |
| 6 | 🦁 | 사자 | Lion | brave, leader, confident | 두려움을 삼키는 황금빛 포효 |
| 7 | 🦅 | 독수리 | Eagle | free, insight, independent | 가장 높은 곳에서 모든 것을 보는 눈 |
| 8 | 🐱 | 고양이 | Cat | independent, intuitive, mysterious | 고요히 곁을 지키는 신비로운 존재 |
| 9 | 🦉 | 부엉이 | Owl | wise, insight, alert | 밤을 읽는 지혜의 눈 |
| 10 | 🦊 | 여우 | Fox | clever, creative, adapt | 어떤 상황도 빠져나가는 영리한 빛 |
| 11 | 🐬 | 돌고래 | Dolphin | playful, social, warm | 파도 위를 뛰노는 기쁨의 은빛 |
| 12 | 🐻 | 곰 | Bear | protect, patient, resilient | 묵직하고 따뜻한 힘의 수호자 |
| 13 | 🦋 | 나비 | Butterfly | beauty, free, creative | 어둠 속에서 피어나는 작은 빛의 날개 |
| 14 | 🐉 | 용 | Dragon | brave, mysterious, leader | 세상을 뒤흔드는 태고의 은빛 불꽃 |
| 15 | 🐍 | 뱀 | Snake | wise, mysterious, calm | 침묵 속에 감춰진 깊은 지혜 |

### 5.3 매칭 알고리즘

```javascript
function matchPatronus(traitScores) {
  const sorted = Object.entries(traitScores)
    .sort(([, a], [, b]) => b - a);

  // 상위 3개 trait 추출
  const topTraits = sorted.slice(0, 3).map(([trait]) => trait);

  // 각 페트로누스와의 매칭 점수 계산
  const scores = patronusData.map(p => {
    let score = 0;
    p.traits.forEach(trait => {
      if (traitScores[trait]) {
        score += traitScores[trait];
      }
    });
    // 상위 trait와의 직접 매칭 보너스
    const directMatch = p.traits.filter(t => topTraits.includes(t)).length;
    score += directMatch * 2;

    return { ...p, score };
  });

  // 최고 점수 페트로누스 반환
  return scores.sort((a, b) => b.score - a.score)[0];
}
```

---

## 6. 인터랙션 & 애니메이션 정의

### 6.1 키프레임

```css
/* 파티클 떠다니기 */
@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
  50% { transform: translateY(-20px) scale(1.5); opacity: 0.8; }
}

/* 글로우 펄스 */
@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 20px rgba(135, 206, 250, 0.2); }
  50% { box-shadow: 0 0 50px rgba(135, 206, 250, 0.5); }
}

/* 스크롤 인디케이터 바운스 */
@keyframes scrollBounce {
  0%, 100% { transform: translateY(0); opacity: 0.6; }
  50% { transform: translateY(10px); opacity: 1; }
}

/* 슬라이드업 진입 */
@keyframes slideUp {
  from { opacity: 0; transform: translateY(60px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 답변 선택 글로우 */
@keyframes selectGlow {
  0% { box-shadow: 0 0 0 rgba(135, 206, 250, 0); }
  50% { box-shadow: 0 0 30px rgba(135, 206, 250, 0.5); }
  100% { box-shadow: 0 0 15px rgba(135, 206, 250, 0.3); }
}

/* 결과 이모지 글로우 */
@keyframes emojiGlow {
  0%, 100% { text-shadow: 0 0 20px rgba(135, 206, 250, 0.3); filter: brightness(1); }
  50% { text-shadow: 0 0 40px rgba(135, 206, 250, 0.6); filter: brightness(1.2); }
}

/* 은빛 플래시 (로딩→결과 전환) */
@keyframes silverFlash {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}
```

### 6.2 트랜지션 이징

| 용도 | 이징 | 설명 |
|------|------|------|
| 답변 호버 | `cubic-bezier(0.4, 0, 0.2, 1)` | 부드러운 Material 이징 |
| 질문 전환 | `cubic-bezier(0.16, 1, 0.3, 1)` | 빠르게 나갔다 천천히 도착 |
| 슬라이드업 | `cubic-bezier(0.33, 1, 0.68, 1)` | 부드러운 ease-out |
| 스크롤 반응 | 없음 (requestAnimationFrame 직접 제어) | 네이티브 퍼포먼스 |

---

## 7. 기술 스택

### 7.1 프론트엔드

| 기술 | 용도 | 비고 |
|------|------|------|
| **React 18+** | UI 프레임워크 | — |
| **Tailwind CSS** | 스타일링 | 유틸리티 기반 |
| **Framer Motion** | 질문 전환 / 슬라이드업 | `AnimatePresence` 활용 |

### 7.2 상태 관리

```javascript
// React useState + useRef로 충분

// 전체 흐름 상태
const [currentSection, setCurrentSection] = useState('hero');
// 'hero' | 'questions' | 'loading' | 'result'

// 질문 상태
const [currentQuestion, setCurrentQuestion] = useState(0);
const [traitScores, setTraitScores] = useState({});
const [answers, setAnswers] = useState([]);

// 결과 상태
const [resultPatronus, setResultPatronus] = useState(null);

// 비디오 레프
const heroVideoRef = useRef(null);
const loadingVideoRef = useRef(null);
const resultVideoRef = useRef(null);
```

### 7.3 비디오 프리로딩

```javascript
// 히어로 영상은 즉시 로드
// 로딩/결과 영상은 질문 진행 중 백그라운드 프리로드
useEffect(() => {
  if (currentQuestion >= 3) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.href = '/videos/loading.mp4';
    document.head.appendChild(link);
  }
}, [currentQuestion]);
```

---

## 8. 반응형 디자인

### 8.1 브레이크포인트

| 구간 | 범위 | 히어로 타이틀 | 질문 텍스트 | 비정형 레이아웃 |
|------|------|-------------|------------|----------------|
| **Desktop** | 1200px+ | 6rem | 1.5rem | 5패턴 모두 적용 |
| **Tablet** | 768~1199px | 4.5rem | 1.3rem | 패턴 A, C, D만 적용 |
| **Mobile** | ~767px | 3rem | 1.2rem | 중앙 정렬 단일 패턴 |

### 8.2 모바일 대응 사항

- 비디오: 세로형(9:16) 별도 소스 또는 `object-fit: cover`로 크롭
- 비정형 레이아웃: 모바일에서는 중앙 정렬 기본 레이아웃으로 단순화
- 답변 선택지: 풀너비 카드로 스택 배치
- 터치: `touch-action: pan-y`로 스크롤 스크러빙 터치 대응

---

## 9. 퍼포먼스 고려사항

| 항목 | 대응 |
|------|------|
| **비디오 용량** | 섹션당 5MB 이하, WebM + MP4 이중 소스 |
| **스크롤 이벤트** | `requestAnimationFrame` 쓰로틀링 |
| **파티클** | CSS animation 기반 (JS 연산 최소화), 모바일에서 개수 축소 (50→20) |
| **폰트** | `display=swap`, 서브셋 적용 |
| **이미지** | 없음 (이모지 + 비디오 기반으로 이미지 의존도 제거) |
| **비디오 프리로드** | 히어로만 `preload="auto"`, 나머지는 질문 진행 중 lazy preload |

---

## 10. 전체 사용자 여정 타임라인

```
[시간순 경험 흐름]

00s   사이트 진입
      → 어둠 속 "PATRONUS" 타이틀, 파티클 배경
      → 스크롤 인디케이터 바운스

~10s  스크롤 시작 (히어로 비디오 스크러빙)
      → 빛이 점점 밝아지며 텍스트 fadeOut
      → 몰입감 조성

~15s  질문 섹션 진입
      → Q1 비정형 레이아웃으로 등장
      → 파티클 배경 유지, 영상 없음

~60s  7개 질문 완료 (질문당 ~6초)
      → 각 질문마다 다른 레이아웃 패턴
      → 답변 선택 → 글로우 → 전환

~65s  로딩 비디오 스크러빙 시작
      → "Expecto... Patronum!" 텍스트 연출
      → 빛 입자가 형체를 만들어가는 영상

~75s  결과 섹션 진입
      → 페트로누스 영상 배경 (스크러빙)
      → 이모지 + 이름 슬라이드업
      → 설명 슬라이드업
      → 성격 태그 + 주문 슬라이드업
      → 공유/다시하기 버튼

~90s  공유 또는 다시 시작
```

---

## 11. 확장 가능성

- [ ] 페트로누스별 고유 영상 (현재는 범용 영상으로 시작)
- [ ] 결과 이미지 생성 → SNS 공유 (OG 이미지)
- [ ] 사운드 이펙트 (주문 효과음, 배경 앰비언트)
- [ ] 페트로누스 도감 / 컬렉션
- [ ] 더 많은 페트로누스 추가 (30종+)
- [ ] 질문 풀 확대 → 랜덤 출제 (7/15 선택)
- [ ] 다국어 지원 (EN/KR)
- [ ] 결과 페이지 URL 파라미터 (직접 링크 공유)

---

## 12. 바이브코딩 프롬프트

```
해리포터 페트로누스 심리테스트 사이트를 만들어줘.

전체 구조: 히어로(비디오 스크러빙) → 질문(1문1답) → 로딩(비디오 스크러빙) → 결과(비디오 스크러빙 + 슬라이드업)

핵심 기능:
1. 스크롤 비디오 스크러빙 - 스크롤하면 <video>의 currentTime이 연동되어
   영상이 재생되는 효과. 히어로/로딩/결과 세 섹션에서 사용
2. 1문 1답 질문 UI - 한 화면에 질문 하나만, 답변 선택 시 다음으로 전환
3. 비정형 레이아웃 - 질문마다 텍스트/답변 위치가 달라지는 5가지 패턴
4. 결과 슬라이드업 - 배경 영상 위로 결과 콘텐츠가 아래→위로 올라옴

디자인:
- 다크 판타지 배경 (#0a0a12)
- 페트로누스 블루 강조색 (#87CEEB)
- Cinzel(타이틀) + Noto Sans KR(본문) 폰트
- 파티클 배경 애니메이션
- 답변 선택 시 글로우 효과

비디오 자리는 우선 placeholder 영상이나 그라데이션 배경으로 대체.
```

---

*✨ Expecto Patronum! ✨*