import { timingSafeEqual } from 'crypto';

export type ClientSite = {
  slug: string;
};

const MIN_KEY_LENGTH = 24;

/** CLIENT_SITE_KEYS="grape:<key>,lomelis:<key>" — one secret key per client site. */
function readSiteKeys(): Array<{ slug: string; key: string }> {
  const raw = process.env.CLIENT_SITE_KEYS || '';
  return raw
    .split(',')
    .map((pair) => {
      const index = pair.indexOf(':');
      if (index === -1) return null;
      const slug = pair.slice(0, index).trim();
      const key = pair.slice(index + 1).trim();
      if (!slug || key.length < MIN_KEY_LENGTH) return null;
      return { slug, key };
    })
    .filter((entry): entry is { slug: string; key: string } => entry !== null);
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function resolveClientSite(request: Request): ClientSite | null {
  const header = request.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
  if (!token) return null;

  const match = readSiteKeys().find((entry) => safeEqual(entry.key, token));
  return match ? { slug: match.slug } : null;
}
