"use client";
import { memo, useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type Card = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
};

const CardComponent = () => ({
  items,
  offset = 5,
  scaleFactor = 0.06,
  autoFlipInterval = 3000,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
  autoFlipInterval?: number;
}) => {
  const [cards, setCards] = useState<Card[]>(items);
  const [isAnimating, setIsAnimating] = useState(false);

  const rotateCards = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCards((prevCards) => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop()!);
        return newArray;
      });
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [isAnimating]);

  useEffect(() => {
    const interval = setInterval(rotateCards, autoFlipInterval);
    return () => clearInterval(interval);
  }, [rotateCards, autoFlipInterval]);

  const handleClick = () => {
    rotateCards();
  };

  return (
    <div className="relative h-60 w-60 cursor-pointer select-none" onClick={handleClick}>
      <AnimatePresence>
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className="absolute bg-[rgba(255,255,255)] h-[250px] w-60 rounded-3xl p-4 shadow-md flex flex-col justify-between
            bg-gradient-to-b from-white to-blue-400/60"
            style={{ transformOrigin: "top center" }}
            initial={{ scale: 1 - (cards.length - 1) * scaleFactor, y: (cards.length - 1) * offset }}
            animate={{
              scale: 1 - index * scaleFactor,
              y: index * -offset,
              zIndex: cards.length - index,
            }}
            exit={{ scale: 1, y: -30, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 10,
              mass: 0.8,
            }}
          >
            {index === 0 && (
              <>
                {card.content}
                <div>
                  <p className="text-neutral-500 font-medium">{card.name}</p>
                  <p className="text-sky-600 !font-extralight drop-shadow-md dark:text-neutral-200 text-center text-sm">
                    {card.designation}
                  </p>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export const CardStack = memo(CardComponent())
