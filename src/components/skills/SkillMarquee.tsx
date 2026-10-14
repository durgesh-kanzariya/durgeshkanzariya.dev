"use client";

import { MARQUEE_ROW_1, MARQUEE_ROW_2, CATEGORY_ACCENTS, type SkillItem } from "./skillsData";

function SkillChip({ name, category }: SkillItem) {
  const accent = CATEGORY_ACCENTS[category] || "#4F8EFF";

  return (
    <div className="flex-shrink-0 flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#1A1D33] bg-[#0E101E] hover:border-[#4F8EFF]/40 hover:bg-[#14172B] transition-all duration-200 mx-1.5">
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: accent }}
      />
      <span className="font-jakarta text-xs text-[#94A3B8] font-medium whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export default function SkillMarquee() {
  return (
    <div className="relative overflow-hidden pt-8">
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#080810] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#080810] to-transparent z-10 pointer-events-none" />

      {/* Row 1 — scroll left */}
      <div className="overflow-hidden py-1.5">
        <div className="marquee-track flex items-center">
          {MARQUEE_ROW_1.map((item, i) => (
            <SkillChip key={`r1-${item.name}-${i}`} {...item} />
          ))}
        </div>
      </div>

      {/* Row 2 — scroll right */}
      <div className="overflow-hidden py-1.5">
        <div className="marquee-track-reverse flex items-center">
          {MARQUEE_ROW_2.map((item, i) => (
            <SkillChip key={`r2-${item.name}-${i}`} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
