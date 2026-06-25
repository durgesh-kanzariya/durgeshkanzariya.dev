"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ProjectProps {
  id: string;
  title: string;
  category: string;
  scope: string;
  engine: string;
  description: string;
  tags: string[];
  image?: string;
}

function DecryptedText({ text, isHovered }: { text: string; isHovered: boolean }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#@$%";

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      return;
    }
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterations) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iterations >= text.length) {
        clearInterval(interval);
      }
      iterations += 1;
    }, 25);
    return () => clearInterval(interval);
  }, [isHovered, text]);

  return <span>{displayText}</span>;
}

export default function ProjectCard({ 
  project, 
  onClick 
}: { 
  project: ProjectProps; 
  onClick: () => void; 
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layoutId={`card-container-${project.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6, boxShadow: "0 20px 40px -15px rgba(59, 130, 246, 0.08)" }}
      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
      onClick={onClick}
      className="bg-card-bg border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between group cursor-pointer relative overflow-hidden transition-colors duration-300 hover:border-tech-blue/30"
    >
      {/* Decorative subtle background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-tech-blue/[0.01] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        {/* Technical metadata layout (Killian Herzer style) */}
        <motion.div 
          layoutId={`card-meta-${project.id}`}
          className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4 text-[10px] font-mono tracking-wider text-ink-muted"
        >
          <span className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${isHovered ? "bg-tech-blue animate-ping" : "bg-slate-350"}`} />
            {project.id} // {project.category}
          </span>
          <span className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-ink-primary font-medium text-[9px] uppercase tracking-widest">
            {project.scope}
          </span>
        </motion.div>

        {/* Project cover preview image */}
        {project.image && (
          <motion.div 
            layoutId={`card-image-${project.id}`}
            className="w-full aspect-[2.1/1] rounded-xl overflow-hidden border border-slate-150 mb-5 relative group"
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent pointer-events-none" />
          </motion.div>
        )}

        <motion.h3 
          layoutId={`card-title-${project.id}`}
          className="text-xl font-bold text-ink-primary group-hover:text-tech-blue transition-colors duration-300 flex items-center gap-1"
        >
          <DecryptedText text={project.title} isHovered={isHovered} />
          <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-tech-blue" />
        </motion.h3>
        
        <motion.p 
          layoutId={`card-engine-${project.id}`}
          className="text-[11px] font-mono text-tech-blue mt-1.5 mb-3 tracking-wide"
        >
          {project.engine}
        </motion.p>
        
        <motion.p 
          layoutId={`card-desc-${project.id}`}
          className="text-sm text-ink-muted leading-relaxed mb-6 font-sans font-[400]"
        >
          {project.description}
        </motion.p>
      </div>

      <motion.div 
        layoutId={`card-tags-${project.id}`}
        className="flex flex-wrap gap-1.5 mt-auto relative z-10"
      >
        {project.tags.map((tag, idx) => (
          <span 
            key={idx} 
            className="text-[10px] font-mono px-2.5 py-1 bg-slate-50 border border-slate-150 rounded-md text-ink-primary group-hover:bg-white group-hover:border-slate-250 transition-colors duration-300"
          >
            {tag}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
