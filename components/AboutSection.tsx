"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { GraduationCap, Code2, Brain, Smartphone } from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: Code2,
    label: "Full-Stack",
    description: "React, Next.js, Node.js, FastAPI — end-to-end.",
    color: "#4F8EFF",
  },
  {
    icon: Brain,
    label: "ML / AI",
    description: "XGBoost, TensorFlow, LLM routing, NLP.",
    color: "#A855F7",
  },
  {
    icon: Smartphone,
    label: "Mobile",
    description: "Flutter + Dart, Firebase, production apps.",
    color: "#10B981",
  },
  {
    icon: GraduationCap,
    label: "Student",
    description: "B.Tech IT, RK University — 2023 cohort.",
    color: "#F59E0B",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const ctx = gsap.context(() => {
      // Heading word reveal
      const split = new SplitText(headingRef.current, { type: "lines,words" });
      gsap.fromTo(
        split.words,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.04,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
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
          duration: 0.9,
          ease: "power3.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: bodyRef.current,
            start: "top 85%",
          },
        }
      );

      // Cards stagger
      const cards = gsap.utils.toArray<Element>(".about-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
          },
        }
      );
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — text */}
          <div>
            <div className="label-sm mb-6">About</div>
            <h2
              ref={headingRef}
              className="display-md text-[#F0F0F8] mb-10 leading-tight"
            >
              IT engineer who
              <br />
              doesn&apos;t just study
              <br />
              technology—
              <br />
              <span className="text-gradient-blue">ships it.</span>
            </h2>

            <div
              ref={bodyRef}
              className="space-y-5 text-[#9CA3AF] text-base leading-relaxed"
              style={{ opacity: 0 }}
            >
              <p>
                I&apos;m Durgesh Kanzariya, a B.Tech IT student at RK University, Rajkot (2023 cohort),
                building real-world systems across the full software stack — from React dashboards
                and FastAPI backends to Flutter mobile apps and deep learning models.
              </p>
              <p>
                My projects aren&apos;t homework assignments; they&apos;re production-grade systems with
                real architectures: atomic Firestore transactions, dual-model AI routing engines,
                normalized database schemas, and predictive ML pipelines on aerospace telemetry.
              </p>
              <p>
                I believe the best engineers learn by building. Every project on this portfolio
                was a problem worth solving — and an opportunity to go deep on a new domain.
              </p>
            </div>

            {/* Quote */}
            <blockquote className="mt-10 pl-5 border-l-2 border-[#4F8EFF] text-[#6B7280] text-sm italic">
              &ldquo;Engineer by craft. Builder by passion.&rdquo;
            </blockquote>
          </div>

          {/* Right — highlight cards */}
          <div>
            <div
              ref={cardsRef}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {HIGHLIGHTS.map(({ icon: Icon, label, description, color }) => (
                <div
                  key={label}
                  className="about-card card-base p-6 flex flex-col gap-4 hover:shadow-lg transition-all duration-300"
                  style={{ opacity: 0 }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${color}15`, color }}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="font-syne font-bold text-[#F0F0F8] text-lg mb-1">{label}</div>
                    <p className="text-[#6B7280] text-sm leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* University badge */}
            <div className="mt-6 card-base p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B]">
                <GraduationCap size={18} />
              </div>
              <div>
                <div className="text-[#F0F0F8] font-semibold text-sm">RK University, Rajkot</div>
                <div className="text-[#6B7280] text-xs font-mono mt-0.5">B.Tech · Information Technology · 2023–</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
