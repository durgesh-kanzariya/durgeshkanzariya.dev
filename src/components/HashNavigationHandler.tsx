"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HashNavigationHandler() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    gsap.registerPlugin(ScrollTrigger);

    const timer = window.setTimeout(() => {
      const target = document.getElementById(hash.slice(1));
      if (!target) return;

      ScrollTrigger.refresh();
      if (window.lenis) {
        window.lenis.scrollTo(target, { immediate: true });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 400);

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
