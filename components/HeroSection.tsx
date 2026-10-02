"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, Mail } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ROLES = ["Full-Stack Engineer", "Flutter Developer", "ML Engineer"];

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const roleIndexRef = useRef(0);
  const roleTicker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // --- Name reveal ---
      gsap.fromTo(
        nameRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      // --- Tagline reveal ---
      gsap.fromTo(
        taglineRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.5,
        }
      );

      // --- CTA fade in ---
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.8 }
      );

      // --- Stats counter fade in ---
      gsap.fromTo(
        counterRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 1.0 }
      );

      // --- Role ticker ---
      let index = 0;
      const tick = () => {
        if (!roleTicker.current) return;
        gsap.to(roleTicker.current, {
          opacity: 0,
          y: -10,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            index = (index + 1) % ROLES.length;
            if (roleTicker.current) roleTicker.current.textContent = ROLES[index];
            gsap.fromTo(
              roleTicker.current,
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
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col justify-center pt-24 pb-16"
      style={{ perspective: "1000px" }}
    >
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" aria-hidden="true" />

      <div className="section-container relative z-10">
        <div className="max-w-5xl">
          {/* Main name */}
          <h1
            ref={nameRef}
            className="display-xl text-[#F0F0F8] mb-6"
          >
            Durgesh
            <br />
            <span className="text-hollow-accent">Kanzariya</span>
          </h1>

          {/* Tagline + role ticker */}
          <p
            ref={taglineRef}
            className="text-[#8E90A6] text-lg md:text-2xl font-jakarta font-normal max-w-xl mb-4"
          >
            Engineer by craft. Builder by passion.
          </p>

          {/* Animated role ticker */}
          <div className="flex items-center gap-3 mb-12">
            <span className="label-muted">Currently:</span>
            <span
              ref={roleTicker}
              className="label-sm"
              style={{ minWidth: "180px", display: "inline-block" }}
            >
              {ROLES[0]}
            </span>
          </div>

          {/* CTAs — Button-in-Button architecture */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 mb-20" style={{ opacity: 0 }}>
            <button
              onClick={() => {
                const el = document.getElementById("projects");
                const lenis = (window as any).lenis;
                if (el) lenis ? lenis.scrollTo(el, { duration: 1.2 }) : el.scrollIntoView({ behavior: "smooth" });
              }}
              className="group/btn inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#4F8EFF] text-white text-sm font-semibold tracking-wide hover:bg-[#3d7be8] active:scale-[0.98] transition-all duration-300 shadow-[0_10px_30px_rgba(79,142,255,0.25)]"
            >
              <span>View Projects</span>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-y-0.5">
                <ArrowDown size={13} />
              </span>
            </button>
            <a
              href="https://github.com/durgesh-kanzariya"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#F0F0F8] text-sm font-medium hover:bg-white/[0.08] hover:border-white/20 active:scale-[0.98] transition-all duration-300"
            >
              <GithubIcon size={14} />
              GitHub
            </a>
          </div>

          {/* Quick stats — High contrast & machined borders */}
          <div
            ref={counterRef}
            className="flex flex-wrap gap-10 pt-8 border-t border-white/[0.08]"
            style={{ opacity: 0 }}
          >
            {[
              { value: "5", label: "Projects Shipped" },
              { value: "3", label: "Domains Covered" },
              { value: "2026", label: "Currently Studying" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="font-syne text-3xl font-bold text-[#F0F0F8]">{value}</div>
                <div className="label-muted mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social links — vertical on right side (desktop) */}
      <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-5 z-30">
        {[
          { icon: GithubIcon, href: "https://github.com/durgesh-kanzariya", label: "GitHub" },
          { icon: Mail, href: "mailto:durgesh.j.kanzariya@gmail.com", label: "Email" },
        ].map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            aria-label={label}
            className="btn-icon w-8 h-8"
          >
            <Icon size={12} />
          </a>
        ))}
        <div className="w-px h-12 bg-gradient-to-b from-[#1c1c3a] to-transparent" />
      </div>
    </section>
  );
}
