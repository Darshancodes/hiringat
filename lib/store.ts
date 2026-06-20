import { promises as fs } from "fs";
import path from "path";
import { Redis } from "@upstash/redis";
import type { Application, Company, Store } from "./types";
import seedData from "@/data/store.json";

const storePath = path.join(process.cwd(), "data", "store.json");
const redisUrl = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;
const storeKey = "hiringat:store";

function getSeedStore(): Store {
  return structuredClone(seedData) as Store;
}

async function readStore(): Promise<Store> {
  if (redis) {
    const stored = await redis.get<Store>(storeKey);
    if (stored) return stored;

    const seed = getSeedStore();
    await redis.set(storeKey, seed);
    return seed;
  }

  if (process.env.VERCEL) return getSeedStore();

  return JSON.parse(await fs.readFile(storePath, "utf8")) as Store;
}

async function writeStore(store: Store) {
  if (redis) {
    await redis.set(storeKey, store);
    return;
  }

  if (process.env.VERCEL) {
    throw new Error("Cloud storage is not configured. Connect an Upstash Redis database to this Vercel project and redeploy.");
  }

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
