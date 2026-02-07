import PatronusPage from '../../pages/PatronusPage';

export default {
  title: 'Page/Patronus',
  component: PatronusPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## 페트로누스 심리테스트

해리포터 세계관의 페트로누스(수호령)를 심리테스트 기반으로 찾아주는 인터랙티브 웹 페이지입니다.

### 플로우

\`\`\`
히어로 → 질문(7개) → 로딩 → 결과
\`\`\`

### 섹션 구성

| 섹션 | 설명 |
|------|------|
| **히어로** | 스크롤 비디오 스크러빙, 타이틀 애니메이션 |
| **질문** | 1문1답 형식, 5가지 비정형 레이아웃 패턴 |
| **로딩** | "Expecto... PATRONUM!" 텍스트 연출 |
| **결과** | 페트로누스 정보, 희귀도, 기숙사, 공유 버튼 |

### 사용 방법

1. 스크롤하여 히어로 섹션 통과
2. 7개 질문에 답변
3. 로딩 섹션 스크롤
4. 결과 확인 및 공유
        `,
      },
    },
  },
};

/**
 * 전체 페이지 플로우
 *
 * 스크롤하여 모든 섹션을 체험해보세요.
 */
export const FullPage = {
  render: () => <PatronusPage />,
};
