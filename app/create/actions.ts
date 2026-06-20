"use server";

import { redirect } from "next/navigation";
import { saveCompany } from "@/lib/store";
import { slugify } from "@/lib/utils";
import type { Company } from "@/lib/types";

export async function createCompany(payload: Company) {
  const slug = slugify(payload.name);
  await saveCompany({
    ...payload,
    slug,
    roles: payload.roles.map((role, index) => ({ ...role, id: `${slugify(role.title)}-${index + 1}` })),
  });
  redirect(`/${slug}?created=1`);
}
