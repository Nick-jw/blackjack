import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'motion/react';

interface CardProps {
  flipped: boolean;
  cardValue: {
    name: string;
    suit: string;
  };
}

const Card: React.FC<CardProps> = ({ cardValue, flipped }) => {
  const { name, suit } = cardValue;
  const color = ['♠', '♣️'].includes(suit) ? 'text-black' : 'text-red-600';
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await controls.start({ scale: 3, transition: { duration: 0.1 } });
      await controls.start({
        rotateY: flipped ? 180 : 0,
        transition: { duration: 0.1 },
      });
      await controls.start({ scale: 1, transition: { duration: 0.1 } });
    };

    sequence();
  }, [flipped, controls]);

  return (
    <div className="relative w-40 h-56">
      <motion.div
        className="absolute inset-0 w-full h-full transition-transform duration-500 [transform-style:preserve-3d]"
        style={{ perspective: 1000 }}
        animate={controls}
      >
        {/* Front Side */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-white border border-black rounded-lg shadow-lg [backface-visibility:hidden] ${color}`}
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
        <div className="absolute inset-0 flex items-center justify-center border rounded-lg shadow-lg [backface-visibility:hidden] rotate-y-180 checkerboard">
          <p className="text-2xl text-white"></p>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
