"use client";

import { motion } from "framer-motion";
import { Cpu, Layout, Database, CheckCircle2 } from "lucide-react";
import AnimatedHeading from "@/components/AnimatedHeading";

const ARSENAL_CATEGORIES = [
  {
    title: "Frontend & UI Engineering",
    icon: Layout,
    description: "Designing performant, high-frequency animated interfaces with modern web standards.",
    skills: ["React", "Next.js", "Tailwind CSS", "GSAP Animation", "Responsive Design"],
    glowColor: "rgba(168, 85, 247, 0.15)",
  },
  {
    title: "Backend & Core Systems",
    icon: Database,
    description: "Building scalable RESTful APIs, relational SQL schemas, and decoupled backend services.",
    skills: ["Node.js", "Express.js", "PostgreSQL", "REST APIs", "System Architecture"],
    glowColor: "rgba(129, 140, 248, 0.15)",
  },
  {
    title: "Data Science & ML",
    icon: Cpu,
    description: "Engineering predictive machine learning models and analyzing complex telemetry datasets.",
    skills: ["Python", "XGBoost", "Predictive Modeling", "Data Analysis", "Scikit-Learn"],
    glowColor: "rgba(192, 132, 252, 0.15)",
  },
];

export default function BentoArsenal() {
  return (
    <section id="arsenal" className="relative w-full py-24 px-6 md:px-12 bg-[#07070A] text-white">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Animated Section Header */}
        <AnimatedHeading
          subtitle="// 02 TECHNICAL ARSENAL"
          title="Core Competencies & Stack Matrix"
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARSENAL_CATEGORIES.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.94, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, delay: index * 0.14, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group relative rounded-3xl bg-[#0B0B10] border border-purple-900/40 hover:border-purple-500/80 p-6 sm:p-7 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]"
              >
                {/* Background Radial Glow - Strictly clipped inside rounded-3xl */}
                <div 
                  className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                  style={{ backgroundColor: category.glowColor }}
                />

                {/* Top Content */}
                <div className="space-y-4 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-purple-950/60 border border-purple-800/40 flex items-center justify-center text-purple-300 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-syne text-xl font-extrabold text-white group-hover:text-purple-200 transition-colors">
                    {category.title}
                  </h3>

                  <p className="text-xs font-sans text-purple-200/70 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Skills List */}
                <div className="space-y-2.5 pt-5 mt-6 relative z-10 border-t border-purple-900/30">
                  {category.skills.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 font-mono text-xs text-purple-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="font-medium tracking-wide">{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
