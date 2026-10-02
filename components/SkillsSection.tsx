"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SKILLS = {
  Frontend: [
    { name: "React.js" },
    { name: "TypeScript" },
    { name: "JavaScript" },
    { name: "HTML5/CSS3" },
    { name: "Next.js" },
    { name: "Tailwind CSS" },
  ],
  Backend: [
    { name: "Node.js" },
    { name: "Express.js" },
    { name: "FastAPI" },
    { name: "Python" },
    { name: "REST APIs" },
    { name: "PostgreSQL" },
    { name: "SQL" },
  ],
  "ML / AI": [
    { name: "TensorFlow" },
    { name: "PyTorch" },
    { name: "Scikit-Learn" },
    { name: "XGBoost" },
    { name: "Pandas & NumPy" },
  ],
  Mobile: [
    { name: "Flutter" },
    { name: "Dart" },
    { name: "Firebase" },
    { name: "Riverpod" },
  ],
  Tools: [
    { name: "Git & GitHub" },
    { name: "Docker" },
    { name: "Postman" },
    { name: "Figma" },
    { name: "VS Code" },
  ],
};

// Flatten all skills for marquee rows
const ALL_SKILLS = Object.entries(SKILLS).flatMap(([cat, items]) =>
  items.map((s) => ({ ...s, category: cat }))
);

const ROW_1 = [...ALL_SKILLS.slice(0, 14), ...ALL_SKILLS.slice(0, 14)];
const ROW_2 = [...ALL_SKILLS.slice(14), ...ALL_SKILLS.slice(14)];

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "#4F8EFF",
  Backend:  "#10B981",
  "ML / AI": "#A855F7",
  Mobile:   "#F59E0B",
  Tools:    "#6B7280",
};

function SkillChip({ name, category }: { name: string; category: string }) {
  const color = CATEGORY_COLORS[category] || "#4F8EFF";

  return (
    <div className="flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-white/[0.08] bg-[#0d0d1a] hover:border-white/20 hover:bg-[#121226] transition-all duration-300 mx-1.5 group cursor-default">
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-transform duration-300 group-hover:scale-125"
        style={{ background: color, boxShadow: `0 0 6px ${color}` }}
      />
      <span className="font-sans text-xs text-[#C4C4D8] font-medium whitespace-nowrap group-hover:text-white transition-colors">
        {name}
      </span>
      <span className="font-mono text-[0.6rem] text-[#6B7280] tracking-wider uppercase">
        {category}
      </span>
    </div>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Heading word reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Stagger category cards
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section-padding relative">
      <div className="section-container">
        {/* Section Header */}
        <div ref={headingRef} className="mb-16">
          <h2 className="display-lg text-[#F0F0F8]">
            What I <span className="text-hollow-accent">work with.</span>
          </h2>
          <p className="text-[#8E90A6] text-base md:text-lg max-w-xl font-light mt-3">
            A production-proven technology stack spanning full-stack web, cross-platform mobile,
            and machine learning systems.
          </p>
        </div>

        {/* Category grid — Double Bezel Architecture */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-20"
        >
          {Object.entries(SKILLS).map(([category, items]) => {
            const color = CATEGORY_COLORS[category] || "#4F8EFF";

            return (
              <div
                key={category}
                className="p-1 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 hover:bg-white/[0.04] transition-all duration-500 flex flex-col group"
              >
                <div className="p-5 rounded-[calc(1rem-0.25rem)] bg-[#090912] border border-white/[0.03] flex flex-col justify-between h-full">
                  {/* Category Header */}
                  <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.04] mb-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: color, boxShadow: `0 0 6px ${color}` }}
                    />
                    <span className="font-mono text-xs font-semibold text-[#F0F0F8] tracking-wider uppercase">
                      {category}
                    </span>
                  </div>

                  {/* Skills list */}
                  <div className="flex flex-col gap-2">
                    {items.map(({ name }) => (
                      <div
                        key={name}
                        className="flex items-center justify-between text-xs py-1 text-[#8E90A6] group-hover:text-[#C4C4D8] transition-colors"
                      >
                        <span className="font-sans font-normal">{name}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Marquee rows — full bleed with smooth velocity */}
      <div className="relative overflow-hidden py-4 border-y border-white/[0.04]">
        {/* Gradient edge vignettes */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#080810] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#080810] to-transparent z-10 pointer-events-none" />

        {/* Row 1 — left scroll */}
        <div className="overflow-hidden py-2">
          <div className="marquee-track flex items-center">
            {ROW_1.map((skill, i) => (
              <SkillChip key={`r1-${i}`} {...skill} />
            ))}
          </div>
        </div>

        {/* Row 2 — right scroll */}
        <div className="overflow-hidden py-2">
          <div className="marquee-track-reverse flex items-center">
            {ROW_2.map((skill, i) => (
              <SkillChip key={`r2-${i}`} {...skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
