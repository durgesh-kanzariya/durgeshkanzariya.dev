"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  char: string;
  left: number; // horizontal start %
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  colorClass: string;
}

const SYMBOLS = ["+", "//", "01", "{}", "<>", "[]", "•", "cli", "sys", "bin"];
const COLORS = [
  "text-blue-600/20 dark:text-tech-blue/35",
  "text-slate-400/35 dark:text-emerald-400/25",
  "text-indigo-600/20 dark:text-indigo-400/35",
  "text-slate-500/25 dark:text-cyan-400/25",
];

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles only on mount to prevent SSR mismatch
    const generated = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      char: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      left: Math.random() * 92 + 4, // keep away from screen edges slightly
      size: Math.floor(Math.random() * 8) + 9, // 9px to 17px
      duration: Math.random() * 18 + 14, // 14s to 32s
      delay: Math.random() * -30, // negative delay so they start at different points immediately
      colorClass: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "105vh", opacity: 0, scale: 0.8 }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.75, 0.75, 0],
            scale: [0.8, 1.1, 1.1, 0.8],
            x: [0, Math.random() * 60 - 30, Math.random() * -60 + 30, 0],
            rotate: [0, Math.random() * 180 - 90, Math.random() * 360 - 180],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
          }}
          className={`${p.colorClass} font-mono select-none`}
        >
          {p.char}
        </motion.div>
      ))}
    </div>
  );
}
