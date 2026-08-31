import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { getDataDir } from '@/lib/data-dir';

export type SiteReview = {
  id: string;
  name: string;
  company: string;
  rating: number;
  text: string;
  createdAt: string;
};

export type SiteReviewInput = Omit<SiteReview, 'id' | 'createdAt'>;

type ReviewStore = {
  reviews: SiteReview[];
};

const MAX_REVIEWS = 2_000;
const DATA_DIR = getDataDir();
const DATA_FILE = path.join(DATA_DIR, 'site-reviews.json');

function emptyStore(): ReviewStore {
  return { reviews: [] };
}

async function readStore(): Promise<ReviewStore> {
  try {
    const raw = await readFile(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw) as ReviewStore;
    if (!Array.isArray(parsed.reviews)) return emptyStore();
    return parsed;
  } catch {
    return emptyStore();
  }
}

async function writeStore(store: ReviewStore): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  const trimmed =
    store.reviews.length > MAX_REVIEWS
      ? { reviews: store.reviews.slice(-MAX_REVIEWS) }
      : store;
  await writeFile(DATA_FILE, JSON.stringify(trimmed, null, 2), 'utf8');
}

export async function saveSiteReview(input: SiteReviewInput): Promise<SiteReview> {
  const store = await readStore();
  const review: SiteReview = {
    ...input,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };
  store.reviews.push(review);
  await writeStore(store);
  return review;
}

export async function listSiteReviews(): Promise<SiteReview[]> {
  const store = await readStore();
  return [...store.reviews].reverse();
}
