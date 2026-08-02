"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Terminal, ShieldCheck, Zap, Cpu, Sparkles } from "lucide-react";
import AnimatedHeading from "@/components/AnimatedHeading";

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full pt-20 sm:pt-24 pb-16 sm:pb-24 px-4 sm:px-6 md:px-12 bg-[#07070A] text-white scroll-mt-14">
      <div className="max-w-6xl mx-auto space-y-10 sm:space-y-16">
        {/* Animated Section Header */}
        <AnimatedHeading
          subtitle="// 04 ABOUT & PHILOSOPHY"
          title="Engineering Precision & Systems Philosophy"
        />

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Portrait Card */}
          <motion.div 
            initial={{ opacity: 0, y: 60, scale: 0.94, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.02 }}
            className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-purple-500/40 bg-black/60 shadow-[0_20px_50px_rgba(0,0,0,0.9)] group"
          >
            {/* Ambient Purple Backdrop Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-transparent to-transparent z-10 pointer-events-none" />

            <div className="relative w-full h-[320px] sm:h-[500px]">
              <Image
                src="/sequence/frame_0090.webp"
                alt="Durgesh Kanzariya Studio Portrait"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover object-center filter grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>

            <div className="absolute bottom-6 left-6 right-6 z-20 p-4 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/10 font-mono text-xs text-purple-200">
              <span className="font-bold text-white block uppercase">Durgesh Kanzariya</span>
              <span className="text-[10px] text-purple-400/80">Data Scientist &amp; Full-Stack Engineer</span>
            </div>
          </motion.div>

          {/* Right Column: Bio & Core Values */}
          <motion.div 
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-4 font-sans text-purple-200/90 leading-relaxed text-sm sm:text-base">
              <p>
                I am a Lead Systems Engineer and ML Architect specializing in high-frequency interactive UIs, predictive data pipelines, and scalable database architectures.
              </p>
              <p>
                My work bridges mathematical machine learning algorithms with fluid 60fps web experiences — turning complex telemetry datasets into intuitive visual platforms.
              </p>
            </div>

            {/* Core Values Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-black/60 border border-purple-900/40 space-y-2">
                <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold uppercase">
                  <Zap className="w-4 h-4" />
                  <span>High-Frequency Performance</span>
                </div>
                <p className="text-xs text-purple-300/70 font-sans">
                  Optimized canvas render loops, GPU shaders, and sub-45ms SQL query lookups.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-black/60 border border-purple-900/40 space-y-2">
                <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold uppercase">
                  <Cpu className="w-4 h-4" />
                  <span>Predictive Data Intelligence</span>
                </div>
                <p className="text-xs text-purple-300/70 font-sans">
                  Feature engineering and gradient boosted regressors tailored for real-world telemetry datasets.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
