export type Review = {
  id: string;
  name: string;
  text: string;
  rating: number;
  fullReviewUrl?: string;
};

const DEFAULT_RATING = 5;

function stripBom(s: string) {
  if (s.charCodeAt(0) === 0xfeff) return s.slice(1);
  return s;
}

/** Minimal CSV row parser: handles double-quoted fields with commas. */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cur = "";
  let i = 0;
  let inQuotes = false;
  const s = stripBom(text);
  while (i < s.length) {
    const c = s[i]!;
    if (inQuotes) {
      if (c === '"') {
        if (s[i + 1] === '"') {
          cur += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      cur += c;
      i++;
      continue;
    }
    if (c === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (c === ",") {
      row.push(cur);
      cur = "";
      i++;
      continue;
    }
    if (c === "\n" || c === "\r") {
      if (c === "\r" && s[i + 1] === "\n") i++;
      row.push(cur);
      if (row.some((cell) => cell.length > 0)) rows.push(row);
      row = [];
      cur = "";
      i++;
      continue;
    }
    cur += c;
    i++;
  }
  row.push(cur);
  if (row.some((cell) => cell.length > 0)) rows.push(row);
  return rows;
}

function normHeader(h: string) {
  return h
    .trim()
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'");
}

type ColumnMap = { name: number; review: number; rating: number; link: number; ts: number };

function detectColumns(headerRow: string[]): ColumnMap | null {
  if (headerRow.length === 0) return null;
  const h = headerRow.map(normHeader);
  const idx = (pred: (s: string) => boolean) => h.findIndex(pred);

  const name =
    idx((s) => s.includes("name") && !s.includes("user")) >= 0
      ? idx((s) => s.includes("name") && !s.includes("user"))
      : idx((s) => s === "name") >= 0
        ? idx((s) => s === "name")
        : 1;
  const review =
    idx((s) => s.includes("review") || s.includes("feedback") || s.includes("comment") || s.includes("message")) >= 0
      ? idx((s) => s.includes("review") || s.includes("feedback") || s.includes("comment") || s.includes("message"))
      : 2;
  const rating = idx(
    (s) => s === "rating" || s.includes("star") || s === "score"
  );
  const link = idx(
    (s) => s.includes("link") || s.includes("url") || s.includes("full review")
  );
  const ts = idx(
    (s) => s.includes("timestamp") || s === "date" || s === "time"
  );

  return {
    name: name >= 0 ? name : 1,
    review: review >= 0 ? review : 2,
    rating: rating >= 0 ? rating : -1,
    link: link >= 0 ? link : -1,
    ts: ts >= 0 ? ts : 0,
  };
}

function parseRating(raw: string | undefined): number {
  if (!raw) return DEFAULT_RATING;
  const n = parseFloat(String(raw).replace(/[^\d.]/g, ""));
  if (Number.isNaN(n) || n < 1) return DEFAULT_RATING;
  return Math.min(5, Math.max(1, Math.round(n)));
}

const FALLBACK: Review[] = [
  {
    id: "1",
    name: "Sample Client",
    text: "Devly was able to **fit our launch in right away** and communication was clear from day one.",
    rating: 5,
  },
  {
    id: "2",
    name: "M. Santos",
    text: "We have been **working with Devly for ongoing improvements** to our site and the quality stays consistently high.",
    rating: 5,
  },
  {
    id: "3",
    name: "Alex R.",
    text: "They delivered a **new site and brand refresh** and the process was professional from start to finish.",
    rating: 5,
  },
  {
    id: "4",
    name: "Jordan P.",
    text: "They really understand modern stacks and **worked with our existing tools** when others pushed a full rewrite.",
    rating: 5,
  },
];

function rowsToReviews(rows: string[][]): Review[] {
  if (rows.length < 2) return [];
  const header = rows[0]!;
  const cols = detectColumns(header);
  if (!cols) return [];
  const withMeta: { review: Review; sortKey: string }[] = [];
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r]!;
    if (!row.length) continue;
    const name = (row[cols.name] ?? "").trim();
    const text = (row[cols.review] ?? "").trim();
    if (!name && !text) continue;
    const rating =
      cols.rating >= 0 ? parseRating(row[cols.rating]) : DEFAULT_RATING;
    const fullReviewUrl =
      cols.link >= 0 && row[cols.link]?.trim() ? row[cols.link]!.trim() : undefined;
    const sortKey =
      cols.ts >= 0
        ? String(row[cols.ts] ?? "")
        : String(r).padStart(6, "0");
    withMeta.push({
      review: {
        id: `row-${r}`,
        name: name || "Anonymous",
        text,
        rating,
        fullReviewUrl,
      },
      sortKey,
    });
  }
  withMeta.sort((a, b) => b.sortKey.localeCompare(a.sortKey));
  return withMeta.map((m) => m.review);
}

/**
 * Fetches review rows from a Google Sheet published as CSV
 * (Form responses: Google Form → linked Sheet → File → Share → Publish to web → CSV).
 * Set `GOOGLE_SHEET_CSV_URL` in `.env.local` to the published CSV URL.
 */
export async function getReviews(): Promise<Review[]> {
  const url = process.env.GOOGLE_SHEET_CSV_URL;
  if (!url) return FALLBACK;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return FALLBACK;
    const text = await res.text();
    const rows = parseCsv(text);
    const reviews = rowsToReviews(rows);
    return reviews.length > 0 ? reviews : FALLBACK;
  } catch {
    return FALLBACK;
  }
}
