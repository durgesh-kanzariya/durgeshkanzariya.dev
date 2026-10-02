"use client";

import { useEffect, useRef } from "react";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const ctx = gsap.context(() => {
      // Large CTA text reveal
      const split = new SplitText(ctaRef.current, { type: "lines,words" });
      gsap.fromTo(
        split.words,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.04,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        bodyRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: bodyRef.current,
            start: "top 90%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="section-padding border-t border-[#1c1c3a] relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#4F8EFF]/5 blur-[100px]" />
      </div>

      <div className="section-container relative z-10">
        {/* Large display CTA */}
        <div className="mb-20">
          <div className="label-sm mb-8">Get in touch</div>
          <h2
            ref={ctaRef}
            className="display-xl text-[#F0F0F8] mb-8 max-w-4xl"
          >
            Let&apos;s build
            <br />
            something
            <br />
            <span className="text-hollow-accent">great.</span>
          </h2>

          <div ref={bodyRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-4" style={{ opacity: 0 }}>
            <a
              href="mailto:durgesh.j.kanzariya@gmail.com"
              className="btn-primary text-base py-3.5 px-7"
            >
              <Mail size={16} />
              Send an email
              <ArrowUpRight size={14} />
            </a>
            <p className="text-[#6B7280] text-sm">
              Or connect on LinkedIn, GitHub — I respond to everything.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="divider mb-12" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Name + university */}
          <div>
            <div className="font-syne font-bold text-[#F0F0F8] text-sm mb-1">
              Durgesh Kanzariya
            </div>
            <div className="label-muted">B.Tech IT · RK University · Rajkot</div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/durgesh-kanzariya"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="btn-icon"
            >
              <GithubIcon size={14} />
            </a>
            <a
              href="https://linkedin.com/in/durgesh-kanzariya"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="btn-icon"
            >
              <LinkedinIcon size={14} />
            </a>
            <a
              href="mailto:durgesh.j.kanzariya@gmail.com"
              aria-label="Email"
              className="btn-icon"
            >
              <Mail size={14} />
            </a>
          </div>

          {/* Copyright */}
          <div className="label-muted">
            © {new Date().getFullYear()} · Durgesh Kanzariya
          </div>
        </div>
      </div>
    </footer>
  );
}
