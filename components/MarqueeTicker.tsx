"use client";

import { motion } from "framer-motion";

const TICKER_ITEMS = [
  "FULL STACK ARCHITECTURE",
  "PREDICTIVE MACHINE LEARNING",
  "DISTRIBUTED SYSTEMS",
  "REACT & PYTHON",
  "XGBoost ENGINE",
  "POSTGRESQL & SQL SCHEMA",
  "HIGH PERFORMANCE UI",
];

export default function MarqueeTicker() {
  return (
    <section className="relative w-full py-5 bg-[#07070A] border-y border-purple-900/30 overflow-hidden z-20 select-none">
      {/* Subtle purple backdrop ambient blur */}
      <div className="absolute inset-0 bg-purple-950/20 backdrop-blur-sm" />
      
      <div className="relative flex whitespace-nowrap overflow-hidden">
        <motion.div
          className="flex items-center gap-8 whitespace-nowrap font-syne font-extrabold text-sm sm:text-base tracking-widest text-purple-200 uppercase"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25,
          }}
        >
          {/* Double items array for seamless infinite marquee scroll */}
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, index) => (
            <div key={index} className="flex items-center gap-8">
              <span className="hover:text-purple-400 transition-colors drop-shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                {item}
              </span>
              <span className="w-2 h-2 rounded-full bg-purple-500/60 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
