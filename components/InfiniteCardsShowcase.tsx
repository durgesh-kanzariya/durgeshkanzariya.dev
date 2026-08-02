"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles, Eye } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

interface ProjectItem {
  id: string;
  slug: string;
  num: string;
  title: string;
  subtitle: string;
  engine: string;
  image: string;
  metric: string;
  tags: string[];
}

const BASE_PROJECTS: ProjectItem[] = [
  {
    id: "PROJ_01",
    slug: "aero-guard",
    num: "1",
    title: "Aero Guard ML Engine",
    subtitle: "Predictive Aircraft Jet Engine RUL Forecast",
    engine: "XGBoost Regressor // NASA Telemetry",
    image: "/images/aero_guard_cover.png",
    metric: "11.42 RMSE",
    tags: ["Python", "XGBoost", "Machine Learning"],
  },
  {
    id: "PROJ_02",
    slug: "traveldost",
    num: "2",
    title: "TravelDost Companion",
    subtitle: "Full-Stack Relational Itinerary System",
    engine: "React + Express + PostgreSQL",
    image: "/images/traveldost_cover.png",
    metric: "<45ms Lookups",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    id: "PROJ_03",
    slug: "aero-guard",
    num: "3",
    title: "NASA C-MAPSS Telemetry",
    subtitle: "Multi-Sensor Jet Engine Degradation Analytics",
    engine: "21 Telemetry Sensor Windows",
    image: "/sequence/frame_0090.webp",
    metric: "0.865 R² Score",
    tags: ["Data Science", "Telemetry", "ML"],
  },
  {
    id: "PROJ_04",
    slug: "traveldost",
    num: "4",
    title: "Relational 3NF Architecture",
    subtitle: "Atomic Normalization & Data Integrity Engine",
    engine: "PostgreSQL Relational Schema",
    image: "/images/traveldost_logo.jpeg",
    metric: "3NF Normalized",
    tags: ["SQL", "Database", "Architecture"],
  },
];

export default function InfiniteCardsShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const totalProjects = BASE_PROJECTS.length;
  const activeIndexRef = useRef(0);

  // Smooth GSAP 3D card deck transform updater
  const updateCardsPosition = (targetIndex: number) => {
    const clampedIndex = Math.max(0, Math.min(totalProjects - 1, targetIndex));
    
    activeIndexRef.current = clampedIndex;
    setActiveIndex(clampedIndex);

    const width = typeof window !== "undefined" ? window.innerWidth : 1200;
    const isMobile = width < 640;
    const spacing = isMobile ? width * 0.85 : 360;

    cardRefs.current.forEach((cardEl, index) => {
      if (!cardEl) return;
      const relPos = index - clampedIndex;
      const absPos = Math.abs(relPos);

      const xTranslate = relPos * spacing;
      const scale = isMobile ? (relPos === 0 ? 1 : 0.85) : Math.max(0.65, 1 - absPos * 0.16);
      const opacity = isMobile ? (relPos === 0 ? 1 : 0) : Math.max(0, 1 - absPos * 0.4);
      const rotateY = isMobile ? 0 : Math.max(-25, Math.min(25, relPos * -12));
      const zIndex = Math.round(100 - absPos * 10);

      gsap.to(cardEl, {
        x: xTranslate,
        scale: scale,
        opacity: opacity,
        rotateY: rotateY,
        zIndex: zIndex,
        transformPerspective: 1200,
        duration: 0.65,
        ease: "power3.out",
        overwrite: "auto",
      });
    });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Format initial card positions immediately on mount
    updateCardsPosition(0);

    if (!sectionRef.current) return;

    // Pin main section directly with explicit pinSpacing
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=1600",
      pin: true,
      pinSpacing: true,
      refreshPriority: 1,
      scrub: 0.4,
      onUpdate: (self) => {
        const rawProgress = self.progress;
        const targetIdx = Math.min(
          totalProjects - 1,
          Math.floor(rawProgress * totalProjects)
        );
        if (targetIdx !== activeIndexRef.current) {
          updateCardsPosition(targetIdx);
        }
      },
    });

    const handleResize = () => {
      updateCardsPosition(activeIndexRef.current);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      trigger.kill();
    };
  }, []);

  const handleNext = () => {
    if (activeIndex >= totalProjects - 1) return;
    updateCardsPosition(activeIndex + 1);
  };

  const handlePrev = () => {
    if (activeIndex <= 0) return;
    updateCardsPosition(activeIndex - 1);
  };

  const handleCardClick = (index: number) => {
    if (index !== activeIndex) {
      updateCardsPosition(index);
    }
  };

  const handleLinkClick = (e: React.MouseEvent, index: number) => {
    if (index !== activeIndex) {
      e.preventDefault();
      e.stopPropagation();
      updateCardsPosition(index);
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="work"
      className="relative z-10 w-full bg-[#07070A] text-white select-none overflow-hidden scroll-mt-14"
    >
      <div 
        ref={containerRef}
        className="relative w-full min-h-screen sm:h-screen pt-16 sm:pt-20 pb-6 sm:pb-16 px-4 sm:px-12 flex flex-col justify-start sm:justify-between gap-4 sm:gap-0 overflow-hidden"
      >
        {/* Background Ambient Radial Glow */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-900/20 rounded-full blur-[160px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:36px_36px] opacity-[0.03]" />
        </div>

        <div className="max-w-7xl mx-auto w-full space-y-1.5 sm:space-y-4 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 sm:gap-4 border-b border-purple-900/30 pb-2 sm:pb-4">
            <div className="space-y-0.5 sm:space-y-1">
              <span className="font-mono text-[10px] sm:text-[11px] text-purple-400 uppercase tracking-widest font-bold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                // PINNED SHOWCASE // FEATURED WORK
              </span>
              <h2 className="font-syne text-2xl sm:text-4xl lg:text-5xl font-bold sm:font-extrabold tracking-tight text-white uppercase">
                Project Showcase
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-sans text-purple-300/70 max-w-md leading-relaxed">
              Scroll to scrub through featured engineering projects. Use controls or click any card to inspect case studies.
            </p>
          </div>
        </div>

        {/* 3D Perspective Card Stage */}
        <div className="relative w-full h-[450px] sm:h-[460px] flex items-center justify-center overflow-hidden my-1 sm:my-6 z-10">
          <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
            {BASE_PROJECTS.map((project, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={project.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  onClick={() => handleCardClick(index)}
                  className={`absolute w-[calc(100vw-32px)] sm:w-[350px] max-w-[340px] h-[430px] sm:h-[430px] rounded-3xl bg-black/90 border p-4 sm:p-6 flex flex-col justify-between shadow-[0_25px_60px_rgba(0,0,0,0.95)] cursor-pointer backdrop-blur-xl group overflow-hidden transition-colors duration-300 ${
                    isActive
                      ? "border-purple-500/90 shadow-[0_0_40px_rgba(168,85,247,0.4)] ring-1 ring-purple-500/50"
                      : "border-white/10 hover:border-purple-800/60"
                  }`}
                >
                  {/* Purple Ambient Glow */}
                  <div className="absolute -top-16 -right-16 w-48 h-48 bg-purple-600/20 rounded-full blur-2xl group-hover:bg-purple-600/40 transition-colors" />

                  {/* Top Badge */}
                  <div className="flex items-center justify-between gap-2 relative z-10">
                    <span className="font-mono text-[9px] sm:text-[10px] text-purple-300 font-bold uppercase px-2.5 sm:px-3 py-1 rounded-full bg-purple-950/80 border border-purple-800/40 shrink-0">
                      {project.engine}
                    </span>
                    <span className="font-syne text-xl sm:text-2xl font-black text-purple-400 shrink-0">
                      0{project.num}
                    </span>
                  </div>

                  {/* Media Frame */}
                  <Link 
                    href={`/work/${project.slug}`}
                    onClick={(e) => handleLinkClick(e, index)}
                    className="relative w-full h-36 sm:h-44 rounded-2xl overflow-hidden border border-white/10 bg-purple-950/30 block shadow-inner my-2 group/img"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 300px, 350px"
                      className="object-cover p-1 filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover/img:scale-105"
                    />
                    <div className="absolute inset-0 bg-purple-950/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="px-3 py-1.5 rounded-full bg-purple-600/90 text-white font-mono text-[10px] font-bold flex items-center gap-1.5 shadow-lg">
                        <Eye className="w-3.5 h-3.5" />
                        <span>EXPLORE</span>
                      </div>
                    </div>
                  </Link>

                  {/* Title & Metric Info */}
                  <div className="space-y-2.5 sm:space-y-3 relative z-10 pt-2 border-t border-purple-900/40">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <h3 className="font-syne text-base sm:text-lg font-bold text-white group-hover:text-purple-200 transition-colors uppercase leading-snug">
                          {project.title}
                        </h3>
                        <p className="font-sans text-[11px] sm:text-xs text-purple-300/80 line-clamp-1">
                          {project.subtitle}
                        </p>
                      </div>
                      <span className="font-mono text-[9px] sm:text-[10px] text-purple-300 font-bold px-1.5 sm:px-2 py-0.5 rounded bg-purple-950/90 border border-purple-800/40 shrink-0 mt-0.5">
                        {project.metric}
                      </span>
                    </div>

                    {/* Case Study Action Link */}
                    <MagneticButton distanceThreshold={50} maxTranslate={12} className="w-full">
                      <Link
                        href={`/work/${project.slug}`}
                        onClick={(e) => handleLinkClick(e, index)}
                        className="group/btn flex items-center justify-between px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-mono text-[11px] sm:text-xs font-bold transition-all shadow-md shadow-purple-950/50 w-full"
                      >
                        <span>VIEW CASE STUDY</span>
                        <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </Link>
                    </MagneticButton>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Navigation Controls & Progress Footer */}
        <div className="relative z-20 max-w-7xl mx-auto w-full flex items-center justify-between gap-2 sm:gap-4 pt-3 sm:pt-4 border-t border-purple-950/80 font-mono text-xs">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-purple-400 font-bold text-[11px] sm:text-xs">
              PROJECT 0{BASE_PROJECTS[activeIndex]?.num} / 0{totalProjects}
            </span>
            <div className="hidden sm:flex items-center gap-1.5">
              {BASE_PROJECTS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => updateCardsPosition(idx)}
                  aria-label={`Go to project ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? "w-6 bg-purple-400" : "w-2 bg-purple-900/60 hover:bg-purple-700"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MagneticButton distanceThreshold={50} maxTranslate={12}>
              <button
                onClick={handlePrev}
                className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full border font-mono text-[11px] sm:text-xs font-bold transition-all shadow-[0_0_20px_rgba(168,85,247,0.2)] ${
                  activeIndex === 0
                    ? "bg-black/40 border-purple-950/50 text-purple-900/40 pointer-events-none cursor-not-allowed"
                    : "bg-black/70 border-purple-500/40 hover:border-purple-400 text-purple-200 hover:text-white"
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
                <span>PREV</span>
              </button>
            </MagneticButton>

            <MagneticButton distanceThreshold={50} maxTranslate={12}>
              <button
                onClick={handleNext}
                className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full border font-mono text-[11px] sm:text-xs font-bold transition-all shadow-[0_0_20px_rgba(168,85,247,0.2)] ${
                  activeIndex === totalProjects - 1
                    ? "bg-black/40 border-purple-950/50 text-purple-900/40 pointer-events-none cursor-not-allowed"
                    : "bg-black/70 border-purple-500/40 hover:border-purple-400 text-purple-200 hover:text-white"
                }`}
              >
                <span>NEXT</span>
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
              </button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}