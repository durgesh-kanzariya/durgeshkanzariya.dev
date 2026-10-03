"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroVisual from "./HeroVisual";
import { LaserCollection } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

const ROLES = ["Full-Stack Engineer", "Flutter Developer", "ML Engineer"];

/** Smooth scroll helper — uses Lenis if available, falls back to native. */
function scrollTo(id: string, duration = 1.2) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = window.lenis;
  if (lenis) lenis.scrollTo(el, { duration });
  else el.scrollIntoView({ behavior: "smooth" });
}

export default function HeroSection() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const leftRef     = useRef<HTMLDivElement>(null);
  const rightRef    = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const roleTicker  = useRef<HTMLSpanElement>(null);
  const laserIframeRef = useRef<HTMLIFrameElement | null>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Forward mouse position to sandboxed WebGL iframe without intercepting pointer events
  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!laserIframeRef.current) {
      laserIframeRef.current = sectionRef.current?.querySelector("iframe") ?? null;
    }
    const iframe = laserIframeRef.current;
    if (iframe && iframe.contentWindow) {
      const rect = iframe.getBoundingClientRect();
      iframe.contentWindow.postMessage(
        {
          type: "threeui-pointer",
          clientX: e.clientX - rect.left,
          clientY: e.clientY - rect.top,
        },
        "*"
      );
    }
  };

  // Manual cycle role on click
  const cycleRole = () => {
    if (!roleTicker.current) return;
    gsap.to(roleTicker.current, {
      opacity: 0,
      y: -8,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
        gsap.fromTo(
          roleTicker.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );
      },
    });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Left column reveal
      gsap.fromTo(leftRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.1,
      });

      // Right column reveal
      gsap.fromTo(rightRef.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3,
      });

      // Scroll cue bob
      gsap.to(scrollCueRef.current, {
        y: 8, duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2,
      });

      // Automatic role ticker interval
      const interval = setInterval(() => {
        if (!roleTicker.current) return;
        gsap.to(roleTicker.current, {
          opacity: 0, y: -10, duration: 0.3, ease: "power2.in",
          onComplete: () => {
            setRoleIndex((prev) => (prev + 1) % ROLES.length);
            gsap.fromTo(roleTicker.current,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
            );
          },
        });
      }, 3400);

      return () => clearInterval(interval);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleHeroMouseMove}
      className="relative min-h-[100dvh] flex items-center pt-24 pb-12 overflow-hidden"
    >
      
      {/* ── Matrix Junction WebGL Background (Hero Only) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        <div className="w-full h-full opacity-75 md:opacity-85 transition-opacity duration-1000">
          <LaserCollection
            variant="matrix-field"
            speed={1.00}
            size={1.00}
            length={1.00}
            density={1.00}
            opacity={1.00}
            hue={0}
            saturation={1.00}
            brightness={1.00}
          />
        </div>

        {/* Soft edge fade for seamless blend into portfolio background */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#080810] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#080810] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#080810] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#080810] to-transparent pointer-events-none" />
        
        {/* Subtle dot overlay */}
        <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
      </div>

      <div className="section-container relative z-10 w-full pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-12 lg:gap-16 items-center">

          {/* Left Column — Identity & Actions */}
          <div ref={leftRef} style={{ opacity: 0 }} className="pointer-events-auto">
            <h1
              className="font-syne font-extrabold text-[#F0F4FF] mb-5 leading-[0.92] tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 4.5vw, 5rem)" }}
            >
              Durgesh
              <br />
              <span className="text-hollow-accent">Kanzariya</span>
            </h1>

            <p className="text-[#94A3B8] text-lg md:text-xl font-jakarta font-normal max-w-md mb-4 leading-relaxed">
              Engineer by craft. Builder by passion.
            </p>

            {/* Interactive Role Ticker */}
            <div
              onClick={cycleRole}
              title="Click to cycle role"
              className="inline-flex items-center gap-3 mb-10 px-3 py-1.5 -ml-3 rounded-lg hover:bg-white/[0.04] cursor-pointer transition-colors group/role"
            >
              <span className="label-muted">Currently:</span>
              <span
                ref={roleTicker}
                className="label-sm font-semibold text-[#F0F4FF] group-hover/role:text-[#4F8EFF] transition-colors"
                style={{ minWidth: "170px", display: "inline-block" }}
              >
                {ROLES[roleIndex]}
              </span>
              <span className="text-[0.62rem] text-[#475569] font-mono opacity-0 group-hover/role:opacity-100 transition-opacity">
                (click to cycle)
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-14">
              <button onClick={() => scrollTo("projects")} className="btn-primary group">
                View Projects
                <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
              </button>
              <a
                href="https://github.com/durgesh-kanzariya"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <GithubIcon size={14} />
                GitHub
              </a>
            </div>

            {/* Interactive Stats Row */}
            <div className="flex flex-wrap gap-8 pt-7 border-t border-[#1A1D33]">
              {[
                { value: "5",    label: "Projects Shipped", link: "projects" },
                { value: "3",    label: "Domains Covered",  link: "skills"   },
                { value: "2026", label: "Grad Year",        link: "about"    },
              ].map(({ value, label, link }) => (
                <div
                  key={label}
                  onClick={() => scrollTo(link)}
                  className="cursor-pointer group/stat p-2 -m-2 rounded-xl hover:bg-[#14172B]/60 border border-transparent hover:border-[#1E223D] transition-all"
                  title={`Scroll to ${link}`}
                >
                  <div className="font-syne text-3xl font-bold text-[#F0F4FF] group-hover/stat:text-[#4F8EFF] transition-colors flex items-center gap-1">
                    {value}
                    <ArrowUpRight size={13} className="opacity-0 -translate-x-1 translate-y-1 group-hover/stat:opacity-100 group-hover/stat:translate-x-0 group-hover/stat:translate-y-0 transition-all text-[#4F8EFF]" />
                  </div>
                  <div className="label-muted mt-1 text-xs">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Interactive 3D Code Terminal */}
          <div ref={rightRef} className="hidden lg:block pointer-events-auto" style={{ opacity: 0 }}>
            <HeroVisual />
          </div>

        </div>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer pointer-events-auto p-4 select-none group/scroll"
        onClick={() => scrollTo("projects", 1.5)}
        title="Scroll to projects"
      >
        <span className="label-muted text-[0.6rem] tracking-[0.2em] group-hover/scroll:text-[#4F8EFF] transition-colors">
          SCROLL
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-[#4F8EFF]/60 to-transparent group-hover/scroll:h-11 transition-all" />
      </div>
    </section>
  );
}
