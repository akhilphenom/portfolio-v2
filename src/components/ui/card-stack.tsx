"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

let interval: any;

export type Card = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 5;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    startFlipping();
    return () => clearInterval(interval);
  }, []);

  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()!); // move the last element to the front
        return newArray;
      });
    }, 5000);
  };

  return (
    <div className="relative  h-60 w-60">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute bg-[rgba(255,255,255,0.95)] h-60 w-60 rounded-3xl p-4 shadow-md flex flex-col justify-evenly"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
          >
            {
              index == 0 ? 
              <>
                {card.content}
                  <div>
                    <p className="text-neutral-500 font-medium">
                      {card.name}
                    </p>
                    <p className="text-neutral-400 !font-light dark:text-neutral-200 text-center">
                      {card.designation}
                    </p>
                  </div>
              </> : null
            }
          </motion.div>
        );
      })}
    </div>
  );
};
