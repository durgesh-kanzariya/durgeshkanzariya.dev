"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SKILL_CATEGORIES } from "./skillsData";
import SkillCategoryCard from "./SkillCategoryCard";
import SkillMarquee from "./SkillMarquee";

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
        <div ref={headingRef} className="mb-16" style={{ opacity: 0 }}>
          <h2 className="display-lg text-[#F0F4FF] mb-6">
            What I <span className="text-hollow-accent">work with.</span>
          </h2>
          <p className="text-[#94A3B8] max-w-lg text-base leading-relaxed">
            A curated stack across full-stack web, mobile, and machine learning — tools
            I&apos;ve shipped real production projects with.
          </p>
        </div>

        {/* Category grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-10"
        >
          {Object.entries(SKILL_CATEGORIES).map(([category, skills]) => (
            <SkillCategoryCard
              key={category}
              category={category}
              skills={skills}
            />
          ))}
        </div>
      </div>

      {/* Marquee ticker */}
      <SkillMarquee />
    </section>
  );
}
