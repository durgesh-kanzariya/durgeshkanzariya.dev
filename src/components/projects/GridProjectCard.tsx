"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
          delay: index * 0.1,
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
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col rounded-2xl border border-[#1A1D33] bg-[#0E101E] overflow-hidden transition-all duration-300 hover:border-[#4F8EFF]/40 hover:shadow-2xl hover:shadow-black/50"
      style={{ opacity: 0 }}
    >
      {/* Visual Cover Preview */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#0A0C16]">
        <Link
          href={`/work/${project.slug}`}
          className="absolute inset-0 block cursor-pointer"
          aria-label={`View ${project.title} case study`}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />

          {/* Ambient bottom gradient blend into card */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E101E] via-[#0E101E]/20 to-transparent" />
        </Link>

        {/* Floating Domain Badge */}
        <div className="absolute top-4 left-4 z-10 pointer-events-none flex items-center gap-2 px-3 py-1 rounded-md text-[0.65rem] font-mono uppercase tracking-widest text-white/90 bg-[#080810]/75 backdrop-blur-md border border-white/10">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: domainColor }}
          />
          {project.domainLabel}
        </div>

        {/* Floating GitHub Link (sibling, not nested in Link) */}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Repository"
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-lg bg-[#080810]/75 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-[#4F8EFF]/50 transition-colors"
          >
            <GithubIcon size={13} />
          </a>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 md:p-7 flex flex-col justify-between flex-1">
        <div>
          {/* Title row with hover arrow indicator */}
          <Link
            href={`/work/${project.slug}`}
            className="flex items-center justify-between gap-4 mb-3 group/title"
          >
            <h3 className="font-syne font-bold text-xl md:text-2xl text-[#F0F4FF] group-hover/title:text-white transition-colors duration-200">
              {project.title}
            </h3>
            <div className="w-8 h-8 rounded-full border border-[#252846] bg-[#14172B] text-[#94A3B8] group-hover:bg-[#4F8EFF] group-hover:border-[#4F8EFF] group-hover:text-white transition-all duration-300 flex items-center justify-center flex-shrink-0">
              <ArrowUpRight size={14} />
            </div>
          </Link>

          {/* Clean, punchy tagline — no complex cluttered text */}
          <p className="text-[#94A3B8] text-sm leading-relaxed mb-6 line-clamp-2">
            {project.tagline}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-[#1A1D33]">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-[0.62rem] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md text-[#94A3B8] bg-white/[0.03] border border-white/[0.08]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
