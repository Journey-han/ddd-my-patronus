import PatronusResult from './PatronusResult';
import { RESULTS } from '../../data/resultData';

export default {
  title: 'Template/Patronus/PatronusResult',
  component: PatronusResult,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '페트로누스 심리테스트의 결과 섹션. 스크롤에 따라 페트로누스 영상이 재생되며 결과 카드가 슬라이드업됩니다.',
      },
    },
  },
};

// 수사슴 결과 (Rare)
export const Stag = {
  render: () => (
    <PatronusResult
      patronus={RESULTS.stag}
      onShare={() => console.log('Share clicked')}
      onRetry={() => console.log('Retry clicked')}
    />
  ),
};

// 수달 결과 (Uncommon)
export const Otter = {
  render: () => (
    <PatronusResult
      patronus={RESULTS.otter}
      onShare={() => console.log('Share clicked')}
      onRetry={() => console.log('Retry clicked')}
    />
  ),
};

// 늑대 결과 (Uncommon)
export const Wolf = {
  render: () => (
    <PatronusResult
      patronus={RESULTS.wolf}
      onShare={() => console.log('Share clicked')}
      onRetry={() => console.log('Retry clicked')}
    />
  ),
};

// 불사조 결과 (Legendary)
export const Phoenix = {
  render: () => (
    <PatronusResult
      patronus={RESULTS.phoenix}
      onShare={() => console.log('Share clicked')}
      onRetry={() => console.log('Retry clicked')}
    />
  ),
};

// 고양이 결과 (Common)
export const Cat = {
  render: () => (
    <PatronusResult
      patronus={RESULTS.cat}
      onShare={() => console.log('Share clicked')}
      onRetry={() => console.log('Retry clicked')}
    />
  ),
};
