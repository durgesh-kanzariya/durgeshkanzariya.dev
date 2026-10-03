"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ProjectData } from "@/data/projectsData";
import { DOMAIN_COLORS } from "./domainColors";

interface GridProjectCardProps {
  project: ProjectData;
  index: number;
}

export default function GridProjectCard({ project, index }: GridProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const domainColor = DOMAIN_COLORS[project.domain] || "#4F8EFF";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col justify-between rounded-2xl border border-[#1A1D33] bg-[#0E101E] p-7 md:p-8 transition-all duration-300 hover:border-[#4F8EFF]/40 hover:bg-[#121528] shadow-lg shadow-black/20"
      style={{ opacity: 0 }}
    >
      <div>
        {/* Top bar: Domain badge + Index + GitHub */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 px-3 py-1 rounded-md text-[0.65rem] font-mono uppercase tracking-widest text-[#94A3B8] bg-[#161930] border border-[#252846]">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: domainColor }}
            />
            {project.domainLabel}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[0.7rem] font-mono text-[#475569] font-medium tracking-wider">
              {String(index + 4).padStart(2, "0")}
            </span>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
                className="w-7 h-7 rounded-lg border border-[#252846] bg-[#080810] flex items-center justify-center text-[#94A3B8] hover:text-[#F0F4FF] hover:border-[#4F8EFF]/50 transition-colors"
              >
                <GithubIcon size={12} />
              </a>
            )}
          </div>
        </div>

        {/* Title + Subtitle */}
        <div className="mb-4">
          <h3 className="font-syne font-bold text-[#F0F4FF] text-xl md:text-2xl leading-tight group-hover:text-white transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-[#64748B] text-xs font-mono mt-1">{project.subtitle}</p>
        </div>

        {/* Tagline / Overview */}
        <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">
          {project.tagline}
        </p>

        {/* Highlights / Architecture stats */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#080810]/70 border border-[#1A1D33] mb-6">
            {project.metrics.slice(0, 2).map(({ label, value }) => (
              <div key={label} className="min-w-0">
                <div className="text-[0.62rem] font-mono uppercase tracking-wider text-[#64748B] truncate">
                  {label}
                </div>
                <div className="text-xs font-semibold text-[#F0F4FF] mt-0.5 truncate font-mono">
                  {value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-8">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-[0.62rem] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md text-[#94A3B8] bg-[#14172B] border border-[#1E223D]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer CTA: Case study link */}
      <Link
        href={`/work/${project.slug}`}
        className="pt-4 border-t border-[#1A1D33] flex items-center justify-between group/link"
      >
        <span className="font-mono text-xs uppercase tracking-widest font-semibold text-[#F0F4FF] group-hover/link:text-[#4F8EFF] transition-colors flex items-center gap-2">
          Case Study
        </span>
        <div className="w-8 h-8 rounded-full border border-[#252846] bg-[#14172B] text-[#94A3B8] group-hover/link:bg-[#4F8EFF] group-hover/link:border-[#4F8EFF] group-hover/link:text-white transition-all duration-300 flex items-center justify-center">
          <ArrowUpRight size={13} />
        </div>
      </Link>
    </div>
  );
}
