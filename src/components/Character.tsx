import React from "react";

type Pose = "idle" | "pointing" | "curious" | "telescope" | "bow";

interface CharacterProps {
  pose: Pose;
  className?: string;
}

const Character: React.FC<CharacterProps> = ({ pose, className = "" }) => {
  const stroke = "hsl(var(--warm-black))";
  const sw = 1.5;

  const poses: Record<Pose, React.ReactNode> = {
    idle: (
      <>
        <circle cx="26" cy="12" r="8" fill="none" stroke={stroke} strokeWidth={sw} />
        <line x1="26" y1="20" x2="26" y2="46" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <line x1="26" y1="28" x2="14" y2="38" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <line x1="26" y1="28" x2="38" y2="38" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <line x1="26" y1="46" x2="18" y2="62" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <line x1="26" y1="46" x2="34" y2="62" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      </>
    ),
    pointing: (
      <>
        <circle cx="26" cy="12" r="8" fill="none" stroke={stroke} strokeWidth={sw} />
        <line x1="26" y1="20" x2="26" y2="46" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <line x1="26" y1="28" x2="10" y2="24" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <line x1="10" y1="24" x2="4" y2="22" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <line x1="26" y1="28" x2="38" y2="36" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <line x1="26" y1="46" x2="18" y2="62" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <line x1="26" y1="46" x2="34" y2="62" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      </>
    ),
    curious: (
      <>
        <circle cx="26" cy="11" r="8" fill="none" stroke={stroke} strokeWidth={sw} transform="rotate(-12 26 11)" />
        <line x1="25" y1="19" x2="22" y2="45" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <line x1="23" y1="27" x2="12" y2="36" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <line x1="23" y1="27" x2="34" y2="32" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <line x1="22" y1="45" x2="15" y2="61" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <line x1="22" y1="45" x2="30" y2="62" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      </>
    ),
    telescope: (
      <>
        <circle cx="26" cy="12" r="8" fill="none" stroke={stroke} strokeWidth={sw} />
        <line x1="26" y1="20" x2="26" y2="46" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <line x1="26" y1="26" x2="10" y2="20" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <line x1="10" y1="20" x2="4" y2="18" stroke={stroke} strokeWidth={2} strokeLinecap="round" />
        <line x1="4" y1="18" x2="0" y2="17" stroke={stroke} strokeWidth={2.5} strokeLinecap="round" />
        <line x1="26" y1="26" x2="38" y2="32" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <line x1="26" y1="46" x2="18" y2="62" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <line x1="26" y1="46" x2="34" y2="62" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      </>
    ),
    bow: (
      <>
        <circle cx="26" cy="12" r="8" fill="none" stroke={stroke} strokeWidth={sw} />
        <path d="M26 20 Q22 34 18 44" stroke={stroke} strokeWidth={sw} strokeLinecap="round" fill="none" />
        <line x1="22" y1="28" x2="10" y2="22" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <line x1="22" y1="28" x2="32" y2="20" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <line x1="18" y1="44" x2="12" y2="60" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <line x1="18" y1="44" x2="28" y2="58" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      </>
    ),
  };

  return (
    <svg width="52" height="72" viewBox="0 0 52 72" className={className}>
      {poses[pose]}
    </svg>
  );
};

export default Character;
