"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconArrowUpRight as ArrowUpRight, IconBriefcase as Briefcase, IconCheck as Check, IconCopy as Copy, IconMapPin as MapPin } from "@tabler/icons-react";
import type { Company, Role } from "@/lib/types";
import { initials } from "@/lib/utils";
import { ApplicationForm } from "./application-form";

export function HiringPage({ company, justCreated }: { company: Company; justCreated: boolean }) {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [copied, setCopied] = useState(false);
  const copy = async () => { await navigator.clipboard.writeText(window.location.origin + window.location.pathname); setCopied(true); setTimeout(() => setCopied(false), 1800); };

  return (
    <main className="relative min-h-screen overflow-hidden bg-cream px-5 pb-16 pt-32">
      <div className="pointer-events-none absolute -left-40 top-48 h-96 w-96 rounded-full bg-lime/20 blur-3xl" /><div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#d8d1ff]/30 blur-3xl" />
      <div className="relative mx-auto max-w-2xl">
        {justCreated && <div className="mb-6 flex flex-col items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white p-4 shadow-soft sm:flex-row"><div><p className="flex items-center gap-2 text-sm font-bold"><Check size={17} className="rounded-full bg-lime p-0.5" /> Your hiring page is live</p><p className="mt-1 text-xs text-black/40">Share this link and start meeting candidates.</p></div><button onClick={copy} className="button-dark shrink-0 px-4 py-2.5">{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? "Copied!" : "Copy link"}</button></div>}
        <section className="text-center">
          {company.logoUrl ? <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-[28px] bg-white shadow-soft"><Image src={company.logoUrl} alt={`${company.name} logo`} fill unoptimized className="object-cover" /></div> : <div className="mx-auto grid h-24 w-24 place-items-center rounded-[28px] bg-ink text-3xl font-black tracking-[-0.06em] text-lime shadow-soft">{initials(company.name)}</div>}
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-black/35">We&apos;re hiring</p><h1 className="mt-2 text-5xl font-black tracking-[-0.065em] sm:text-6xl">{company.name}</h1><p className="mx-auto mt-4 max-w-lg text-lg leading-8 text-black/50">{company.tagline}</p>
        </section>
        <section className="mt-12"><div className="mb-4 flex items-center justify-between"><p className="text-sm font-bold">Open positions</p><span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-black/45">{company.roles.length} {company.roles.length === 1 ? "role" : "roles"}</span></div><div className="space-y-3">{company.roles.map((role) => <button key={role.id} onClick={() => setSelectedRole(role)} className="group w-full rounded-[24px] border border-black/[0.06] bg-white p-5 text-left shadow-[0_8px_30px_rgba(20,20,18,0.04)] transition duration-300 hover:-translate-y-1 hover:border-black/15 hover:shadow-soft sm:p-6"><div className="flex items-start justify-between gap-4"><div><h2 className="text-xl font-bold tracking-[-0.025em]">{role.title}</h2><p className="mt-2 line-clamp-2 text-sm leading-6 text-black/45">{role.description}</p></div><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cream transition group-hover:bg-lime"><ArrowUpRight size={19} /></span></div><div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold text-black/45"><span className="flex items-center gap-1"><MapPin size={14} />{role.location}</span><span className="h-1 w-1 rounded-full bg-black/20" /><span>{role.workplace}</span><span className="h-1 w-1 rounded-full bg-black/20" /><span>{role.employment}</span></div></button>)}</div></section>
        <div className="mt-10 flex items-center justify-between border-t border-black/10 pt-6 text-xs text-black/35"><span className="flex items-center gap-1.5"><Briefcase size={14} /> Hiring with <b className="text-black/60">hiringat.</b></span><Link href={`/${company.slug}/applications`} className="hover:text-black">View applications</Link></div>
      </div>
      {selectedRole && <ApplicationForm companySlug={company.slug} companyName={company.name} role={selectedRole} onClose={() => setSelectedRole(null)} />}
    </main>
  );
}
