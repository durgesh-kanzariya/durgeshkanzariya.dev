"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ABOUT_HIGHLIGHTS } from "./aboutData";
import AboutBio from "./AboutBio";
import AboutHighlightItem from "./AboutHighlightItem";
import UniversityCard from "./UniversityCard";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        }
      );

      gsap.fromTo(
        bodyRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: { trigger: bodyRef.current, start: "top 85%" },
        }
      );

      const cards = gsap.utils.toArray<Element>(".about-item");
      gsap.fromTo(
        cards,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding relative">
      {/* Background ambient accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -right-64 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#4F8EFF]/4 blur-[140px]" />
      </div>

      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left Column — Biography & Vision */}
          <div className="flex flex-col justify-center">
            <div className="label-sm mb-6">About Me</div>

            <h2
              ref={headingRef}
              className="display-md text-[#F0F4FF] mb-10 leading-tight"
            >
              IT engineer who doesn&apos;t just study technology —{" "}
              <span className="text-gradient-blue">ships it.</span>
            </h2>

            <AboutBio ref={bodyRef} />
          </div>

          {/* Right Column — Specializations List + University Badge */}
          <div className="flex flex-col justify-center">
            <div
              ref={cardsRef}
              className="space-y-0 divide-y divide-[#1A1D33]"
            >
              {ABOUT_HIGHLIGHTS.map((item) => (
                <AboutHighlightItem key={item.number} item={item} />
              ))}
            </div>

            <UniversityCard />
          </div>

        </div>
      </div>
    </section>
  );
}
