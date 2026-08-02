"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
}

const GRID_SIZE = 4;         // Reduced grid alignment (px) for tighter dot spacing
const MAX_TRAIL_LENGTH = 55; // Capacity to maintain trail length with tighter spacing

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorHeadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isHovering = false;
    let isMagnetic = false;
    let isMoving = false;
    let idleTimer: NodeJS.Timeout | null = null;
    let globalOpacity = 1.0;

    const mousePos = { x: -100, y: -100 };
    const lastPoint = { x: -100, y: -100 };
    let trailPoints: Point[] = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    const handleMouseLeaveWindow = () => {
      trailPoints = [];
      lastPoint.x = -100;
      lastPoint.y = -100;
      isMoving = false;
      if (cursorHeadRef.current) {
        cursorHeadRef.current.style.transform = "translate3d(-100px, -100px, 0px)";
      }
    };

    window.addEventListener("mouseleave", handleMouseLeaveWindow, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      isMoving = true;
      globalOpacity = 1.0;

      // Position main cursor head INSTANTLY without CSS transition lag
      if (cursorHeadRef.current) {
        if (cursorHeadRef.current.style.opacity !== "1") {
          cursorHeadRef.current.style.opacity = "1";
        }
        const scale = isMagnetic ? 2.2 : isHovering ? 1.5 : 1;
        cursorHeadRef.current.style.transform = `translate3d(${mousePos.x}px, ${mousePos.y}px, 0px) translate(-50%, -50%) scale(${scale})`;
      }

      // Track hover & magnetic target state
      const target = e.target as HTMLElement | null;
      if (target) {
        isMagnetic = !!target.closest("[data-magnetic='true'], [data-magnetic]");
        isHovering = !!target.closest("a, button, [role='button'], input, textarea, .group");

        if (cursorHeadRef.current) {
          if (isMagnetic) {
            cursorHeadRef.current.classList.add("cursor-head-magnetic");
            cursorHeadRef.current.classList.remove("cursor-head-hover");
          } else if (isHovering) {
            cursorHeadRef.current.classList.add("cursor-head-hover");
            cursorHeadRef.current.classList.remove("cursor-head-magnetic");
          } else {
            cursorHeadRef.current.classList.remove("cursor-head-hover");
            cursorHeadRef.current.classList.remove("cursor-head-magnetic");
          }
        }
      }

      // If lastPoint was offscreen or uninitialized, snap to current position without spawning diagonal trail
      if (lastPoint.x < 0 || lastPoint.y < 0) {
        lastPoint.x = mousePos.x;
        lastPoint.y = mousePos.y;
        return;
      }

      // Distance calculation from last snapped point
      const dx = mousePos.x - lastPoint.x;
      const dy = mousePos.y - lastPoint.y;
      const dist = Math.hypot(dx, dy);

      if (dist >= GRID_SIZE) {
        // Cap steps to 15 per mousemove event to prevent massive jumps when cursor re-enters window
        const steps = Math.min(Math.max(Math.floor(dist / GRID_SIZE), 1), 15);

        for (let i = 1; i <= steps; i++) {
          const interpX = lastPoint.x + (dx * i) / steps;
          const interpY = lastPoint.y + (dy * i) / steps;

          const snappedX = Math.round(interpX / GRID_SIZE) * GRID_SIZE;
          const snappedY = Math.round(interpY / GRID_SIZE) * GRID_SIZE;

          const lastTrail = trailPoints[trailPoints.length - 1];
          if (!lastTrail || lastTrail.x !== snappedX || lastTrail.y !== snappedY) {
            trailPoints.push({ x: snappedX, y: snappedY });
          }
        }

        // Maintain fixed maximum queue length while moving
        while (trailPoints.length > MAX_TRAIL_LENGTH) {
          trailPoints.shift();
        }

        lastPoint.x = mousePos.x;
        lastPoint.y = mousePos.y;
      }

      // Detect movement stop
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        isMoving = false;
      }, 35);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 60 FPS Canvas Render Loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!isMoving && trailPoints.length > 0) {
        // Fade entire trail array out together simultaneously
        globalOpacity = Math.max(0, globalOpacity - 0.07);
        if (globalOpacity <= 0) {
          trailPoints = [];
          globalOpacity = 1.0;
        }
      }

      const total = trailPoints.length;

      // Draw all dots in trailPoints with identical globalOpacity
      if (total > 0 && globalOpacity > 0) {
        ctx.fillStyle = `rgba(255, 255, 255, ${globalOpacity.toFixed(2)})`;
        for (let i = 0; i < total; i++) {
          const pt = trailPoints[i];
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2.0, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (idleTimer) clearTimeout(idleTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mouseleave", handleMouseLeaveWindow);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* High Performance 60 FPS Grid Matrix Canvas */}
      <canvas
        ref={canvasRef}
        className="hidden md:block fixed inset-0 pointer-events-none z-[99999] w-full h-full"
      />

      {/* Crisp Solid Main Cursor Head without Bloom Effect */}
      <div
        ref={cursorHeadRef}
        className="hidden md:block fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[999999] bg-white border border-purple-200/80 [&.cursor-head-hover]:bg-purple-500/50 [&.cursor-head-hover]:border-purple-300 [&.cursor-head-magnetic]:bg-purple-900/60 [&.cursor-head-magnetic]:backdrop-blur-md [&.cursor-head-magnetic]:border-purple-400 transition-opacity duration-200"
        style={{
          transform: "translate3d(-100px, -100px, 0)",
          opacity: 0,
        }}
      />
    </>
  );
}
