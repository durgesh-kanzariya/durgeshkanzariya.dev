"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Precise coordinates for the inner dot
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the outer ring lag effect
  const springConfig = { damping: 28, stiffness: 220, mass: 0.6 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  // Keep track of recent positions for the organic trailing string
  const trailPoints = useRef<{ x: number; y: number }[]>([]);
  const [pathD, setPathD] = useState("");

  useEffect(() => {
    // Detect mobile touch capability or small viewport screen size
    const checkMobile = () => {
      const isTouch = 
        window.matchMedia("(max-width: 768px)").matches || 
        ("ontouchstart" in window) || 
        (navigator.maxTouchPoints > 0);
      setIsMobile(isTouch);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Scan the DOM hierarchy to trigger custom hover scaling transitions
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = 
        target.closest("button") || 
        target.closest("a") || 
        target.closest("input") || 
        target.closest("select") || 
        target.closest("textarea") || 
        target.closest(".interactive-card") || 
        target.closest('[role="button"]') ||
        target.classList.contains("cursor-pointer");

      if (isInteractive) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = 
        target.closest("button") || 
        target.closest("a") || 
        target.closest("input") || 
        target.closest("select") || 
        target.closest("textarea") || 
        target.closest(".interactive-card") || 
        target.closest('[role="button"]') ||
        target.classList.contains("cursor-pointer");

      if (isInteractive) {
        setIsHovered(false);
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    // Dynamic Trail Animation Frame Loop
    let animationFrameId: number;
    const updateTrail = () => {
      const currentX = mouseX.get();
      const currentY = mouseY.get();

      // Initialize trail points if empty or reset
      if (trailPoints.current.length === 0) {
        for (let i = 0; i < 14; i++) {
          trailPoints.current.push({ x: currentX, y: currentY });
        }
      }

      // Head is directly attached to the mouse pointer
      trailPoints.current[0] = { x: currentX, y: currentY };

      // Each node follows the previous one with spring-like physics
      const ease = 0.32;
      for (let i = 1; i < trailPoints.current.length; i++) {
        const prev = trailPoints.current[i - 1];
        const curr = trailPoints.current[i];
        curr.x += (prev.x - curr.x) * ease;
        curr.y += (prev.y - curr.y) * ease;
      }

      // Construct SVG path D parameter
      const points = trailPoints.current;
      if (points.length > 0 && points[0].x !== -100) {
        const d = `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(" ");
        setPathD(d);
      }

      animationFrameId = requestAnimationFrame(updateTrail);
    };

    animationFrameId = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Dynamic elastic string trailing path */}
      <svg className="fixed inset-0 pointer-events-none z-[9998] w-full h-full">
        <path
          d={pathD}
          fill="none"
          stroke="rgba(59, 130, 246, 0.28)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="dark:stroke-blue-400/40"
        />
      </svg>

      {/* Outer physics-damped ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.6 : 1.0,
          borderColor: isHovered ? "#3b82f6" : "rgba(100, 116, 139, 0.4)",
          backgroundColor: isHovered ? "rgba(59, 130, 246, 0.05)" : "transparent",
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-[9999] dark:border-slate-500/45 dark:bg-white/[0.02]"
      />

      {/* Inner precise position dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0.3 : 1.0,
          backgroundColor: isHovered ? "#3b82f6" : "rgb(51, 65, 85)",
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.1 }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999] dark:bg-slate-200"
      />
    </>
  );
}
