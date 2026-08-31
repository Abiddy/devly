'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { SiteReview } from '@/lib/site-reviews';

type Status = 'idle' | 'loading' | 'success' | 'error';

function Stars({
  count,
  onChange,
}: {
  count: number;
  onChange?: (n: number) => void;
}) {
  return (
    <div className="flex gap-1" role="group" aria-label="Rating">
      {Array.from({ length: 5 }, (_, i) => {
        const n = i + 1;
        const filled = n <= count;
        const star = (
          <svg
            className={`h-6 w-6 ${filled ? 'text-[#152868]' : 'text-[#d2daf0]'}`}
            viewBox="0 0 24 24"
            fill={filled ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={filled ? 0 : 1.5}
            aria-hidden
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );

        if (!onChange) return <span key={n}>{star}</span>;

        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className="rounded-md p-0.5 transition hover:scale-105"
            aria-label={`${n} star${n === 1 ? '' : 's'}`}
          >
            {star}
          </button>
        );
      })}
    </div>
  );
}

export function ReviewsPage({ initialReviews }: { initialReviews: SiteReview[] }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, rating, text }),
      });
      const json = (await res.json()) as {
        error?: string;
        review?: SiteReview;
      };

      if (!res.ok || !json.review) {
        setError(json.error || 'Something went wrong.');
        setStatus('error');
        return;
      }

      setReviews((prev) => [json.review!, ...prev]);
      setName('');
      setCompany('');
      setRating(5);
      setText('');
      setStatus('success');
    } catch {
      setError('Network error. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#f3f5fa] text-[#15205f]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_90%_55%_at_50%_-10%,_rgba(21,40,104,0.11),_transparent_60%)]"
      />
      <header className="relative w-full bg-transparent">
        <div className="flex h-14 w-full items-center justify-between px-4 sm:h-[4.25rem] sm:px-8 lg:px-12">
          <Link
            href="/"
            className="text-[16px] font-bold tracking-[-0.04em] text-[#152868] sm:text-[19px]"
          >
            Devly
          </Link>
          <Link
            href="/inquire"
            className="inline-flex rounded-full bg-[#152868] px-3.5 py-1.5 text-[11.5px] font-semibold text-white hover:bg-[#0f1d52] sm:px-4 sm:py-2.5 sm:text-[13px]"
          >
            Get a quote
          </Link>
        </div>
      </header>

      <main className="relative mx-auto max-w-3xl px-4 py-10 sm:px-8 sm:py-16">
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7a849f] sm:text-[12px]">
            Reviews
          </p>
          <h1 className="mt-3 text-[clamp(1.85rem,6vw,3.1rem)] font-bold leading-[1.08] tracking-[-0.045em] text-[#152868]">
            What would you tell a founder thinking about{' '}
            <em className="font-[family-name:var(--font-studio-display)] not-italic font-normal italic text-[#2a3fb8]">
              working with us?
            </em>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-[14px] leading-relaxed text-[#5c688f] sm:text-[16px]">
            A few sentences is plenty — what stood out, how the process felt,
            and whether the site actually helped you get leads.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="mt-8 rounded-[24px] border border-[#e2e8f5] bg-white p-5 shadow-[0_24px_56px_-36px_rgba(21,40,104,0.4)] sm:mt-10 sm:p-8"
        >
          {status === 'success' ? (
            <div className="py-4 text-center">
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#7a849f]">
                Thank you
              </p>
              <h2 className="mt-2 text-[1.45rem] font-bold tracking-[-0.03em] text-[#152868]">
                That&apos;s on the page now.
              </h2>
              <p className="mx-auto mt-2 max-w-sm text-[14px] text-[#667085]">
                If someone asks what it&apos;s like to work with Devly, this is
                what they&apos;ll read.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#152868] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#0f1d52]"
              >
                Write another
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#7a849f]">
                    Your name
                  </span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Jordan Patel"
                    className="mt-1.5 w-full rounded-2xl border border-[#e2e8f5] bg-[#f7f8fb] px-4 py-3 text-[14px] text-[#15205f] outline-none placeholder:text-[#98a2b3] focus:border-[#c5d0f0] focus:bg-white"
                  />
                </label>
                <label className="block">
                  <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#7a849f]">
                    Business{' '}
                    <span className="font-semibold normal-case tracking-normal text-[#98a2b3]">
                      optional
                    </span>
                  </span>
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Pacific Auto"
                    className="mt-1.5 w-full rounded-2xl border border-[#e2e8f5] bg-[#f7f8fb] px-4 py-3 text-[14px] text-[#15205f] outline-none placeholder:text-[#98a2b3] focus:border-[#c5d0f0] focus:bg-white"
                  />
                </label>
              </div>

              <div className="mt-5">
                <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#7a849f]">
                  How was it?
                </p>
                <div className="mt-2">
                  <Stars count={rating} onChange={setRating} />
                </div>
              </div>

              <label className="mt-5 block">
                <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#7a849f]">
                  Your note
                </span>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                  rows={5}
                  placeholder="The process felt clear, the site looks like us, and people actually use the form now…"
                  className="mt-1.5 w-full resize-y rounded-2xl border border-[#e2e8f5] bg-[#f7f8fb] px-4 py-3 text-[14px] leading-relaxed text-[#15205f] outline-none placeholder:text-[#98a2b3] focus:border-[#c5d0f0] focus:bg-white"
                />
              </label>

              {error ? (
                <p className="mt-3 text-[13px] text-red-600">{error}</p>
              ) : null}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#152868] px-5 py-3 text-[13px] font-semibold text-white hover:bg-[#0f1d52] disabled:opacity-60 sm:w-auto"
              >
                {status === 'loading' ? 'Sending…' : 'Post review'}
                {status !== 'loading' ? <ArrowRight className="h-3.5 w-3.5" /> : null}
              </button>
            </>
          )}
        </form>

        <section className="mt-12 sm:mt-16">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7a849f] sm:text-[12px]">
            From clients
          </p>
          <h2 className="mt-2 text-[clamp(1.35rem,4vw,1.9rem)] font-bold tracking-[-0.035em] text-[#152868]">
            What people have said.
          </h2>

          {reviews.length === 0 ? (
            <p className="mt-6 rounded-[20px] border border-[#e2e8f5] bg-white px-5 py-8 text-center text-[14px] text-[#667085]">
              No reviews yet — yours can be the first.
            </p>
          ) : (
            <div className="mt-6 space-y-3">
              {reviews.map((review) => (
                <article
                  key={review.id}
                  className="rounded-[20px] border border-[#e2e8f5] bg-white px-5 py-5 sm:px-6"
                >
                  <Stars count={review.rating} />
                  <p className="mt-3 text-[15px] leading-relaxed text-[#3d4663]">
                    {review.text}
                  </p>
                  <p className="mt-3 text-[13px] font-semibold text-[#152868]">
                    {review.name}
                    {review.company ? (
                      <span className="font-medium text-[#7a849f]">
                        {' '}
                        · {review.company}
                      </span>
                    ) : null}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
