import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[100dvh] bg-[#080810] text-[#F0F4FF] flex flex-col">
      <header className="section-container py-6">
        <Link
          href="/"
          className="font-mono text-sm text-[#F0F4FF] hover:text-[#4F8EFF] transition-colors focus-visible:outline-2 focus-visible:outline-[#4F8EFF]"
        >
          durgeshkanzariya<span className="text-[#4F8EFF]">.dev</span>
        </Link>
      </header>

      <div className="flex-1 section-container flex items-center">
        <div className="max-w-2xl py-24">
          <p className="label-sm mb-6">404 / Page not found</p>
          <h1 className="display-lg text-balance mb-6">
            This page isn&apos;t here.
          </h1>
          <p className="max-w-xl text-[#94A3B8] text-base md:text-lg leading-relaxed mb-10">
            The address may be out of date, or the page may have moved. Head back to the portfolio or browse the project work.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="btn-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F8EFF]">
              <ArrowLeft size={15} aria-hidden="true" />
              Back home
            </Link>
            <Link href="/#projects" className="btn-ghost focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F8EFF]">
              Browse projects
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
