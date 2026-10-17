export type ProjectDomain = "web" | "ml" | "mobile" | "ai";

export interface ProjectData {
  slug: string;
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  domain: ProjectDomain;
  domainLabel: string;
  stack: string;
  role: string;
  year: string;
  image: string;
  overview: string;
  problem: string;
  architecture: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  nextSlug: string;
  nextTitle: string;
}

export const PROJECTS: ProjectData[] = [
  {
    slug: "conduit",
    id: "PROJECT_01",
    title: "Conduit",
    subtitle: "AI Decision Routing Engine",
    tagline: "High-throughput intelligent triage for unstructured payloads.",
    domain: "ai",
    domainLabel: "AI / Backend Systems",
    stack: "FastAPI · Python · React + Vite · Groq LLM · ModernBERT",
    role: "Full-Stack AI Engineer",
    year: "2026",
    image: "/images/conduit_cover.webp",
    overview:
      "Conduit is a high-performance decision routing system that classifies and triages unstructured payloads in real-time using a two-layer AI stack: a lightweight local ModernBERT router (Laya) for zero-cost on-device inference, and Groq-hosted llama-3.3-70b for complex reasoning.",
    problem:
      "Support and operations teams drown in unstructured ticket floods. Manual triage is slow, inconsistent, and doesn't scale. The challenge was building a system that routes tickets to the right priority (P0–P3) with confidence scoring and graceful uncertainty escalation.",
    architecture:
      "FastAPI backend with async request handling. Input sanitization via BeautifulSoup4. Dual-model routing: ModernBERT for cheap local classification, Groq LLM for full reasoning. Pydantic v2 enforces strict JSON schema on every response. React + Vite enterprise dashboard for real-time triage visualization.",
    tags: ["FastAPI", "Python", "React", "Vite", "Groq", "ModernBERT", "Pydantic v2"],
    metrics: [
      { label: "Routing Engine", value: "Dual-Model (ModernBERT + Groq)" },
      { label: "LLM Reasoning", value: "llama-3.3-70b-versatile" },
      { label: "Response Latency", value: "~780ms API / <15ms Local" },
      { label: "Confidence Tiers", value: "4-Level SLA Triage (P0–P3)" },
    ],
    highlights: [
      "Zero-crash architecture — graceful fallback on API timeout or parse failure.",
      "Confidence < 0.5 automatically escalates to human review queue.",
      "ModernBERT handles privacy-sensitive payloads entirely on-device.",
    ],
    liveUrl: "https://conduit.durgeshkanzariya.dev",
    githubUrl: "https://github.com/durgesh-kanzariya/conduit",
    featured: true,
    nextSlug: "dukan-sathi",
    nextTitle: "Dukan Sathi",
  },
  {
    slug: "dukan-sathi",
    id: "PROJECT_02",
    title: "Dukan Sathi",
    subtitle: "Flutter E-Commerce Mobile Platform",
    tagline: "Bridging local retail shops with nearby customers.",
    domain: "mobile",
    domainLabel: "Mobile Development",
    stack: "Flutter · Dart · Riverpod · Firebase · Cloudinary CDN",
    role: "Flutter & Firebase Engineer",
    year: "2026",
    image: "/images/dukan_sathi_cover.webp",
    overview:
      "Dukan Sathi is an enterprise-grade Flutter mobile application connecting local neighborhood shops with customers via pre-ordering, real-time inventory, QR code handover verification, and financial profit analytics.",
    problem:
      "Local kirana shops lack digital tooling for order management and inventory tracking. Customers have no way to pre-order or discover nearby shops. The challenge was building a dual-role app (customer + merchant) with atomic transaction guarantees and real-time sync.",
    architecture:
      "Clean Architecture with Riverpod for state management. Firebase Firestore for real-time data with atomic read-before-write transactions on order pickup. Cloudinary CDN for direct camera-to-cloud product photo uploads. Animated pill navigation shell shared across Customer and Shopkeeper profiles.",
    tags: ["Flutter", "Dart", "Riverpod", "Firebase", "Firestore", "Cloudinary"],
    metrics: [
      { label: "Handover Security", value: "QR Scan & 4-Digit One-Time PIN" },
      { label: "Concurrency", value: "Atomic Firestore Transactions" },
      { label: "State Management", value: "Clean Architecture + Riverpod" },
      { label: "Media Pipeline", value: "Direct-to-Cloudinary CDN" },
    ],
    highlights: [
      "Atomic Firestore handover — no order can be marked complete without QR scan or PIN.",
      "Real-time profit analytics: cost price, sell price, net margin, AOV.",
      "Single-document shop upsert prevents duplicate merchant registrations.",
    ],
    githubUrl: "https://github.com/durgesh-kanzariya/Dukan-Sathi-Mobile-Application",
    featured: true,
    nextSlug: "aero-guard",
    nextTitle: "Aero Guard",
  },
  {
    slug: "aero-guard",
    id: "PROJECT_03",
    title: "Aero Guard",
    subtitle: "Predictive ML Jet Engine Analytics",
    tagline: "Forecasting engine degradation before it happens.",
    domain: "ml",
    domainLabel: "Machine Learning / Data Science",
    stack: "Python · XGBoost · Scikit-Learn · NASA C-MAPSS",
    role: "Lead ML Engineer",
    year: "2026",
    image: "/images/aero_guard_cover.webp",
    overview:
      "Aero Guard is a predictive maintenance platform that forecasts Remaining Useful Life (RUL) of commercial jet engines from 21 multi-sensor telemetry channels, allowing proactive maintenance scheduling before structural degradation.",
    problem:
      "Unscheduled aircraft maintenance causes massive flight cancellations and financial losses. Traditional threshold alerts trigger only after degradation starts. The challenge was modeling non-linear thermal and pressure sensor degradation trajectories across hundreds of flight cycles.",
    architecture:
      "Engineered rolling statistical aggregates (mean, std, EMA) across 21 engine sensors over multi-horizon windows. Trained and tuned an XGBoost gradient boosting regressor on NASA C-MAPSS simulation dataset with feature selection and hyperparameter optimization.",
    tags: ["Python", "XGBoost", "Scikit-Learn", "Pandas", "NumPy", "Feature Engineering"],
    metrics: [
      { label: "Validation Dataset", value: "NASA C-MAPSS (FD001)" },
      { label: "Model Architecture", value: "Tuned XGBoost Regressor" },
      { label: "Validation RMSE", value: "11.42 Cycles (vs 14.5 baseline)" },
      { label: "Telemetry Inputs", value: "21 Sensor Rolling Aggregates" },
    ],
    highlights: [
      "Extracted non-linear degradation features from 21 multi-sensor telemetry channels.",
      "Validation RMSE of 11.42 cycles — well below safety-critical threshold.",
      "Early warning thresholds enable proactive scheduling before component failure.",
    ],
    githubUrl: "https://github.com/durgesh-kanzariya/aero-guard",
    featured: true,
    nextSlug: "traveldost",
    nextTitle: "TravelDost",
  },
  {
    slug: "traveldost",
    id: "PROJECT_04",
    title: "TravelDost",
    subtitle: "Full-Stack Travel Companion Platform",
    tagline: "Atomic relational itineraries at sub-45ms.",
    domain: "web",
    domainLabel: "Full-Stack Web",
    stack: "React · Node.js · Express · PostgreSQL · REST APIs",
    role: "Full-Stack Engineer & DB Architect",
    year: "2026",
    image: "/images/traveldost_cover.webp",
    overview:
      "TravelDost is a full-stack travel planning platform with 3NF normalized PostgreSQL schemas, multi-tier RESTful API routing, and a responsive React frontend for managing multi-destination itineraries.",
    problem:
      "Standard travel tools rely on unstructured documents. The goal was engineering an atomic relational database with sub-50ms API lookups across travel companions.",
    architecture:
      "Normalized PostgreSQL to 3NF atomic schemas. RESTful Express API routes with parameterized SQL queries. React frontend with custom state engine linking interactive maps to travel schedules.",
    tags: ["React.js", "Node.js", "Express.js", "PostgreSQL", "Tailwind CSS", "REST API"],
    metrics: [
      { label: "Relational Schema", value: "Strict 3NF Normalization" },
      { label: "API Framework", value: "RESTful Express.js" },
      { label: "Query Execution", value: "<45ms Indexed Queries" },
      { label: "State Sync", value: "Interactive Map & Schedule Engine" },
    ],
    highlights: [
      "Zero redundant data via strict 3NF normalization.",
      "Sub-45ms SQL execution with indexing on trip lookup keys.",
      "Interactive map state engine linked to step-by-step schedule.",
    ],
    githubUrl: "https://github.com/durgesh-kanzariya/Travel-Dost",
    featured: false,
    nextSlug: "sentiment-analysis",
    nextTitle: "Sentiment Analysis DL",
  },
  {
    slug: "sentiment-analysis",
    id: "PROJECT_05",
    title: "Sentiment Analysis DL",
    subtitle: "Deep Learning NLP Classifier",
    tagline: "85.1% accuracy. 626KB model. 100% offline.",
    domain: "ml",
    domainLabel: "Deep Learning / NLP",
    stack: "Python · TensorFlow · Keras · IMDb Dataset",
    role: "ML Engineer",
    year: "2026",
    image: "/images/sentiment_cover.webp",
    overview:
      "End-to-end binary sentiment classifier for movie reviews using custom word embeddings and Global Average Pooling. Achieves 85.1% accuracy on 25,000 unseen reviews with a 626KB model that trains in under 10 seconds on CPU.",
    problem:
      "Millions of reviews are generated daily across platforms. Manual sentiment inspection at scale is impossible. The goal was a lightweight, fast, fully offline-capable model.",
    architecture:
      "Embedding layer + GlobalAveragePooling1D avoids expensive RNNs/LSTMs. Standalone dataset builder stores IMDb as binary .npy arrays for 100% offline use. Custom inference pipeline handles text normalization, tokenization, and sigmoid confidence scoring.",
    tags: ["Python", "TensorFlow", "Keras", "NLP", "Word Embeddings", "Deep Learning"],
    metrics: [
      { label: "Evaluation Dataset", value: "25,000 Reviews (IMDb Test Split)" },
      { label: "Accuracy / Loss", value: "85.10% / 0.3703 Binary CE" },
      { label: "Model Footprint", value: "626 KB (Zero Cloud Deps)" },
      { label: "CPU Inference", value: "<8ms per text sample" },
    ],
    highlights: [
      "100% offline — no API calls, no internet dependency during inference.",
      "Lightweight architecture avoids RNNs for 10x faster training.",
      "Custom predict_sentiment() with full text normalization pipeline.",
    ],
    githubUrl: "https://github.com/durgesh-kanzariya/Sentiment_Analysis_DL",
    featured: false,
    nextSlug: "conduit",
    nextTitle: "Conduit",
  },
];

// Convenience accessors
export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
export const GRID_PROJECTS = PROJECTS.filter((p) => !p.featured);
export const PROJECTS_MAP = Object.fromEntries(PROJECTS.map((p) => [p.slug, p]));
