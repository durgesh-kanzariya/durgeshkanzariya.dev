"use client";

import { useRef, MouseEvent } from "react";
import gsap from "gsap";

interface LetterData {
  char: string;
  isAccent?: boolean;
}

const LINE_1: LetterData[] = "Durgesh".split("").map((c) => ({ char: c }));
const LINE_2: LetterData[] = "Kanzariya".split("").map((c) => ({ char: c, isAccent: true }));

export default function MagneticHeading() {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const letterPositions = useRef<{ x: number; y: number }[]>([]);

  // Cache initial letter center positions when mouse enters so we don't trigger layout reflows during mousemove
  const handleMouseEnter = () => {
    letterPositions.current = letterRefs.current.map((el) => {
      if (!el) return { x: 0, y: 0 };
      const rect = el.getBoundingClientRect();
      const currentX = (gsap.getProperty(el, "x") as number) || 0;
      const currentY = (gsap.getProperty(el, "y") as number) || 0;
      return {
        x: rect.left + rect.width / 2 - currentX,
        y: rect.top + rect.height / 2 - currentY,
      };
    });
  };

  const handleMouseMove = (e: MouseEvent<HTMLHeadingElement>) => {
    if (!letterPositions.current.length) handleMouseEnter();

    const radius = 85; // Proximity threshold in pixels
    const maxRepel = 100; // Maximum pixel displacement per character

    letterRefs.current.forEach((el, index) => {
      if (!el) return;
      const pos = letterPositions.current[index];
      if (!pos) return;

      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;
      const dist = Math.hypot(dx, dy);

      if (dist < radius && dist > 0) {
        // Compute repulsion direction (push AWAY from mouse)
        const nx = -dx / dist;
        const ny = -dy / dist;

        // Quadratic force falloff (closer cursor = much stronger evasion)
        const power = Math.pow(1 - dist / radius, 1.4);
        const force = power * maxRepel;

        const targetX = nx * force;
        const targetY = ny * force;
        const rotate = (dx / radius) * -14; // Subtle dynamic tilt away from cursor angle

        gsap.to(el, {
          x: targetX,
          y: targetY,
          rotate: rotate,
          scale: 1.05,
          duration: 0.22,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else {
        // Return to resting position with playful spring elasticity
        gsap.to(el, {
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 0.75,
          ease: "elastic.out(1.1, 0.35)",
          overwrite: "auto",
        });
      }
    });
  };

  const handleMouseLeave = () => {
    // Smoothly bounce all letters back to resting baseline
    letterRefs.current.forEach((el) => {
      if (!el) return;
      gsap.to(el, {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        duration: 0.85,
        ease: "elastic.out(1.2, 0.35)",
        overwrite: "auto",
      });
    });
    letterPositions.current = [];
  };

  let letterIndex = 0;

  return (
    <h1
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Durgesh Kanzariya"
      className="font-syne font-extrabold text-[#F0F4FF] mb-5 leading-[0.92] tracking-tight cursor-default select-none inline-block"
      style={{ fontSize: "clamp(2.5rem, 4.5vw, 5rem)" }}
    >
      {/* Line 1: Durgesh */}
      <span className="block whitespace-nowrap">
        {LINE_1.map(({ char }, i) => {
          const idx = letterIndex++;
          return (
            <span
              key={`line1-${i}`}
              ref={(el) => {
                letterRefs.current[idx] = el;
              }}
              aria-hidden="true"
              className="inline-block will-change-transform"
            >
              {char}
            </span>
          );
        })}
      </span>

      {/* Line 2: Kanzariya */}
      <span className="block whitespace-nowrap text-[#4F8EFF]">
        {LINE_2.map(({ char }, i) => {
          const idx = letterIndex++;
          return (
            <span
              key={`line2-${i}`}
              ref={(el) => {
                letterRefs.current[idx] = el;
              }}
              aria-hidden="true"
              className="inline-block will-change-transform"
            >
              {char}
            </span>
          );
        })}
      </span>
    </h1>
  );
}
