import { Code2, Brain, Smartphone, GraduationCap, LucideIcon } from "lucide-react";

export interface AboutHighlight {
  icon: LucideIcon;
  label: string;
  description: string;
  color: string;
  number: string;
}

export const ABOUT_HIGHLIGHTS: AboutHighlight[] = [
  {
    icon: Code2,
    label: "Full-Stack Engineering",
    description: "React, Next.js, Node.js, FastAPI — end-to-end scalable product engineering with atomic data pipelines.",
    color: "#4F8EFF",
    number: "01",
  },
  {
    icon: Brain,
    label: "Machine Learning & AI",
    description: "XGBoost, TensorFlow, ModernBERT local routers, Groq LLM pipelines, and predictive telemetry models.",
    color: "#818CF8",
    number: "02",
  },
  {
    icon: Smartphone,
    label: "Mobile Development",
    description: "Production Flutter + Dart apps, Riverpod state management, atomic Firebase transactions, and Cloudinary CDN.",
    color: "#38BDF8",
    number: "03",
  },
  {
    icon: GraduationCap,
    label: "Undergraduate IT Engineer",
    description: "B.Tech Information Technology at RK University, Rajkot (2023 cohort) — shipping production systems while studying.",
    color: "#60A5FA",
    number: "04",
  },
];
