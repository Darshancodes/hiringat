"use client";

import { useState, useTransition } from "react";
import { IconArrowRight as ArrowRight, IconBriefcase as Briefcase, IconBuilding as Building, IconPlus as Plus, IconTrash as Trash, IconX as X } from "@tabler/icons-react";
import { createCompany } from "@/app/create/actions";
import type { Role } from "@/lib/types";

const defaults = ["Why this role?", "Relevant experience", "Portfolio/LinkedIn URL"];

const emptyRole = (): Role => ({
  id: crypto.randomUUID(), title: "", location: "", workplace: "Remote", employment: "Full-time", description: "", questions: [...defaults],
});

export function CompanyBuilder() {
  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [tagline, setTagline] = useState("");
  const [roles, setRoles] = useState<Role[]>([emptyRole()]);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const updateRole = (id: string, patch: Partial<Role>) => setRoles((current) => current.map((role) => role.id === id ? { ...role, ...patch } : role));
  const updateQuestion = (roleId: string, index: number, value: string) => {
    const role = roles.find((item) => item.id === roleId)!;
    const questions = [...role.questions];
    questions[index] = value;
    updateRole(roleId, { questions });
  };

  function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    startTransition(async () => {
      const result = await createCompany({ slug: "", name, logoUrl, tagline, roles });
      if (result?.error) setError(result.error);
    });
  }

  return (
    <form onSubmit={submit} className="space-y-8">
      <section className="rounded-[28px] border border-black/5 bg-white p-6 shadow-soft sm:p-8">
        <div className="mb-7 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-lime"><Building size={20} /></span><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-black/35">Step 1</p><h2 className="text-xl font-bold tracking-tight">The essentials</h2></div></div>
        <div className="grid gap-5 sm:grid-cols-2">
          <label><span className="label">Company name</span><input required className="field" value={name} onChange={(e) => setName(e.target.value)} placeholder="Acme AI" /><span className="mt-2 block text-xs text-black/40">Your page: hiringat/{name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-") || "company"}</span></label>
          <label><span className="label">Logo URL <span className="font-normal text-black/35">optional</span></span><input className="field" type="url" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="https://..." /></label>
          <label className="sm:col-span-2"><span className="label">One-line tagline</span><input required className="field" value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="We're building the future of collaborative work." /></label>
        </div>
      </section>

      <section className="rounded-[28px] border border-black/5 bg-white p-6 shadow-soft sm:p-8">
        <div className="mb-7 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-lime"><Briefcase size={20} /></span><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-black/35">Step 2</p><h2 className="text-xl font-bold tracking-tight">Add your open roles</h2></div></div>
        <div className="space-y-6">
          {roles.map((role, roleIndex) => (
            <div key={role.id} className="rounded-2xl border border-black/10 bg-cream/60 p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between"><h3 className="font-bold">Role {roleIndex + 1}</h3>{roles.length > 1 && <button type="button" aria-label="Remove role" onClick={() => setRoles(roles.filter((item) => item.id !== role.id))} className="rounded-full p-2 text-black/35 hover:bg-black/5 hover:text-black"><Trash size={17} /></button>}</div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="sm:col-span-2"><span className="label">Role title</span><input required className="field" value={role.title} onChange={(e) => updateRole(role.id, { title: e.target.value })} placeholder="Founding Engineer" /></label>
                <label><span className="label">Location</span><input required className="field" value={role.location} onChange={(e) => updateRole(role.id, { location: e.target.value })} placeholder="New York or Anywhere" /></label>
                <div className="grid grid-cols-2 gap-3"><label><span className="label">Workplace</span><select className="field" value={role.workplace} onChange={(e) => updateRole(role.id, { workplace: e.target.value })}><option>Remote</option><option>Onsite</option><option>Hybrid</option></select></label><label><span className="label">Type</span><select className="field" value={role.employment} onChange={(e) => updateRole(role.id, { employment: e.target.value })}><option>Full-time</option><option>Contract</option><option>Part-time</option></select></label></div>
                <label className="sm:col-span-2"><span className="label">Short description</span><textarea required rows={3} className="field resize-none" value={role.description} onChange={(e) => updateRole(role.id, { description: e.target.value })} placeholder="What will this person do, and why is it exciting?" /></label>
              </div>
              <div className="mt-6"><p className="label">Application questions</p><div className="space-y-2">{role.questions.map((question, index) => <div key={index} className="flex gap-2"><input required className="field" value={question} onChange={(e) => updateQuestion(role.id, index, e.target.value)} /><button type="button" aria-label="Remove question" onClick={() => updateRole(role.id, { questions: role.questions.filter((_, i) => i !== index) })} className="rounded-xl px-3 text-black/30 hover:bg-black/5 hover:text-black"><X size={17} /></button></div>)}</div><button type="button" onClick={() => updateRole(role.id, { questions: [...role.questions, ""] })} className="mt-3 flex items-center gap-1 text-sm font-semibold"><Plus size={16} /> Add question</button></div>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => setRoles([...roles, emptyRole()])} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-black/20 py-4 text-sm font-semibold transition hover:border-black/40 hover:bg-black/[0.02]"><Plus size={18} /> Add another role</button>
      </section>
      {error && <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">{error}</p>}
      <button disabled={pending} className="button-dark w-full py-4 text-base">{pending ? "Creating your page..." : "Publish hiring page"}<ArrowRight size={19} /></button>
    </form>
  );
}
