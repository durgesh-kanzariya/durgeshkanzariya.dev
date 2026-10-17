"use client";

import { useEffect, useRef } from "react";
import { Mail } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SOCIAL_CHANNELS } from "./footerData";
import SocialLinkCard from "./SocialLinkCard";
import FooterBottomBar from "./FooterBottomBar";
import MagneticText from "@/components/MagneticText";
import InteractiveButton from "@/components/common/InteractiveButton";

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
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

      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: rightRef.current,
            start: "top 85%",
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
      className="section-padding border-t border-[#1A1D33] relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[#4F8EFF]/5 blur-[120px]" />
      </div>

      <div className="section-container relative z-10">
        {/* Two-column CTA + social channels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">

          {/* Left Column — CTA */}
          <div>
            <div className="label-sm mb-8">Get in touch</div>
            <MagneticText
              as="h2"
              ref={ctaRef}
              radius={85}
              maxRepel={100}
              className="font-syne font-extrabold text-[#F0F4FF] mb-8 leading-[0.96] tracking-tight"
              style={{ fontSize: "clamp(2.2rem, 3.5vw, 3.75rem)" }}
            >
              Let&apos;s build
              <br />
              something
              <br />
              <span className="text-[#4F8EFF]">great.</span>
            </MagneticText>

            <div
              ref={bodyRef}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <InteractiveButton
                variant="glow-trace"
                href="mailto:durgesh.j.kanzariya@gmail.com"
                icon={<Mail size={16} />}
                iconPosition="left"
                size="lg"
                className="py-4 px-8 text-base shadow-2xl"
              >
                Send an email
              </InteractiveButton>
            </div>
          </div>

          {/* Right Column — Social links panel */}
          <div ref={rightRef} className="flex flex-col justify-center">
            <p className="text-[#64748B] text-xs font-mono uppercase tracking-widest mb-4">
              Connect directly
            </p>

            <div className="rounded-2xl border border-[#1A1D33] overflow-hidden bg-[#0E101E] divide-y divide-[#1A1D33] p-1">
              {SOCIAL_CHANNELS.map((channel) => (
                <SocialLinkCard key={channel.label} channel={channel} />
              ))}
            </div>

            <p className="mt-4 text-[#718096] text-xs leading-relaxed font-mono">
              I respond to all inquiries — collaborations, full-time engineering roles, or tech chats.
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <FooterBottomBar />
      </div>
    </footer>
  );
}
