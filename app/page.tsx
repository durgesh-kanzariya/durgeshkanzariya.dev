"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import ImageSequenceScroll from "@/components/ImageSequenceScroll";
import CinematicParticles from "@/components/CinematicParticles";
import MarqueeTicker from "@/components/MarqueeTicker";
import InfiniteCardsShowcase from "@/components/InfiniteCardsShowcase";
import BentoArsenal from "@/components/BentoArsenal";
import ProcessSection from "@/components/ProcessSection";
import AboutSection from "@/components/AboutSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Handle hash link scroll (e.g. /#work) after ScrollTrigger layout pin-spacers settle
    if (typeof window !== "undefined" && window.location.hash) {
      const targetId = window.location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          ScrollTrigger.refresh();
          if ((window as any).lenis) {
            (window as any).lenis.scrollTo(el, { immediate: true });
          } else {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#07070A] text-white font-sans relative overflow-x-hidden selection:bg-purple-600 selection:text-white flex flex-col">
      {/* Interactive Cinematic Particles */}
      <CinematicParticles />

      {/* 1. Header (Fixed Glassmorphism Bar) */}
      <Navbar />

      {/* 2. Hero Section (Interactive Scroll Sequence) */}
      <ImageSequenceScroll />

      {/* 3. Infinite Impact Ticker (Marquee Banner) */}
      <MarqueeTicker />

      {/* 4. GSAP Seamless Infinite Cards Showcase */}
      <InfiniteCardsShowcase />

      {/* 5. Technical Arsenal (Bento Box Matrix) */}
      <BentoArsenal />

      {/* 6. Engineering & Work Process */}
      <ProcessSection />

      {/* 7. About & Philosophy */}
      <AboutSection />

      {/* 8. Footer / Call to Action */}
      <FooterSection />
    </div>
  );
}
