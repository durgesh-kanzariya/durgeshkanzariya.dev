"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const frontPathRef = useRef<SVGPathElement>(null);
  const backPathRef = useRef<SVGPathElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const skipRef = useRef<() => void>(() => {});
  const skipButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // If preloader was already seen in this session or reduced motion is preferred, bypass immediately
    let hasSeen = false;
    try {
      hasSeen = sessionStorage.getItem("portfolio_preloader_seen") === "1";
    } catch {
      // Storage may be unavailable in private browsing or restricted contexts.
    }
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const focusMainContent = () => {
      requestAnimationFrame(() => {
        document.querySelector<HTMLElement>("main")?.focus();
      });
    };

    const markSeen = () => {
      try {
        sessionStorage.setItem("portfolio_preloader_seen", "1");
      } catch {
        // The intro still completes when browser storage is unavailable.
      }
    };

    const completeImmediately = () => {
      setIsDone(true);
      if (typeof window !== "undefined") {
        window.__preloaderLifting = true;
        window.__preloaderDone = true;
        window.dispatchEvent(new CustomEvent("preloader-lifting"));
        window.dispatchEvent(new CustomEvent("preloader-complete"));
      }
      if (onComplete) onComplete();
      focusMainContent();
    };

    if (hasSeen || prefersReducedMotion) {
      completeImmediately();
      return;
    }

    // Lock body scrolling while preloader is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let phase = 0;
    const startTime = performance.now();
    const duration = 900; // Short intro that leaves the portfolio available quickly

    const updateWaves = (prog: number, currentPhase: number) => {
      // Extend coordinates well beyond text boundaries (-200 to 1300) so 'D' and 'h' never get clipped
      const startX = -200;
      const endX = 1300;
      const totalWidth = endX - startX;
      const height = 360;

      // Base Y position calibrated to text bounding box:
      // At 0%: 215 (just below the 'g' descender)
      // At 100%: 38 (cleanly above all uppercase ascenders)
      const baseY = 215 - (prog / 100) * 177;

      // Amplitude damps down slightly at the very top for a clean final fill
      const amplitude = prog >= 97 ? Math.max(0, 10 * ((100 - prog) / 3)) : Math.max(4, 12 * (1 - prog / 140));

      const segments = 60;
      const dx = totalWidth / segments;

      // Front Wave Path
      let dFront = `M ${startX} ${height} L ${startX} ${baseY.toFixed(1)}`;
      // Back Wave Path (translucent liquid crest)
      let dBack = `M ${startX} ${height} L ${startX} ${(baseY - 4).toFixed(1)}`;

      for (let i = 0; i <= segments; i++) {
        const x = startX + i * dx;
        const normX = (x - startX) / totalWidth;

        // Front wave calculation (dual sine harmonics for rolling ocean wave)
        const frontWave1 = Math.sin(normX * Math.PI * 3.8 + currentPhase) * amplitude;
        const frontWave2 = Math.cos(normX * Math.PI * 2.0 + currentPhase * 0.8) * (amplitude * 0.35);
        const yFront = baseY + frontWave1 + frontWave2;

        // Back wave calculation (shifted phase and frequency for 3D liquid depth)
        const backWave1 = Math.sin(normX * Math.PI * 3.8 + currentPhase + 2.1) * (amplitude * 1.15);
        const backWave2 = Math.cos(normX * Math.PI * 2.4 + currentPhase * 0.9) * (amplitude * 0.4);
        const yBack = baseY - 6 + backWave1 + backWave2;

        dFront += ` L ${x.toFixed(1)} ${yFront.toFixed(1)}`;
        dBack += ` L ${x.toFixed(1)} ${yBack.toFixed(1)}`;
      }

      dFront += ` L ${endX} ${height} Z`;
      dBack += ` L ${endX} ${height} Z`;

      if (frontPathRef.current) frontPathRef.current.setAttribute("d", dFront);
      if (backPathRef.current) backPathRef.current.setAttribute("d", dBack);
    };

    const handleSkip = () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      markSeen();
      if (containerRef.current) {
        if (typeof window !== "undefined") {
          window.__preloaderLifting = true;
          window.dispatchEvent(new CustomEvent("preloader-lifting"));
        }
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 0.5,
          ease: "power3.inOut",
          onComplete: () => {
            document.body.style.overflow = originalOverflow;
            setIsDone(true);
            if (typeof window !== "undefined") {
              window.__preloaderDone = true;
              window.dispatchEvent(new CustomEvent("preloader-complete"));
            }
            if (onComplete) onComplete();
            focusMainContent();
          },
        });
      } else {
        document.body.style.overflow = originalOverflow;
        completeImmediately();
      }
    };
    skipRef.current = handleSkip;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleSkip();
        return;
      }

      if (e.key === "Tab") {
        const focusable = containerRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable?.length) {
          e.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!containerRef.current?.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    const focusFrame = requestAnimationFrame(() => skipButtonRef.current?.focus());

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);

      // Smooth custom ease: starts deliberate, builds momentum, settles into 100%
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2.2) / 2;
      const currentProgress = Math.min(Math.round(eased * 100), 100);
      setProgress(currentProgress);

      phase += 0.075;
      updateWaves(currentProgress, phase);

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        // Hold briefly at 100%, then reveal the portfolio.
        markSeen();
        setTimeout(() => {
          if (!containerRef.current) return;
          if (typeof window !== "undefined") {
            window.__preloaderLifting = true;
            window.dispatchEvent(new CustomEvent("preloader-lifting"));
          }
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 0.45,
            ease: "power4.inOut",
            onComplete: () => {
              document.body.style.overflow = originalOverflow;
              setIsDone(true);
              if (typeof window !== "undefined") {
                window.__preloaderDone = true;
                window.dispatchEvent(new CustomEvent("preloader-complete"));
              }
              if (onComplete) onComplete();
              focusMainContent();
            },
          });
        }, 80);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(focusFrame);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  const [charCoords, setCharCoords] = useState<{ x: number }[] | null>(null);
  const measureTextRef = useRef<SVGTextElement>(null);
  const charGroupsRef = useRef<(SVGGElement | null)[]>([]);
  const charCentersRef = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    // Measure natural SVG character coordinates once font is loaded
    const measure = () => {
      if (measureTextRef.current) {
        try {
          const coords: { x: number }[] = [];
          for (let i = 0; i < 7; i++) {
            const pt = measureTextRef.current.getStartPositionOfChar(i);
            coords.push({ x: pt.x });
          }
          if (coords.length === 7 && coords.every((c) => !isNaN(c.x))) {
            setCharCoords(coords);
          }
        } catch {
          // Fallback gracefully to standard text layout
        }
      }
    };

    const timer = setTimeout(measure, 60);
    return () => clearTimeout(timer);
  }, []);

  const handleWordmarkMouseEnter = () => {
    charCentersRef.current = charGroupsRef.current.map((el) => {
      if (!el) return { x: 0, y: 0 };
      const rect = el.getBoundingClientRect();
      const currentX = (gsap.getProperty(el, "x") as number) || 0;
      const currentY = (gsap.getProperty(el, "y") as number) || 0;
      return {
        x: rect.left + rect.width / 2 - currentX,
        y: rect.top + rect.height / 2 - currentY,
      };
    });
  };

  const handleWordmarkMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!charCentersRef.current.length) handleWordmarkMouseEnter();
    const radius = 95;
    const maxRepel = 100;

    charGroupsRef.current.forEach((el, index) => {
      if (!el) return;
      const pos = charCentersRef.current[index];
      if (!pos) return;

      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;
      const dist = Math.hypot(dx, dy);

      if (dist < radius && dist > 0) {
        const nx = -dx / dist;
        const ny = -dy / dist;
        const power = Math.pow(1 - dist / radius, 1.4);
        const force = power * maxRepel;

        gsap.to(el, {
          x: nx * force,
          y: ny * force,
          rotate: (dx / radius) * -14,
          scale: 1.05,
          duration: 0.22,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else {
        gsap.to(el, {
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 0.75,
          ease: "elastic.out(1.1, 0.35)",
          overwrite: "auto",
        });
      }
    });
  };

  const handleWordmarkMouseLeave = () => {
    charGroupsRef.current.forEach((el) => {
      if (!el) return;
      gsap.to(el, {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        duration: 0.85,
        ease: "elastic.out(1.2, 0.35)",
        overwrite: "auto",
      });
    });
    charCentersRef.current = [];
  };

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio introduction"
      className="fixed inset-0 z-[999990] bg-[#0E0F12] flex flex-col items-center justify-center select-none overflow-hidden"
      style={{ touchAction: "none" }}
    >
      {/* Skip Button for instant access */}
      <button
        ref={skipButtonRef}
        type="button"
        onClick={() => skipRef.current()}
        className="absolute top-6 right-6 z-20 px-3.5 py-1.5 rounded-full text-xs font-mono text-[#94A3B8] hover:text-[#F0F0F8] bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition-colors pointer-events-auto flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-white"
        aria-label="Skip introduction animation"
      >
        <span>Skip</span>
        <span className="text-[10px] text-[#64748B] font-mono tracking-wider">[Esc]</span>
      </button>

      {/* Centered Liquid Wordmark & Indicator */}
      <div className="relative w-[92vw] max-w-5xl px-4 flex flex-col items-center">
        
        {/* Ambient subtle particle floating like in reference */}
        <div 
          className="absolute -top-12 left-10 w-2 h-2 rounded-full bg-white/40 blur-[1px] animate-pulse pointer-events-none"
          aria-hidden="true" 
        />

        {/* SVG Container holding wave clip-paths and 3 text layers */}
        <svg
          viewBox="0 0 1000 240"
          onMouseEnter={handleWordmarkMouseEnter}
          onMouseMove={handleWordmarkMouseMove}
          onMouseLeave={handleWordmarkMouseLeave}
          className="w-full h-auto overflow-visible cursor-default select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <clipPath id="waveClipFront">
              <path ref={frontPathRef} d="M -200 360 L -200 360 L 1300 360 Z" />
            </clipPath>
            <clipPath id="waveClipBack">
              <path ref={backPathRef} d="M -200 360 L -200 360 L 1300 360 Z" />
            </clipPath>
          </defs>

          {/* Hidden reference text to calculate exact character coordinates */}
          <text
            ref={measureTextRef}
            x="50%"
            y="55%"
            textAnchor="middle"
            dominantBaseline="central"
            style={{
              fontFamily: "var(--font-syne), 'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(85px, 15vw, 160px)",
              letterSpacing: "-0.04em",
              opacity: 0,
              pointerEvents: "none",
            }}
          >
            Durgesh
          </text>

          {/* Render individual magnetic characters once measured */}
          {charCoords ? (
            "Durgesh".split("").map((char, i) => (
              <g
                key={i}
                ref={(el) => {
                  charGroupsRef.current[i] = el;
                }}
                className="will-change-transform"
                style={{ transformBox: "fill-box", transformOrigin: "center center" }}
              >
                {/* Layer 1: Background Unfilled Text */}
                <text
                  x={charCoords[i].x}
                  y="55%"
                  dominantBaseline="central"
                  style={{
                    fontFamily: "var(--font-syne), 'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(85px, 15vw, 160px)",
                    letterSpacing: "-0.04em",
                    fill: "#282B37",
                  }}
                >
                  {char}
                </text>

                {/* Layer 2: Back Wave */}
                <text
                  x={charCoords[i].x}
                  y="55%"
                  dominantBaseline="central"
                  clipPath="url(#waveClipBack)"
                  style={{
                    fontFamily: "var(--font-syne), 'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(85px, 15vw, 160px)",
                    letterSpacing: "-0.04em",
                    fill: "rgba(255, 255, 255, 0.28)",
                  }}
                >
                  {char}
                </text>

                {/* Layer 3: Front Wave */}
                <text
                  x={charCoords[i].x}
                  y="55%"
                  dominantBaseline="central"
                  clipPath="url(#waveClipFront)"
                  style={{
                    fontFamily: "var(--font-syne), 'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(85px, 15vw, 160px)",
                    letterSpacing: "-0.04em",
                    fill: "#FFFFFF",
                  }}
                >
                  {char}
                </text>
              </g>
            ))
          ) : (
            <>
              {/* Fallback while font is loading */}
              <text
                x="50%"
                y="55%"
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                  fontFamily: "var(--font-syne), 'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(85px, 15vw, 160px)",
                  letterSpacing: "-0.04em",
                  fill: "#282B37",
                }}
              >
                Durgesh
              </text>
              <text
                x="50%"
                y="55%"
                textAnchor="middle"
                dominantBaseline="central"
                clipPath="url(#waveClipBack)"
                style={{
                  fontFamily: "var(--font-syne), 'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(85px, 15vw, 160px)",
                  letterSpacing: "-0.04em",
                  fill: "rgba(255, 255, 255, 0.28)",
                }}
              >
                Durgesh
              </text>
              <text
                x="50%"
                y="55%"
                textAnchor="middle"
                dominantBaseline="central"
                clipPath="url(#waveClipFront)"
                style={{
                  fontFamily: "var(--font-syne), 'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(85px, 15vw, 160px)",
                  letterSpacing: "-0.04em",
                  fill: "#FFFFFF",
                }}
              >
                Durgesh
              </text>
            </>
          )}
        </svg>

        {/* Bottom Right Percentage Counter (Matching NeoLeaf style: "loading... XX %") */}
        <div className="w-full flex justify-end pr-3 md:pr-10 mt-1">
          <span
            role="progressbar"
            aria-label="Portfolio introduction"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            className="font-mono text-xs md:text-sm text-[#A0AEC0] tracking-wide select-none"
          >
            intro... {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
