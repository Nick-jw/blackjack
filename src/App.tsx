import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [phase, setPhase] = useState<number>(0);
  const [key, setKey] = useState<Date>(new Date());
  const [items] = useState<string[]>(['Loading', 'Nearly there', 'Processing']);
  const [periodCount, setPeriodCount] = useState<number>(0);
  const [currentItem, setCurrentItem] = useState<string>(items[phase]);

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
    <div className="min-h-screen flex items-center justify-center">
      <h1>
        {currentItem}
        {'.'.repeat(periodCount)}
      </h1>
    </div>
  );
}

export default App;
