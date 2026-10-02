"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, Mail } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

const ROLES = [
  "Full-Stack Engineer",
  "Flutter Developer",
  "AI & ML Systems Engineer",
  "High-Throughput Backend Builder",
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const roleTicker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    const ctx = gsap.context(() => {
      // --- Kinetic Character Reveal with GSAP ---
      gsap.fromTo(
        ".hero-char-1",
        { y: "115%", opacity: 0, rotateX: -60 },
        {
          y: "0%",
          opacity: 1,
          rotateX: 0,
          duration: 0.95,
          stagger: 0.04,
          ease: "power4.out",
          delay: 0.15,
        }
      );

      gsap.fromTo(
        ".hero-char-2",
        { y: "115%", opacity: 0, rotateX: -60 },
        {
          y: "0%",
          opacity: 1,
          rotateX: 0,
          duration: 0.95,
          stagger: 0.04,
          ease: "power4.out",
          delay: 0.35,
        }
      );

      // --- Tagline Word Reveal with GSAP ---
      gsap.fromTo(
        ".hero-tagline-word",
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.75,
          stagger: 0.045,
          ease: "power3.out",
          delay: 0.65,
        }
      );

      // --- CTA fade in ---
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.95 }
      );

      // --- Stats counter fade in ---
      gsap.fromTo(
        counterRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 1.15 }
      );

      // --- GSAP TextPlugin Typewriter Loop ---
      const roleTl = gsap.timeline({ repeat: -1 });
      ROLES.forEach((role) => {
        roleTl
          .to(roleTicker.current, {
            duration: 1.1,
            text: role,
            ease: "none",
          })
          .to({}, { duration: 1.8 }) // Pause to read
          .to(roleTicker.current, {
            duration: 0.6,
            text: "",
            ease: "none",
          })
          .to({}, { duration: 0.3 }); // Brief pause before next
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const firstWord = "Durgesh";
  const secondWord = "Kanzariya";
  const taglineWords = ["Engineer", "by", "craft.", "Builder", "by", "passion."];

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
          {/* Main name with kinetic GSAP text masking */}
          <h1
            ref={nameRef}
            className="display-xl text-[#F0F0F8] mb-6 font-syne select-none"
          >
            <span className="block overflow-hidden py-1">
              {firstWord.split("").map((char, i) => (
                <span
                  key={i}
                  className="inline-block hero-char-1 will-change-transform"
                >
                  {char}
                </span>
              ))}
            </span>
            <span className="block overflow-hidden py-1">
              <span className="text-hollow-accent inline-block">
                {secondWord.split("").map((char, i) => (
                  <span
                    key={i}
                    className="inline-block hero-char-2 will-change-transform"
                  >
                    {char}
                  </span>
                ))}
              </span>
            </span>
          </h1>

          {/* Tagline with kinetic word masking */}
          <p
            ref={taglineRef}
            className="text-[#8E90A6] text-lg md:text-2xl font-sans font-normal max-w-xl mb-4 overflow-hidden"
          >
            {taglineWords.map((word, i) => (
              <span key={i} className="inline-block mr-2.5 overflow-hidden py-0.5">
                <span className="inline-block hero-tagline-word will-change-transform">
                  {word}
                </span>
              </span>
            ))}
          </p>

          {/* GSAP TextPlugin Typewriter Role Ticker */}
          <div className="flex items-center gap-3 mb-12">
            <span className="label-muted">Currently:</span>
            <span className="inline-flex items-center">
              <span
                ref={roleTicker}
                className="label-sm text-[#4F8EFF] font-semibold"
                style={{ minWidth: "160px", display: "inline-block" }}
              >
                {ROLES[0]}
              </span>
              <span className="inline-block w-1.5 h-3.5 bg-[#4F8EFF] ml-1 animate-pulse" />
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
