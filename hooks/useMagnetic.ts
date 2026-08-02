"use client";

import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";

interface MagneticOptions {
  distanceThreshold?: number;
  maxTranslate?: number;
}

export function useMagnetic<T extends HTMLElement = HTMLDivElement>({
  distanceThreshold = 60,
  maxTranslate = 15,
}: MagneticOptions = {}): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.setAttribute("data-magnetic", "true");

    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });

    let rect: DOMRect | null = null;

    const updateRect = () => {
      rect = el.getBoundingClientRect();
    };

    const handleMouseEnter = () => {
      updateRect();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!rect) updateRect();
      if (!rect) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.hypot(dx, dy);

      const radius = distanceThreshold + rect.width / 2;

      if (dist < radius) {
        const pullX = (dx / radius) * maxTranslate;
        const pullY = (dy / radius) * maxTranslate;
        xTo(pullX);
        yTo(pullY);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const handleMouseLeave = () => {
      rect = null;
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      xTo(0);
      yTo(0);
    };
  }, [distanceThreshold, maxTranslate]);

  return ref;
}

