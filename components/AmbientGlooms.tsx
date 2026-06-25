"use client";
import { motion } from "framer-motion";

// Concentric ripple ring sub-component for water ripple effects
const RippleRing = ({ delay = 0, borderClass = "border-blue-500/20 dark:border-blue-500/30" }) => (
  <motion.div
    className={`absolute inset-0 rounded-full border-2 ${borderClass} pointer-events-none`}
    initial={{ scale: 0.6, opacity: 0.7 }}
    animate={{ scale: 2.2, opacity: 0 }}
    transition={{
      duration: 6,
      repeat: Infinity,
      delay,
      ease: "easeOut",
    }}
  />
);

export default function AmbientGlooms() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* Gloom 1: Top Left - Blue / Cyan (Drifting & Pulsing) */}
      <motion.div
        animate={{
          x: [0, 25, -20, 0],
          y: [0, -30, 25, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[3%] left-[5%] w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] rounded-full bg-tech-blue/10 dark:bg-tech-blue/16 blur-[90px] sm:blur-[130px] opacity-90"
      />

      {/* Gloom 2: Upper Mid Right - Indigo / Violet (With Expanding Ripple Rings) */}
      <div className="absolute top-[20%] -right-[5%] w-[280px] h-[280px] sm:w-[480px] sm:h-[480px] flex items-center justify-center">
        {/* Soft glowing core */}
        <motion.div
          animate={{
            scale: [1, 1.15, 0.9, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 blur-[80px] sm:blur-[120px]"
        />
        {/* Sonar water ripples */}
        <RippleRing delay={0} borderClass="border-indigo-500/22 dark:border-indigo-500/32" />
        <RippleRing delay={2} borderClass="border-cyan-500/18 dark:border-cyan-500/28" />
        <RippleRing delay={4} borderClass="border-purple-500/18 dark:border-purple-500/28" />
      </div>

      {/* Gloom 3: Mid Left - Color Changing (Blue ↔ Emerald ↔ Purple ↔ Amber) */}
      <motion.div
        animate={{
          x: [0, -30, 30, 0],
          y: [0, 25, -25, 0],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[42%] -left-[10%] w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] rounded-full blur-[100px] sm:blur-[140px]"
      >
        <motion.div
          animate={{
            backgroundColor: [
              "rgba(59, 130, 246, 0.08)",  // tech-blue
              "rgba(16, 185, 129, 0.08)",  // emerald
              "rgba(139, 92, 246, 0.08)",  // violet
              "rgba(245, 158, 11, 0.07)",  // amber
              "rgba(59, 130, 246, 0.08)",  // tech-blue
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-full h-full rounded-full dark:opacity-150 opacity-100"
        />
      </motion.div>

      {/* Gloom 4: Lower Mid Right - Emerald / Teal (Drifting & Pulsing) */}
      <motion.div
        animate={{
          x: [0, 35, -25, 0],
          y: [0, -20, 35, 0],
          scale: [1, 1.08, 0.93, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[64%] -right-[8%] w-[290px] h-[290px] sm:w-[440px] sm:h-[440px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 blur-[90px] sm:blur-[130px] opacity-90"
      />

      {/* Gloom 5: Bottom Left - Rose / Amber (With Expanding Ripple Rings) */}
      <div className="absolute bottom-[10%] -left-[5%] w-[260px] h-[260px] sm:w-[420px] sm:h-[420px] flex items-center justify-center">
        {/* Soft glowing core */}
        <motion.div
          animate={{
            scale: [1, 1.12, 0.95, 1],
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full bg-rose-500/8 dark:bg-rose-500/12 blur-[80px] sm:blur-[120px]"
        />
        {/* Sonar water ripples */}
        <RippleRing delay={0} borderClass="border-rose-500/18 dark:border-rose-500/28" />
        <RippleRing delay={3} borderClass="border-amber-500/18 dark:border-amber-500/28" />
      </div>

    </div>
  );
}
