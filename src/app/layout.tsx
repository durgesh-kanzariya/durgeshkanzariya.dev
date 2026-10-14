import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import PageTransition from "@/components/PageTransition";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"],
  display: "swap",
  preload: true,
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  preload: true,
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Durgesh Kanzariya — Engineer by craft. Builder by passion.",
  description:
    "IT engineer at RK University building real systems across the full stack — from React dashboards and FastAPI backends to Flutter mobile apps and deep learning models.",
  keywords: [
    "Durgesh Kanzariya",
    "Full-Stack Developer",
    "Flutter Developer",
    "Machine Learning",
    "React",
    "FastAPI",
    "Portfolio",
    "RK University",
  ],
  authors: [{ name: "Durgesh Kanzariya", url: "https://durgeshkanzariya.dev" }],
  creator: "Durgesh Kanzariya",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://durgeshkanzariya.dev",
    title: "Durgesh Kanzariya — Engineer by craft. Builder by passion.",
    description:
      "IT engineer building real systems across the full stack — web, mobile, ML.",
    siteName: "Durgesh Kanzariya",
  },
  twitter: {
    card: "summary_large_image",
    title: "Durgesh Kanzariya — Portfolio",
    description: "Full-Stack Engineer & ML Developer. Engineer by craft. Builder by passion.",
    creator: "@durgesh_kanzariya",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${jakarta.variable} ${jetbrains.variable} antialiased`}
    >
      <body
        suppressHydrationWarning
        className="bg-[#080810] text-[#F0F0F8] md:cursor-none relative overflow-x-hidden"
      >
        {/* Cinematic Liquid Wave Preloader */}
        <Preloader />

        {/* Noise overlay — subtle film grain */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Ambient glow mesh */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          {/* Top-left blue glow */}
          <div className="glow-tl absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-[#4F8EFF]/8 blur-[150px]" />
          {/* Bottom-right purple glow */}
          <div className="glow-br absolute -bottom-40 -right-40 w-[750px] h-[750px] rounded-full bg-[#A855F7]/6 blur-[180px]" />
          {/* Center subtle accent */}
          <div className="glow-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#4F8EFF]/5 blur-[120px]" />
        </div>

        {/* Custom cursor */}
        <CustomCursor />

        {/* App content */}
        <SmoothScrollProvider>
          <PageTransition>{children}</PageTransition>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
