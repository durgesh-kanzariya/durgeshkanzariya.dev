"use client";

import React, { useRef, useState, useCallback, useEffect, useId } from "react";
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
  proximityRadius?: number; // Distance in pixels to trigger trace interaction (default: 130)
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
  proximityRadius = 130,
  textColor,
  size = "md",
  ariaLabel,
}: InteractiveButtonProps) {
  const buttonRef = useRef<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const uniqueId = useId().replace(/:/g, "_");

  // Proximity Detection Engine: Traces & awakens when cursor is NEAR the button
  useEffect(() => {
    const handleGlobalPointerMove = (e: PointerEvent) => {
      const el = buttonRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      // Viewport culling: ignore buttons far offscreen
      if (rect.bottom < -80 || rect.top > window.innerHeight + 80) return;

      // Find closest point on button rectangle to cursor
      const closestX = Math.max(rect.left, Math.min(e.clientX, rect.right));
      const closestY = Math.max(rect.top, Math.min(e.clientY, rect.bottom));
      const dx = e.clientX - closestX;
      const dy = e.clientY - closestY;
      const dist = Math.hypot(dx, dy);

      if (dist < proximityRadius) {
        // Distance factor: 1 when touching/on button, 0 at outer perimeter
        const factor = Math.max(0, Math.min(1, 1 - dist / proximityRadius));
        
        // Trace awakens the moment pointer gets near: ramps from 0.35 to 1.0
        const traceVal = (0.35 + factor * 0.65).toFixed(3);
        const ambientVal = (factor * 0.6).toFixed(3);

        el.style.setProperty("--trace-opacity", traceVal);
        el.style.setProperty("--ambient-opacity", ambientVal);

        // Project cursor coordinates inside the button for spotlight reflection
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;
        el.style.setProperty("--mouse-x", `${relX}px`);
        el.style.setProperty("--mouse-y", `${relY}px`);

        // Proximity-based magnetic draw towards cursor
        if (magnetic) {
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const pull = factor * 0.15;
          const pullX = (relX - centerX) * pull;
          const pullY = (relY - centerY) * pull;
          el.style.setProperty("--mag-x", `${pullX.toFixed(1)}px`);
          el.style.setProperty("--mag-y", `${pullY.toFixed(1)}px`);
        }
      } else {
        // Outside proximity threshold: button rests quietly with trace hidden
        el.style.setProperty("--trace-opacity", "0");
        el.style.setProperty("--ambient-opacity", "0");
        el.style.setProperty("--mag-x", "0px");
        el.style.setProperty("--mag-y", "0px");
      }
    };

    window.addEventListener("pointermove", handleGlobalPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleGlobalPointerMove);
    };
  }, [magnetic, proximityRadius]);

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
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
    ? "rgba(203, 213, 225, 0.45)"
    : "rgba(100, 116, 139, 0.25)";

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
    transition-[transform,box-shadow] duration-200 ease-out active:scale-[0.97]
    focus-visible:outline-2 focus-visible:outline-[#4F8EFF] focus-visible:outline-offset-2
    ${sizeClasses}
    ${className}
  `.trim();

  // Dynamic transform driven by proximity magnetic pull
  const dynamicTransform = "translate3d(var(--mag-x, 0px), var(--mag-y, 0px), 0)";

  // Content rendering
  const content = (
    <>
      {/* 1. Subtle Ambient Glow Bloom (Awakens when cursor approaches near) */}
      {isGlowPill && (
        <span
          className="absolute -inset-1 rounded-full blur-xl pointer-events-none transition-[opacity,transform] duration-300 ease-out -z-10"
          style={{
            background: ambientColor,
            opacity: "var(--ambient-opacity, 0)",
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

        {/* 3. Cursor Following Dynamic Spotlight (Soft specular reflection) */}
        <span
          className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-250 ease-out"
          style={{
            opacity: isHovered ? 1 : "calc(var(--trace-opacity, 0) * 0.4)",
            background: isPastelTheme
              ? "radial-gradient(circle 80px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.95) 0%, rgba(241, 245, 249, 0.6) 35%, rgba(226, 232, 240, 0.1) 70%, transparent 100%)"
              : "radial-gradient(circle 85px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(226, 232, 240, 0.35) 0%, rgba(148, 163, 184, 0.12) 45%, transparent 80%)",
          }}
        />

        {/* Dynamic Light Specular Beam */}
        {isHovered && isPastelTheme && (
          <span
            className="absolute pointer-events-none w-20 h-20 rounded-full blur-md mix-blend-overlay transition-opacity duration-150"
            style={{
              left: "calc(var(--mouse-x, 50%) - 40px)",
              top: "calc(var(--mouse-y, 50%) - 40px)",
              background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 40%, transparent 80%)",
            }}
          />
        )}
      </span>

      {/* 4. Trace Tracing Effect: Awakens & Orbits when cursor is NEAR the button */}
      {hasTrace && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible rounded-full transition-opacity duration-250 ease-out"
          style={{
            padding: "0.5px",
            opacity: "var(--trace-opacity, 0)",
          }}
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
              animationDuration: isHovered ? "2.2s" : "3.8s",
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

  // Render as Next Link
  if (href && (href.startsWith("/") || href.startsWith("#"))) {
    return (
      <Link
        href={href}
        ref={buttonRef as unknown as React.Ref<HTMLAnchorElement>}
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
