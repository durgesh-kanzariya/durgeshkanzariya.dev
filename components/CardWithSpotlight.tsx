"use client";
import { useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardWithSpotlightProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  glowSize?: number;
}

export default function CardWithSpotlight({
  children,
  className = "",
  glowColor = "rgba(59, 130, 246, 0.08)",
  glowSize = 250,
  ...props
}: CardWithSpotlightProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
      className={`relative overflow-hidden group ${className}`}
      {...props}
    >
      {/* Spotlight hover bloom glow */}
      <div
        className="absolute pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-full"
        style={{
          width: `${glowSize}px`,
          height: `${glowSize}px`,
          left: mousePos.x,
          top: mousePos.y,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${glowColor} 0%, rgba(59, 130, 246, 0.01) 45%, transparent 75%)`,
          zIndex: 0,
        }}
      />
      {/* Content wrapper to ensure children sit above or relative to glow */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}
