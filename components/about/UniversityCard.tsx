"use client";

import { GraduationCap } from "lucide-react";

export default function UniversityCard() {
  return (
    <div className="mt-8 relative overflow-hidden rounded-2xl border border-[#1A1D33] bg-[#0E101E] p-5 hover:border-[#4F8EFF]/30 transition-all duration-300">
      {/* Top subtle blue accent stripe */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#4F8EFF]/70 via-[#38BDF8]/30 to-transparent" />

      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-[#4F8EFF]/10 border border-[#4F8EFF]/20 flex items-center justify-center text-[#4F8EFF] flex-shrink-0">
          <GraduationCap size={18} />
        </div>
        <div>
          <div className="text-[#F0F4FF] font-syne font-bold text-sm">
            RK University, Rajkot
          </div>
          <div className="text-[#64748B] text-xs font-mono mt-0.5">
            B.Tech · Information Technology · 2023–2027
          </div>
        </div>
        <div className="ml-auto">
          <div className="text-[0.62rem] font-mono uppercase tracking-widest text-[#4F8EFF] bg-[#4F8EFF]/10 border border-[#4F8EFF]/25 px-2.5 py-1 rounded-full font-semibold">
            Active
          </div>
        </div>
      </div>
    </div>
  );
}
