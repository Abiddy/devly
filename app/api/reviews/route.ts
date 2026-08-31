import { NextResponse } from 'next/server';
import { listSiteReviews, saveSiteReview } from '@/lib/site-reviews';

function escapeText(value: string) {
  return value.trim();
}

export async function GET() {
  try {
    const reviews = await listSiteReviews();
    return NextResponse.json({ reviews });
  } catch {
    return NextResponse.json(
      { error: 'Unable to read reviews' },
      { status: 503 },
    );
  }
}

export async function POST(request: Request) {
  let body: {
    name?: string;
    company?: string;
    rating?: number;
    text?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const name = escapeText(body.name || '');
  const company = escapeText(body.company || '');
  const text = escapeText(body.text || '');
  const rating = Math.round(Number(body.rating));

  if (name.length < 2) {
    return NextResponse.json(
      { error: 'Please add your name.' },
      { status: 400 },
    );
  }

  if (text.length < 12) {
    return NextResponse.json(
      { error: 'A couple of sentences helps more than a word.' },
      { status: 400 },
    );
  }

  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    return NextResponse.json(
      { error: 'Pick a rating from 1 to 5.' },
      { status: 400 },
    );
  }

  try {
    const review = await saveSiteReview({
      name: name.slice(0, 80),
      company: company.slice(0, 80),
      rating,
      text: text.slice(0, 1200),
    });
    return NextResponse.json({ ok: true, review });
  } catch {
    return NextResponse.json(
      { error: 'Could not save your review. Try again shortly.' },
      { status: 503 },
    );
  }
}
