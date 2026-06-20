import { promises as fs } from "fs";
import path from "path";
import type { Application, Company, Store } from "./types";

const storePath = path.join(process.cwd(), "data", "store.json");

async function readStore(): Promise<Store> {
  return JSON.parse(await fs.readFile(storePath, "utf8")) as Store;
}

async function writeStore(store: Store) {
  await fs.writeFile(storePath, JSON.stringify(store, null, 2));
}

export async function getCompany(slug: string) {
  const store = await readStore();
  return store.companies.find((company) => company.slug === slug);
}

export async function saveCompany(company: Company) {
  const store = await readStore();
  const index = store.companies.findIndex((item) => item.slug === company.slug);
  if (index >= 0) store.companies[index] = company;
  else store.companies.push(company);
  await writeStore(store);
}

export async function saveApplication(application: Application) {
  const store = await readStore();
  store.applications.push(application);
  await writeStore(store);
}

export async function getApplications(companySlug: string) {
  const store = await readStore();
  return store.applications
    .filter((application) => application.companySlug === companySlug)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
