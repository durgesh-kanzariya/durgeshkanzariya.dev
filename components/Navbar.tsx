"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

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

        {/* Minimal Navigation Items */}
        <div className="flex items-center gap-4 sm:gap-6 font-mono text-xs">
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
  );
}
