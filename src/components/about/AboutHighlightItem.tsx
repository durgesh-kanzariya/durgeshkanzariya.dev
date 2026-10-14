"use client";

import { type AboutHighlight } from "./aboutData";

interface AboutHighlightItemProps {
  item: AboutHighlight;
}

export default function AboutHighlightItem({ item }: AboutHighlightItemProps) {
  const { icon: Icon, label, description, color, number } = item;

  return (
    <div className="about-item group flex items-start gap-5 py-6 first:pt-0 last:pb-0 transition-colors duration-300">
      {/* Number index */}
      <span className="font-mono text-[0.7rem] text-[#475569] font-bold pt-1.5 w-6 flex-shrink-0 group-hover:text-[#94A3B8] transition-colors">
        {number}
      </span>

      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 border border-[#1A1D33] bg-[#0E101E]"
        style={{ color }}
      >
        <Icon size={18} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-syne font-bold text-[#F0F4FF] text-base mb-1.5 group-hover:text-white transition-colors">
          {label}
        </h4>
        <p className="text-[#94A3B8] text-sm leading-relaxed">{description}</p>
      </div>

      {/* Subtle indicator bar on hover */}
      <div
        className="w-0.5 h-full rounded-full flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 self-stretch"
        style={{ background: color }}
      />
    </div>
  );
}
