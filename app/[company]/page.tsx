import { notFound } from "next/navigation";
import { HiringPage } from "@/components/hiring-page";
import { getCompany } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function PublicCompanyPage({ params, searchParams }: { params: Promise<{ company: string }>; searchParams: Promise<{ created?: string }> }) {
  const { company: slug } = await params;
  const company = await getCompany(slug);
  if (!company) notFound();
  const { created } = await searchParams;
  return <HiringPage company={company} justCreated={created === "1"} />;
}
