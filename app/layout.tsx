import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"],
  display: "swap",
  preload: false,
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  preload: false,
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Durgesh Kanzariya // Full-Stack & Data Systems Engineer",
  description: "Architecting high-performance web applications & intelligent machine learning models.",
};

import CustomCursor from "@/components/CustomCursor";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import PageTransition from "@/components/PageTransition";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${jakarta.variable} ${jetbrains.variable} antialiased font-sans`}
    >
      <body suppressHydrationWarning className="bg-[#07070A] text-white selection:bg-purple-600 selection:text-white md:cursor-none relative overflow-x-hidden">
        {/* 1. NOISE OVERLAY: Fixed, pointer-events-none noise texture layer (z-40, opacity 0.025) */}
        <div className="cyber-noise-overlay" />

        {/* 2. AMBIENT MESH PULSE: Slow-orbiting radial background blurs (z-0, 20s loop) */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Top-Left Deep Purple Glow (#6B21A8 at 15% opacity) */}
          <div className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full bg-[#6B21A8]/15 blur-[140px] animate-orbit-tl" />

          {/* Bottom-Right Violet-Indigo Glow (#4C1D95 at 15% opacity) */}
          <div className="absolute -bottom-32 -right-32 w-[700px] h-[700px] rounded-full bg-[#4C1D95]/15 blur-[160px] animate-orbit-br" />
        </div>

        <CustomCursor />
        <SmoothScrollProvider>
          <PageTransition>{children}</PageTransition>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
