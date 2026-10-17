import Navbar from "@/components/Navbar";
import HeroSection from "@/components/hero";
import ProjectsSection from "@/components/projects";
import SkillsSection from "@/components/skills";
import AboutSection from "@/components/about";
import FooterSection from "@/components/footer";
import HashNavigationHandler from "@/components/HashNavigationHandler";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080810] text-[#F0F4FF] relative overflow-x-hidden">
      {/* Skip to Content accessible link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#4F8EFF] focus:text-white focus:rounded-lg focus:outline-none focus:shadow-lg focus:font-medium text-sm transition-all"
      >
        Skip to main content
      </a>

      {/* Fixed navbar */}
      <Navbar />

      {/* Main content landmark */}
      <main id="main-content" tabIndex={-1}>
        <HashNavigationHandler />

        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Projects */}
        <ProjectsSection />

        {/* 3. Skills */}
        <SkillsSection />

        {/* 4. About */}
        <AboutSection />
      </main>

      {/* 5. Footer / Contact */}
      <FooterSection />
    </div>
  );
}
