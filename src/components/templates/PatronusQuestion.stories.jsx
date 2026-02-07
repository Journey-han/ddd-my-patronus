import PatronusQuestion from './PatronusQuestion';
import { matchPatronus } from '../../data/resultData';

export default {
  title: 'Template/Patronus/PatronusQuestion',
  component: PatronusQuestion,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '페트로누스 심리테스트의 질문 섹션. 1문1답 형식으로 7개의 질문을 순차적으로 표시합니다.',
      },
    },
  },
};

export const Default = {
  render: () => (
    <PatronusQuestion
      onComplete={(scores) => {
        console.log('Trait Scores:', scores);
        const result = matchPatronus(scores);
        console.log('Matched Patronus:', result);
        alert(`당신의 페트로누스는 ${result.emoji} ${result.name}입니다!`);
      }}
    />
  ),
};
