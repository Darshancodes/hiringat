"use server";

import { saveApplication } from "@/lib/store";

export async function submitApplication(payload: { companySlug: string; roleId: string; roleTitle: string; name: string; email: string; answers: { question: string; answer: string }[] }) {
  try {
    await saveApplication({ ...payload, id: crypto.randomUUID(), createdAt: new Date().toISOString() });
    return { success: true };
  } catch (error) {
    console.error("Failed to save application", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unable to submit your application. Please try again.",
    };
  }
}
