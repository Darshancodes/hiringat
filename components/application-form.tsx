"use client";

import { useState, useTransition } from "react";
import { IconArrowLeft as ArrowLeft, IconArrowRight as ArrowRight, IconCheck as Check, IconSend as Send } from "@tabler/icons-react";
import type { Role } from "@/lib/types";
import { submitApplication } from "@/app/[company]/actions";

export function ApplicationForm({ companySlug, role, companyName, onClose }: { companySlug: string; role: Role; companyName: string; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setError("");
    startTransition(async () => {
      const result = await submitApplication({
        companySlug, roleId: role.id, roleTitle: role.title,
        name: String(data.get("name")), email: String(data.get("email")),
        answers: role.questions.map((question, index) => ({ question, answer: String(data.get(`answer-${index}`)) })),
      });
      if (result.success) setSubmitted(true);
      else setError(result.error ?? "Unable to submit your application. Please try again.");
    });
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-ink/50 p-3 backdrop-blur-sm sm:p-6" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="mx-auto min-h-full max-w-2xl rounded-[30px] bg-cream p-6 shadow-2xl sm:p-10">
        <button onClick={onClose} className="mb-8 flex items-center gap-1 text-sm font-semibold text-black/50 hover:text-black"><ArrowLeft size={17} /> Back to roles</button>
        {submitted ? (
          <div className="flex min-h-[480px] flex-col items-center justify-center text-center"><span className="grid h-20 w-20 place-items-center rounded-full bg-lime"><Check size={38} strokeWidth={2.5} /></span><h2 className="mt-7 text-4xl font-black tracking-[-0.05em]">Application received!</h2><p className="mt-3 max-w-sm leading-7 text-black/50">Thanks for reaching out. Your application is now with the team at {companyName}.</p><button onClick={onClose} className="button-dark mt-8">Done <ArrowRight size={17} /></button></div>
        ) : (
          <><p className="text-xs font-bold uppercase tracking-[0.16em] text-black/40">Apply to {companyName}</p><h2 className="mt-2 text-4xl font-black tracking-[-0.05em]">{role.title}</h2><div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-black/50"><span className="rounded-full bg-white px-3 py-1.5">{role.location}</span><span className="rounded-full bg-white px-3 py-1.5">{role.workplace}</span><span className="rounded-full bg-white px-3 py-1.5">{role.employment}</span></div><p className="mt-6 border-b border-black/10 pb-7 leading-7 text-black/60">{role.description}</p>
          <form onSubmit={submit} className="mt-8 space-y-5"><div className="grid gap-5 sm:grid-cols-2"><label><span className="label">Full name</span><input required name="name" className="field" placeholder="Your name" /></label><label><span className="label">Email address</span><input required type="email" name="email" className="field" placeholder="you@email.com" /></label></div>{role.questions.map((question, index) => <label key={question} className="block"><span className="label">{question}</span><textarea required name={`answer-${index}`} rows={question.toLowerCase().includes("url") ? 1 : 4} className="field resize-none" placeholder="Your answer" /></label>)}{error && <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">{error}</p>}<button disabled={pending} className="button-dark w-full py-4">{pending ? "Sending application..." : "Submit application"}<Send size={17} /></button><p className="text-center text-xs text-black/35">Your application goes directly to the {companyName} team.</p></form></>)}
      </div>
    </div>
  );
}
