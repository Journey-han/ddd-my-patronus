import PatronusLoading from './PatronusLoading';

export default {
  title: 'Template/Patronus/PatronusLoading',
  component: PatronusLoading,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '페트로누스 심리테스트의 로딩 섹션. 스크롤에 따라 "Expecto..." → "PATRONUM!" 텍스트가 전환되고 은빛 플래시로 마무리됩니다.',
      },
    },
  },
};

export const Default = {
  render: () => <PatronusLoading />,
};

export const WithVideo = {
  render: () => (
    <PatronusLoading
      videoSrc="/src/assets/video/loading.mp4"
      onScrollEnd={() => console.log('Loading scroll ended')}
    />
  ),
};
