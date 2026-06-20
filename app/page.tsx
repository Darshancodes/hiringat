import Link from "next/link";
import { IconArrowRight as ArrowRight, IconCheck as Check, IconPointer as MousePointer2, IconSparkles as Sparkles } from "@tabler/icons-react";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-cream">
      <section className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col items-center justify-center px-5 pb-16 pt-32 text-center">
        <div className="absolute left-[8%] top-[22%] hidden -rotate-6 rounded-2xl bg-white px-4 py-3 text-left text-xs font-semibold shadow-soft lg:block">Acme is hiring <span className="ml-2 rounded-full bg-lime px-2 py-1">2 roles</span></div>
        <div className="absolute right-[8%] top-[30%] hidden rotate-6 rounded-2xl bg-ink px-4 py-3 text-left text-xs font-semibold text-white shadow-soft lg:block"><Sparkles className="mb-2 text-lime" size={18} />Meet your next teammate.</div>
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em]">
          <span className="h-2 w-2 rounded-full bg-lime ring-4 ring-lime/30" /> Your hiring homepage
        </div>
        <h1 className="max-w-5xl text-6xl font-black leading-[0.92] tracking-[-0.075em] sm:text-7xl lg:text-[108px]">
          One link.<br />Every <span className="relative inline-block"><span className="relative z-10">open role.</span><span className="absolute bottom-1 left-0 -z-0 h-5 w-full -rotate-1 bg-lime sm:h-8" /></span>
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-black/55 sm:text-xl">Launch a beautiful hiring page in two minutes. Share your roles, collect applications, find your people.</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="/create" className="button-dark px-7 py-4">Build your hiring page <ArrowRight size={18} /></Link>
          <Link href="/acme-ai" className="inline-flex items-center justify-center gap-2 rounded-full border border-black/15 bg-white px-7 py-4 text-sm font-semibold transition hover:bg-black/5"><MousePointer2 size={17} /> View example</Link>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold text-black/45">
          <span className="flex items-center gap-1"><Check size={14} /> No signup</span>
          <span className="flex items-center gap-1"><Check size={14} /> Ready in 2 minutes</span>
          <span className="flex items-center gap-1"><Check size={14} /> Completely free</span>
        </div>
      </section>
    </main>
  );
}
