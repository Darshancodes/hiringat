import { CompanyBuilder } from "@/components/company-builder";

export default function CreatePage() {
  return <main className="min-h-screen bg-cream px-5 pb-24 pt-32"><div className="mx-auto max-w-3xl"><div className="mb-10"><p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-black/40">Your page, your team</p><h1 className="text-4xl font-black tracking-[-0.055em] sm:text-6xl">Start hiring<br />beautifully.</h1><p className="mt-4 max-w-lg text-black/50">A polished home for your open roles, ready to share in a couple of minutes.</p></div><CompanyBuilder /></div></main>;
}
