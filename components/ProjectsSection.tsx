"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FEATURED_PROJECTS, GRID_PROJECTS, type ProjectData } from "@/data/projectsData";

const DOMAIN_COLORS: Record<string, string> = {
  ai:     "#F59E0B",
  mobile: "#10B981",
  ml:     "#A855F7",
  web:    "#4F8EFF",
};

function ProjectImage({ project }: { project: ProjectData }) {
  return (
    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#0f0f1e] border border-[#1c1c3a] group-hover:border-[#252548] transition-colors duration-500">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080810]/80 via-transparent to-transparent z-10" />

      {/* Domain color tint */}
      <div
        className="absolute inset-0 z-[5] opacity-10"
        style={{ background: `radial-gradient(circle at 30% 30%, ${DOMAIN_COLORS[project.domain]}40, transparent 60%)` }}
      />

      {/* Project image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500 group-hover:scale-[1.02] transition-transform"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      </div>

      {/* Fallback placeholder with domain color */}
      <div className="absolute inset-0 flex items-center justify-center z-[2]">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-syne font-bold opacity-20"
          style={{ background: `${DOMAIN_COLORS[project.domain]}20`, color: DOMAIN_COLORS[project.domain] }}
        >
          {project.title[0]}
        </div>
      </div>

      {/* Domain dot + label overlay */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: DOMAIN_COLORS[project.domain], boxShadow: `0 0 8px ${DOMAIN_COLORS[project.domain]}` }}
        />
        <span className="label-muted text-[0.6rem]">{project.domainLabel}</span>
      </div>
    </div>
  );
}

function FeaturedProjectRow({ project, index }: { project: ProjectData; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

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
        className={`${isEven ? "lg:order-1" : "lg:order-2"}`}
        style={{ opacity: 0 }}
      >
        <ProjectImage project={project} />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className={`${isEven ? "lg:order-2" : "lg:order-1"}`}
        style={{ opacity: 0 }}
      >
        {/* Project number */}
        <div className="flex items-center gap-3 mb-4">
          <span className="project-number">{project.id}</span>
          <span className="w-8 h-px bg-[#1c1c3a]" />
          <span
            className="label-sm"
            style={{ color: DOMAIN_COLORS[project.domain] }}
          >
            {project.domainLabel}
          </span>
        </div>

        {/* Title */}
        <h3 className="display-md text-[#F0F0F8] mb-3 group-hover:text-white transition-colors">
          {project.title}
        </h3>

        {/* Subtitle */}
        <p className="text-[#6B7280] text-sm font-mono mb-4">{project.subtitle}</p>

        {/* Tagline */}
        <p className="text-[#9CA3AF] text-base md:text-lg leading-relaxed mb-6 max-w-md">
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

        {/* Metrics row */}
        <div className="grid grid-cols-2 gap-4 mb-8 pb-8 border-b border-[#1c1c3a]">
          {project.metrics.slice(0, 2).map(({ label, value }) => (
            <div key={label}>
              <div className="text-[#F0F0F8] font-syne font-bold text-lg">{value}</div>
              <div className="label-muted mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* CTA links */}
        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href={`/work/${project.slug}`}
            className="btn-primary text-sm py-2.5 px-5"
          >
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

function GridProjectCard({ project }: { project: ProjectData }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
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
      className="group card-base p-6 flex flex-col gap-5 hover:shadow-lg transition-all duration-300"
      style={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: DOMAIN_COLORS[project.domain] }}
          />
          <span className="label-muted">{project.domainLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-icon w-7 h-7" aria-label="Live">
              <ExternalLink size={11} />
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-icon w-7 h-7" aria-label="GitHub">
              <GithubIcon size={11} />
            </a>
          )}
        </div>
      </div>

      {/* Title & subtitle */}
      <div>
        <h4 className="heading-sm text-[#F0F0F8] mb-1 group-hover:text-white transition-colors">
          {project.title}
        </h4>
        <p className="text-[#6B7280] text-xs font-mono">{project.subtitle}</p>
      </div>

      {/* Description */}
      <p className="text-[#9CA3AF] text-sm leading-relaxed line-clamp-2 flex-1">{project.tagline}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="tag-pill text-[0.6rem] px-2 py-1">{tag}</span>
        ))}
      </div>

      {/* Case study link */}
      <Link
        href={`/work/${project.slug}`}
        className="flex items-center gap-1 label-sm hover:gap-2 transition-all duration-200 text-[#4F8EFF] mt-auto"
      >
        View Case Study <ArrowUpRight size={11} />
      </Link>
    </div>
  );
}

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
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding relative"
    >
      <div className="section-container">
        {/* Section header */}
        <div ref={headingRef} className="mb-20" style={{ opacity: 0 }}>
          <div className="label-sm mb-4">Selected Work</div>
          <div className="flex items-end justify-between flex-wrap gap-6">
            <h2 className="display-lg text-[#F0F0F8]">
              Things I&apos;ve
              <br />
              <span className="text-hollow-accent">built.</span>
            </h2>
            <p className="text-[#6B7280] max-w-sm text-sm leading-relaxed">
              From AI routing engines to Flutter mobile apps to ML models — a snapshot of
              what I&apos;ve shipped across domains.
            </p>
          </div>
        </div>

        {/* Featured projects — alternating layout */}
        <div className="flex flex-col gap-28 mb-32">
          {FEATURED_PROJECTS.map((project, i) => (
            <FeaturedProjectRow key={project.slug} project={project} index={i} />
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-6 mb-16">
          <div className="flex-1 h-px bg-[#1c1c3a]" />
          <span className="label-muted">More work</span>
          <div className="flex-1 h-px bg-[#1c1c3a]" />
        </div>

        {/* Grid projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GRID_PROJECTS.map((project) => (
            <GridProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
