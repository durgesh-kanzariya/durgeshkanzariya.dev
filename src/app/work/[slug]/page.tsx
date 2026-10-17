import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS, PROJECTS_MAP } from "@/data/projectsData";
import ProjectCaseStudyClient from "@/components/projects/ProjectCaseStudyClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS_MAP[slug];

  if (!project) {
    return {
      title: "Project Not Found — Durgesh Kanzariya",
    };
  }

  const title = `${project.title} — ${project.subtitle} | Durgesh Kanzariya`;
  const description = `${project.tagline} ${project.overview}`;
  const canonicalUrl = `https://durgeshkanzariya.dev/work/${project.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: `${project.title} Case Study Preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.image],
      creator: "@durgesh_kanzariya",
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS_MAP[slug];

  if (!project) {
    notFound();
  }

  return <ProjectCaseStudyClient project={project} />;
}
