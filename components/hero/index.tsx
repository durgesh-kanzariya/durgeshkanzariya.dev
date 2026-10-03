"use client";

import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroVisual from "./HeroVisual";

const ROLES = ["Full-Stack Engineer", "Flutter Developer", "ML Engineer"];

/** Smooth scroll helper — uses Lenis if available, falls back to native. */
function scrollTo(id: string, duration = 1.2) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as any).lenis;
  if (lenis) lenis.scrollTo(el, { duration });
  else el.scrollIntoView({ behavior: "smooth" });
}

export default function HeroSection() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const leftRef     = useRef<HTMLDivElement>(null);
  const rightRef    = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const roleTicker  = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Left column reveal
      gsap.fromTo(leftRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.1,
      });

      // Right column reveal
      gsap.fromTo(rightRef.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.4,
      });

      // Scroll cue bob
      gsap.to(scrollCueRef.current, {
        y: 8, duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2,
      });

      // Role ticker
      let index = 0;
      const tick = () => {
        if (!roleTicker.current) return;
        gsap.to(roleTicker.current, {
          opacity: 0, y: -10, duration: 0.3, ease: "power2.in",
          onComplete: () => {
            index = (index + 1) % ROLES.length;
            if (roleTicker.current) roleTicker.current.textContent = ROLES[index];
            gsap.fromTo(roleTicker.current,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
            );
          },
        });
      };
      const interval = setInterval(tick, 2800);
      return () => clearInterval(interval);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] flex items-center pt-20 pb-10">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" aria-hidden="true" />

      <div className="section-container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-12 lg:gap-16 items-center">

          {/* Left — identity */}
          <div ref={leftRef} style={{ opacity: 0 }}>
            <h1
              className="font-syne font-extrabold text-[#F0F4FF] mb-5 leading-[0.92] tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 4.5vw, 5rem)" }}
            >
              Durgesh
              <br />
              <span className="text-hollow-accent">Kanzariya</span>
            </h1>

            <p className="text-[#94A3B8] text-lg md:text-xl font-jakarta font-normal max-w-md mb-4">
              Engineer by craft. Builder by passion.
            </p>

            {/* Animated role ticker */}
            <div className="flex items-center gap-3 mb-10">
              <span className="label-muted">Currently:</span>
              <span ref={roleTicker} className="label-sm" style={{ minWidth: "180px", display: "inline-block" }}>
                {ROLES[0]}
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-14">
              <button onClick={() => scrollTo("projects")} className="btn-primary">
                View Projects
                <ArrowDown size={14} />
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

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 pt-7 border-t border-[#1A1D33]">
              {[
                { value: "5",    label: "Projects Shipped" },
                { value: "3",    label: "Domains Covered"  },
                { value: "2026", label: "Grad Year"        },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="font-syne text-3xl font-bold text-[#F0F4FF]">{value}</div>
                  <div className="label-muted mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — code terminal visual */}
          <div ref={rightRef} className="hidden lg:block" style={{ opacity: 0 }}>
            <HeroVisual />
          </div>

        </div>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => scrollTo("projects", 1.5)}
      >
        <span className="label-muted text-[0.6rem] tracking-[0.2em]">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#4F8EFF]/60 to-transparent" />
      </div>
    </section>
  );
}
