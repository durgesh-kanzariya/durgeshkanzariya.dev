"use client";

import React, { useRef, useState, useCallback, useId } from "react";
import Link from "next/link";

export type ButtonVariant = "glow-pill" | "trace" | "glow-trace" | "glass-trace";
export type ButtonTheme = "pastel" | "cooler";

interface InteractiveButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  theme?: ButtonTheme;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  target?: string;
  rel?: string;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  magnetic?: boolean;
  textColor?: string;
  size?: "sm" | "md" | "lg";
  ariaLabel?: string;
}

export default function InteractiveButton({
  children,
  variant = "glow-trace",
  theme = "pastel",
  href,
  onClick,
  target,
  rel,
  className = "",
  icon,
  iconPosition = "right",
  magnetic = true,
  textColor,
  size = "md",
  ariaLabel,
}: InteractiveButtonProps) {
  const buttonRef = useRef<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement | null>(null);
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const uniqueId = useId().replace(/:/g, "_");

  // Mouse move handler for spotlight and magnetic tracking
  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const el = buttonRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setCoords({ x, y });

      if (magnetic) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = (x - centerX) * 0.16;
        const deltaY = (y - centerY) * 0.16;
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

  // Sizing
  const sizeClasses = {
    sm: "px-4 py-2 text-xs gap-1.5",
    md: "px-6 py-3 text-sm gap-2.5",
    lg: "px-8 py-3.5 text-base gap-3",
  }[size];

  const isGlowPill = variant === "glow-pill" || variant === "glow-trace";
  const isGlassTrace = variant === "glass-trace";
  const hasTrace = variant === "trace" || variant === "glow-trace" || variant === "glass-trace";

  // Palette tokens — Subtle, professional cool pastel & obsidian glass (NO neon)
  const isPastelTheme = theme === "pastel" && isGlowPill;

  const baseGradient = isPastelTheme
    ? "linear-gradient(135deg, #F8FAFC 0%, #EEF2F6 45%, #CBD5E1 100%)"
    : "linear-gradient(135deg, #181C2E 0%, #111424 50%, #0B0D18 100%)";

  const ambientColor = isPastelTheme
    ? "rgba(203, 213, 225, 0.35)"
    : "rgba(100, 116, 139, 0.2)";

  const specularRim = isPastelTheme
    ? "inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.95), inset 0 -1.5px 2px 0 rgba(15, 23, 42, 0.12)"
    : "inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.22), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.4)";

  const baseShadow = isPastelTheme
    ? "shadow-[0_6px_20px_-4px_rgba(148,163,184,0.3),0_2px_6px_rgba(0,0,0,0.12)]"
    : "shadow-[0_8px_24px_-4px_rgba(0,0,0,0.6)]";

  const defaultTextColor = isPastelTheme
    ? "text-[#0F172A] group-hover/ibtn:text-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]"
    : "text-[#F1F5F9] group-hover/ibtn:text-white";

  // Base button container styles
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
      {/* 1. Subtle Ambient Glow Bloom Beneath Button (Muted, non-neon) */}
      {isGlowPill && (
        <span
          className="absolute -inset-1 rounded-full blur-xl pointer-events-none transition-opacity duration-500 ease-out -z-10"
          style={{
            background: ambientColor,
            opacity: isHovered ? 0.75 : 0.35,
            transform: isHovered ? "scale(1.06)" : "scale(0.96)",
          }}
          aria-hidden="true"
        />
      )}

      {/* 2. Glass Base Layer */}
      <span
        className={`absolute inset-0 rounded-full transition-all duration-300 pointer-events-none overflow-hidden ${
          isGlowPill
            ? baseShadow
            : isGlassTrace
            ? "bg-[#0B0D18]/90 backdrop-blur-md border border-[#20253E] shadow-lg shadow-black/40"
            : "bg-[#0E1020] border border-[#252846] shadow-lg shadow-black/40"
        }`}
        style={{
          background: isGlowPill ? baseGradient : undefined,
        }}
        aria-hidden="true"
      >
        {/* Specular Inner Rim */}
        {isGlowPill && (
          <span
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ boxShadow: specularRim }}
          />
        )}

        {/* 3. Cursor Following Dynamic Spotlight (Soft, calm light specular) */}
        <span
          className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300 ease-out"
          style={{
            opacity: isHovered ? 1 : 0.2,
            background: isPastelTheme
              ? `radial-gradient(circle 80px at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.95) 0%, rgba(241, 245, 249, 0.6) 35%, rgba(226, 232, 240, 0.1) 70%, transparent 100%)`
              : `radial-gradient(circle 85px at ${coords.x}px ${coords.y}px, rgba(226, 232, 240, 0.35) 0%, rgba(148, 163, 184, 0.12) 45%, transparent 80%)`,
          }}
        />

        {/* Dynamic Light Specular Beam */}
        {isHovered && isPastelTheme && (
          <span
            className="absolute pointer-events-none w-20 h-20 rounded-full blur-md mix-blend-overlay transition-opacity duration-150"
            style={{
              left: coords.x - 40,
              top: coords.y - 40,
              background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 40%, transparent 80%)",
            }}
          />
        )}
      </span>

      {/* 4. Trace Tracing Effect: Animated Border Orbit Beam (Cool silver/platinum tone) */}
      {hasTrace && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible rounded-full"
          style={{ padding: "0.5px" }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`trace-glow-grad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" stopOpacity="0" />
              <stop
                offset="60%"
                stopColor={isPastelTheme ? "#94A3B8" : "#64748B"}
                stopOpacity={isPastelTheme ? "0.35" : "0.3"}
              />
              <stop
                offset="85%"
                stopColor={isPastelTheme ? "#CBD5E1" : "#94A3B8"}
                stopOpacity="0.8"
              />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
            </linearGradient>
            <filter id={`trace-blur-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
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
            stroke={`url(#trace-glow-grad-${uniqueId})`}
            strokeWidth={isPastelTheme ? "2" : "1.75"}
            strokeDasharray="25 75"
            filter={`url(#trace-blur-${uniqueId})`}
            className="animate-border-trace"
            style={{
              animationDuration: isHovered ? "2.4s" : "4.2s",
              opacity: isHovered ? 1 : 0.6,
              transition: "opacity 0.3s ease",
            }}
          />
        </svg>
      )}

      {/* 5. Button Text & Icon Content with physical depth */}
      <span
        className={`relative z-10 flex items-center justify-center gap-2 font-semibold tracking-wide transition-colors duration-200 ${
          textColor || defaultTextColor
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
