"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SKILLS = {
  Frontend: [
    { name: "React.js", icon: "⚛️" },
    { name: "TypeScript", icon: "𝕋" },
    { name: "JavaScript", icon: "𝙅𝙎" },
    { name: "HTML/CSS", icon: "🎨" },
    { name: "Next.js", icon: "▲" },
    { name: "Tailwind CSS", icon: "💨" },
  ],
  Backend: [
    { name: "Node.js", icon: "🟢" },
    { name: "Express.js", icon: "⚡" },
    { name: "FastAPI", icon: "🚀" },
    { name: "Python", icon: "🐍" },
    { name: "REST APIs", icon: "🔗" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "SQL", icon: "📊" },
  ],
  "ML / AI": [
    { name: "TensorFlow", icon: "🧠" },
    { name: "Keras", icon: "🔬" },
    { name: "Scikit-Learn", icon: "📐" },
    { name: "XGBoost", icon: "🌲" },
    { name: "Pandas", icon: "🐼" },
    { name: "NumPy", icon: "🔢" },
  ],
  Mobile: [
    { name: "Flutter", icon: "💙" },
    { name: "Dart", icon: "🎯" },
    { name: "Firebase", icon: "🔥" },
    { name: "Riverpod", icon: "⚓" },
  ],
  Tools: [
    { name: "Git", icon: "🌿" },
    { name: "GitHub", icon: "🐙" },
    { name: "Docker", icon: "🐳" },
    { name: "Figma", icon: "✏️" },
    { name: "VS Code", icon: "💻" },
  ],
};

// Flatten all skills for marquee rows
const ALL_SKILLS = Object.entries(SKILLS).flatMap(([cat, items]) =>
  items.map((s) => ({ ...s, category: cat }))
);

const ROW_1 = [...ALL_SKILLS.slice(0, 12), ...ALL_SKILLS.slice(0, 12)];
const ROW_2 = [...ALL_SKILLS.slice(12), ...ALL_SKILLS.slice(12)];

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "#4F8EFF",
  Backend:  "#10B981",
  "ML / AI": "#A855F7",
  Mobile:   "#F59E0B",
  Tools:    "#6B7280",
};

function SkillChip({ name, icon, category }: { name: string; icon: string; category: string }) {
  return (
    <div className="flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-full border border-[#1c1c3a] bg-[#0f0f1e] hover:border-[#252548] hover:bg-[#13132a] transition-all duration-300 mx-2">
      <span className="text-base leading-none">{icon}</span>
      <span className="font-jakarta text-sm text-[#9CA3AF] font-medium whitespace-nowrap">{name}</span>
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: CATEGORY_COLORS[category] }}
      />
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
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
        }
      );

      // Category cards stagger
      const cards = gsap.utils.toArray<Element>(".skill-category-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="section-container">
        {/* Section header */}
        <div ref={headingRef} className="mb-20" style={{ opacity: 0 }}>
          <div className="label-sm mb-4">Technical Arsenal</div>
          <div className="flex items-end justify-between flex-wrap gap-6">
            <h2 className="display-lg text-[#F0F0F8]">
              What I
              <br />
              <span className="text-hollow">work with.</span>
            </h2>
            <p className="text-[#6B7280] max-w-sm text-sm leading-relaxed">
              A curated stack across full-stack web, mobile, and machine learning — tools
              I&apos;ve shipped real projects with.
            </p>
          </div>
        </div>

        {/* Category grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-24"
        >
          {Object.entries(SKILLS).map(([category, items]) => (
            <div
              key={category}
              className="skill-category-card card-base p-5 flex flex-col gap-4"
              style={{ opacity: 0 }}
            >
              {/* Category label */}
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: CATEGORY_COLORS[category] }}
                />
                <span className="label-muted">{category}</span>
              </div>

              {/* Skills */}
              <div className="flex flex-col gap-2.5">
                {items.map(({ name, icon }) => (
                  <div key={name} className="flex items-center gap-2.5">
                    <span className="text-sm leading-none w-5 text-center">{icon}</span>
                    <span className="text-[#9CA3AF] text-sm font-jakarta">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee rows — full bleed */}
      <div className="relative overflow-hidden">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#080810] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#080810] to-transparent z-10 pointer-events-none" />

        {/* Row 1 — left scroll */}
        <div className="overflow-hidden py-3">
          <div className="marquee-track flex items-center">
            {ROW_1.map((skill, i) => (
              <SkillChip key={`r1-${i}`} {...skill} />
            ))}
          </div>
        </div>

        {/* Row 2 — right scroll */}
        <div className="overflow-hidden py-3">
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
