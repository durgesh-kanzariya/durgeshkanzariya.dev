"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Cpu, Layers, Terminal, X, Check, Activity, ShieldCheck } from "lucide-react";

export const PROJECTS = [
  {
    id: "PROJECT_01",
    slug: "aero-guard",
    title: "Aero Guard",
    subtitle: "Flagship Data Science & Machine Learning",
    engine: "XGBoost Engine // NASA C-MAPSS Telemetry",
    image: "/images/aero_guard_cover.png",
    description: "Built a predictive framework to forecast the Remaining Useful Life (RUL) of jet engines utilizing historical multi-sensor telemetry datasets. Implemented custom feature engineering and rigorous model evaluation.",
    tags: ["Python", "XGBoost", "Predictive Analytics", "Machine Learning"],
    deepDive: {
      problem: "Engine down-time in commercial aviation results in extreme logistical overheads and safety risk thresholds. The objective was to flag degrading degradation slopes before failure occurs.",
      architecture: "Engineered rolling statistical aggregates (rolling mean, rolling standard deviation) across 21 distinct engine sensor fields over variant window horizons to accurately capture degrading operational trendlines.",
      metrics: [
        { label: "Target Metric", value: "RUL (Cycles)" },
        { label: "Model Variant", value: "Optimized XGBoost" },
        { label: "Validation RMSE", value: "11.42 Cycles" },
        { label: "R² Score", value: "0.865" }
      ]
    }
  },
  {
    id: "PROJECT_02",
    slug: "traveldost",
    title: "TravelDost",
    subtitle: "Full-Stack Web Companion Platform",
    engine: "React + Express + PostgreSQL Schema",
    image: "/images/traveldost_logo.jpeg",
    description: "Designed and engineered a full-stack companion web platform featuring structured relational database mapping, custom multi-tier API routing architectures, and decoupled component management layouts.",
    tags: ["React.js", "Express.js", "PostgreSQL", "Tailwind CSS"],
    deepDive: {
      problem: "Standard travel itinerary planners lack cohesive offline relational mapping capabilities, causing disconnected trip planning tracking overhead across multi-day tours.",
      architecture: "Normalised SQL tables down to 3NF schemas to ensure flawless atomic integrity constraint mapping between User Profiles, Itinerary Hubs, and individual Stop Coordinates.",
      metrics: [
        { label: "Database", value: "PostgreSQL" },
        { label: "API Layer", value: "RESTful Express" },
        { label: "Query Speed", value: "<45ms index lookups" },
        { label: "State Engine", value: "React Context API" }
      ]
    }
  }
];

export default function ProjectsGrid() {
  return (
    <section id="work" className="relative w-full py-24 px-6 md:px-12 bg-[#07070A] text-white">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-purple-900/30 pb-8">
          <div className="space-y-3">
            <span className="font-mono text-xs text-purple-400 uppercase tracking-widest font-bold">
              // 01 SELECTED WORK
            </span>
            <h2 className="font-syne text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Featured Engineering Projects
            </h2>
          </div>
          <p className="text-sm font-sans text-purple-300/70 max-w-md leading-relaxed">
            High-impact software solutions combining predictive data science models and robust web architecture. Click any card to read its full case study.
          </p>
        </div>

        {/* Projects Grid (Direct Route Links) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS.map((project, index) => (
            <Link key={project.id} href={`/work/${project.slug}`} className="block">
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="group relative rounded-3xl bg-black/60 border border-purple-900/40 hover:border-purple-500/80 p-6 sm:p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_40px_rgba(168,85,247,0.35)] overflow-hidden h-full"
              >
                {/* Card Electric Purple Glow backdrop on hover */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl group-hover:bg-purple-600/30 transition-colors" />

                <div className="space-y-6 relative z-10">
                  {/* Header Tag */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-purple-400 uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40">
                      {project.engine}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white/5 group-hover:bg-purple-600 text-purple-300 group-hover:text-white flex items-center justify-center transition-colors">
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Project Title & Subtitle */}
                  <div className="space-y-2">
                    <h3 className="font-syne text-2xl sm:text-3xl font-bold text-white group-hover:text-purple-200 transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-mono text-xs text-purple-300/70">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm font-sans text-purple-200/80 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tags Footer */}
                <div className="pt-8 flex flex-wrap gap-2 relative z-10">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[11px] px-3 py-1 rounded-full bg-white/5 text-purple-300 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
