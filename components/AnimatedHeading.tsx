"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface AnimatedHeadingProps {
  subtitle: string;
  title: string;
  className?: string;
}

export default function AnimatedHeading({
  subtitle,
  title,
  className = "",
}: AnimatedHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const highlightRef = useRef<HTMLDivElement>(null);

  const words = title.split(" ");

  useEffect(() => {
    if (!containerRef.current) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(wordsRef.current, { opacity: 1, y: 0, filter: "none", rotateX: 0, scale: 1 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Initial hidden 3D state for words
    gsap.set(wordsRef.current, {
      opacity: 0,
      y: 45,
      rotateX: 25,
      scale: 0.92,
      filter: "blur(12px)",
      transformPerspective: 800,
      transformOrigin: "50% 100%",
    });

    // Initial hidden state for electric sweep line
    if (highlightRef.current) {
      gsap.set(highlightRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        opacity: 0,
      });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // 1. Layered 3D word-by-word reveal
    tl.to(wordsRef.current, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.8,
      stagger: 0.06,
      ease: "power4.out",
    });

    // 2. Electric purple gradient highlight sweep
    if (highlightRef.current) {
      tl.to(
        highlightRef.current,
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power2.inOut",
        },
        "-=0.25"
      ).to(
        highlightRef.current,
        {
          opacity: 0,
          duration: 0.4,
          ease: "power1.out",
        }
      );
    }

    return () => {
      tl.kill();
    };
  }, [words.length]);

  return (
    <div
      ref={containerRef}
      className={`space-y-3 border-b border-purple-900/30 pb-8 relative overflow-hidden ${className}`}
    >
      <span className="font-mono text-xs text-purple-400 uppercase tracking-widest font-bold block">
        {subtitle}
      </span>
      <div className="relative inline-block max-w-full">
        <h2 className="font-syne text-2xl sm:text-5xl font-bold sm:font-extrabold tracking-tight text-white uppercase flex flex-wrap gap-x-2.5 sm:gap-x-3 gap-y-1">
          {words.map((word, index) => (
            <span
              key={index}
              ref={(el) => {
                wordsRef.current[index] = el;
              }}
              className="inline-block will-change-transform"
            >
              {word}
            </span>
          ))}
        </h2>

        {/* Electric purple gradient sweep bar */}
        <div
          ref={highlightRef}
          className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-600 via-purple-400 to-indigo-300 shadow-[0_0_15px_rgba(168,85,247,0.9)] rounded-full pointer-events-none"
        />
      </div>
    </div>
  );
}
