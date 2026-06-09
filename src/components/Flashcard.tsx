import React from "react";
import { motion } from "framer-motion";

interface FlashcardProps {
  label: string;
  title: string;
  tag: string;
  colorClass: string;
  rotation?: number;
  comingSoon?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const colorMap: Record<string, { bg: string; ink: string; inkVar: string }> = {
  terracotta: { bg: "hsl(var(--terracotta))", ink: "hsl(var(--warm-black))", inkVar: "--warm-black" },
  sage: { bg: "hsl(var(--sage))", ink: "hsl(var(--cream))", inkVar: "--cream" },
  slate: { bg: "hsl(var(--slate))", ink: "hsl(var(--cream))", inkVar: "--cream" },
  "dusty-rose": { bg: "hsl(var(--dusty-rose))", ink: "hsl(var(--cream))", inkVar: "--cream" },
  sand: { bg: "hsl(var(--warm-sand))", ink: "hsl(var(--warm-black))", inkVar: "--warm-black" },
  night: { bg: "hsl(var(--warm-black))", ink: "hsl(var(--cream))", inkVar: "--cream" },
};

const Flashcard: React.FC<FlashcardProps> = ({
  label,
  title,
  tag,
  colorClass,
  rotation = 0,
  comingSoon,
  disabled = false,
  onClick,
}) => {
  const palette = colorMap[colorClass] || colorMap.terracotta;

  return (
    <motion.div
      initial={{ rotate: rotation }}
      whileHover={disabled ? {} : { rotate: 0, scale: 1.03, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={disabled ? undefined : onClick}
      className="relative rounded-xl p-5 min-h-[140px] md:min-h-[160px] overflow-hidden border border-foreground/5"
      style={{
        background: palette.bg,
        color: palette.ink,
        opacity: disabled ? 0.3 : 1,
        cursor: disabled ? "default" : "pointer",
      }}
    >
      {comingSoon && (
        <span
          className="absolute top-3 right-3 text-[9px] tracking-label uppercase opacity-60 px-2 py-1 rounded-full border"
          style={{
            backgroundColor: `hsl(var(${palette.inkVar}) / 0.14)`,
            borderColor: `hsl(var(${palette.inkVar}) / 0.3)`,
          }}
        >
          {comingSoon}
        </span>
      )}
      <div className="text-[10px] tracking-label uppercase opacity-65 mb-1.5">
        {label}
      </div>
      <div className="font-display text-base md:text-lg leading-tight">
        {title}
      </div>
      <span
        className="absolute bottom-3 right-3 text-[9px] tracking-label uppercase opacity-50 px-2 py-1 rounded-full"
        style={{ backgroundColor: `hsl(var(${palette.inkVar}) / 0.12)` }}
      >
        {tag}
      </span>
    </motion.div>
  );
};

export default Flashcard;
