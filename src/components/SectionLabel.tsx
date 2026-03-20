import React from "react";

interface SectionLabelProps {
  number: string;
  title: string;
}

const SectionLabel: React.FC<SectionLabelProps> = ({ number, title }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="text-[10px] tracking-label uppercase text-muted-foreground whitespace-nowrap">
      {number} · {title}
    </span>
    <div className="flex-1 h-px bg-border" />
  </div>
);

export default SectionLabel;
