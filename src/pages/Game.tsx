import { useEffect } from 'react';
import Card from '../components/Card';
import useBlackjack, { GameOutcome } from '../hooks/useBlackjack';

function Game() {
  const { playerHand, dealerHand, gameOutcome, hit, stand, reset } =
    useBlackjack();

  useEffect(() => {
    if (gameOutcome !== null) {
      console.log('outcome: ', GameOutcome[gameOutcome]);
    }
  }, [gameOutcome]);

  return (
    <div className="h-full bg-amber-300 flex flex-col">
      <div className="h-1/3"></div>
      <div className="flex flex-grow h-full">
        <div className="h-full w-1/6"></div>
        <div className="bg-red-300 h-full flex-grow flex">
          {/* Dealer div */}
          <div className="w-2/3 bg-amber-700 flex justify-end items-center gap-2 pr-2">
            {dealerHand.map((card) => (
              <Card key={`${card.name}-${card.suit}`} data={card} />
            ))}
          </div>
          {/* Deck div */}
          <div className="w-1/3 bg-blue-500 flex flex-row items-center justify-center">
            <Card data={{ name: 'K', suit: '♠', hidden: true }} />
          </div>
        </div>
        <div className="h-full w-1/6"></div>
      </div>
      <div className="flex flex-grow h-full">
        <div className="h-full w-1/6"></div>
        <div className="bg-red-300 h-full flex-grow flex justify-center items-center gap-2">
          {/* Player div */}
          {playerHand.map((card) => (
            <Card key={`${card.name}-${card.suit}`} data={card} />
          ))}
        </div>
        <div className="h-full w-1/6"></div>
      </div>
      <button onClick={hit}>Hit</button>
      <button onClick={stand}>Stand</button>
      <button onClick={reset}>Reset</button>
      <div className="h-1/3"></div>
    </div>
  );
}

export default Game;
