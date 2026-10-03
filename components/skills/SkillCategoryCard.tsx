"use client";

import { CATEGORY_ACCENTS } from "./skillsData";

interface SkillCategoryCardProps {
  category: string;
  skills: string[];
}

export default function SkillCategoryCard({ category, skills }: SkillCategoryCardProps) {
  const accent = CATEGORY_ACCENTS[category] || "#4F8EFF";

  return (
    <div className="skill-category-card rounded-2xl border border-[#1A1D33] bg-[#0E101E] p-6 hover:border-[#4F8EFF]/30 hover:bg-[#121528] transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Category Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1A1D33] mb-5">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: accent }}
            />
            <h3 className="font-syne font-bold text-sm tracking-wide text-[#F0F4FF] group-hover:text-white transition-colors">
              {category}
            </h3>
          </div>
          <span className="text-[0.62rem] font-mono text-[#475569] uppercase tracking-wider">
            {skills.length} techs
          </span>
        </div>

        {/* Skill list */}
        <div className="flex flex-col gap-2.5">
          {skills.map((skill) => (
            <div
              key={skill}
              className="flex items-center justify-between py-1 px-2.5 rounded-lg hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-sm font-jakarta text-[#94A3B8] group-hover:text-[#E2E8F0] transition-colors">
                {skill}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#252846] group-hover:bg-[#4F8EFF]/60 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
