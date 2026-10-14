"use client";

import { ArrowUpRight } from "lucide-react";
import { type SocialChannel } from "./footerData";

interface SocialLinkCardProps {
  channel: SocialChannel;
}

export default function SocialLinkCard({ channel }: SocialLinkCardProps) {
  const { icon: Icon, label, handle, href, color } = channel;

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="group flex items-center justify-between gap-5 px-6 py-5 transition-all duration-300 hover:bg-[#121528] rounded-xl border border-transparent hover:border-[#1A1D33]"
    >
      <div className="flex items-center gap-4 min-w-0">
        {/* Icon zone */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 border border-[#1A1D33] bg-[#080810]"
          style={{ color }}
        >
          <Icon size={18} />
        </div>

        {/* Text */}
        <div className="min-w-0">
          <div className="text-[#F0F4FF] font-syne font-semibold text-sm mb-0.5 group-hover:text-white transition-colors">
            {label}
          </div>
          <div className="text-[#64748B] text-xs font-mono truncate group-hover:text-[#94A3B8] transition-colors">
            {handle}
          </div>
        </div>
      </div>

      {/* Action Arrow */}
      <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-[#1A1D33] bg-[#080810] text-[#64748B] group-hover:text-[#F0F4FF] group-hover:border-[#4F8EFF]/40 group-hover:bg-[#4F8EFF]/10 transition-all duration-300 flex-shrink-0">
        <ArrowUpRight size={14} />
      </div>
    </a>
  );
}
