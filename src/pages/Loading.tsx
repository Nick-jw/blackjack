import { useEffect, useState } from 'react';
import Card from '../components/Card';

function Loading() {
  const [phase, setPhase] = useState<number>(0);
  const [key, setKey] = useState<Date>(new Date());
  const [items] = useState<string[]>(['Loading', 'Nearly there', 'Processing']);
  const [periodCount, setPeriodCount] = useState<number>(0);
  const [currentItem, setCurrentItem] = useState<string>(items[phase]);
  const [flipped, setFlipped] = useState<boolean>(false);

  const cardData = [
    { name: 'A', suit: '♠' },
    { name: '10', suit: '♥' },
  ];

  useEffect(() => {
    const tid = setTimeout(() => {
      const newPhase = Math.floor(Math.random() * 3);
      setPhase(newPhase);
      setPeriodCount((prev) => (prev + 1) % 4);
      if (periodCount === 3) {
        setCurrentItem(items[phase]);
        setPeriodCount(0);
      }
      setKey(new Date());
    }, 1000);

    return () => clearTimeout(tid);
  }, [key]);

  return (
    <div className="h-full flex items-center justify-center">
      <h1>
        {currentItem}
        {'.'.repeat(periodCount)}
      </h1>
      <button onClick={() => setFlipped(!flipped)}>Flip</button>
      <Card cardValue={cardData[0]} flipped={flipped} />
      <Card cardValue={cardData[1]} flipped={flipped} />
    </div>
  );
}

export default Loading;
