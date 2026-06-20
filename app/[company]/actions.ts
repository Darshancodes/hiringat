"use server";

import { saveApplication } from "@/lib/store";

export async function submitApplication(payload: { companySlug: string; roleId: string; roleTitle: string; name: string; email: string; answers: { question: string; answer: string }[] }) {
  await saveApplication({ ...payload, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
  return { success: true };
}
