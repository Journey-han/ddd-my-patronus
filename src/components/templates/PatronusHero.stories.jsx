import PatronusHero from './PatronusHero';

export default {
  title: 'Template/Patronus/PatronusHero',
  component: PatronusHero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '페트로누스 심리테스트의 히어로 섹션. 스크롤 비디오 스크러빙과 타이틀을 포함합니다.',
      },
    },
  },
};

export const Default = {
  render: () => <PatronusHero />,
};

export const WithVideo = {
  render: () => (
    <PatronusHero
      videoSrc="/src/assets/video/main_hero.mp4"
      onScrollEnd={() => console.log('Hero scroll ended')}
    />
  ),
};
