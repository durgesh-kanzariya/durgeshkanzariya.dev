"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { type ProjectData } from "@/data/projectsData";
import { DOMAIN_COLORS } from "./projectConstants";

interface GridProjectCardProps {
  project: ProjectData;
}

export function GridProjectCard({ project }: GridProjectCardProps) {
  const domainColor = DOMAIN_COLORS[project.domain] || "#4F8EFF";

  return (
    <div className="p-1.5 rounded-[1.75rem] bg-white/[0.02] border border-white/[0.06] hover:border-[#4F8EFF]/40 hover:bg-white/[0.04] transition-all duration-500 flex flex-col justify-between group">
      <div className="p-6 rounded-[calc(1.75rem-0.375rem)] bg-[#090912] border border-white/[0.03] flex flex-col justify-between h-full">
        <div>
          {/* Top row: domain dot + metric */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: domainColor,
                  boxShadow: `0 0 6px ${domainColor}`,
                }}
              />
              <span className="font-mono text-[0.62rem] uppercase tracking-wider text-[#6B7280]">
                {project.domainLabel}
              </span>
            </div>
            <span className="font-mono text-[0.62rem] text-[#4F8EFF] bg-[#4F8EFF]/10 px-2 py-0.5 rounded-full">
              {project.metric}
            </span>
          </div>

          {/* Title */}
          <h4 className="font-syne font-bold text-lg text-[#F0F0F8] mb-2 group-hover:text-white transition-colors">
            {project.title}
          </h4>

          {/* Description */}
          <p className="font-sans text-xs text-[#8E90A6] mb-5 leading-relaxed line-clamp-3">
            {project.tagline}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-[0.62rem] font-mono text-[#6B7280] bg-white/[0.03] border border-white/[0.05]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action link */}
        <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between">
          <Link
            href={`/work/${project.slug}`}
            className="text-xs font-medium text-[#C4C4D8] group-hover:text-[#4F8EFF] transition-colors inline-flex items-center gap-1.5"
          >
            <span>Case Study</span>
            <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6B7280] hover:text-white transition-colors p-1"
              aria-label="GitHub Repository"
            >
              <GithubIcon size={13} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
