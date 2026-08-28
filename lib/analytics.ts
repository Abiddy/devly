import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { getDataDir } from '@/lib/data-dir';

export type AnalyticsEventType =
  | 'pageview'
  | 'cta_click'
  | 'scheduling_start';

export type AnalyticsEvent = {
  id: string;
  type: AnalyticsEventType;
  path: string;
  referrer: string | null;
  visitorId: string;
  device: 'mobile' | 'desktop' | 'unknown';
  createdAt: string;
};

export type AnalyticsStore = {
  events: AnalyticsEvent[];
};

export type AnalyticsStats = {
  totalPageviews: number;
  uniqueVisitors: number;
  pageviewsToday: number;
  pageviewsLast7Days: number;
  viewsByPage: Record<string, number>;
  ctaClicks: number;
  schedulingStarts: number;
  topReferrers: { referrer: string; count: number }[];
  deviceSplit: { mobile: number; desktop: number; unknown: number };
  dailyPageviews: { date: string; count: number }[];
  lastUpdated: string | null;
};

const MAX_EVENTS = 10_000;
const DATA_DIR = getDataDir();
const DATA_FILE = path.join(DATA_DIR, 'analytics.json');

function emptyStore(): AnalyticsStore {
  return { events: [] };
}

export async function readAnalyticsStore(): Promise<AnalyticsStore> {
  try {
    const raw = await readFile(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw) as AnalyticsStore;
    if (!Array.isArray(parsed.events)) return emptyStore();
    return parsed;
  } catch {
    return emptyStore();
  }
}

export async function writeAnalyticsStore(store: AnalyticsStore): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  const trimmed =
    store.events.length > MAX_EVENTS
      ? { events: store.events.slice(-MAX_EVENTS) }
      : store;
  await writeFile(DATA_FILE, JSON.stringify(trimmed, null, 2), 'utf8');
}

export function detectDevice(userAgent: string | null): AnalyticsEvent['device'] {
  if (!userAgent) return 'unknown';
  return /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    userAgent,
  )
    ? 'mobile'
    : 'desktop';
}

export async function recordAnalyticsEvent(
  input: Omit<AnalyticsEvent, 'id' | 'createdAt'>,
): Promise<AnalyticsEvent> {
  const store = await readAnalyticsStore();
  const event: AnalyticsEvent = {
    ...input,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };
  store.events.push(event);
  await writeAnalyticsStore(store);
  return event;
}

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function buildAnalyticsStats(store: AnalyticsStore): AnalyticsStats {
  const now = new Date();
  const todayStart = startOfDay(now);
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - 6);

  const pageviews = store.events.filter((e) => e.type === 'pageview');
  const visitors = new Set(pageviews.map((e) => e.visitorId));

  const pageviewsToday = pageviews.filter(
    (e) => new Date(e.createdAt) >= todayStart,
  ).length;

  const pageviewsLast7Days = pageviews.filter(
    (e) => new Date(e.createdAt) >= weekStart,
  ).length;

  const viewsByPage: Record<string, number> = {};
  for (const event of pageviews) {
    viewsByPage[event.path] = (viewsByPage[event.path] ?? 0) + 1;
  }

  const referrerCounts = new Map<string, number>();
  for (const event of pageviews) {
    const ref = event.referrer?.trim();
    if (!ref) continue;
    referrerCounts.set(ref, (referrerCounts.get(ref) ?? 0) + 1);
  }

  const topReferrers = Array.from(referrerCounts.entries())
    .map(([referrer, count]) => ({ referrer, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const deviceSplit = { mobile: 0, desktop: 0, unknown: 0 };
  for (const event of pageviews) {
    deviceSplit[event.device] += 1;
  }

  const dailyCounts = new Map<string, number>();
  for (let i = 6; i >= 0; i -= 1) {
    const day = new Date(todayStart);
    day.setDate(day.getDate() - i);
    dailyCounts.set(formatDay(day), 0);
  }

  for (const event of pageviews) {
    const day = formatDay(new Date(event.createdAt));
    if (dailyCounts.has(day)) {
      dailyCounts.set(day, (dailyCounts.get(day) ?? 0) + 1);
    }
  }

  const dailyPageviews = Array.from(dailyCounts.entries()).map(
    ([date, count]) => ({
      date,
      count,
    }),
  );

  const lastUpdated =
    store.events.length > 0
      ? store.events[store.events.length - 1]?.createdAt ?? null
      : null;

  return {
    totalPageviews: pageviews.length,
    uniqueVisitors: visitors.size,
    pageviewsToday,
    pageviewsLast7Days,
    viewsByPage,
    ctaClicks: store.events.filter((e) => e.type === 'cta_click').length,
    schedulingStarts: store.events.filter((e) => e.type === 'scheduling_start')
      .length,
    topReferrers,
    deviceSplit,
    dailyPageviews,
    lastUpdated,
  };
}

export function isAdminAuthorized(request: Request): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;

  const header = request.headers.get('authorization');
  if (header === `Bearer ${secret}`) return true;

  const url = new URL(request.url);
  return url.searchParams.get('key') === secret;
}
