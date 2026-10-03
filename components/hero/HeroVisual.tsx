/**
 * HeroVisual — the code terminal card displayed on the right side of the hero.
 * Kept in its own file so HeroSection stays focused on layout + animations.
 */
export default function HeroVisual() {
  return (
    <div className="relative w-full">
      {/* Ambient glow */}
      <div className="absolute inset-0 rounded-2xl bg-[#4F8EFF]/10 blur-3xl scale-105 pointer-events-none" />

      {/* Terminal card */}
      <div className="relative rounded-2xl border border-[#1A1D33] bg-[#0E101E] overflow-hidden shadow-2xl">

        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1A1D33] bg-[#080810]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]/80" />
          <span className="ml-3 text-[#475569] text-xs font-mono">durgesh@portfolio ~</span>
        </div>

        {/* Code block */}
        <div className="p-5 font-mono text-[0.72rem] leading-relaxed space-y-1">
          <div><span className="text-[#64748B]">{"// 2024 stack snapshot"}</span></div>
          <div className="h-1.5" />

          <div>
            <span className="text-[#818CF8]">const</span>
            <span className="text-[#F0F4FF]"> durgesh </span>
            <span className="text-[#60A5FA]">=</span>
            <span className="text-[#F0F4FF]"> {"{"}</span>
          </div>

          {[
            { key: "name",       val: "'Durgesh Kanzariya'" },
            { key: "role",       val: "'Full-Stack + ML'" },
            { key: "stack",      val: "['React', 'FastAPI', 'Flutter']" },
            { key: "university", val: "'RK University'" },
          ].map(({ key, val }) => (
            <div key={key} className="pl-4">
              <span className="text-[#38BDF8]">{key}</span>
              <span className="text-[#64748B]">: </span>
              <span className="text-[#93C5FD]">{val}</span>
              <span className="text-[#F0F4FF]">,</span>
            </div>
          ))}

          <div className="pl-4">
            <span className="text-[#38BDF8]">shipped</span>
            <span className="text-[#64748B]">: </span>
            <span className="text-[#93C5FD]">5</span>
            <span className="text-[#64748B]">{", // production projects"}</span>
          </div>

          <div><span className="text-[#F0F4FF]">{"}"}</span></div>
          <div className="h-1.5" />

          <div>
            <span className="text-[#818CF8]">export</span>
            <span className="text-[#F0F4FF]"> durgesh</span>
          </div>

          <div className="flex items-center gap-1 mt-1">
            <span className="text-[#4F8EFF]">▶</span>
            <span className="text-[#64748B]"> ready for next problem</span>
            <span className="inline-block w-1.5 h-3.5 bg-[#4F8EFF] ml-0.5 animate-pulse" />
          </div>
        </div>

        {/* Stat bar */}
        <div className="border-t border-[#1A1D33] px-5 py-3 flex items-center gap-6 bg-[#080810]/70">
          {[
            { label: "Projects", value: "5" },
            { label: "Domains",  value: "3" },
            { label: "Status",   value: "Open" },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-[#475569] text-[0.6rem] uppercase tracking-widest font-mono">
                {label}
              </span>
              <span
                className="text-[0.65rem] font-mono font-bold"
                style={{ color: value === "Open" ? "#4F8EFF" : "#F0F4FF" }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
