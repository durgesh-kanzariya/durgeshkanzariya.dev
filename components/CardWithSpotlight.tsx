"use client";
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
  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty("--spotlight-x", `${x}px`);
        e.currentTarget.style.setProperty("--spotlight-y", `${y}px`);
      }}
      whileHover={{ y: -4, boxShadow: "0 12px 30px -10px rgba(59, 130, 246, 0.05)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`relative overflow-hidden group ${className}`}
      {...props}
    >
      {/* Spotlight hover bloom glow */}
      <div
        className="absolute pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-full"
        style={{
          width: `${glowSize}px`,
          height: `${glowSize}px`,
          left: "var(--spotlight-x, 0px)",
          top: "var(--spotlight-y, 0px)",
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

