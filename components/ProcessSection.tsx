"use client";

import { motion } from "framer-motion";
import { Compass, Code, Rocket } from "lucide-react";
import AnimatedHeading from "@/components/AnimatedHeading";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "ARCHITECT & DISCOVER",
    icon: Compass,
    description: "Analyzing data requirements, mapping database schemas, and defining system performance goals.",
    glowColor: "rgba(168, 85, 247, 0.15)",
  },
  {
    step: "02",
    title: "BUILD & OPTIMIZE",
    icon: Code,
    description: "Writing clean, modular full-stack code and optimizing ML algorithms for accuracy and scale.",
    glowColor: "rgba(129, 140, 248, 0.15)",
  },
  {
    step: "03",
    title: "INTEGRATE & DEPLOY",
    icon: Rocket,
    description: "Crafting fluid UI animations, testing edge cases, and delivering production-ready applications.",
    glowColor: "rgba(192, 132, 252, 0.15)",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="relative w-full pt-20 sm:pt-24 pb-16 sm:pb-24 px-4 sm:px-6 md:px-12 bg-[#07070A] text-white scroll-mt-14">
      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12">
        {/* Animated Section Header */}
        <AnimatedHeading
          subtitle="// 03 ENGINEERING PROCESS"
          title="Structured Workflow & Execution"
        />

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {PROCESS_STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.94, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, delay: index * 0.14, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group relative rounded-3xl bg-[#0B0B10] border border-purple-900/40 hover:border-purple-500/80 p-5 sm:p-7 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]"
              >
                {/* Background Radial Glow - Strictly clipped inside rounded-3xl */}
                <div 
                  className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                  style={{ backgroundColor: item.glowColor }}
                />

                {/* Top Header Row */}
                <div className="flex items-center justify-between relative z-10 text-white pb-4">
                  <span className="font-syne text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800/40 group-hover:bg-purple-600 text-purple-300 group-hover:text-white flex items-center justify-center transition-colors duration-300 shadow-inner">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Bottom Title & Description */}
                <div className="space-y-2 pt-4 relative z-10 text-white border-t border-purple-900/30">
                  <h3 className="font-syne text-xl font-extrabold tracking-tight text-white group-hover:text-purple-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-sans text-purple-200/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
