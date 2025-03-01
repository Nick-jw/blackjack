import React, { useEffect } from 'react';
import { motion, useAnimation } from 'motion/react';

interface CardProps {
  data: {
    name: string;
    suit: string;
    hidden?: boolean;
  };
}

const Card: React.FC<CardProps> = ({ data }) => {
  const { name, suit, hidden = false } = data;
  const color = ['♠', '♣'].includes(suit) ? 'text-black' : 'text-red-600';
  const controls = useAnimation();

  // TODO - Fix grow animation getting bigger on each card
  useEffect(() => {
    const sequence = async () => {
      await controls.start({ scale: 3, transition: { duration: 0.1 } });
      await controls.start({
        rotateY: hidden ? 0 : 180,
        transition: { duration: 0.1 },
      });
      await controls.start({ scale: 1, transition: { duration: 0.1 } });
    };
    sequence();
  }, [hidden, controls]);

  return (
    <div className="relative w-40 h-56">
      <motion.div
        className="absolute inset-0 w-full h-full transition-transform duration-500 [transform-style:preserve-3d]"
        style={{ perspective: 1000 }}
        animate={controls}
      >
        {/* Front Side */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-white border border-black rounded-lg shadow-lg [backface-visibility:hidden] rotate-y-180 ${color}`}
        >
          <div className="h-full w-full flex flex-col justify-start p-2 px-3">
            <div className="flex items-center justify-start font-bold text-4xl">
              {name}
            </div>
            <div className="flex flex-grow items-center justify-center text-8xl">
              {suit}
            </div>
            <div className="flex items-center justify-end font-bold text-4xl">
              {name}
            </div>
          </div>
        </div>
        {/* Back Side */}
        <div className="absolute inset-0 flex items-center justify-center border rounded-lg shadow-lg [backface-visibility:hidden] checkerboard">
          <p className="text-2xl text-white"></p>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
