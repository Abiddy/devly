const buckets = new Map<string, number[]>();
const MAX_BUCKETS = 10_000;

/** In-memory sliding window. Resets on deploy and assumes a single instance. */
export function allowRequest(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const hits = (buckets.get(key) || []).filter((t) => now - t < windowMs);

  if (hits.length >= limit) {
    buckets.set(key, hits);
    return false;
  }

  hits.push(now);
  buckets.set(key, hits);

  if (buckets.size > MAX_BUCKETS) {
    buckets.forEach((times, bucketKey) => {
      if (!times.some((t) => now - t < windowMs)) buckets.delete(bucketKey);
    });
  }

  return true;
}
