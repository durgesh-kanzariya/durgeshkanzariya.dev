"use client";

import { useState, useRef, useEffect, MouseEvent } from "react";
import { Copy, Check, Play, Terminal, FileCode2, Activity } from "lucide-react";

type Tab = "snapshot" | "terminal" | "telemetry";

// Default resting 3D tilt angled toward the top-right corner
const RESTING_TRANSFORM =
  "perspective(1000px) rotateX(5.5deg) rotateY(6.5deg) scale3d(1.02, 1.02, 1.02)";
const FLAT_TRANSFORM =
  "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
const RESTING_GLARE = { x: 80, y: 20, opacity: 0.14 };
const INITIAL_GLARE = { x: 50, y: 50, opacity: 0 };

export default function HeroVisual() {
  const [activeTab, setActiveTab] = useState<Tab>("snapshot");
  const [copied, setCopied] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [outputLogs, setOutputLogs] = useState<string[]>([
    "ready for next problem",
  ]);

  // 3D Tilt & Glare State
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState(FLAT_TRANSFORM);
  const [glarePosition, setGlarePosition] = useState(INITIAL_GLARE);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-tilt animation triggered AFTER preloader lifts up so the user sees it happen
  useEffect(() => {
    let triggered = false;

    const triggerTilt = (delayMs = 250) => {
      if (triggered) return;
      triggered = true;
      setTimeout(() => {
        setTransformStyle(RESTING_TRANSFORM);
        setGlarePosition(RESTING_GLARE);
      }, delayMs);
    };

    // If preloader has already completed (e.g. fast nav or already lifted)
    if (typeof window !== "undefined" && window.__preloaderDone) {
      triggerTilt(300);
      return;
    }

    const handlePreloaderComplete = () => {
      triggerTilt(250);
    };

    window.addEventListener("preloader-complete", handlePreloaderComplete);

    // Fallback timer (in case preloader is disabled, skipped, or finishes on fallback)
    const fallbackTimer = setTimeout(() => {
      triggerTilt(0);
    }, 3800);

    return () => {
      window.removeEventListener("preloader-complete", handlePreloaderComplete);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    setIsHovered(true);

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7.5; // max 7.5 deg
    const rotateY = ((x - centerX) / centerX) * 7.5;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`
    );

    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.16,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smoothly return back to the top-right tilted resting position
    setTransformStyle(RESTING_TRANSFORM);
    setGlarePosition(RESTING_GLARE);
  };

  const handleCopy = () => {
    const code = `const durgesh = {
  name: 'Durgesh Kanzariya',
  role: 'Full-Stack + ML',
  stack: ['React', 'FastAPI', 'Flutter'],
  university: 'RK University',
  shipped: 5,
};
export default durgesh;`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runCommand = (cmd: string) => {
    setExecuting(true);
    let result = "";
    if (cmd === "pnpm run test") {
      result = "✓ All 18 test suites passed (100% coverage).";
    } else if (cmd === "git status") {
      result = "On branch main. Working tree clean. Zero technical debt.";
    } else {
      result = `Running ${cmd}... System nominal. Ping: 1.2ms.`;
    }

    setOutputLogs((prev) => [...prev.slice(-3), `> ${cmd}`, result]);
    setTimeout(() => setExecuting(false), 400);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: isHovered
          ? "transform 0.1s ease-out"
          : "transform 0.85s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      className="relative w-full cursor-pointer select-none group pointer-events-auto"
    >
      {/* Ambient reactive glow */}
      <div className="absolute inset-0 rounded-2xl bg-[#4F8EFF]/15 blur-3xl scale-105 pointer-events-none transition-opacity duration-500 group-hover:bg-[#4F8EFF]/25" />

      {/* Terminal card */}
      <div className="relative rounded-2xl border border-[#1A1D33] group-hover:border-[#4F8EFF]/40 bg-[#0E101E]/95 backdrop-blur-xl overflow-hidden shadow-2xl transition-colors duration-300">

        {/* Dynamic Glare Overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl z-30"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,${glarePosition.opacity}), transparent 60%)`,
            transition: isHovered
              ? "opacity 0.15s ease-out"
              : "all 0.85s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />

        {/* Window Chrome Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1A1D33] bg-[#080810]/90">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]/80 group-hover:bg-[#FF5F57] transition-colors" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80 group-hover:bg-[#FFBD2E] transition-colors" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]/80 group-hover:bg-[#28C840] transition-colors" />

            {/* Interactive Tab Switcher */}
            <div className="ml-3 flex items-center gap-1 bg-[#14172B]/80 p-0.5 rounded-lg border border-[#1E223D]">
              <button
                type="button"
                onClick={() => setActiveTab("snapshot")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[0.72rem] font-mono transition-all ${
                  activeTab === "snapshot"
                    ? "bg-[#1E223D] text-[#F0F4FF] shadow-sm font-semibold"
                    : "text-[#64748B] hover:text-[#94A3B8]"
                }`}
              >
                <FileCode2 size={12} className={activeTab === "snapshot" ? "text-[#4F8EFF]" : ""} />
                snapshot.ts
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("terminal")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[0.72rem] font-mono transition-all ${
                  activeTab === "terminal"
                    ? "bg-[#1E223D] text-[#F0F4FF] shadow-sm font-semibold"
                    : "text-[#64748B] hover:text-[#94A3B8]"
                }`}
              >
                <Terminal size={12} className={activeTab === "terminal" ? "text-[#4F8EFF]" : ""} />
                terminal.zsh
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("telemetry")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[0.72rem] font-mono transition-all ${
                  activeTab === "telemetry"
                    ? "bg-[#1E223D] text-[#F0F4FF] shadow-sm font-semibold"
                    : "text-[#64748B] hover:text-[#94A3B8]"
                }`}
              >
                <Activity size={12} className={activeTab === "telemetry" ? "text-[#4F8EFF]" : ""} />
                live.log
              </button>
            </div>
          </div>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[0.68rem] font-mono text-[#64748B] hover:text-[#F0F4FF] hover:bg-[#1A1D33] transition-all"
            title="Copy code"
          >
            {copied ? (
              <>
                <Check size={13} className="text-[#38BDF8]" />
                <span className="text-[#38BDF8]">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Tab 1: Code Snapshot */}
        {activeTab === "snapshot" && (
          <div className="p-6 font-mono text-[0.78rem] leading-relaxed space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[#64748B]">{"// 2026 engineer stack & state"}</span>
              <span className="text-[0.6rem] px-2 py-0.5 rounded-full bg-[#14172B] text-[#4F8EFF] border border-[#1E223D]">
                TypeScript 5.8
              </span>
            </div>
            <div className="h-1.5" />

            <div>
              <span className="text-[#818CF8]">const</span>
              <span className="text-[#F0F4FF]"> durgesh </span>
              <span className="text-[#60A5FA]">=</span>
              <span className="text-[#F0F4FF]"> {"{"}</span>
            </div>

            {[
              { key: "name",       val: "'Durgesh Kanzariya'" },
              { key: "role",       val: "'Full-Stack + ML'" },
              { key: "stack",      val: "['React', 'FastAPI', 'Flutter']" },
              { key: "university", val: "'RK University'" },
            ].map(({ key, val }) => (
              <div key={key} className="pl-4 hover:bg-white/[0.03] rounded px-1 -mx-1 transition-colors">
                <span className="text-[#38BDF8]">{key}</span>
                <span className="text-[#64748B]">: </span>
                <span className="text-[#93C5FD]">{val}</span>
                <span className="text-[#F0F4FF]">,</span>
              </div>
            ))}

            <div className="pl-4 hover:bg-white/[0.03] rounded px-1 -mx-1 transition-colors">
              <span className="text-[#38BDF8]">shipped</span>
              <span className="text-[#64748B]">: </span>
              <span className="text-[#93C5FD]">5</span>
              <span className="text-[#64748B]">{", // production projects"}</span>
            </div>

            <div><span className="text-[#F0F4FF]">{"}"}</span></div>
            <div className="h-1.5" />

            <div>
              <span className="text-[#818CF8]">export</span>
              <span className="text-[#F0F4FF]"> default durgesh</span>
            </div>

            {/* Interactive Runner Trigger */}
            <div
              onClick={() => runCommand("durgesh.execute()")}
              className="flex items-center justify-between mt-3 pt-2 border-t border-[#1A1D33]/60 cursor-pointer group/run hover:bg-[#14172B]/60 px-2 py-1 rounded transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-[#4F8EFF] group-hover/run:translate-x-0.5 transition-transform">
                  <Play size={10} fill="#4F8EFF" />
                </span>
                <span className="text-[#94A3B8] text-[0.7rem] group-hover/run:text-[#F0F4FF]">
                  {outputLogs[outputLogs.length - 1]}
                </span>
                <span className="inline-block w-1.5 h-3 bg-[#4F8EFF] ml-0.5 animate-pulse" />
              </div>
              <span className="text-[0.62rem] text-[#475569] group-hover/run:text-[#4F8EFF] transition-colors">
                Click to run ▶
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Terminal */}
        {activeTab === "terminal" && (
          <div className="p-6 font-mono text-[0.78rem] leading-relaxed space-y-3.5 min-h-[250px] flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-[#64748B] text-[0.72rem]">
                Durgesh CLI v2.4 (darwin-arm64) — Interactive session
              </div>
              {outputLogs.map((log, i) => (
                <div
                  key={i}
                  className={log.startsWith(">") ? "text-[#38BDF8] font-semibold" : "text-[#94A3B8]"}
                >
                  {log}
                </div>
              ))}
            </div>

            {/* Quick action buttons */}
            <div className="pt-3 border-t border-[#1A1D33] flex flex-wrap gap-2">
              <span className="text-[#475569] text-[0.68rem] self-center mr-1">Quick run:</span>
              <button
                type="button"
                disabled={executing}
                onClick={() => runCommand("pnpm run test")}
                className="px-2.5 py-1 rounded bg-[#14172B] hover:bg-[#1E223D] border border-[#1E223D] text-[#93C5FD] text-[0.68rem] transition-colors active:scale-95"
              >
                test:all
              </button>
              <button
                type="button"
                disabled={executing}
                onClick={() => runCommand("git status")}
                className="px-2.5 py-1 rounded bg-[#14172B] hover:bg-[#1E223D] border border-[#1E223D] text-[#93C5FD] text-[0.68rem] transition-colors active:scale-95"
              >
                git:status
              </button>
              <button
                type="button"
                disabled={executing}
                onClick={() => runCommand("system.health()")}
                className="px-2.5 py-1 rounded bg-[#14172B] hover:bg-[#1E223D] border border-[#1E223D] text-[#93C5FD] text-[0.68rem] transition-colors active:scale-95"
              >
                health
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Live Telemetry */}
        {activeTab === "telemetry" && (
          <div className="p-6 font-mono text-[0.78rem] leading-relaxed space-y-3.5 min-h-[250px]">
            <div className="text-[#64748B] text-[0.72rem]">Telemetry sync: Quantum uplink active</div>
            
            <div className="grid grid-cols-2 gap-3.5 pt-1">
              <div className="p-3 rounded-lg bg-[#14172B]/60 border border-[#1E223D]">
                <div className="text-[0.65rem] text-[#64748B] uppercase tracking-wider">Ping Latency</div>
                <div className="text-base font-bold text-[#38BDF8] mt-0.5">1.2 ms</div>
              </div>
              <div className="p-3 rounded-lg bg-[#14172B]/60 border border-[#1E223D]">
                <div className="text-[0.65rem] text-[#64748B] uppercase tracking-wider">Uptime Rate</div>
                <div className="text-base font-bold text-[#28C840] mt-0.5">99.98%</div>
              </div>
              <div className="p-3 rounded-lg bg-[#14172B]/60 border border-[#1E223D]">
                <div className="text-[0.65rem] text-[#64748B] uppercase tracking-wider">Active Runtime</div>
                <div className="text-base font-bold text-[#F0F4FF] mt-0.5">WebGL + React 19</div>
              </div>
              <div className="p-3 rounded-lg bg-[#14172B]/60 border border-[#1E223D]">
                <div className="text-[0.65rem] text-[#64748B] uppercase tracking-wider">Matrix Grid</div>
                <div className="text-base font-bold text-[#818CF8] mt-0.5">Synced</div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 text-[#64748B] text-[0.7rem]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#28C840] animate-ping" />
              <span>Telemetry streaming real-time metrics</span>
            </div>
          </div>
        )}

        {/* Interactive Bottom Stat Bar */}
        <div className="border-t border-[#1A1D33] px-6 py-3.5 flex items-center justify-between bg-[#080810]/80">
          <div className="flex items-center gap-7">
            {[
              { label: "Projects", value: "5" },
              { label: "Domains",  value: "3" },
              { label: "Status",   value: "Open" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="text-[#475569] text-[0.65rem] uppercase tracking-widest font-mono">
                  {label}
                </span>
                <span
                  className="text-[0.72rem] font-mono font-bold"
                  style={{ color: value === "Open" ? "#4F8EFF" : "#F0F4FF" }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[0.68rem] font-mono text-[#64748B]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4F8EFF] animate-pulse" />
            <span>Interactive Node</span>
          </div>
        </div>

      </div>
    </div>
  );
}
