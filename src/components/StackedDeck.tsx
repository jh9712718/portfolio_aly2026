import React, { useState } from "react";
import { motion } from "framer-motion";

interface DeckCard {
  label: string;
  mainText: string;
  colorVar: string;
  workKey: string;
}

const cards: DeckCard[] = [
  { label: "Campaign Planning", mainText: "Designing Strategic Solutions", colorVar: "--sage", workKey: "Campaign Planning" },
  { label: "Event Management", mainText: "Architecting Shared Experiences", colorVar: "--dusty-rose", workKey: "Event Management" },
  { label: "Graphic Design", mainText: "Shaping Visual Narratives", colorVar: "--terracotta", workKey: "Graphic Design" },
  { label: "Video Editing", mainText: "Directing Motion & Rhythm", colorVar: "--slate", workKey: "Video Editing" },
  { label: "Data Analytics", mainText: "Decoding Market Signals", colorVar: "--warm-black", workKey: "Data Analytics" },
];

// Stacked offsets (bottom card first)
const stackOffsets = [
  { x: 24, y: -12, rotate: 10 },
  { x: 12, y: -8, rotate: 6 },
  { x: 0, y: -4, rotate: 2 },
  { x: -12, y: -2, rotate: -3 },
  { x: 0, y: 0, rotate: 0 },
];

interface StackedDeckProps {
  onCardClick: (workKey: string) => void;
}

const StackedDeck: React.FC<StackedDeckProps> = ({ onCardClick }) => {
  const [spread, setSpread] = useState(false);

  return (
    <div>
      {!spread ? (
        /* ── Stacked State ── */
        <div
          className="relative w-full flex items-center justify-center cursor-pointer py-6 md:py-8"
          style={{ minHeight: 360 }}
          onClick={() => setSpread(true)}
        >
          <div className="relative w-[220px] h-[300px] md:w-[280px] md:h-[420px]">
            {cards.map((card, i) => {
              const stackedPosition = stackOffsets.length - 1 - i;

              return (
                <motion.div
                  key={card.workKey}
                  initial={false}
                  animate={{
                    x: stackOffsets[stackedPosition].x,
                    y: stackOffsets[stackedPosition].y,
                    rotate: stackOffsets[stackedPosition].rotate,
                  }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 rounded-[28px] border border-foreground/5 p-5 md:p-7 flex flex-col justify-between origin-bottom"
                  style={{
                    background: `hsl(var(${card.colorVar}))`,
                    boxShadow: "var(--shadow-card)",
                    zIndex: cards.length - i,
                  }}
                >
                  <span className="text-[10px] tracking-label uppercase text-primary-foreground/65 font-body">
                    {card.label}
                  </span>
                  <span className="font-display text-2xl md:text-[2rem] text-primary-foreground leading-[1.05] max-w-[10ch]">
                    {card.mainText}
                  </span>
                </motion.div>
              );
            })}
          </div>
          <span className="absolute bottom-0 text-[10px] tracking-label uppercase text-muted-foreground font-body">
            Tap to explore
          </span>
        </div>
      ) : (
        /* ── Spread / Grid State ── */
        <div
          className="relative py-6 md:py-8 min-h-[240px] md:min-h-[500px]"
          onClick={() => setSpread(false)}
        >
          <div
            className="mx-auto flex w-full max-w-[320px] flex-col items-stretch gap-3 md:max-w-none md:flex-row md:gap-5 md:overflow-x-auto md:pb-4 md:pr-2"
            onClick={(event) => event.stopPropagation()}
          >
            {cards.map((card, i) => (
              <motion.div
                key={card.workKey}
                initial={{ opacity: 0, scale: 0.85, rotate: stackOffsets[i].rotate }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.07,
                  ease: [0.4, 0, 0.2, 1],
                }}
                whileHover={{ scale: 1.03, y: -4 }}
                onClick={() => onCardClick(card.workKey)}
                className="relative w-full rounded-[28px] px-5 py-6 min-h-[180px] md:h-[420px] md:w-[280px] md:max-w-none md:flex-none md:p-7 border border-foreground/5 cursor-pointer flex flex-col justify-between"
                style={{
                  background: `hsl(var(${card.colorVar}))`,
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <span className="text-[10px] tracking-label uppercase text-primary-foreground/65 font-body pl-0.5">
                  {card.label}
                </span>
                <span className="font-display text-[1.9rem] md:text-[2rem] text-primary-foreground leading-[1.05] max-w-[8.6ch] pl-0.5">
                  {card.mainText}
                </span>
              </motion.div>
            ))}
          </div>
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] tracking-label uppercase text-muted-foreground font-body">
            Tap to restack
          </span>
        </div>
      )}
    </div>
  );
};

export default StackedDeck;
