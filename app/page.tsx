"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import InteractiveConsole from "@/components/InteractiveConsole";
import { Terminal, ShieldCheck, Layers, Mail, ArrowDownRight, ArrowUpRight, X, Activity, Cpu, Copy, Check } from "lucide-react";

const PROJECTS_DATA = [
  {
    id: "PROJECT_01",
    title: "Aero Guard",
    category: "DATA_SCIENCE",
    scope: "Flagship Data Science",
    engine: "CORE_ENGINE // XGBoost Regression",
    image: "/images/aero_guard_cover.png",
    description: "Built a predictive framework to forecast the Remaining Useful Life (RUL) of jet engines utilizing historical multi-sensor telemetry datasets. Implemented custom feature engineering and rigorous model evaluation.",
    tags: ["Python", "XGBoost", "Feature Engineering", "Data Science"],
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
    title: "TravelDost",
    category: "WEB_ARCHITECTURE",
    scope: "Web Architecture",
    engine: "CORE_ENGINE // React + Express + PostgreSQL",
    image: "/images/traveldost_cover.png",
    description: "Designed and engineered a full-stack companion web platform featuring structured relational database mapping, custom multi-tier API routing architectures, and decoupled component management layouts.",
    tags: ["React", "Express.js", "PostgreSQL", "SQL Schema"],
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

export default function Home() {
  const [filter, setFilter] = useState<"ALL" | "DATA_SCIENCE" | "WEB_ARCHITECTURE">("ALL");
  const [activeProject, setActiveProject] = useState<typeof PROJECTS_DATA[0] | null>(null);
  const [copied, setCopied] = useState(false);
  const emailAddress = "durgesh.kanzariya@example.com";
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email address", err);
    }
  };

  // Custom mousemove hook for cursor glow backdrop (Itomdev / Big Dirty style)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      containerRef.current.style.setProperty("--x", `${x}px`);
      containerRef.current.style.setProperty("--y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Prevent page scroll when a full case study overlay is expanded
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [activeProject]);

  const filteredProjects = PROJECTS_DATA.filter(project => {
    if (filter === "ALL") return true;
    return project.category === filter;
  });

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-canvas text-ink-primary font-sans relative overflow-hidden grid-bg cursor-glow flex flex-col"
    >
      {/* Decorative top glowing strip */}
      <div className="h-1 w-full bg-gradient-to-r from-tech-blue/50 via-sky-500 to-indigo-500 shrink-0" />

      {/* Floating Header / Brand Nav (Jo Pe Curo style) */}
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-12 pb-16 md:pt-16 md:pb-24 space-y-24 relative z-10 flex-grow w-full">
        {/* Editorial Text Header Section (Monolog / Killian Herzer style) */}
        <header className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-ink-primary tracking-tight leading-[1.1] mb-6 font-sans">
            Durgesh Kanzariya
          </h1>
          
          <p className="text-lg sm:text-xl text-ink-muted leading-relaxed font-sans font-[300] max-w-2xl">
            I design and execute rigorous software architectures, balancing full-stack infrastructure development with deep exploratory data analysis and predictive systems engineering.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-ink-muted">
              <ArrowDownRight className="w-3.5 h-3.5 text-tech-blue" />
              <span>Scroll to decrypt projects</span>
            </div>
          </div>
        </header>

        {/* Bento Showcase Grid with filter controls (Jo Pe Curo & Big Dirty Agency) */}
        <motion.section 
          id="work" 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8 scroll-mt-24"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle/60 pb-6">
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-ink-muted uppercase">
              <Terminal className="w-4 h-4 text-tech-blue animate-pulse" />
              <span>Core Engineering Showcase</span>
            </div>

            {/* Awwwards-style filter tab switches */}
            <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-border-subtle/50 font-mono text-[10px] font-bold">
              <button
                onClick={() => setFilter("ALL")}
                className={`px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer ${filter === "ALL" ? "bg-card-bg text-tech-blue shadow-sm" : "text-ink-muted hover:text-ink-primary"}`}
              >
                00 // SHOW ALL
              </button>
              <button
                onClick={() => setFilter("DATA_SCIENCE")}
                className={`px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer ${filter === "DATA_SCIENCE" ? "bg-card-bg text-tech-blue shadow-sm" : "text-ink-muted hover:text-ink-primary"}`}
              >
                01 // DATA SCIENCE
              </button>
              <button
                onClick={() => setFilter("WEB_ARCHITECTURE")}
                className={`px-3 py-1.5 rounded-lg transition-all duration-300 cursor-pointer ${filter === "WEB_ARCHITECTURE" ? "bg-card-bg text-tech-blue shadow-sm" : "text-ink-muted hover:text-ink-primary"}`}
              >
                02 // WEB ARCHITECTURE
              </button>
            </div>
          </div>
          
          {/* Animated Filter Grid layout using Framer Motion */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard 
                    project={project} 
                    onClick={() => setActiveProject(project)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.section>

        {/* Capabilities Bento Grid Matrix (Itomdev & Big Dirty style) */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8 scroll-mt-24"
        >
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-ink-muted uppercase border-b border-border-subtle/60 pb-6">
            <Cpu className="w-4 h-4 text-tech-blue" />
            <span>Capabilities & Technical Competencies</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card-bg border border-border-subtle/80 rounded-2xl p-6 space-y-4 hover:border-tech-blue/30 transition-colors duration-300">
              <div className="w-10 h-10 rounded-xl bg-blue-50/80 dark:bg-blue-900/20 flex items-center justify-center text-tech-blue font-mono font-bold text-xs select-none">01</div>
              <h4 className="text-base font-bold text-ink-primary">Predictive Pipelines</h4>
              <p className="text-xs text-ink-muted leading-relaxed font-[300]">Integrating machine learning engines (such as XGBoost) into active server microservices to generate high-fidelity, real-time prediction scopes.</p>
            </div>
            <div className="bg-card-bg border border-border-subtle/80 rounded-2xl p-6 space-y-4 hover:border-tech-blue/30 transition-colors duration-300">
              <div className="w-10 h-10 rounded-xl bg-blue-50/80 dark:bg-blue-900/20 flex items-center justify-center text-tech-blue font-mono font-bold text-xs select-none">02</div>
              <h4 className="text-base font-bold text-ink-primary">Relational Infrastructure</h4>
              <p className="text-xs text-ink-muted leading-relaxed font-[300]">Designing rigorous, 3NF normalized SQL database architectures targeting highly efficient query speeds and low lookup latencies under index loads.</p>
            </div>
            <div className="bg-card-bg border border-border-subtle/80 rounded-2xl p-6 space-y-4 hover:border-tech-blue/30 transition-colors duration-300">
              <div className="w-10 h-10 rounded-xl bg-blue-50/80 dark:bg-blue-900/20 flex items-center justify-center text-tech-blue font-mono font-bold text-xs select-none">03</div>
              <h4 className="text-base font-bold text-ink-primary">Data Operations</h4>
              <p className="text-xs text-ink-muted leading-relaxed font-[300]">Engineering automated ETL processes, rolling statistical window analytics, and clean feature engineering models for sensor streams.</p>
            </div>
          </div>
        </motion.section>

        {/* Engineering Philosophy Section (Monolog inspired) */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8 scroll-mt-24"
        >
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-ink-muted uppercase border-b border-border-subtle/60 pb-6">
            <Layers className="w-4 h-4 text-tech-blue" />
            <span>Engineering Philosophy</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-tech-blue uppercase tracking-widest">01 / Rigor Over Hype</span>
              <p className="text-sm font-semibold text-ink-primary">Focus on core algorithms, clean data flows, and proven architecture stacks instead of chasing short-lived tech trends.</p>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-tech-blue uppercase tracking-widest">02 / Schema as Source of Truth</span>
              <p className="text-sm font-semibold text-ink-primary">A clean, strictly validated database schema ensures atomic data integrity, preventing cascading errors at the service layer.</p>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-tech-blue uppercase tracking-widest">03 / Performance Is a Feature</span>
              <p className="text-sm font-semibold text-ink-primary">Optimize code and query execution layouts proactively to secure sub-50ms baseline responses under operational load.</p>
            </div>
          </div>
        </motion.section>

        {/* Interactive Developer Console (Itomdev style) */}
        <motion.section 
          id="sandbox" 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8 scroll-mt-24"
        >
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-ink-muted uppercase border-b border-border-subtle/60 pb-6">
            <Terminal className="w-4 h-4 text-tech-blue" />
            <span>Interactive Workspace Simulation</span>
          </div>
          
          <div className="w-full">
            <InteractiveConsole />
          </div>
        </motion.section>

        {/* Road Map & Professional Timeline Section (Killian Herzer style) */}
        <motion.section 
          id="timeline"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8 scroll-mt-24"
        >
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-ink-muted uppercase border-b border-border-subtle/60 pb-6">
            <Activity className="w-4 h-4 text-tech-blue" />
            <span>System Roadmap & Professional Timeline</span>
          </div>
          <div className="relative border-l border-border-subtle/80 ml-3 pl-8 space-y-10 py-2">
            {/* Timeline Item 1 */}
            <div className="relative group">
              <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full border border-border-subtle bg-card-bg flex items-center justify-center group-hover:border-tech-blue transition-colors duration-300">
                <div className="w-2 h-2 rounded-full bg-tech-blue scale-75 group-hover:scale-100 transition-transform duration-300" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-xs font-mono text-tech-blue font-bold">LATE 2026 – PRESENT</span>
                  <span className="text-xs text-ink-muted font-mono">// GATEWAY GROUP</span>
                </div>
                <h4 className="text-base font-bold text-ink-primary">Incoming Systems Engineer & Intern</h4>
                <p className="text-xs text-ink-muted leading-relaxed font-[300] max-w-2xl">
                  Selected for a 39-month contract starting late 2026, beginning with an intensive 9-month internship developing high-availability backends and data-driven client workflows.
                </p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative group">
              <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full border border-border-subtle bg-card-bg flex items-center justify-center group-hover:border-tech-blue transition-colors duration-300">
                <div className="w-2 h-2 rounded-full bg-border-subtle scale-75 group-hover:scale-100 transition-transform duration-300" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-xs font-mono text-ink-muted font-bold">2023 – 2027</span>
                  <span className="text-xs text-ink-muted font-mono">// RK UNIVERSITY</span>
                </div>
                <h4 className="text-base font-bold text-ink-primary">B.Tech in Information Technology</h4>
                <p className="text-xs text-ink-muted leading-relaxed font-[300] max-w-2xl">
                  Under the guidance of academic mentors Prof. Snehal Sathwara and Prof. Dr. Chetan Shingadiya, focusing on database normalizations, algorithms, and computational statistics.
                </p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative group">
              <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full border border-border-subtle bg-card-bg flex items-center justify-center group-hover:border-tech-blue transition-colors duration-300">
                <div className="w-2 h-2 rounded-full bg-border-subtle scale-75 group-hover:scale-100 transition-transform duration-300" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-xs font-mono text-ink-muted font-bold">2024</span>
                  <span className="text-xs text-ink-muted font-mono">// IIT MADRAS NPTEL</span>
                </div>
                <h4 className="text-base font-bold text-ink-primary">Double Silver Medalist & Elite Topper</h4>
                <p className="text-xs text-ink-muted leading-relaxed font-[300] max-w-2xl">
                  Awarded Silver Medalist & Elite status across two key certifications: <em>Data Structures & Algorithms using Python</em> and <em>Python for Data Science</em>.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Structured Technical Credentials / Achievements (Killian Herzer / Nordic layout) */}
        <motion.section 
          id="credentials" 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8 scroll-mt-24"
        >
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-ink-muted uppercase border-b border-border-subtle/60 pb-6">
            <ShieldCheck className="w-4 h-4 text-tech-blue" />
            <span>Validated Credentials & Environments</span>
          </div>

          <div className="bg-card-bg border border-border-subtle/80 rounded-2xl p-6 md:p-8 hover:border-tech-blue/30 transition-colors duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-[11px] font-mono text-ink-muted uppercase tracking-wider mb-6 pb-2 border-b border-border-subtle/40 flex items-center justify-between">
                  <span>Advanced Certifications</span>
                  <span className="text-[9px] text-tech-blue">01 // HONORS</span>
                </h4>
                <ul className="space-y-5 font-sans text-sm">
                  <li className="flex items-start gap-3 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-tech-blue mt-2 shrink-0 group-hover:scale-125 transition-transform duration-200" />
                    <div>
                      <strong className="text-ink-primary block font-semibold group-hover:text-tech-blue transition-colors duration-200">
                        NPTEL Silver Medalist — Data Structures & Algorithms
                      </strong>
                      <span className="text-ink-muted text-xs font-mono">IIT Madras / Elite Silver Distinction</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-tech-blue mt-2 shrink-0 group-hover:scale-125 transition-transform duration-200" />
                    <div>
                      <strong className="text-ink-primary block font-semibold group-hover:text-tech-blue transition-colors duration-200">
                        NPTEL Silver Medalist — Python for Data Science
                      </strong>
                      <span className="text-ink-muted text-xs font-mono">IIT Madras / Elite Topper & Silver Medal</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-tech-blue mt-2 shrink-0 group-hover:scale-125 transition-transform duration-200" />
                    <div>
                      <strong className="text-ink-primary block font-semibold group-hover:text-tech-blue transition-colors duration-200">
                        NPTEL Silver Medalist — Joy of Computing using Python
                      </strong>
                      <span className="text-ink-muted text-xs font-mono">IIT Madras / Elite Silver Distinction</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-[11px] font-mono text-ink-muted uppercase tracking-wider mb-6 pb-2 border-b border-border-subtle/40 flex items-center justify-between">
                  <span>Core Environments & Toolkits</span>
                  <span className="text-[9px] text-tech-blue">02 // STACK</span>
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    "Python Analytics",
                    "Machine Learning",
                    "SQL & Relational Schema",
                    "Full-Stack React",
                    "Node.js Ecosystem",
                    "XGBoost Engine",
                    "Tailwind System Design"
                  ].map((skill, i) => (
                    <span 
                      key={i} 
                      className="text-xs bg-slate-100/30 dark:bg-slate-800/40 border border-border-subtle hover:border-tech-blue/30 hover:bg-slate-100/60 dark:hover:bg-slate-850/60 text-ink-primary px-3 py-2 rounded-xl font-medium font-sans transition-all duration-200 cursor-default select-none"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Minimalist Light-Mode Contact Footer Block */}
        <motion.section 
          id="contact" 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-border-subtle/80 pt-16 scroll-mt-24 space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-ink-primary tracking-tight">Let's build something rigorous.</h3>
              <p className="text-sm text-ink-muted leading-relaxed max-w-md font-sans font-[300]">
                Looking for analytical software development or dedicated machine learning systems engineering expertise. Open to internships, collaborative open-source builds, and architectural discussions.
              </p>
              
              {/* Copyable Email Hub Element */}
              <div className="inline-flex items-center gap-3 bg-card-bg border border-border-subtle rounded-xl p-3 pr-4 shadow-[0_2px_10px_rgba(0,0,0,0.01)] max-w-full overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center text-tech-blue shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-mono text-ink-primary truncate select-all">{emailAddress}</span>
                <button 
                  onClick={handleCopyEmail}
                  className="ml-2 w-7 h-7 rounded-md border border-border-subtle hover:bg-slate-100/30 dark:hover:bg-slate-800/30 flex items-center justify-center text-ink-muted hover:text-ink-primary transition-all shrink-0 cursor-pointer"
                  title="Copy email address"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* External Links Column Block */}
            <div className="flex flex-col gap-3 font-mono text-xs md:text-right md:items-end">
              <span className="text-[11px] uppercase text-ink-muted tracking-wider mb-1 block">// External Handshakes</span>
              <a 
                href="https://github.com/durgeshkanzariya" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-ink-primary hover:text-tech-blue transition-colors group border-b border-transparent hover:border-tech-blue/30 pb-0.5"
              >
                GitHub Profile <ArrowUpRight className="w-3 h-3 text-ink-muted group-hover:text-tech-blue transition-colors" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-ink-primary hover:text-tech-blue transition-colors group border-b border-transparent hover:border-tech-blue/30 pb-0.5"
              >
                LinkedIn Network <ArrowUpRight className="w-3 h-3 text-ink-muted group-hover:text-tech-blue transition-colors" />
              </a>
            </div>
          </div>
        </motion.section>
      </main>

      {/* ITom-Inspired Shared Layout Immersive Overlay Modal */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Dark blur glass backdrop layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="fixed inset-0 bg-slate-950/20 dark:bg-slate-950/50 backdrop-blur-md"
            />

            {/* Expanded Content Morphing Shell */}
            <motion.div
              layoutId={`card-container-${activeProject.id}`}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="bg-card-bg border border-border-subtle w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden relative z-10 flex flex-col my-auto"
            >
              {/* Top Banner Action Header Bar */}
              <div className="p-6 border-b border-border-subtle flex items-center justify-between bg-slate-100/30 dark:bg-slate-800/30">
                <motion.div 
                  layoutId={`card-meta-${activeProject.id}`}
                  className="text-[10px] font-mono tracking-wider text-ink-muted flex items-center gap-1.5"
                >
                  <span>{activeProject.id} // {activeProject.category}</span>
                </motion.div>
                
                <button 
                  onClick={() => setActiveProject(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-ink-primary transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Technical Deep Dive Body */}
              <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto space-y-8 text-left">
                {activeProject.image && (
                  <motion.div 
                    layoutId={`card-image-${activeProject.id}`}
                    className="w-full aspect-[21/9] rounded-2xl overflow-hidden border border-border-subtle mb-6"
                  >
                    <img 
                      src={activeProject.image} 
                      alt={activeProject.title} 
                      className="w-full h-full object-cover" 
                    />
                  </motion.div>
                )}

                <div>
                  <motion.h2 
                    layoutId={`card-title-${activeProject.id}`}
                    className="text-2xl md:text-3xl font-extrabold text-ink-primary tracking-tight"
                  >
                    {activeProject.title}
                  </motion.h2>
                  
                  <motion.p 
                    layoutId={`card-engine-${activeProject.id}`}
                    className="text-xs font-mono text-tech-blue mt-1.5"
                  >
                    {activeProject.engine}
                  </motion.p>
                </div>

                {/* Substantive Breakdown Text Sections */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 border-y border-border-subtle py-6 bg-slate-100/20 dark:bg-slate-800/20 px-4 rounded-xl">
                  {activeProject.deepDive.metrics.map((metric, idx) => (
                    <div key={idx} className="space-y-1">
                      <span className="text-[10px] font-mono text-ink-muted uppercase block">{metric.label}</span>
                      <span className="text-sm font-bold text-ink-primary font-mono">{metric.value}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 font-mono text-[10px] text-ink-muted uppercase tracking-wider">
                    <Activity className="w-4 h-4 text-tech-blue" />
                    <span>Problem Statement / Pipeline Scope</span>
                  </div>
                  <p className="text-sm text-ink-primary leading-relaxed bg-slate-100/10 dark:bg-slate-800/10 p-4 rounded-xl border border-border-subtle font-sans font-[400]">
                    {activeProject.deepDive.problem}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 font-mono text-[10px] text-ink-muted uppercase tracking-wider">
                    <Cpu className="w-4 h-4 text-tech-blue" />
                    <span>Technical Implementation & Pipeline Strategy</span>
                  </div>
                  <motion.p 
                    layoutId={`card-desc-${activeProject.id}`}
                    className="text-sm text-ink-muted leading-relaxed font-sans font-[400]"
                  >
                    {activeProject.deepDive.architecture}
                  </motion.p>
                </div>

                {/* Card Tags */}
                <div className="pt-4 border-t border-border-subtle">
                  <span className="text-[10px] font-mono text-ink-muted uppercase tracking-wider block mb-3">Environment Blueprint Tags</span>
                  <motion.div 
                    layoutId={`card-tags-${activeProject.id}`}
                    className="flex flex-wrap gap-1.5"
                  >
                    {activeProject.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2.5 py-1 bg-slate-100/30 dark:bg-slate-800/40 border border-border-subtle rounded-md text-ink-primary font-medium">
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Editorial Footer (Monolog vibe) */}
      <footer className="border-t border-border-subtle/60 bg-card-bg py-12 px-6 shrink-0 z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] font-mono text-ink-muted">
          <div>
            <span>© {new Date().getFullYear()} DURGESH KANZARIYA. ALL SYSTEM RIGHTS RESERVED.</span>
          </div>
          <div className="flex gap-4">
            <a href="https://killianherzer.com/" target="_blank" rel="noopener noreferrer" className="hover:text-tech-blue transition-colors duration-200">[HERZER_INSP]</a>
            <a href="https://jopecuro.com/" target="_blank" rel="noopener noreferrer" className="hover:text-tech-blue transition-colors duration-200">[JOPE_INSP]</a>
            <a href="https://bymonolog.com/" target="_blank" rel="noopener noreferrer" className="hover:text-tech-blue transition-colors duration-200">[MONOLOG_INSP]</a>
            <a href="https://www.bigdirty.agency/" target="_blank" rel="noopener noreferrer" className="hover:text-tech-blue transition-colors duration-200">[BIGDIRTY_INSP]</a>
            <a href="https://itomdev.com/" target="_blank" rel="noopener noreferrer" className="hover:text-tech-blue transition-colors duration-200">[ITOM_INSP]</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
