"use client";
import { useState, useEffect, useRef } from "react";
import { Terminal, ChevronRight } from "lucide-react";

export default function InteractiveConsole() {
  const [cliHistory, setCliHistory] = useState<string[]>([
    "Durgesh System CLI v1.1.0 initialized.",
    "System Status: ONLINE // ACTIVE",
    "Type 'help' or click a quick command below to begin.",
    ""
  ]);
  const [cliInput, setCliInput] = useState("");
  const cliScrollContainerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Handle local terminal container scrolling only (prevents viewport page scroll)
  useEffect(() => {
    if (cliScrollContainerRef.current) {
      const container = cliScrollContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [cliHistory]);

  const executeCliCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let response: string[] = [];

    switch (trimmed) {
      case "help":
        response = [
          "Available Commands:",
          "  bio          - Short professional biography",
          "  skills       - Active engineering stack & tools",
          "  projects     - Overview of key built systems",
          "  credentials  - IIT Madras NPTEL silver medals",
          "  clear        - Flush terminal screen history"
        ];
        break;
      case "bio":
      case "about":
        response = [
          "BIOGRAPHY // DURGESH KANZARIYA",
          "Analytical software engineer & data scientist specializing in full-stack",
          "infrastructure, relational database mapping, and predictive machine learning.",
          "Focus areas: performance optimizations, clean schemas, and robust architectures."
        ];
        break;
      case "skills":
        response = [
          "ACTIVE ENVIRONMENT STACK",
          "  Languages:    Python, TypeScript, SQL, C++, Go (learning)",
          "  Frameworks:   Next.js, React, Node.js, Express.js, Tailwind CSS",
          "  Data Science: XGBoost, Pandas, NumPy, Scikit-learn, Matplotlib",
          "  Databases:    PostgreSQL, Redis, MongoDB"
        ];
        break;
      case "projects":
        response = [
          "BUILT SYSTEMS PORTFOLIO",
          "1. Aero Guard [Data Science Flagship]",
          "   - Machine learning telemetry pipeline forecasting engine RUL.",
          "   - Stack: Python, XGBoost, Scikit-learn.",
          "",
          "2. TravelDost [Full-Stack Architecture]",
          "   - Normalized SQL travel manager with <45ms index lookups.",
          "   - Stack: React, Express.js, PostgreSQL."
        ];
        break;
      case "credentials":
        response = [
          "ACADEMIC ACHIEVEMENTS & CREDENTIALS",
          "  - NPTEL Silver Medalist — Data Structures & Algorithms (IIT Madras)",
          "  - NPTEL Silver Medalist — Python for Data Science (IIT Madras)",
          "  - High-Performance Database Systems Distinction"
        ];
        break;
      case "clear":
        setCliHistory([]);
        setCliInput("");
        return;
      default:
        response = trimmed 
          ? [`Command not found: '${cmd}'. Type 'help' for instructions.`]
          : [];
    }

    setCliHistory(prev => [
      ...prev,
      `durgesh@portfolio:~$ ${cmd}`,
      ...response,
      ""
    ]);
    setCliInput("");
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
      className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl font-mono text-xs text-slate-350 w-full relative scanlines flex flex-col h-[400px] group"
    >
      {/* Spotlight hover bloom glow */}
      <div
        className="absolute pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-full"
        style={{
          width: "300px",
          height: "300px",
          left: mousePos.x,
          top: mousePos.y,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, rgba(59, 130, 246, 0.01) 45%, transparent 75%)",
          zIndex: 0,
        }}
      />
      {/* Terminal Title Bar */}
      <div className="bg-slate-950/80 border-b border-slate-850 px-4 py-3.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          {/* macOS window dots */}
          <span className="w-3.5 h-3.5 rounded-full bg-rose-500/80" />
          <span className="w-3.5 h-3.5 rounded-full bg-amber-500/80" />
          <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/80" />
        </div>
        <span className="text-[10px] tracking-wider text-slate-500 font-bold uppercase">
          durgesh@portfolio:~$ workspace_console
        </span>
        <div className="w-16" />
      </div>

      {/* Main Terminal Window Scroll Container */}
      <div 
        ref={cliScrollContainerRef}
        className="flex-1 p-5 overflow-y-auto scrollbar-thin space-y-1.5 min-h-0"
      >
        {cliHistory.map((line, idx) => {
          let textClass = "text-slate-300";
          if (line.startsWith("durgesh@")) {
            textClass = "text-tech-blue font-bold";
          } else if (line.startsWith("Available") || line.startsWith("ACTIVE") || line.startsWith("BIOGRAPHY") || line.startsWith("BUILT") || line.startsWith("ACADEMIC")) {
            textClass = "text-emerald-400 font-bold border-b border-slate-800/40 pb-0.5 inline-block";
          } else if (line.startsWith("  ")) {
            textClass = "text-slate-400 pl-4";
          }
          return (
            <div key={idx} className={`${textClass} leading-relaxed whitespace-pre-wrap`}>
              {line}
            </div>
          );
        })}
      </div>

      {/* Footer Interface Command Board */}
      <div className="bg-slate-950/40 border-t border-slate-850 p-4 space-y-3 shrink-0">
        {/* Click-to-run quick items */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest mr-1 select-none">// Quick Actions:</span>
          {["help", "bio", "skills", "projects", "credentials", "clear"].map((cmd) => (
            <button
              key={cmd}
              onClick={() => executeCliCommand(cmd)}
              className="bg-slate-850 hover:bg-slate-750 active:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 px-2.5 py-1 rounded-md text-[10px] transition-all cursor-pointer font-mono"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Live Shell Input Form */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            executeCliCommand(cliInput);
          }}
          className="flex items-center gap-2 border-t border-slate-850/50 pt-3"
        >
          <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0" />
          <span className="text-slate-450 font-bold select-none">durgesh@portfolio:~$</span>
          <input
            type="text"
            value={cliInput}
            onChange={(e) => setCliInput(e.target.value)}
            placeholder="type queries here (e.g. 'skills')..."
            className="bg-transparent border-none outline-none text-slate-200 font-mono text-xs flex-1 placeholder-slate-600"
          />
        </form>
      </div>
    </div>
  );
}
