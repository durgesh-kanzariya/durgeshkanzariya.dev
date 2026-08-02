export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectData {
  slug: string;
  id: string;
  title: string;
  subtitle: string;
  engine: string;
  domain: string;
  role: string;
  year: string;
  image: string;
  overview: string;
  problem: string;
  architecture: string;
  tags: string[];
  metrics: ProjectMetric[];
  highlights: string[];
  nextSlug: string;
  nextTitle: string;
}

export const PROJECTS_DATA: Record<string, ProjectData> = {
  "aero-guard": {
    slug: "aero-guard",
    id: "PROJECT_01",
    title: "Aero Guard",
    subtitle: "Predictive Machine Learning & Jet Engine RUL Analytics",
    engine: "XGBoost Engine // NASA C-MAPSS Telemetry",
    domain: "Aerospace & Predictive Data Science",
    role: "Lead Data Scientist & ML Architect",
    year: "2026",
    image: "/images/aero_guard_cover.png",
    overview: "Aero Guard is a predictive maintenance platform built to forecast the Remaining Useful Life (RUL) of commercial aircraft jet engines prior to structural degradation.",
    problem: "Unscheduled engine maintenance in commercial aviation leads to severe flight cancellations, logistics bottlenecks, and extreme financial penalties. Traditional threshold alerts trigger after degradation starts. The challenge was building a predictive ML engine capable of modeling non-linear thermal and pressure sensor degradation trajectories over hundreds of flight cycles.",
    architecture: "Engineered rolling statistical aggregates (rolling mean, rolling std, exponential moving averages) across 21 distinct engine sensors over multi-horizon window sizes. Used NASA's C-MAPSS simulation dataset to train and tune an optimized XGBoost gradient boosting regressor.",
    tags: ["Python", "XGBoost", "Predictive Analytics", "Machine Learning", "Scikit-Learn", "Feature Engineering"],
    metrics: [
      { label: "Target Metric", value: "RUL (Flight Cycles)" },
      { label: "Model Variant", value: "Optimized XGBoost" },
      { label: "Validation RMSE", value: "11.42 Cycles" },
      { label: "R² Score", value: "0.865" }
    ],
    highlights: [
      "Extracted non-linear degradation features from 21 multi-sensor telemetry channels.",
      "Achieved an outstanding Validation RMSE of 11.42 cycles across test turbine fleets.",
      "Formulated early warning thresholds allowing proactive maintenance scheduling before component failure."
    ],
    nextSlug: "traveldost",
    nextTitle: "TravelDost",
  },
  "traveldost": {
    slug: "traveldost",
    id: "PROJECT_02",
    title: "TravelDost",
    subtitle: "Full-Stack Web Companion & Relational Itinerary Engine",
    engine: "React + Express + PostgreSQL Schema",
    domain: "Full-Stack Web & Relational Database Systems",
    role: "Lead Full-Stack Engineer & Database Architect",
    year: "2026",
    image: "/images/traveldost_logo.jpeg",
    overview: "TravelDost is a full-stack companion web platform featuring 3NF normalized relational database schemas, multi-tier API routing architectures, and responsive component UI layouts.",
    problem: "Standard travel planning tools rely on unstructured documents or flat lists, causing synchronization friction when tracking multi-destination itineraries across travel companions. The objective was engineering an atomic relational database schema with sub-50ms API lookups.",
    architecture: "Normalized PostgreSQL database tables down to 3NF atomic schemas to ensure strict relational integrity constraints between User Accounts, Trip Itineraries, and Stop Coordinates. Built RESTful Express API routes with parameterized SQL queries and deployed a responsive React frontend.",
    tags: ["React.js", "Node.js", "Express.js", "PostgreSQL", "Tailwind CSS", "RESTful APIs"],
    metrics: [
      { label: "Database Engine", value: "PostgreSQL" },
      { label: "API Routing", value: "RESTful Express" },
      { label: "Query Speed", value: "<45ms Index Lookups" },
      { label: "Schema Model", value: "Atomic 3NF Standard" }
    ],
    highlights: [
      "Engineered 3NF database schema guaranteeing zero redundant data duplicates across multi-day itineraries.",
      "Achieved sub-45ms SQL query execution using indexing strategy on trip lookup keys.",
      "Built custom React state engine linking interactive maps with step-by-step travel schedules."
    ],
    nextSlug: "aero-guard",
    nextTitle: "Aero Guard",
  }
};
