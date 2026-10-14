"use client";

import { forwardRef } from "react";

const AboutBio = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="space-y-5 text-[#94A3B8] text-base leading-relaxed">
      <p>
        I&apos;m Durgesh Kanzariya, a B.Tech IT engineer at RK University, Rajkot (2023 cohort),
        building production systems across the full software stack — from responsive React dashboards
        and FastAPI backends to Flutter mobile apps and deep learning models.
      </p>
      <p>
        My work focuses on real-world engineering challenges: atomic Firestore transactions with
        physical handover verification, dual-model AI triage pipelines combining local BERT routers
        with cloud LLMs, and predictive degradation forecasting on aerospace sensor telemetry.
      </p>
      <p>
        I believe the best engineers learn by building. Every project in this portfolio
        was conceived as a solution to a concrete problem and engineered to production standards.
      </p>

      {/* Quote */}
      <blockquote className="mt-8 pl-5 border-l-2 border-[#4F8EFF] text-[#64748B] text-sm italic font-mono">
        &ldquo;Engineer by craft. Builder by passion.&rdquo;
      </blockquote>
    </div>
  );
});

AboutBio.displayName = "AboutBio";

export default AboutBio;
