"use client";

import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";

export default function FooterBottomBar() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-10 border-t border-[#1A1D33]">
      {/* Name + university */}
      <div>
        <div className="font-syne font-bold text-[#F0F4FF] text-sm mb-1">
          Durgesh Kanzariya
        </div>
        <div className="label-muted text-xs">
          B.Tech IT · RK University · Rajkot
        </div>
      </div>

      {/* Social quick links */}
      <div className="flex items-center gap-2">
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
      <div className="label-muted text-xs">
        © {currentYear} · durgeshkanzariya.dev
      </div>
    </div>
  );
}
