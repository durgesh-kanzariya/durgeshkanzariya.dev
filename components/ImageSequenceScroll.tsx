"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowDown } from "lucide-react";

const TOTAL_FRAMES = 180;

const getFramePath = (index: number) => {
  const frameNum = String(index + 1).padStart(4, "0");
  return `/sequence/frame_${frameNum}.webp`;
};

// Dynamic Evolving Story Headlines
const STORY_HEADLINES = [
  "Creative Developer & Systems Engineer",
  "Full Stack & Predictive ML Architect",
  "Data Science & High-Performance UI",
  "Building Experiences That People Remember.",
];

// Dynamic Right Side Big Text & Telemetry Badges (Morphs on Scroll)
const RIGHT_SIDE_STAGES = [
  {
    num: "01",
    tag: "CINEMA ENGINE",
    bigText: "CANVAS 60 FPS",
    detail: "180 WebP Sequence scrubbing smoothly with GSAP ScrollTrigger",
  },
  {
    num: "02",
    tag: "DATA SCIENCE",
    bigText: "XGBOOST ML",
    detail: "11.42 Validation RMSE • 0.865 R² Score NASA Telemetry",
  },
  {
    num: "03",
    tag: "WEB ARCHITECTURE",
    bigText: "3NF SQL SCHEMAS",
    detail: "<45ms index lookups with Node & PostgreSQL API routes",
  },
  {
    num: "04",
    tag: "MOTION DESIGN",
    bigText: "LENIS PHYSICS",
    detail: "Dark Cyber-Luxury aesthetics with custom GPU Shaders",
  },
];

export default function ImageSequenceScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  // High-performance RAF lerp animation refs
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const scrollProgressRef = useRef<number>(0);
  const stageIndexRef = useRef<number>(0);

  // Mouse tilt refs (Zero React re-render)
  const currentTiltRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetTiltRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // DOM Refs for dynamic overlays (Direct DOM updates)
  const overlayContainerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLParagraphElement>(null);
  const stageNumRef = useRef<HTMLSpanElement>(null);
  const stageHeadingRef = useRef<HTMLHeadingElement>(null);
  const stageDetailRef = useRef<HTMLParagraphElement>(null);
  const stageProgressBarRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorBarRef = useRef<HTMLDivElement>(null);
  const bgAuraRef = useRef<HTMLDivElement>(null);

  // Loading state only for Preloader component
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [preloaderComplete, setPreloaderComplete] = useState<boolean>(false);

  // Refresh ScrollTrigger layout once frames are ready
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  // Preload and decode frames into memory
  useEffect(() => {
    let isCancelled = false;
    const loadedImages: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let count = 0;
    const startTime = Date.now();

    const onFrameReady = () => {
      if (isCancelled) return;
      count++;
      setLoadedCount(count);

      if (count === TOTAL_FRAMES) {
        const elapsedTime = Date.now() - startTime;
        const minDisplay = 600;
        const remaining = Math.max(0, minDisplay - elapsedTime);

        setTimeout(() => {
          if (!isCancelled) {
            updateCanvasBounds();
            drawFrame(0);
            setIsLoaded(true);
          }
        }, remaining);
      }
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);

      if (img.decode) {
        img.decode()
          .then(() => onFrameReady())
          .catch(() => onFrameReady());
      } else {
        img.onload = onFrameReady;
        img.onerror = onFrameReady;
      }
      loadedImages[i] = img;
    }

    imagesRef.current = loadedImages;

    return () => {
      isCancelled = true;
    };
  }, []);

  // Mouse move handler (Direct ref updates, zero React state changes)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 3.5;
      const y = (e.clientY / innerHeight - 0.5) * 3.5;
      targetTiltRef.current = { x: -y, y: x };
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      if (bgAuraRef.current) {
        const offsetX = (e.clientX - innerWidth / 2) * 0.05;
        const offsetY = (e.clientY - innerHeight / 2) * 0.05;
        bgAuraRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Canvas drawing logic with cached viewport bounds
  const canvasSizeRef = useRef({ width: 0, height: 0, dpr: 1 });

  const updateCanvasBounds = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvasSizeRef.current = { width, height, dpr };
    canvas.width = width * dpr;
    canvas.height = height * dpr;
  };

  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const { width, height, dpr } = canvasSizeRef.current;
    if (width === 0 || height === 0) return;

    ctx.save();
    ctx.scale(dpr, dpr);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (canvasRatio < imgRatio) {
      drawHeight = height;
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetX = 0;
      offsetY = (height - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    // Soft Edge Radial Vignette Gradient Overlay
    const centerX = width / 2;
    const centerY = height / 2;
    const innerRadius = Math.min(width, height) * 0.32;
    const outerRadius = Math.max(width, height) * 0.6;

    const vignette = ctx.createRadialGradient(
      centerX,
      centerY,
      innerRadius,
      centerX,
      centerY,
      outerRadius
    );
    vignette.addColorStop(0, "rgba(7, 7, 10, 0)");
    vignette.addColorStop(0.7, "rgba(7, 7, 10, 0.45)");
    vignette.addColorStop(1, "rgba(7, 7, 10, 0.98)");

    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);

    ctx.restore();
  };

  // Main 60 FPS RAF Loop for Smooth Scrubbing & Tilt Physics
  useEffect(() => {
    if (!isLoaded) return;

    updateCanvasBounds();
    let animId: number;
    let lastRenderedFrame = -1;

    const renderLoop = () => {
      // Lerp frame scrubbing for smooth cinematic velocity
      const targetFrame = targetFrameRef.current;
      currentFrameRef.current += (targetFrame - currentFrameRef.current) * 0.14;

      // Lerp mouse tilt physics
      currentTiltRef.current.x += (targetTiltRef.current.x - currentTiltRef.current.x) * 0.08;
      currentTiltRef.current.y += (targetTiltRef.current.y - currentTiltRef.current.y) * 0.08;

      const frameToDraw = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );

      if (frameToDraw !== lastRenderedFrame) {
        drawFrame(frameToDraw);
        lastRenderedFrame = frameToDraw;
      }

      // Smoothly transform canvas wrapper
      if (canvasWrapperRef.current) {
        const zoomScale = 1.0 + scrollProgressRef.current * 0.15;
        const tiltX = currentTiltRef.current.x.toFixed(2);
        const tiltY = currentTiltRef.current.y.toFixed(2);
        canvasWrapperRef.current.style.transform = `scale(${zoomScale}) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      }

      animId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    const handleResize = () => {
      updateCanvasBounds();
      lastRenderedFrame = -1;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoaded]);

  // GSAP ScrollTrigger setup (Zero React re-renders during scroll)
  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const updateOverlays = (progress: number, stageIdx: number) => {
      // Headline update
      if (headlineRef.current && STORY_HEADLINES[stageIdx]) {
        if (headlineRef.current.innerText !== STORY_HEADLINES[stageIdx]) {
          headlineRef.current.innerText = STORY_HEADLINES[stageIdx];
        }
      }

      // Stage detail card update
      const stage = RIGHT_SIDE_STAGES[stageIdx];
      if (stage) {
        if (stageNumRef.current && stageNumRef.current.innerText !== `STAGE ${stage.num} / 04`) {
          stageNumRef.current.innerText = `STAGE ${stage.num} / 04`;
        }
        if (stageHeadingRef.current && stageHeadingRef.current.innerText !== stage.bigText) {
          stageHeadingRef.current.innerText = stage.bigText;
        }
        if (stageDetailRef.current && stageDetailRef.current.innerText !== stage.detail) {
          stageDetailRef.current.innerText = stage.detail;
        }
      }

      // Progress bars
      if (stageProgressBarRef.current) {
        stageProgressBarRef.current.style.width = `${progress * 100}%`;
      }
      if (scrollIndicatorBarRef.current) {
        scrollIndicatorBarRef.current.style.top = `${progress * 70}%`;
      }

      // Keep overlays and canvas image fully visible at end of hero section
      if (overlayContainerRef.current) {
        overlayContainerRef.current.style.opacity = "1";
      }
      if (canvasWrapperRef.current) {
        canvasWrapperRef.current.style.opacity = "1";
      }
    };

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=2400",
      pin: true,
      pinSpacing: true,
      refreshPriority: 2,
      scrub: 0.3,
      onUpdate: (self) => {
        const progress = self.progress;
        scrollProgressRef.current = progress;
        targetFrameRef.current = progress * (TOTAL_FRAMES - 1);

        let stageIdx = 0;
        if (progress < 0.25) stageIdx = 0;
        else if (progress < 0.55) stageIdx = 1;
        else if (progress < 0.8) stageIdx = 2;
        else stageIdx = 3;

        stageIndexRef.current = stageIdx;
        updateOverlays(progress, stageIdx);
      },
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      trigger.kill();
    };
  }, [isLoaded]);

  const loadPercentage = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <div ref={sectionRef} id="hero" className="relative w-full text-white bg-[#07070A] overflow-hidden select-none">
      {/* Softened Left Purple Background Aura using blurred radial gradient */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          ref={bgAuraRef}
          className="absolute -left-32 top-1/4 w-[700px] h-[700px] bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-purple-900/40 via-transparent to-transparent blur-3xl opacity-80 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:36px_36px] opacity-[0.03]" />
      </div>

      {/* Cyber-Luxury Staggered Multi-Column Curtain Preloader (Locomotive / Cuberto Exit Reveal) */}
      <AnimatePresence onExitComplete={() => setPreloaderComplete(true)}>
        {!isLoaded && !preloaderComplete && (
          <motion.div
            key="preloader"
            className="fixed inset-0 z-[99999] flex items-center justify-center select-none overflow-hidden pointer-events-auto"
          >
            {/* 5 Vertical Staggered Curtain Columns */}
            <div className="absolute inset-0 flex z-0 pointer-events-none">
              {[0, 1, 2, 3, 4].map((colIndex) => (
                <motion.div
                  key={colIndex}
                  initial={{ y: "0%" }}
                  exit={{
                    y: "-100%",
                    transition: {
                      duration: 0.75,
                      delay: colIndex * 0.08 + 0.15,
                      ease: [0.76, 0, 0.24, 1],
                    },
                  }}
                  className="w-1/5 h-full bg-[#07070A] border-r border-purple-900/30 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative"
                >
                  {/* Bottom Glowing Accent Strip */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-purple-400 to-indigo-500 shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
                </motion.div>
              ))}
            </div>

            {/* Central Ultra-Minimal Progress Telemetry */}
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 0.95,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              className="relative z-10 flex flex-col items-center justify-center gap-4 text-center select-none"
            >
              <span className="font-mono text-[11px] text-purple-400 font-bold tracking-[0.25em] uppercase">
                durgeshkanzariya.dev // loading
              </span>

              <div className="font-syne text-6xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-purple-100 to-purple-400 tracking-tighter drop-shadow-[0_0_35px_rgba(168,85,247,0.4)]">
                {loadPercentage}%
              </div>

              <div className="w-44 h-0.5 bg-purple-950/80 rounded-full overflow-hidden border border-purple-800/40 relative mt-2">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 via-indigo-300 to-purple-400 transition-all duration-200 ease-out shadow-[0_0_12px_rgba(168,85,247,0.9)]"
                  style={{ width: `${loadPercentage}%` }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Pinned Hero Canvas Area */}
      <div 
        ref={containerRef} 
        className="relative w-full h-screen flex flex-col justify-between pt-28 sm:pt-36 p-6 md:p-10 z-10 overflow-hidden"
      >
        {/* Fullscreen Display Layer: Giant Hollow "DURGESH" + Canvas with Bottom Masking */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none overflow-hidden">
          {/* Massive, bold outline text reading "DURGESH" centered BEHIND the canvas (z-10) */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-10">
            <h1 className="font-syne text-[26vw] leading-none font-black tracking-tighter uppercase text-transparent [-webkit-text-stroke:1.5px_rgba(168,85,247,0.35)] drop-shadow-[0_0_35px_rgba(168,85,247,0.35)] select-none transform scale-y-110">
              DURGESH
            </h1>
          </div>

          {/* Fullscreen Canvas Frame with Bottom Linear Gradient Masking (z-20) */}
          <div 
            ref={canvasWrapperRef}
            className="absolute inset-0 w-full h-full z-20 flex items-center justify-center will-change-transform"
            style={{
              transformStyle: "preserve-3d",
              maskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
            }}
          >
            <canvas 
              ref={canvasRef}
              className="w-full h-full object-cover filter drop-shadow-[0_25px_60px_rgba(147,51,234,0.45)]"
            />
          </div>
        </div>

        {/* OVERLAY WRAPPER FOR DIRECT REF ANIMATIONS */}
        <div ref={overlayContainerRef} className="contents transition-opacity duration-300">
          {/* TOP-LEFT Refined Name & Evolving Headline */}
          <div className="absolute top-20 sm:top-24 left-6 md:left-12 z-30 max-w-lg lg:max-w-xl pointer-events-auto space-y-3">
            {/* Stacked Name Typography */}
            <div className="space-y-1">
              <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-[0.16em] text-white uppercase leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
                DURGESH
              </h2>
              <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-purple-400 uppercase leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
                KANZARIYA
              </h2>
            </div>

            {/* Evolving Foreground Headline */}
            <p ref={headlineRef} className="font-syne text-base sm:text-lg lg:text-xl font-extrabold text-purple-200/95 drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)] transition-all duration-300 pt-1">
              {STORY_HEADLINES[0]}
            </p>

            {/* Editorial Metric Tags filling the vertical left space */}
            <div className="flex items-center gap-3 pt-2 font-mono text-xs text-purple-300/80">
              <span className="px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 font-semibold">
                REACT &amp; NEXT.JS 16
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 font-semibold">
                PYTHON &amp; XGBOOST
              </span>
            </div>
          </div>

          {/* MIDDLE-RIGHT Big Animated Text & Telemetry Card */}
          <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 right-6 md:right-12 z-30 flex-col gap-3 pointer-events-auto max-w-sm text-right">
            <div className="p-6 rounded-3xl bg-black/65 backdrop-blur-2xl border border-purple-500/35 shadow-[0_20px_50px_rgba(0,0,0,0.9)] space-y-3">
              {/* Stage Indicator Pill */}
              <div className="flex items-center justify-end gap-2 text-xs font-mono font-bold text-purple-300">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                <span ref={stageNumRef}>STAGE 01 / 04</span>
              </div>

              {/* Big Animated Stage Heading */}
              <h3 ref={stageHeadingRef} className="font-syne text-2xl xl:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-violet-300 tracking-tight uppercase transition-all duration-300">
                {RIGHT_SIDE_STAGES[0].bigText}
              </h3>

              {/* Stage Detail Description */}
              <p ref={stageDetailRef} className="font-sans text-xs text-purple-200/80 leading-relaxed transition-all duration-300">
                {RIGHT_SIDE_STAGES[0].detail}
              </p>

              {/* Animated Progress Bar */}
              <div className="w-full h-1.5 bg-purple-950 rounded-full overflow-hidden relative mt-2">
                <div 
                  ref={stageProgressBarRef}
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 transition-all duration-150"
                  style={{ width: "0%" }}
                />
              </div>
            </div>
          </div>

          {/* BOTTOM-LEFT Glass Info Card */}
          <div className="absolute bottom-8 left-6 md:left-12 z-30 max-w-sm p-5 sm:p-6 rounded-2xl backdrop-blur-md bg-white/[0.03] border border-purple-500/20 shadow-2xl space-y-3.5 pointer-events-auto">
            <div className="space-y-1">
              <h3 className="font-syne text-sm sm:text-base font-extrabold text-white tracking-widest uppercase block overflow-visible leading-tight">
                CREATIVE DEVELOPER
              </h3>
              <span className="font-mono text-[11px] text-purple-400 uppercase font-bold block tracking-wider">
                SPECIALIZED IN
              </span>
            </div>

            <div className="space-y-2 font-mono text-xs text-purple-100 border-t border-purple-900/40 pt-3">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                <span className="font-semibold text-purple-200">React &amp; Next.js 16</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                <span className="font-semibold text-purple-200">Python &amp; XGBoost Engine</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                <span className="font-semibold text-purple-200">GSAP &amp; Canvas Motion</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                <span className="font-semibold text-purple-200">PostgreSQL</span>
              </div>
            </div>
          </div>

          {/* BOTTOM-RIGHT Vertical Line Scroll Indicator */}
          <div className="absolute bottom-8 right-6 md:right-12 z-30 flex flex-col items-center gap-2 font-mono text-xs text-purple-300/80 tracking-widest pointer-events-auto">
            <span className="font-bold">SCROLL</span>
            <div className="w-[2px] h-16 bg-purple-950/80 rounded-full relative overflow-hidden">
              <div 
                ref={scrollIndicatorBarRef}
                className="absolute w-full bg-gradient-to-b from-purple-400 to-indigo-300 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.9)] animate-pulse"
                style={{
                  top: "0%",
                  height: "30%",
                }}
              />
            </div>
            <ArrowDown className="w-4 h-4 text-purple-400 animate-bounce duration-1000" />
          </div>
        </div>
      </div>
    </div>
  );
}
