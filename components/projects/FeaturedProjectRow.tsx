"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ProjectData } from "@/data/projectsData";
import { ProjectImage } from "./ProjectImage";
import { DOMAIN_COLORS } from "./projectConstants";

interface FeaturedProjectRowProps {
  project: ProjectData;
  index: number;
}

export function FeaturedProjectRow({ project, index }: FeaturedProjectRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;
  const domainColor = DOMAIN_COLORS[project.domain] || "#4F8EFF";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rowRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        imageRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out" }
      ).fromTo(
        contentRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );
    }, rowRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rowRef}
      className={`group grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
        !isEven ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Visual Asset side (col 7) */}
      <div ref={imageRef} className="lg:col-span-7">
        <Link href={`/work/${project.slug}`} className="block focus:outline-none">
          <ProjectImage project={project} />
        </Link>
      </div>

      {/* Editorial Content side (col 5) */}
      <div ref={contentRef} className="lg:col-span-5 flex flex-col justify-center">
        {/* Project Index + Year */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs font-semibold text-[#4F8EFF] tracking-wider">
            {project.index}
          </span>
          <span className="w-4 h-px bg-[#1c1c3a]" />
          <span className="font-mono text-[0.68rem] tracking-wider uppercase text-[#6B7280]">
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-syne text-2xl lg:text-3xl font-bold text-[#F0F0F8] mb-3 group-hover:text-white transition-colors">
          <Link
            href={`/work/${project.slug}`}
            className="hover:text-[#4F8EFF] transition-colors inline-flex items-center gap-2"
          >
            {project.title}
          </Link>
        </h3>

        {/* Tagline */}
        <p className="font-sans text-base text-[#8E90A6] mb-5 leading-relaxed font-light">
          {project.tagline}
        </p>

        {/* Key Metric highlight — Machined micro-card */}
        <div className="mb-6 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
          <div
            className="w-1.5 h-6 rounded-full"
            style={{ background: domainColor }}
          />
          <div>
            <div className="font-mono text-[0.65rem] tracking-wider uppercase text-[#6B7280]">
              Performance Impact
            </div>
            <div className="font-syne font-semibold text-sm text-[#F0F0F8]">
              {project.metric}
            </div>
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mb-7">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-[0.68rem] font-mono text-[#8E90A6] bg-white/[0.03] border border-white/[0.08]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions — Button-in-Button architecture */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`/work/${project.slug}`}
            className="group/btn inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#4F8EFF] text-white text-xs font-semibold tracking-wide hover:bg-[#3d7be8] active:scale-[0.98] transition-all duration-300"
          >
            <span>Explore Case Study</span>
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
              <ArrowUpRight size={12} />
            </span>
          </Link>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#8E90A6] hover:text-white hover:bg-white/[0.08] active:scale-[0.98] transition-all duration-300"
              aria-label="GitHub Repository"
            >
              <GithubIcon size={14} />
            </a>
          )}

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#8E90A6] hover:text-white hover:bg-white/[0.08] active:scale-[0.98] transition-all duration-300"
              aria-label="Live Demo"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
