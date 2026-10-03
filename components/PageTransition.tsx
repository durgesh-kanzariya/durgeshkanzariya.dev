"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Always reset scroll to top on route change
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      }
      ScrollTrigger.refresh();
    }

    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    // Smooth, instant container reveal on route change (Zero curtain wipe flash)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
          onComplete: () => {
            if (typeof window !== "undefined") {
              ScrollTrigger.refresh();
            }
          },
        }
      );
    });

    return () => ctx.revert();
  }, [pathname]);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      <div ref={containerRef} className="relative w-full min-h-screen">
        {children}
      </div>
    </div>
  );
}
