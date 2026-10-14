"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/hero";
import ProjectsSection from "@/components/projects";
import SkillsSection from "@/components/skills";
import AboutSection from "@/components/about";
import FooterSection from "@/components/footer";

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
          const lenis = window.lenis;
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
    <div className="min-h-screen bg-[#080810] text-[#F0F4FF] relative overflow-x-hidden">
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
