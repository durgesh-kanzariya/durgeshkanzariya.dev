"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initialTheme = (savedTheme as "light" | "dark") || systemTheme;
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top Navbar */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-40 w-full bg-canvas/80 backdrop-blur-md border-b border-border-subtle/60"
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Brand Core Domain Link */}
          <span 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm font-mono font-semibold tracking-tight text-ink-primary cursor-pointer group flex items-center gap-1"
          >
            durgeshkanzariya<span className="text-tech-blue group-hover:animate-pulse">.dev</span>
          </span>

          {/* Desktop Navigation Items (Hidden on mobile) */}
          <div className="hidden md:flex items-center gap-4 sm:gap-6 font-mono text-xs">
            <button 
              onClick={() => scrollToSection("work")} 
              className="text-ink-muted hover:text-ink-primary transition-colors cursor-pointer"
            >
              // work
            </button>
            <button 
              onClick={() => scrollToSection("sandbox")} 
              className="text-ink-muted hover:text-ink-primary transition-colors cursor-pointer"
            >
              // sandbox
            </button>
            <button 
              onClick={() => scrollToSection("timeline")} 
              className="text-ink-muted hover:text-ink-primary transition-colors cursor-pointer"
            >
              // timeline
            </button>
            <button 
              onClick={() => scrollToSection("credentials")} 
              className="text-ink-muted hover:text-ink-primary transition-colors cursor-pointer"
            >
              // credentials
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-border-subtle">
              <button 
                onClick={toggleTheme}
                className="text-ink-muted hover:text-ink-primary p-1.5 rounded-lg border border-border-subtle bg-card-bg hover:shadow-sm transition-all cursor-pointer flex items-center justify-center"
                title="Toggle theme"
              >
                {theme === "light" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
              </button>
              <button 
                onClick={() => scrollToSection("contact")} 
                className="text-ink-primary font-medium border border-border-subtle bg-card-bg px-3 py-1.5 rounded-lg hover:shadow-sm transition-all cursor-pointer"
              >
                connect
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Floating Bottom Menu & sheet on mobile only */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="md:hidden fixed inset-0 z-45 bg-slate-950/20 dark:bg-slate-950/40 backdrop-blur-xs"
            />
            {/* Bottom Sheet Menu Drawer */}
            <motion.div
              initial={{ y: "100%", opacity: 0, x: "-50%" }}
              animate={{ y: 0, opacity: 1, x: "-50%" }}
              exit={{ y: "100%", opacity: 0, x: "-50%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="md:hidden fixed bottom-24 left-1/2 z-50 w-[90%] max-w-[400px] border border-border-subtle bg-canvas/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="px-5 py-4 flex flex-col gap-3 font-mono text-xs">
                <span className="text-[10px] text-ink-muted uppercase border-b border-border-subtle/50 pb-2 mb-1">// System Navigation</span>
                <button 
                  onClick={() => { scrollToSection("work"); setIsMenuOpen(false); }} 
                  className="text-left py-2 text-ink-muted hover:text-ink-primary transition-colors cursor-pointer"
                >
                  00 // WORK SHOWCASE
                </button>
                <button 
                  onClick={() => { scrollToSection("sandbox"); setIsMenuOpen(false); }} 
                  className="text-left py-2 text-ink-muted hover:text-ink-primary transition-colors cursor-pointer"
                >
                  01 // SIMULATION SANDBOX
                </button>
                <button 
                  onClick={() => { scrollToSection("timeline"); setIsMenuOpen(false); }} 
                  className="text-left py-2 text-ink-muted hover:text-ink-primary transition-colors cursor-pointer"
                >
                  02 // ROADMAP TIMELINE
                </button>
                <button 
                  onClick={() => { scrollToSection("credentials"); setIsMenuOpen(false); }} 
                  className="text-left py-2 text-ink-muted hover:text-ink-primary transition-colors cursor-pointer"
                >
                  03 // VALIDATED CREDENTIALS
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Sticky Bottom Action Bar (Mobile Viewport Only) */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[400px]">
        <div className="bg-canvas/80 backdrop-blur-lg border border-border-subtle/80 p-2.5 rounded-2xl flex items-center justify-between shadow-lg">
          {/* Quick link to showcase */}
          <button
            onClick={() => scrollToSection("work")}
            className="text-[10px] font-mono font-bold text-ink-muted hover:text-ink-primary px-3 py-2 cursor-pointer"
          >
            // work
          </button>
          
          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            className="text-ink-muted hover:text-ink-primary p-2 rounded-lg border border-border-subtle bg-card-bg cursor-pointer flex items-center justify-center transition-all active:scale-95"
            title="Toggle theme"
          >
            {theme === "light" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </button>

          {/* Quick link to connect / contact */}
          <button
            onClick={() => scrollToSection("contact")}
            className="text-[10px] font-mono font-bold border border-border-subtle bg-card-bg px-3.5 py-2 rounded-lg text-ink-primary cursor-pointer transition-all active:scale-95"
          >
            connect
          </button>

          {/* Hamburger menu toggler */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-ink-muted hover:text-ink-primary p-2 rounded-lg border border-border-subtle bg-card-bg cursor-pointer flex items-center justify-center transition-all active:scale-95"
            title="Toggle menu"
          >
            {isMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </>
  );
}
