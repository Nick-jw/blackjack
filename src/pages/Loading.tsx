import { useEffect, useState } from 'react';

function Loading() {
  const [phase, setPhase] = useState<number>(0);
  const [key, setKey] = useState<Date>(new Date());
  const [items] = useState<string[]>([
    'Loading',
    'Nearly there',
    'Processing',
    'Thinking',
    'Generating',
    'Almost done',
    'Here we go',
  ]);
  const [periodCount, setPeriodCount] = useState<number>(0);
  const [currentItem, setCurrentItem] = useState<string>(items[phase]);

  useEffect(() => {
    const tid = setTimeout(() => {
      const newPhase = Math.floor(Math.random() * items.length);
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
    <div className="h-full flex items-center justify-center text-xl">
      <h1>
        {currentItem}
        {'.'.repeat(periodCount)}
      </h1>
    </div>
  );
}

export default Loading;
