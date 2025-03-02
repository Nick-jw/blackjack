import { useCallback, useEffect, useState } from 'react';
import cardsJSON from '../assets/cards.json';
import { sumHand } from '../herlpers/card';
import { wait } from '../herlpers/sleep';

export interface Card {
  name: string;
  suit: string;
  hidden?: boolean;
}

const initialCards: Card[] = cardsJSON;

enum GameState {
  Initial,
  PlayerTurn,
  DealerTurn,
  Reveal,
  Complete,
}

export enum GameOutcome {
  PlayerBust,
  DealerBust,
  PlayerWin,
  DealerWin,
  Blackjack,
  Push,
}

const DELAY_BETWEEN_DEALS = 700;
function useBlackjack() {
  const [deck, setDeck] = useState<Card[]>(initialCards);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [gameState, setGameState] = useState<GameState>(GameState.Initial);
  const [gameOutcome, setGameOutcome] = useState<GameOutcome | null>(null);
  const [hiddenCardRevealed, setHiddenCardRevealed] = useState<boolean>(false);
  const [dealStep, setDealStep] = useState<number>(0);

  // TODO - Make this function work without replacement
  const dealCard = useCallback(() => {
    if (deck.length < 1) {
      return null;
    }
    const randomIdx = Math.floor(Math.random() * deck.length);
    const newCard = deck[randomIdx];

    setDeck((prev) => {
      const newDeck = [...prev];
      newDeck.splice(randomIdx, 1);
      return newDeck;
    });

    return newCard;
  }, []);

  const playerHit = useCallback(() => {
    if (![GameState.Initial, GameState.PlayerTurn].includes(gameState)) return;
    const card = dealCard();
    if (!card) return;
    setPlayerHand((prev) => [card, ...prev]);
  }, [dealCard, gameState]);

  const dealerHit = useCallback(() => {
    if (![GameState.Initial, GameState.DealerTurn].includes(gameState)) return;
    setDealerHand((prev) => {
      const card = dealCard();
      if (!card) return prev;
      const hidden = prev.length ? false : true;
      const cardData = {
        ...card,
        hidden,
      };
      return [cardData, ...prev];
    });
  }, [dealCard, gameState]);

  const stand = useCallback(() => {
    if (gameState !== GameState.PlayerTurn) return;
    setGameState(GameState.DealerTurn);
  }, [gameState]);

  const revealHiddenCard = () => {
    const hiddenCardIdx = dealerHand.findIndex((card) => card.hidden);
    if (!hiddenCardIdx) return;
    setDealerHand((prev) => {
      const newDeck = [...prev];
      newDeck[hiddenCardIdx].hidden = false;
      return newDeck;
    });
    setHiddenCardRevealed(true);
  };

  const reset = () => {
    setDealStep(0);
    setGameState(GameState.Initial);
    setGameOutcome(null);
    setHiddenCardRevealed(false);
  };

  const handleRevealWin = useCallback(() => {
    const playerTotal = sumHand(playerHand);
    const dealerTotal = sumHand(dealerHand);
    // 1. Check if player bust
    if (playerTotal > 21) {
      setGameOutcome(GameOutcome.PlayerBust);
      // 2. Check for a push
    } else if (playerTotal === dealerTotal) {
      setGameOutcome(GameOutcome.Push);
      // 3. Check for player blackjack
    } else if (playerTotal === 21) {
      setGameOutcome(GameOutcome.Blackjack);
      // Check for dealer bust
    } else if (dealerTotal > 21) {
      setGameOutcome(GameOutcome.DealerBust);
      // Check for regular player win
    } else if (playerTotal > dealerTotal) {
      setGameOutcome(GameOutcome.PlayerWin);
      // Check for regular dealer win
    } else if (dealerTotal > playerTotal) {
      setGameOutcome(GameOutcome.DealerWin);
    } else {
      // This shouldn't ever happen
      console.error('Unusual win condition');
      console.table(playerHand);
      console.table(dealerHand);
      setGameOutcome(GameOutcome.PlayerWin);
    }
    setGameState(GameState.Complete);
  }, [playerHand, dealerHand]);

  // Player bust on a hit, skip to dealer turn
  const handlePlayerBustOnHit = useCallback(async () => {
    await wait(DELAY_BETWEEN_DEALS);
    setGameState(GameState.DealerTurn);
  }, []);

  // Handle the dealer turn, called each time the dealer must hit
  const handleDealerTurn = useCallback(async () => {
    const dealerShouldHit = sumHand(dealerHand) <= 17;
    const hiddenCard = dealerHand.find((card) => card.hidden);
    const playerDidBust = sumHand(playerHand) > 21;
    if (hiddenCard) {
      revealHiddenCard();
    }
    // Wait for react to update the state
    if (!hiddenCardRevealed) return;
    if (dealerShouldHit && !playerDidBust) {
      await wait(DELAY_BETWEEN_DEALS);
      dealerHit();
    } else {
      setGameState(GameState.Reveal);
    }
  }, [dealerHand, dealerHit, hiddenCardRevealed]);

  const initialDeal = async () => {
    if (dealStep === 0) {
      setDeck(initialCards);
      setPlayerHand([]);
      setDealerHand([]);
      playerHit();
      await wait(DELAY_BETWEEN_DEALS);
      setDealStep(1);
    } else if (dealStep === 1) {
      dealerHit();
      await wait(DELAY_BETWEEN_DEALS);
      setDealStep(2);
    } else if (dealStep === 2) {
      playerHit();
      await wait(DELAY_BETWEEN_DEALS);
      setDealStep(3);
    } else if (dealStep === 3) {
      dealerHit();
      await wait(DELAY_BETWEEN_DEALS);
      setDealStep(4);
    } else if (dealStep === 4) {
      const dealerHasBlackjack = sumHand(dealerHand) === 21;
      if (dealerHasBlackjack) {
        setGameState(GameState.DealerTurn);
      } else {
        setGameState(GameState.PlayerTurn);
      }
    }
  };

  // Monitor player / dealer turns
  useEffect(() => {
    if (gameState === GameState.PlayerTurn) {
      const playerDidBust = sumHand(playerHand) > 21;
      const playerGotBlackjack = sumHand(playerHand) === 21;
      if (playerDidBust) handlePlayerBustOnHit();
      if (playerGotBlackjack) setGameState(GameState.DealerTurn);
    } else if (gameState === GameState.DealerTurn) {
      handleDealerTurn();
    }
  }, [playerHand, dealerHand, gameState]);

  // Monitor gamestate for start / end turns
  useEffect(() => {
    // Handle initial deal and reveal here
    // Player / dealer turns handled above
    if (gameState === GameState.Initial) {
      initialDeal();
    } else if (gameState === GameState.Reveal) {
      handleRevealWin();
    }
  }, [dealStep, gameState, playerHit, dealerHit]);

  return { playerHand, dealerHand, gameOutcome, hit: playerHit, stand, reset };
}

export default useBlackjack;
