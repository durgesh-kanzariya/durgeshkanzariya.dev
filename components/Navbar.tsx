"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/components/MagneticButton";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== "/") return;

    gsap.registerPlugin(ScrollTrigger);

    const sectionIds = ["hero", "work", "arsenal", "process", "about", "contact"];
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-25% 0px -50% 0px" }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => obs?.observer.unobserve(obs.el));
    };
  }, [pathname]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);

    if (pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      if (typeof window !== "undefined" && (window as any).lenis) {
        (window as any).lenis.scrollTo(el, {
          duration: 1.2,
          onComplete: () => {
            ScrollTrigger.refresh();
          },
        });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleBrandClick = () => {
    setMobileMenuOpen(false);
    if (pathname !== "/") {
      router.push("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const NAV_ITEMS = [
    { id: "work", label: "// work" },
    { id: "arsenal", label: "// arsenal" },
    { id: "process", label: "// process" },
    { id: "about", label: "// about" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 w-full z-50 bg-[#07070A]/35 backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-10 h-14 flex items-center justify-between font-sans">
        {/* Left: Brand Identity Mark */}
        <button
          onClick={handleBrandClick}
          className="group flex items-center gap-1.5 sm:gap-2 text-left focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none rounded-md px-1 py-0.5"
        >
          <span className="font-mono text-xs sm:text-sm font-extrabold tracking-tight text-white group-hover:text-purple-300 transition-colors">
            durgeshkanzariya<span className="text-purple-500">.dev</span>
          </span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
        </button>

        {/* Center: Desktop Monospace Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 sm:gap-8 font-mono text-xs text-purple-300/70">
          {NAV_ITEMS.map((item) => (
            <MagneticButton key={item.id} onClick={() => scrollToSection(item.id)} distanceThreshold={40} maxTranslate={10}>
              <span className={`transition-colors hover:text-white px-2 py-1 rounded focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none ${
                activeSection === item.id && pathname === "/" ? "text-purple-400 font-bold drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" : ""
              }`}>
                {item.label}
              </span>
            </MagneticButton>
          ))}
        </nav>

        {/* Right: Connect CTA Button (Hidden on small mobile) & Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <MagneticButton distanceThreshold={60} maxTranslate={15}>
              <button
                onClick={() => scrollToSection("contact")}
                className="group flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 hover:border-purple-400 text-xs font-mono text-purple-200 transition-all shadow-[0_0_20px_rgba(168,85,247,0.25)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none"
              >
                <span className="font-bold">Connect</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </MagneticButton>
          </div>

          {/* Mobile Hamburger Toggle Button (Minimum 44x44px touch target) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl bg-purple-950/50 border border-purple-800/40 text-purple-300 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Cyber-Luxury Mobile Dropdown Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-purple-900/40 bg-[#07070A]/95 backdrop-blur-2xl px-4 sm:px-6 py-6 overflow-y-auto max-h-[calc(100vh-3.5rem)]"
          >
            <div className="flex flex-col gap-3.5 font-mono text-sm">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left min-h-[44px] flex items-center px-4 rounded-xl border transition-all ${
                    activeSection === item.id && pathname === "/"
                      ? "bg-purple-950/80 border-purple-500/80 text-purple-300 font-bold"
                      : "bg-black/40 border-purple-900/30 text-purple-200/80 hover:text-white hover:border-purple-800/60"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("contact")}
                className="min-h-[44px] flex items-center justify-between px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold transition-all shadow-md mt-1"
              >
                <span>// CONNECT &amp; GET IN TOUCH</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
