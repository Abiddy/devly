import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { getDataDir } from '@/lib/data-dir';

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  company: string;
  website: string;
  message: string;
  goals: string[];
  budget: string;
  size: string;
  timeline: string;
  createdAt: string;
};

export type InquiryInput = Omit<Inquiry, 'id' | 'createdAt'>;

type InquiryStore = {
  inquiries: Inquiry[];
};

const MAX_INQUIRIES = 2_000;
const DATA_DIR = getDataDir();
const DATA_FILE = path.join(DATA_DIR, 'inquiries.json');

function emptyStore(): InquiryStore {
  return { inquiries: [] };
}

async function readStore(): Promise<InquiryStore> {
  try {
    const raw = await readFile(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw) as InquiryStore;
    if (!Array.isArray(parsed.inquiries)) return emptyStore();
    return parsed;
  } catch {
    return emptyStore();
  }
}

async function writeStore(store: InquiryStore): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  const trimmed =
    store.inquiries.length > MAX_INQUIRIES
      ? { inquiries: store.inquiries.slice(-MAX_INQUIRIES) }
      : store;
  await writeFile(DATA_FILE, JSON.stringify(trimmed, null, 2), 'utf8');
}

export async function saveInquiry(input: InquiryInput): Promise<Inquiry> {
  const store = await readStore();
  const inquiry: Inquiry = {
    ...input,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };
  store.inquiries.push(inquiry);
  await writeStore(store);
  return inquiry;
}

export async function listInquiries(): Promise<Inquiry[]> {
  const store = await readStore();
  return [...store.inquiries].reverse();
}
