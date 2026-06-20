import Link from "next/link";

export default function NotFound() {
  return <main className="grid min-h-screen place-items-center bg-cream px-5 text-center"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-black/35">404</p><h1 className="mt-3 text-5xl font-black tracking-[-0.06em]">This team isn&apos;t here.</h1><p className="mt-4 text-black/50">The hiring page may have moved, or it hasn&apos;t been created yet.</p><Link href="/create" className="button-dark mt-8">Create a hiring page</Link></div></main>;
}
