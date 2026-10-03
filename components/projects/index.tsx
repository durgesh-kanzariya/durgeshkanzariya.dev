"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FEATURED_PROJECTS, GRID_PROJECTS } from "@/data/projectsData";
import FeaturedProjectRow from "./FeaturedProjectRow";
import GridProjectCard from "./GridProjectCard";

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section-padding relative">
      <div className="section-container">

        {/* Section header */}
        <div ref={headingRef} className="mb-20" style={{ opacity: 0 }}>
          <h2 className="display-lg text-[#F0F4FF] mb-6">
            Things I&apos;ve{" "}
            <span className="text-hollow-accent">built.</span>
          </h2>
          <p className="text-[#94A3B8] max-w-lg text-base leading-relaxed">
            From AI routing engines to Flutter mobile apps to ML models — a snapshot of
            what I&apos;ve shipped across domains.
          </p>
        </div>

        {/* Featured projects — alternating layout */}
        <div className="flex flex-col gap-28 mb-32">
          {FEATURED_PROJECTS.map((project, i) => (
            <FeaturedProjectRow key={project.slug} project={project} index={i} />
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-6 mb-16">
          <div className="flex-1 h-px bg-[#1A1D33]" />
          <span className="label-muted">More work</span>
          <div className="flex-1 h-px bg-[#1A1D33]" />
        </div>

        {/* Grid projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GRID_PROJECTS.map((project, i) => (
            <GridProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
