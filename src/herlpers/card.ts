import { Card } from '../hooks/useBlackjack';

const getCardValue = (card: Card, type: 'hard' | 'soft' = 'soft') => {
  if (!Number.isNaN(+card.name)) {
    return Number(card.name);
  }
  if (card.name === 'A') {
    return type === 'hard' ? 11 : 1;
  }
  return 10;
};

const sumHand = (cards: Card[]) => {
  const hardSum = cards.reduce(
    (acc, curr) => acc + getCardValue(curr, 'hard'),
    0
  );
  const softSum = cards.reduce(
    (acc, curr) => acc + getCardValue(curr, 'soft'),
    0
  );
  const sum = hardSum > 21 ? softSum : hardSum;
  return sum;
};

export { sumHand };
