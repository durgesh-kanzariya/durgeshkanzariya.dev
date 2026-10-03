"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Mail, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  { icon: GithubIcon, href: "https://github.com/durgesh-kanzariya", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://linkedin.com/in/durgesh-kanzariya", label: "LinkedIn" },
  { icon: Mail, href: "mailto:durgesh.j.kanzariya@gmail.com", label: "Email" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Animate in on load
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 }
      );
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ctx.revert();
    };
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      const el = document.getElementById(href.replace("#", ""));
      if (el) {
        const lenis = (window as any).lenis;
        if (lenis) {
          lenis.scrollTo(el, { duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        } else {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-[#080810]/80 backdrop-blur-xl border-b border-[#1c1c3a]"
            : "bg-transparent"
        }`}
        style={{ opacity: 0 }}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo / Name */}
            <Link
              href="/"
              className="font-mono text-[#F0F0F8] text-sm hover:text-[#4F8EFF] transition-colors duration-200"
            >
              durgeshkanzariya<span className="text-[#4F8EFF]">.dev</span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(({ label, href }) => (
                <button
                  key={label}
                  onClick={() => handleNavClick(href)}
                  className="label-muted hover:text-[#F0F0F8] hover:text-[0.75rem] transition-all duration-200 link-hover"
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Desktop Social + Resume */}
            <div className="hidden md:flex items-center gap-2">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="btn-icon"
                >
                  <Icon size={14} />
                </a>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 btn-ghost py-1.5 px-4 text-xs"
              >
                <FileText size={12} />
                Resume
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation"
            >
              <span
                className={`block w-5 h-[1.5px] bg-[#F0F0F8] transition-all duration-300 ${
                  mobileOpen ? "rotate-45 translate-y-[4.5px]" : ""
                }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-[#F0F0F8] transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-[#F0F0F8] transition-all duration-300 ${
                  mobileOpen ? "-rotate-45 -translate-y-[4.5px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-30 transition-all duration-500 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-[#080810]/90 backdrop-blur-xl"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-16 left-0 right-0 bg-[#0c0c18] border-b border-[#1c1c3a] transition-transform duration-500 ${
            mobileOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="section-container py-8 flex flex-col gap-6">
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => handleNavClick(href)}
                className="text-left font-syne text-2xl font-bold text-[#F0F0F8] hover:text-[#4F8EFF] transition-colors duration-200"
              >
                {label}
              </button>
            ))}
            <div className="pt-4 border-t border-[#1c1c3a] flex items-center gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="btn-icon"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
