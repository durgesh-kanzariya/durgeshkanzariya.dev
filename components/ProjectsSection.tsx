"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FEATURED_PROJECTS, GRID_PROJECTS } from "@/data/projectsData";
import { FeaturedProjectRow } from "./projects/FeaturedProjectRow";
import { GridProjectCard } from "./projects/GridProjectCard";

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header kinetic text entrance
      gsap.fromTo(
        ".projects-heading-word",
        { y: "115%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Other projects grid entrance
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
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
    <section id="projects" ref={sectionRef} className="section-padding relative">
      <div className="section-container">
        {/* Section Header */}
        <div ref={headingRef} className="mb-20">
          <h2 className="display-lg text-[#F0F0F8] overflow-hidden">
            <span className="inline-block projects-heading-word mr-3 will-change-transform">Things</span>
            <span className="inline-block projects-heading-word mr-3 will-change-transform">I&apos;ve</span>
            <span className="inline-block projects-heading-word text-hollow-accent will-change-transform">built.</span>
          </h2>
          <p className="text-[#8E90A6] text-base md:text-lg max-w-xl font-light mt-3">
            Real production systems spanning intelligent routing, edge diagnostics,
            and high-concurrency microservices.
          </p>
        </div>

        {/* Featured Projects (Alternating Editorial Rows) */}
        <div className="space-y-28 mb-32">
          {FEATURED_PROJECTS.map((project, index) => (
            <FeaturedProjectRow key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Other Engineered Systems */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <h3 className="font-syne text-xl font-bold text-[#F0F0F8]">
              More Engineered Systems
            </h3>
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="font-mono text-xs text-[#6B7280]">
              {GRID_PROJECTS.length} Systems
            </span>
          </div>

          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {GRID_PROJECTS.map((project) => (
              <GridProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
