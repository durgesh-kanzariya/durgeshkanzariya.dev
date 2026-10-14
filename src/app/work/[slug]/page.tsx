"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/footer";
import { PROJECTS_MAP } from "@/data/projectsData";
import { DOMAIN_COLORS } from "@/components/projects/domainColors";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectCaseStudyPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const project = PROJECTS_MAP[resolvedParams.slug];

  if (!project) {
    notFound();
  }

  const accentColor = DOMAIN_COLORS[project.domain] || "#4F8EFF";

  return (
    <div className="min-h-screen bg-[#080810] text-[#F0F0F8] relative overflow-x-hidden flex flex-col">
      {/* Ambient bg glow for case study */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-40 left-1/3 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10"
          style={{ background: accentColor }}
        />
      </div>

      <Navbar />

      <main className="flex-1 pt-24 pb-24 relative z-10">
        <div className="section-container space-y-16">

          {/* Back link */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 label-muted hover:text-[#F0F0F8] transition-colors"
            >
              <ArrowLeft size={14} />
              Back to projects
            </Link>
          </motion.div>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8 pb-12 border-b border-[#1c1c3a]"
          >
            {/* Domain label */}
            <div className="flex items-center gap-3">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: accentColor, boxShadow: `0 0 10px ${accentColor}` }}
              />
              <span className="label-sm" style={{ color: accentColor }}>{project.domainLabel}</span>
              <span className="label-muted">·</span>
              <span className="label-muted">{project.id}</span>
            </div>

            {/* Title */}
            <h1 className="display-xl text-[#F0F0F8] leading-[0.9]">{project.title}</h1>
            <p className="heading-sm text-[#6B7280] font-normal">{project.subtitle}</p>

            {/* Metadata grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-[#1c1c3a]">
              {[
                { label: "Domain", value: project.domainLabel },
                { label: "Role", value: project.role },
                { label: "Stack", value: project.stack },
                { label: "Year", value: project.year },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="label-muted mb-1">{label}</div>
                  <div className="text-[#F0F0F8] text-sm font-medium truncate">{value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Cover image */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden border border-[#1c1c3a] bg-[#0f0f1e]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#080810]/60 via-transparent to-transparent z-10" />
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="100vw"
              className="object-cover opacity-80"
            />
          </motion.div>

          {/* Overview + Problem */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h2 className="heading-sm text-[#F0F0F8] mb-6">Overview</h2>
              <p className="text-[#9CA3AF] text-sm leading-relaxed mb-6">{project.overview}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div className="card-base p-8">
                <div className="label-sm mb-4">The Challenge</div>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">{project.problem}</p>
              </div>
              <div className="card-base p-8">
                <div className="label-sm mb-4">System Architecture</div>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">{project.architecture}</p>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="space-y-8 pt-8 border-t border-[#1c1c3a]">
            <h2 className="heading-sm text-[#F0F0F8]">Validation Metrics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.metrics.map(({ label, value }) => (
                <div key={label} className="card-base p-6">
                  <div className="label-muted mb-2">{label}</div>
                  <div className="font-syne text-xl font-bold text-[#F0F0F8]">{value}</div>
                </div>
              ))}
            </div>

            <div className="card-base p-8">
              <div className="label-sm mb-6">Key Highlights</div>
              <div className="space-y-4">
                {project.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-[#4F8EFF] shrink-0 mt-0.5" />
                    <span className="text-[#9CA3AF] text-sm leading-relaxed">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA links */}
          <div className="flex flex-wrap gap-4 pt-8 border-t border-[#1c1c3a]">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <ArrowUpRight size={14} />
                View Live
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                View on GitHub
              </a>
            )}
          </div>

          {/* Next project */}
          <div className="pt-8 border-t border-[#1c1c3a]">
            <Link
              href={`/work/${project.nextSlug}`}
              className="group flex items-center justify-between p-10 rounded-2xl bg-[#0f0f1e] border border-[#1c1c3a] hover:border-[#252548] hover:bg-[#13132a] transition-all duration-500"
            >
              <div>
                <div className="label-muted mb-3">Next Case Study</div>
                <h3 className="display-md text-[#F0F0F8] group-hover:text-white transition-colors">
                  {project.nextTitle}
                </h3>
              </div>
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110"
                style={{ background: accentColor }}
              >
                <ArrowUpRight size={22} />
              </div>
            </Link>
          </div>

        </div>
      </main>

      <FooterSection />
    </div>
  );
}
