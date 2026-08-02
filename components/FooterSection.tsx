"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

export default function FooterSection() {
  const emailAddress = "durgesh.j.kanzariya@gmail.com";

  return (
    <footer id="contact" className="relative w-full pt-20 sm:pt-24 pb-16 sm:pb-24 px-4 sm:px-6 md:px-12 bg-[#07070A] text-white border-t border-purple-900/30 overflow-hidden scroll-mt-14">
      {/* Background Ambient Radial Purple Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-600/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        {/* Headline CTA */}
        <div className="space-y-6 sm:space-y-8 max-w-4xl">
          <span className="font-mono text-xs text-purple-400 uppercase tracking-widest font-bold">
            // GET IN TOUCH
          </span>

          <h2 className="font-syne text-3xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            LET&apos;S BUILD SOMETHING <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-300 drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">EXTRAORDINARY.</span>
          </h2>

          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
            <MagneticButton distanceThreshold={70} maxTranslate={18}>
              <a
                href={`mailto:${emailAddress}`}
                className="group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-syne font-bold text-sm sm:text-base shadow-[0_0_35px_rgba(168,85,247,0.5)] hover:shadow-[0_0_50px_rgba(168,85,247,0.8)] transition-all duration-300 w-full sm:w-auto"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </MagneticButton>

            {/* Social Links Minimalist Icon Pill */}
            <div className="flex items-center justify-center gap-3 px-5 py-3 rounded-full bg-black/60 backdrop-blur-xl border border-white/15 shadow-xl">
              <MagneticButton distanceThreshold={40} maxTranslate={10}>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-purple-600 flex items-center justify-center text-white/90 hover:text-white transition-all block"
                  title="GitHub"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
              </MagneticButton>

              <MagneticButton distanceThreshold={40} maxTranslate={10}>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-purple-600 flex items-center justify-center text-white/90 hover:text-white transition-all block"
                  title="LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </MagneticButton>

              <MagneticButton distanceThreshold={40} maxTranslate={10}>
                <a
                  href={`mailto:${emailAddress}`}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-purple-600 flex items-center justify-center text-white/90 hover:text-white transition-all block"
                  title="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 sm:pt-12 border-t border-purple-950/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left font-mono text-[11px] sm:text-xs text-purple-400/60">
          <span>© 2026 Durgesh Kanzariya • Built with Next.js &amp; GSAP</span>
          <span className="text-[10px] text-purple-500/50">ALL RIGHTS RESERVED</span>
        </div>
      </div>
    </footer>
  );
}
