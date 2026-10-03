"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ProjectData } from "@/data/projectsData";
import { DOMAIN_COLORS } from "./domainColors";
import ProjectImage from "./ProjectImage";

interface FeaturedProjectRowProps {
  project: ProjectData;
  index: number;
}

export default function FeaturedProjectRow({ project, index }: FeaturedProjectRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;
  const domainColor = DOMAIN_COLORS[project.domain];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rowRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        imageRef.current,
        { opacity: 0, x: isEven ? -60 : 60, scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: 1.0, ease: "power3.out" }
      ).fromTo(
        contentRef.current,
        { opacity: 0, x: isEven ? 60 : -60 },
        { opacity: 1, x: 0, duration: 1.0, ease: "power3.out" },
        "-=0.7"
      );
    }, rowRef);

    return () => ctx.revert();
  }, [isEven]);

  return (
    <div
      ref={rowRef}
      className="group grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
    >
      {/* Image */}
      <div
        ref={imageRef}
        className={isEven ? "lg:order-1" : "lg:order-2"}
        style={{ opacity: 0 }}
      >
        <ProjectImage project={project} />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className={isEven ? "lg:order-2" : "lg:order-1"}
        style={{ opacity: 0 }}
      >
        {/* Project number + domain */}
        <div className="flex items-center gap-3 mb-4">
          <span className="project-number">{project.id}</span>
          <span className="w-8 h-px bg-[#1A1D33]" />
          <span className="label-sm" style={{ color: domainColor }}>
            {project.domainLabel}
          </span>
        </div>

        {/* Title */}
        <h3 className="display-md text-[#F0F4FF] mb-3 group-hover:text-white transition-colors">
          {project.title}
        </h3>

        {/* Subtitle */}
        <p className="text-[#64748B] text-sm font-mono mb-4">{project.subtitle}</p>

        {/* Tagline */}
        <p className="text-[#94A3B8] text-base md:text-lg leading-relaxed mb-6 max-w-md">
          {project.tagline}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
          {project.tags.length > 4 && (
            <span className="tag-pill">+{project.tags.length - 4}</span>
          )}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-8 pb-8 border-b border-[#1A1D33]">
          {project.metrics.slice(0, 2).map(({ label, value }) => (
            <div key={label}>
              <div className="text-[#F0F4FF] font-syne font-bold text-lg">{value}</div>
              <div className="label-muted mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* CTA links */}
        <div className="flex items-center gap-3 flex-wrap">
          <Link href={`/work/${project.slug}`} className="btn-primary text-sm py-2.5 px-5">
            Case Study
            <ArrowUpRight size={14} />
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-sm py-2.5 px-5"
            >
              <ExternalLink size={12} />
              Live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon"
              aria-label="GitHub"
            >
              <GithubIcon size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
