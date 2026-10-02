"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Code2, Brain, Smartphone } from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: Code2,
    label: "Full-Stack",
    description: "React, Next.js, Node.js, FastAPI — production-grade.",
    color: "#4F8EFF",
  },
  {
    icon: Brain,
    label: "ML / AI",
    description: "PyTorch, TensorFlow, LLM routing, high-accuracy inference.",
    color: "#A855F7",
  },
  {
    icon: Smartphone,
    label: "Mobile",
    description: "Flutter + Dart, reactive state, cross-platform apps.",
    color: "#10B981",
  },
  {
    icon: GraduationCap,
    label: "Engineering",
    description: "B.Tech IT, RK University — systems focus.",
    color: "#F59E0B",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Heading kinetic line reveal
      gsap.fromTo(
        ".about-heading-line",
        { y: "115%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Body fade in
      gsap.fromTo(
        bodyRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bodyRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Cards stagger
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding relative">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -right-64 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#4F8EFF]/4 blur-[120px]" />
      </div>

      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          {/* Left — text (col 7) */}
          <div className="lg:col-span-7">
            <h2
              ref={headingRef}
              className="display-lg text-[#F0F0F8] mb-8 leading-tight font-syne select-none overflow-hidden"
            >
              <span className="block overflow-hidden py-1">
                <span className="inline-block about-heading-line will-change-transform">
                  IT engineer who
                </span>
              </span>
              <span className="block overflow-hidden py-1">
                <span className="inline-block about-heading-line will-change-transform">
                  doesn&apos;t just study
                </span>
              </span>
              <span className="block overflow-hidden py-1">
                <span className="inline-block about-heading-line will-change-transform">
                  technology—
                </span>
              </span>
              <span className="block overflow-hidden py-1">
                <span className="inline-block about-heading-line text-hollow-accent will-change-transform">
                  ships it.
                </span>
              </span>
            </h2>

            <div
              ref={bodyRef}
              className="space-y-5 text-[#8E90A6] text-base md:text-lg leading-relaxed font-sans font-light max-w-xl"
            >
              <p>
                I&apos;m Durgesh Kanzariya, an IT engineering student at RK University, Rajkot,
                building real-world software across the full stack — from React dashboards
                and FastAPI backends to Flutter mobile apps and deep learning models.
              </p>
              <p>
                My work focuses on production-grade systems with robust foundations:
                atomic Firestore transactions, dual-model AI routing engines,
                and predictive ML pipelines on aerospace telemetry.
              </p>
            </div>

            {/* Quote with machined accent line */}
            <blockquote className="mt-8 pl-5 border-l-2 border-[#4F8EFF] text-[#6B7280] text-sm italic">
              &ldquo;Engineer by craft. Builder by passion.&rdquo;
            </blockquote>
          </div>

          {/* Right — highlight cards (col 5) Double Bezel Architecture */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div
              ref={cardsRef}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {HIGHLIGHTS.map(({ icon: Icon, label, description, color }) => (
                <div
                  key={label}
                  className="p-1 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 hover:bg-white/[0.04] transition-all duration-500 group"
                >
                  <div className="p-5 rounded-[calc(1rem-0.25rem)] bg-[#090912] border border-white/[0.03] flex flex-col gap-3 h-full">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${color}15`, color }}
                    >
                      <Icon size={17} />
                    </div>
                    <div>
                      <div className="font-syne font-bold text-[#F0F0F8] text-base mb-1">
                        {label}
                      </div>
                      <p className="text-[#6B7280] text-xs leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* University Double-Bezel Card */}
            <div className="p-1 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-all duration-500">
              <div className="p-4 rounded-[calc(1rem-0.25rem)] bg-[#090912] border border-white/[0.03] flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B] flex-shrink-0">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <div className="text-[#F0F0F8] font-semibold text-sm">
                    RK University, Rajkot
                  </div>
                  <div className="text-[#6B7280] text-xs font-mono mt-0.5">
                    B.Tech · Information Technology · 2023–
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
