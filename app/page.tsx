"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import AboutSection from "@/components/AboutSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Handle hash links after layout settles
    if (typeof window !== "undefined" && window.location.hash) {
      const targetId = window.location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          ScrollTrigger.refresh();
          const lenis = (window as any).lenis;
          if (lenis) {
            lenis.scrollTo(el, { immediate: true });
          } else {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#080810] text-[#F0F0F8] relative overflow-x-hidden">
      {/* Fixed navbar */}
      <Navbar />

      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Projects */}
      <ProjectsSection />

      {/* 3. Skills */}
      <SkillsSection />

      {/* 4. About */}
      <AboutSection />

      {/* 5. Footer / Contact */}
      <FooterSection />
    </div>
  );
}
