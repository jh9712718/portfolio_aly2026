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

const colorMap: Record<string, string> = {
  terracotta: "hsl(var(--terracotta))",
  sage: "hsl(var(--sage))",
  slate: "hsl(var(--slate))",
  "dusty-rose": "hsl(var(--dusty-rose))",
  sand: "hsl(var(--warm-sand))",
  night: "hsl(var(--warm-black))",
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
  const bg = colorMap[colorClass] || colorMap.terracotta;

  return (
    <motion.div
      initial={{ rotate: rotation }}
      whileHover={disabled ? {} : { rotate: 0, scale: 1.03, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={disabled ? undefined : onClick}
      className="relative rounded-xl p-5 min-h-[140px] md:min-h-[160px] overflow-hidden border border-foreground/5"
      style={{
        background: bg,
        opacity: disabled ? 0.3 : 1,
        cursor: disabled ? "default" : "pointer",
      }}
    >
      {comingSoon && (
        <span className="absolute top-3 right-3 text-[9px] tracking-label uppercase text-primary-foreground/60 bg-primary-foreground/15 px-2 py-1 rounded-full border border-primary-foreground/30">
          {comingSoon}
        </span>
      )}
      <div className="text-[10px] tracking-label uppercase text-primary-foreground/65 mb-1.5">
        {label}
      </div>
      <div className="font-display text-base md:text-lg text-primary-foreground leading-tight">
        {title}
      </div>
      <span className="absolute bottom-3 right-3 text-[9px] tracking-label uppercase text-primary-foreground/50 bg-primary-foreground/10 px-2 py-1 rounded-full">
        {tag}
      </span>
    </motion.div>
  );
};

export default Flashcard;
