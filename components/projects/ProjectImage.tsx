"use client";

import Image from "next/image";
import { type ProjectData } from "@/data/projectsData";
import { DOMAIN_COLORS } from "./projectConstants";

interface ProjectImageProps {
  project: ProjectData;
}

export function ProjectImage({ project }: ProjectImageProps) {
  const domainColor = DOMAIN_COLORS[project.domain] || "#4F8EFF";

  return (
    <div className="p-2 rounded-[2rem] bg-white/[0.03] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:border-[#4F8EFF]/40 group-hover:bg-white/[0.05]">
      <div className="relative w-full aspect-[16/10] rounded-[calc(2rem-0.5rem)] overflow-hidden bg-[#0a0a14] border border-white/[0.05]">
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 z-[5] opacity-20 pointer-events-none transition-opacity duration-700 group-hover:opacity-35"
          style={{
            background: `radial-gradient(circle at 40% 30%, ${domainColor}35, transparent 65%)`,
          }}
        />

        {/* Top-to-bottom edge vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080810]/85 via-transparent to-[#080810]/30 z-10 pointer-events-none" />

        {/* Image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover opacity-80 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:opacity-95 group-hover:scale-[1.03]"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        {/* Fallback watermark */}
        <div className="absolute inset-0 flex items-center justify-center z-[2] pointer-events-none">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-syne font-bold opacity-15"
            style={{ color: domainColor }}
          >
            {project.title[0]}
          </div>
        </div>

        {/* Domain pill badge */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-[#080810]/75 backdrop-blur-md border border-white/10">
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{
              background: domainColor,
              boxShadow: `0 0 8px ${domainColor}`,
            }}
          />
          <span className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-[#C4C4D8]">
            {project.domainLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
