"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Mail, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InteractiveButton from "@/components/common/InteractiveButton";

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
  const router = useRouter();
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const mobileOpenRef = useRef(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = (restoreFocus = true) => {
    const wasOpen = mobileOpenRef.current;
    mobileOpenRef.current = false;
    setMobileOpen(false);
    if (restoreFocus && wasOpen) {
      requestAnimationFrame(() => toggleBtnRef.current?.focus());
    }
  };

  const openMobileMenu = () => {
    mobileOpenRef.current = true;
    setMobileOpen(true);
  };

  // Focus trap & auto-focus inside mobile drawer when opened
  useEffect(() => {
    if (!mobileOpen) return;

    // Focus the first navigation button inside the drawer
    const timer = setTimeout(() => {
      const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable && focusable.length > 0) {
        focusable[0].focus();
      }
    }, 50);

    // Trap tab key cycling inside drawer
    const handleTabTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !drawerRef.current) return;
      const elements = drawerRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!elements.length) return;

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (!drawerRef.current.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleTabTrap);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleTabTrap);
    };
  }, [mobileOpen]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Handle Escape key to close mobile menu & return focus
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpenRef.current) {
        closeMobileMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Animate in on load unless user prefers reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        gsap.fromTo(
          navRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 }
        );
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
      ctx.revert();
    };
  }, []);

  const handleNavClick = (href: string) => {
    closeMobileMenu();
    if (href.startsWith("#")) {
      const sectionId = href.replace("#", "");
      const el = document.getElementById(sectionId);
      if (el && pathname === "/") {
        const lenis = window.lenis;
        if (lenis) {
          lenis.scrollTo(el, { duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        } else {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push(`/${href}`);
      }
    } else {
      router.push(href);
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Primary navigation"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-[#080810]/80 backdrop-blur-xl border-b border-[#1c1c3a]"
            : "bg-transparent"
        }`}
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
              <InteractiveButton
                variant="glass-trace"
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                icon={<FileText size={12} />}
                iconPosition="left"
                size="sm"
                className="ml-2 py-1.5 px-3.5 text-xs"
              >
                Resume
              </InteractiveButton>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              ref={toggleBtnRef}
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg focus-visible:outline-2 focus-visible:outline-[#4F8EFF]"
              onClick={() => mobileOpen ? closeMobileMenu(false) : openMobileMenu()}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
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
        ref={drawerRef}
        id="mobile-nav"
        role="dialog"
        aria-modal={mobileOpen}
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
        aria-label="Mobile navigation"
        className={`fixed inset-0 z-30 transition-all duration-500 ${
          mobileOpen ? "opacity-100 pointer-events-auto visible" : "opacity-0 pointer-events-none invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-[#080810]/90 backdrop-blur-xl"
          onClick={() => closeMobileMenu()}
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
