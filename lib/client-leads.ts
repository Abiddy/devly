import { mkdir, readFile, rename, writeFile } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { getDataDir } from '@/lib/data-dir';

export type ClientLead = {
  id: string;
  site: string;
  email: string;
  marketingOptIn: boolean;
  marketingOptInAt: string | null;
  sources: string[];
  lastPayload: unknown;
  visits: number;
  firstSeenAt: string;
  lastSeenAt: string;
};

export type ClientLeadInput = {
  site: string;
  email: string;
  marketingOptIn: boolean;
  source: string;
  payload?: unknown;
};

type LeadStore = {
  leads: ClientLead[];
};

const MAX_LEADS = 20_000;
const DATA_DIR = getDataDir();
const DATA_FILE = path.join(DATA_DIR, 'client-leads.json');

let writeQueue: Promise<unknown> = Promise.resolve();

/** Serializes read-modify-write cycles so concurrent requests don't overwrite each other. */
function withLock<T>(task: () => Promise<T>): Promise<T> {
  const run = writeQueue.then(task, task);
  writeQueue = run.catch(() => undefined);
  return run;
}

async function readStore(): Promise<LeadStore> {
  try {
    const raw = await readFile(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw) as LeadStore;
    return Array.isArray(parsed.leads) ? parsed : { leads: [] };
  } catch {
    return { leads: [] };
  }
}

async function writeStore(store: LeadStore): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  const leads =
    store.leads.length > MAX_LEADS ? store.leads.slice(-MAX_LEADS) : store.leads;
  const tmp = `${DATA_FILE}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify({ leads }, null, 2), 'utf8');
  await rename(tmp, DATA_FILE);
}

export function upsertClientLead(input: ClientLeadInput): Promise<ClientLead> {
  return withLock(async () => {
    const store = await readStore();
    const now = new Date().toISOString();
    const existing = store.leads.find(
      (lead) => lead.site === input.site && lead.email === input.email,
    );

    if (existing) {
      if (input.marketingOptIn && !existing.marketingOptIn) {
        existing.marketingOptIn = true;
        existing.marketingOptInAt = now;
      }
      if (!existing.sources.includes(input.source)) existing.sources.push(input.source);
      if (input.payload !== undefined) existing.lastPayload = input.payload;
      existing.visits += 1;
      existing.lastSeenAt = now;
      await writeStore(store);
      return existing;
    }

    const lead: ClientLead = {
      id: randomUUID(),
      site: input.site,
      email: input.email,
      marketingOptIn: input.marketingOptIn,
      marketingOptInAt: input.marketingOptIn ? now : null,
      sources: [input.source],
      lastPayload: input.payload ?? null,
      visits: 1,
      firstSeenAt: now,
      lastSeenAt: now,
    };
    store.leads.push(lead);
    await writeStore(store);
    return lead;
  });
}

export async function listClientLeads(site?: string): Promise<ClientLead[]> {
  const store = await readStore();
  const leads = site ? store.leads.filter((lead) => lead.site === site) : store.leads;
  return [...leads].reverse();
}
