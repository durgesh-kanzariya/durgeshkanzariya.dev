export interface SkillItem {
  name: string;
  category: string;
}

export const SKILL_CATEGORIES: Record<string, string[]> = {
  "Frontend": [
    "React.js",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "JavaScript",
    "HTML5 / CSS3",
  ],
  "Backend": [
    "Node.js",
    "Express.js",
    "FastAPI",
    "Python",
    "REST APIs",
    "PostgreSQL",
    "SQL",
  ],
  "ML / AI": [
    "TensorFlow",
    "Keras",
    "Scikit-Learn",
    "XGBoost",
    "Pandas",
    "NumPy",
  ],
  "Mobile": [
    "Flutter",
    "Dart",
    "Firebase",
    "Riverpod",
  ],
  "Tools & Infra": [
    "Git",
    "GitHub",
    "Docker",
    "Figma",
    "VS Code",
    "Postman",
  ],
};

export const CATEGORY_ACCENTS: Record<string, string> = {
  "Frontend":      "#4F8EFF", // signature blue
  "Backend":       "#38BDF8", // sky blue
  "ML / AI":       "#818CF8", // soft indigo
  "Mobile":        "#60A5FA", // ice blue
  "Tools & Infra": "#94A3B8", // cool slate
};

// Flattened for marquee tickers
export const ALL_SKILLS: SkillItem[] = Object.entries(SKILL_CATEGORIES).flatMap(
  ([category, skills]) => skills.map((name) => ({ name, category }))
);

export const MARQUEE_ROW_1 = [...ALL_SKILLS.slice(0, 14), ...ALL_SKILLS.slice(0, 14)];
export const MARQUEE_ROW_2 = [...ALL_SKILLS.slice(14), ...ALL_SKILLS.slice(14)];
