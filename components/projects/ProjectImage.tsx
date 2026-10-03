import Image from "next/image";
import { type ProjectData } from "@/data/projectsData";
import { DOMAIN_COLORS } from "./domainColors";

interface ProjectImageProps {
  project: ProjectData;
}

export default function ProjectImage({ project }: ProjectImageProps) {
  const domainColor = DOMAIN_COLORS[project.domain];

  return (
    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#0E101E] border border-[#1A1D33] group-hover:border-[#252846] transition-colors duration-500">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080810]/80 via-transparent to-transparent z-10" />

      {/* Domain color tint */}
      <div
        className="absolute inset-0 z-[5] opacity-8"
        style={{ background: `radial-gradient(circle at 30% 30%, ${domainColor}30, transparent 60%)` }}
      />

      {/* Project image */}
      <div className="absolute inset-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover opacity-75 group-hover:opacity-95 transition-opacity duration-500 group-hover:scale-[1.02] transition-transform"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* Fallback letter placeholder */}
      <div className="absolute inset-0 flex items-center justify-center z-[2]">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-syne font-bold opacity-15"
          style={{ background: `${domainColor}18`, color: domainColor }}
        >
          {project.title[0]}
        </div>
      </div>
    </div>
  );
}
