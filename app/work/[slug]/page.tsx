"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Cpu, Layers, Database, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import CinematicParticles from "@/components/CinematicParticles";
import { PROJECTS_DATA } from "@/data/projectsData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectCaseStudyPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const project = PROJECTS_DATA[resolvedParams.slug];

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#07070A] text-white font-sans relative overflow-x-hidden selection:bg-purple-600 selection:text-white flex flex-col">
      {/* Interactive Cinematic Particles */}
      <CinematicParticles />

      {/* Navbar Header */}
      <Navbar />

      {/* Main Case Study Area */}
      <main className="flex-1 pt-20 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-12 max-w-7xl mx-auto w-full space-y-10 sm:space-y-16 relative z-10">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-mono text-xs text-purple-400 hover:text-white transition-colors group px-3.5 sm:px-4 py-2 rounded-full bg-purple-950/50 border border-purple-800/40 hover:border-purple-500"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>// BACK TO ALL PROJECTS</span>
          </Link>
        </motion.div>

        {/* Hero Title Block (NUDOT Style Oversized Typography & Metadata Grid) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 sm:space-y-8 border-b border-purple-900/30 pb-8 sm:pb-12"
        >
          <div className="space-y-2 sm:space-y-3">
            <span className="font-mono text-[10px] sm:text-xs text-purple-400 font-bold tracking-widest uppercase px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-purple-950/80 border border-purple-800/40 inline-block">
              {project.engine}
            </span>
            <h1 className="font-syne text-3xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-none drop-shadow-[0_0_40px_rgba(168,85,247,0.3)] break-words">
              {project.title}
            </h1>
            <p className="font-syne text-base sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-purple-400 max-w-3xl">
              {project.subtitle}
            </p>
          </div>

          {/* NUDOT Domain & Role Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 font-mono text-xs pt-4 border-t border-purple-900/40">
            <div className="space-y-1">
              <span className="text-purple-400/70 block uppercase text-[10px]">DOMAIN</span>
              <span className="font-bold text-white block truncate">{project.domain}</span>
            </div>
            <div className="space-y-1">
              <span className="text-purple-400/70 block uppercase text-[10px]">ROLE</span>
              <span className="font-bold text-white block truncate">{project.role}</span>
            </div>
            <div className="space-y-1">
              <span className="text-purple-400/70 block uppercase text-[10px]">YEAR</span>
              <span className="font-bold text-white block">{project.year}</span>
            </div>
            <div className="space-y-1">
              <span className="text-purple-400/70 block uppercase text-[10px]">CASE STUDY ID</span>
              <span className="font-bold text-purple-300 block truncate">{project.id}</span>
            </div>
          </div>
        </motion.div>

        {/* Full-Bleed Showcase Media Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative w-full h-[250px] sm:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden border border-purple-500/40 bg-black/80 shadow-[0_30px_80px_rgba(0,0,0,0.95)] group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none" />
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            className="object-contain p-2 sm:p-8 filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
          />
        </motion.div>

        {/* Overview & Problem Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-4 sm:pt-8">
          <div className="lg:col-span-4 space-y-4 sm:space-y-6">
            <h3 className="font-syne text-xl sm:text-2xl font-extrabold text-white tracking-tight uppercase border-l-2 border-purple-500 pl-3 sm:pl-4">
              Project Overview
            </h3>
            <p className="font-sans text-xs sm:text-sm text-purple-200/90 leading-relaxed">
              {project.overview}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="font-mono text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-200 font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6 sm:space-y-8 font-sans text-purple-200/90 leading-relaxed">
            <div className="p-5 sm:p-8 rounded-3xl bg-black/60 border border-purple-900/40 space-y-2.5 sm:space-y-3">
              <h4 className="font-syne text-lg sm:text-xl font-bold text-white uppercase font-mono text-[11px] sm:text-xs tracking-wider text-purple-400">
                // THE CHALLENGE &amp; PROBLEM SPACE
              </h4>
              <p className="text-xs sm:text-base leading-relaxed">{project.problem}</p>
            </div>

            <div className="p-5 sm:p-8 rounded-3xl bg-black/60 border border-purple-900/40 space-y-2.5 sm:space-y-3">
              <h4 className="font-syne text-lg sm:text-xl font-bold text-white uppercase font-mono text-[11px] sm:text-xs tracking-wider text-purple-400">
                // SYSTEM ARCHITECTURE &amp; METHODOLOGY
              </h4>
              <p className="text-xs sm:text-base leading-relaxed">{project.architecture}</p>
            </div>
          </div>
        </div>

        {/* Engineering Metrics Bento Matrix */}
        <div className="space-y-6 pt-8 sm:pt-12 border-t border-purple-900/30">
          <h3 className="font-syne text-xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
            Validation Metrics &amp; Key Deliverables
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-purple-500/30 space-y-1.5 sm:space-y-2">
                <span className="block font-mono text-[10px] sm:text-xs text-purple-400 uppercase font-bold truncate">
                  {m.label}
                </span>
                <span className="block font-mono text-base sm:text-xl font-black text-white truncate">
                  {m.value}
                </span>
              </div>
            ))}
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-purple-950/30 border border-purple-800/40 space-y-3 pt-5 sm:pt-6">
            <h4 className="font-mono text-xs text-purple-300 font-bold uppercase">
              KEY TECHNICAL HIGHLIGHTS
            </h4>
            <div className="space-y-2 font-sans text-xs sm:text-sm text-purple-200">
              {project.highlights.map((h, idx) => (
                <div key={idx} className="flex items-start gap-2.5 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* NUDOT Next Project Transition Bar */}
        <div className="pt-10 sm:pt-16 border-t border-purple-900/40">
          <Link
            href={`/work/${project.nextSlug}`}
            className="group flex flex-col sm:flex-row items-center justify-between p-6 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-950/60 via-black to-purple-950/40 border border-purple-500/40 hover:border-purple-400 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:shadow-[0_0_50px_rgba(168,85,247,0.4)]"
          >
            <div className="space-y-2 text-center sm:text-left">
              <span className="font-mono text-xs text-purple-400 uppercase font-bold tracking-widest block">
                NEXT CASE STUDY //
              </span>
              <h3 className="font-syne text-2xl sm:text-5xl font-black text-white group-hover:text-purple-300 transition-colors uppercase">
                {project.nextTitle}
              </h3>
            </div>

            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-purple-600 group-hover:bg-purple-500 text-white flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg mt-4 sm:mt-0 shrink-0">
              <ArrowUpRight className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
