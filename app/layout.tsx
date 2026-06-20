import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowUpRight as ArrowUpRight } from "@tabler/icons-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "hiringat - One page for every open role",
  description: "Create a beautiful hiring page and start meeting great candidates.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="absolute inset-x-0 top-0 z-50 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
          <Link href="/" className="text-xl font-black tracking-[-0.06em]">hiringat<span className="text-black/30">.</span></Link>
          <Link href="/create" className="flex items-center gap-1 text-sm font-semibold">Create your page <ArrowUpRight size={16} /></Link>
        </header>
        {children}
      </body>
    </html>
  );
}
