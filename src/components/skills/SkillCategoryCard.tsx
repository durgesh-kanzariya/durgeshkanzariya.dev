"use client";

import { CATEGORY_ACCENTS } from "./skillsData";

interface SkillCategoryCardProps {
  category: string;
  skills: string[];
}

export default function SkillCategoryCard({ category, skills }: SkillCategoryCardProps) {
  const accent = CATEGORY_ACCENTS[category] || "#4F8EFF";

  return (
    <div className="skill-category-card rounded-2xl border border-[#1A1D33] bg-[#0E101E] p-5 hover:border-[#4F8EFF]/30 hover:bg-[#111324] transition-all duration-300 flex flex-col justify-between group shadow-lg shadow-black/20">
      <div>
        {/* Category Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#1A1D33] mb-4">
          <div className="flex items-center gap-2.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: accent, boxShadow: `0 0 8px ${accent}60` }}
            />
            <h3 className="font-syne font-bold text-sm tracking-wide text-[#F0F4FF] group-hover:text-white transition-colors">
              {category}
            </h3>
          </div>
          <span className="text-[0.62rem] font-mono text-[#94A3B8] bg-[#14172B] border border-[#252846] px-2 py-0.5 rounded-full uppercase tracking-wider">
            {skills.length} techs
          </span>
        </div>

        {/* Skill Pills */}
        <div className="flex flex-col gap-1.5">
          {skills.map((skill) => (
            <div
              key={skill}
              className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#14172B]/50 border border-[#1E223D] hover:border-[#4F8EFF]/40 hover:bg-[#181C38] transition-all duration-200 group/pill"
            >
              <span className="text-xs font-mono text-[#CBD5E1] group-hover/pill:text-white transition-colors">
                {skill}
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full opacity-40 group-hover/pill:opacity-100 transition-opacity"
                style={{ background: accent }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
