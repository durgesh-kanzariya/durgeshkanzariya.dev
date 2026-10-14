"use client";

import React, { useRef, useState, useCallback } from "react";
import Link from "next/link";

export type ButtonVariant = "glow-pill" | "trace" | "glow-trace" | "glass-trace";

interface InteractiveButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  target?: string;
  rel?: string;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  magnetic?: boolean;
  glowColor?: string; // e.g. "rgba(168, 85, 247, 0.9)"
  ambientColor?: string; // e.g. "rgba(124, 58, 237, 0.55)"
  textColor?: string;
  pillRadius?: number; // default rounded-full (9999)
  size?: "sm" | "md" | "lg";
  ariaLabel?: string;
}

export default function InteractiveButton({
  children,
  variant = "glow-trace",
  href,
  onClick,
  target,
  rel,
  className = "",
  icon,
  iconPosition = "right",
  magnetic = true,
  glowColor = "rgba(255, 255, 255, 0.92)",
  ambientColor = "rgba(124, 58, 237, 0.5)",
  textColor,
  size = "md",
  ariaLabel,
}: InteractiveButtonProps) {
  const buttonRef = useRef<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement | null>(null);
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Mouse move handler for spotlight and magnetic tracking
  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const el = buttonRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Coordinates inside button
      setCoords({ x, y });

      // Magnetic pull effect
      if (magnetic) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = (x - centerX) * 0.18;
        const deltaY = (y - centerY) * 0.18;
        setOffset({ x: deltaX, y: deltaY });
      }
    },
    [magnetic]
  );

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    setOffset({ x: 0, y: 0 });
  }, []);

  // Size styling
  const sizeClasses = {
    sm: "px-4 py-2 text-xs gap-1.5",
    md: "px-6 py-3 text-sm gap-2.5",
    lg: "px-8 py-3.5 text-base gap-3",
  }[size];

  // Visual styling variants
  const isGlowPill = variant === "glow-pill" || variant === "glow-trace";
  const isGlassTrace = variant === "glass-trace";
  const hasTrace = variant === "trace" || variant === "glow-trace" || variant === "glass-trace";

  // Base button styles
  const baseClasses = `
    group/ibtn relative inline-flex items-center justify-center font-medium
    rounded-full select-none cursor-pointer overflow-visible
    transition-transform duration-200 ease-out active:scale-[0.97]
    ${sizeClasses}
    ${className}
  `.trim();

  // Content rendering
  const content = (
    <>
      {/* 1. Ambient Glow Bloom Beneath Button */}
      {isGlowPill && (
        <span
          className="absolute -inset-1 rounded-full blur-xl pointer-events-none transition-opacity duration-500 ease-out -z-10"
          style={{
            background: ambientColor,
            opacity: isHovered ? 0.85 : 0.45,
            transform: isHovered ? "scale(1.08)" : "scale(0.96)",
          }}
          aria-hidden="true"
        />
      )}

      {/* 2. Glass Base Layer */}
      <span
        className={`absolute inset-0 rounded-full transition-all duration-300 pointer-events-none overflow-hidden ${
          isGlowPill
            ? "shadow-[0_8px_24px_-4px_rgba(79,70,229,0.5),0_2px_6px_rgba(0,0,0,0.3)]"
            : isGlassTrace
            ? "bg-[#0B0D1E]/80 backdrop-blur-md border border-[#25284B] shadow-lg shadow-black/40"
            : "bg-[#0E1022] border border-[#2A2E54] shadow-lg shadow-black/40"
        }`}
        style={{
          background: isGlowPill
            ? "linear-gradient(135deg, #7A3EF8 0%, #6366F1 50%, #4F46E5 100%)"
            : undefined,
        }}
        aria-hidden="true"
      >
        {/* Specular Inner Rim (matches reference screenshot jelly button) */}
        {isGlowPill && (
          <span
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              boxShadow:
                "inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.65), inset 0 -2px 4px 0 rgba(15, 10, 45, 0.4)",
            }}
          />
        )}

        {/* 3. Cursor Following Dynamic Spotlight (Image 1 & 2 effect) */}
        <span
          className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300 ease-out"
          style={{
            opacity: isHovered ? 1 : 0.25,
            background: isGlowPill
              ? `radial-gradient(circle 80px at ${coords.x}px ${coords.y}px, ${glowColor} 0%, rgba(220, 195, 255, 0.65) 30%, rgba(124, 58, 237, 0.1) 65%, transparent 100%)`
              : `radial-gradient(circle 90px at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.45) 0%, rgba(79, 142, 255, 0.2) 40%, transparent 80%)`,
          }}
        />

        {/* Dynamic Light Specular Beam */}
        {isHovered && isGlowPill && (
          <span
            className="absolute pointer-events-none w-24 h-24 rounded-full blur-md mix-blend-overlay transition-opacity duration-150"
            style={{
              left: coords.x - 48,
              top: coords.y - 48,
              background: `radial-gradient(circle, ${glowColor} 0%, rgba(255,255,255,0.6) 40%, transparent 80%)`,
            }}
          />
        )}
      </span>

      {/* 4. Trace Tracing Effect: Animated Border Orbit Beam */}
      {hasTrace && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible rounded-full"
          style={{ padding: "0.5px" }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="trace-glow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" stopOpacity="0" />
              <stop offset="60%" stopColor="#818CF8" stopOpacity="0.3" />
              <stop offset="85%" stopColor="#C084FC" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
            </linearGradient>
            <filter id="trace-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Running border trace track */}
          <rect
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx="9999"
            pathLength="100"
            fill="none"
            stroke="url(#trace-glow-grad)"
            strokeWidth={isGlowPill ? "2.5" : "1.75"}
            strokeDasharray="25 75"
            filter="url(#trace-blur)"
            className="animate-border-trace"
            style={{
              animationDuration: isHovered ? "2.2s" : "4s",
              opacity: isHovered ? 1 : 0.65,
              transition: "opacity 0.3s ease",
            }}
          />
        </svg>
      )}

      {/* 5. Button Text & Icon Content with physical depth */}
      <span
        className={`relative z-10 flex items-center justify-center gap-2 font-semibold tracking-wide transition-colors duration-200 ${
          isGlowPill
            ? (textColor || "text-[#0F0A28] group-hover/ibtn:text-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]")
            : "text-[#F0F4FF] group-hover/ibtn:text-white"
        }`}
      >
        {icon && iconPosition === "left" && (
          <span className="transition-transform duration-200 group-hover/ibtn:-translate-x-0.5">
            {icon}
          </span>
        )}
        <span className="font-syne text-[0.875rem] font-bold">{children}</span>
        {icon && iconPosition === "right" && (
          <span className="transition-transform duration-200 group-hover/ibtn:translate-x-0.5">
            {icon}
          </span>
        )}
      </span>
    </>
  );

  const dynamicTransform = `translate3d(${offset.x}px, ${offset.y}px, 0)`;

  // Render as Next Link
  if (href && (href.startsWith("/") || href.startsWith("#"))) {
    return (
      <Link
        href={href}
        ref={buttonRef as unknown as React.Ref<HTMLAnchorElement>}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className={baseClasses}
        style={{ transform: dynamicTransform }}
        data-magnetic={magnetic ? "true" : undefined}
        aria-label={ariaLabel}
      >
        {content}
      </Link>
    );
  }

  // Render as External Link
  if (href) {
    return (
      <a
        href={href}
        ref={buttonRef as unknown as React.Ref<HTMLAnchorElement>}
        target={target || "_blank"}
        rel={rel || "noopener noreferrer"}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className={baseClasses}
        style={{ transform: dynamicTransform }}
        data-magnetic={magnetic ? "true" : undefined}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  // Render as Standard Button
  return (
    <button
      type="button"
      ref={buttonRef as unknown as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={baseClasses}
      style={{ transform: dynamicTransform }}
      data-magnetic={magnetic ? "true" : undefined}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
