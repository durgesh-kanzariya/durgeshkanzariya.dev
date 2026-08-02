"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Database, Cpu, Layout } from "lucide-react";

interface WaveItem {
  slug: string;
  leftCategory: string;
  leftTitle: string;
  rightCategory: string;
  rightTitle: string;
  icon: typeof Layout;
  image: string;
  description: string;
  metrics: { label: string; value: string }[];
}

const WAVE_ITEMS: WaveItem[] = [
  {
    slug: "aero-guard",
    leftCategory: "// PREDICTIVE MACHINE LEARNING",
    leftTitle: "NASA C-MAPSS Jet Engine Degradation Analytics",
    rightCategory: "MODEL VARIANT",
    rightTitle: "XGBoost Regressor // 11.42 Validation RMSE",
    icon: Cpu,
    image: "/images/aero_guard_cover.png",
    description: "Built multi-horizon degradation forecasters trained on 21 turbine telemetry sensors to predict Remaining Useful Life (RUL).",
    metrics: [
      { label: "Target Metric", value: "RUL Cycles" },
      { label: "Validation RMSE", value: "11.42" },
      { label: "R² Accuracy", value: "0.865" },
      { label: "Sensor Windows", value: "21 Channels" },
    ],
  },
  {
    slug: "traveldost",
    leftCategory: "// FULL-STACK RELATIONAL ARCHITECTURE",
    leftTitle: "Atomic 3NF PostgreSQL Itinerary Engine",
    rightCategory: "SYSTEM ENGINE",
    rightTitle: "React + Express REST API // <45ms Query Execution",
    icon: Database,
    image: "/images/traveldost_cover.png",
    description: "Engineered atomic relational database schemas to eliminate duplicate data friction across multi-destination companion travel planning.",
    metrics: [
      { label: "Database Engine", value: "PostgreSQL" },
      { label: "Normalization", value: "3NF Atomic" },
      { label: "Query Speed", value: "<45ms Lookups" },
      { label: "API Protocol", value: "RESTful Express" },
    ],
  },
];

export default function DualWaveSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Cross-fading Dual Wave scrub animation
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 40%",
          onUpdate: (self) => {
            const idx = self.progress > 0.5 ? 1 : 0;
            if (idx !== activeIndex) {
              setActiveIndex(idx);
            }
          },
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeIndex]);

  const currentItem = WAVE_ITEMS[activeIndex];
  const Icon = currentItem.icon;

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full py-24 px-6 md:px-12 bg-[#07070A] text-white border-t border-purple-950/80 overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/15 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-purple-900/30 pb-4">
          <span className="font-mono text-xs text-purple-400 uppercase tracking-widest font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            // SYNCHRONIZED DUAL MATRIX
          </span>
          <span className="font-mono text-xs text-purple-300/80">
            0{activeIndex + 1} / 0{WAVE_ITEMS.length}
          </span>
        </div>

        {/* Synchronized 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Matrix Column */}
          <div 
            ref={leftContentRef}
            className="lg:col-span-6 p-8 rounded-3xl bg-black/60 border border-purple-900/40 backdrop-blur-xl flex flex-col justify-between space-y-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          >
            <div className="space-y-4">
              <span className="font-mono text-xs text-purple-400 font-bold uppercase tracking-wider block">
                {currentItem.leftCategory}
              </span>
              <h2 className="font-syne text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight uppercase">
                {currentItem.leftTitle}
              </h2>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-purple-900/40">
              <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-800/40 flex items-center justify-center text-purple-300">
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs text-purple-300 font-semibold">
                SYSTEM ARCHITECTURE ACTIVE
              </span>
            </div>
          </div>

          {/* Right Matrix Column */}
          <div 
            ref={rightContentRef}
            className="lg:col-span-6 p-8 rounded-3xl bg-black/60 border border-purple-500/30 backdrop-blur-xl flex flex-col justify-between space-y-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group hover:border-purple-500/70 transition-colors duration-500"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-purple-400 font-bold uppercase tracking-wider">
                {currentItem.rightCategory}
              </span>
              <Link
                href={`/work/${currentItem.slug}`}
                className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold transition-all shadow-md"
              >
                <span>VIEW CASE STUDY</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            {/* Synchronized Media Frame (Clickable Route) */}
            <Link 
              href={`/work/${currentItem.slug}`}
              className="relative w-full h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-white/10 bg-purple-950/40 shadow-inner block group-hover:border-purple-500/60 transition-colors"
            >
              <Image
                src={currentItem.image}
                alt={currentItem.leftTitle}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-contain p-2 filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
              />
            </Link>

            {/* Description & Metrics */}
            <div className="space-y-3 relative z-10 pt-2 border-t border-purple-900/40">
              <p className="text-xs sm:text-sm font-sans text-purple-200/90 leading-relaxed">
                {currentItem.description}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-1">
                {currentItem.metrics.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-purple-950/50 border border-purple-800/30 space-y-1">
                    <span className="block font-mono text-[10px] text-purple-400 uppercase font-bold">
                      {m.label}
                    </span>
                    <span className="block font-mono text-xs font-bold text-white">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
