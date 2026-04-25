'use client';

import { motion } from 'framer-motion';
import { REVIEWS_CONFIG } from '@/data/reviews-config';
import type { Review } from '@/lib/reviews';
import Link from 'next/link';
import { Fragment } from 'react';

const fade = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
};

function renderEmphasis(text: string) {
  const segments = text.split(/(\*\*[^*]+\*\*)/g);
  return segments.map((seg, i) => {
    const m = seg.match(/^\*\*([^*]+)\*\*$/);
    if (m) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {m[1]}
        </strong>
      );
    }
    return <Fragment key={i}>{seg}</Fragment>;
  });
}

function OrangeStar({ filled }: { filled: boolean }) {
  return (
    <svg
      className={
        filled
          ? "h-3.5 w-3.5 text-[#FF5A00]"
          : "h-3.5 w-3.5 text-zinc-300 dark:text-zinc-600"
      }
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.5}
      aria-hidden
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function Stars({ count }: { count: number }) {
  const n = Math.max(0, Math.min(5, Math.round(count)));
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <OrangeStar key={i} filled={i < n} />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="space-y-3 text-left">
      <Stars count={review.rating} />
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {renderEmphasis(review.text)}
      </p>
      <p
        className="font-serif text-xs font-medium italic tracking-wide text-foreground"
        style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
      >
        — {review.name.toUpperCase()}
      </p>
    </div>
  );
}

export function ReviewsSection({ reviews }: { reviews: Review[] }) {
  const r = REVIEWS_CONFIG;
  const formUrl = r.googleFormUrl;

  return (
    <section
      id="reviews"
      className="relative w-screen max-w-[100vw] -translate-x-1/2 left-1/2 border-y border-zinc-200/90 bg-zinc-50/90 py-16 dark:border-zinc-800 dark:bg-zinc-950/60"
    >
      <div className="mx-auto w-full max-w-5xl px-6">
        <motion.div {...fade} className="mb-10 flex flex-col items-center text-center">
          <h2 className="max-w-3xl text-balance text-xl font-extrabold leading-tight tracking-tight text-foreground sm:text-2xl md:text-3xl">
            {r.headline.parts.map((part, i) => (
              <span key={i}>
                {i > 0 ? " " : null}
                {part.sans ? (
                  <span>{part.text}</span>
                ) : (
                  <em
                    className="font-serif italic text-foreground"
                    style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
                  >
                    {part.text}
                  </em>
                )}
              </span>
            ))}
          </h2>

          {formUrl ? (
            <p className="mt-6 text-sm text-zinc-500">
              <Link
                href={formUrl}
                className="underline underline-offset-4 hover:text-foreground"
                target="_blank"
                rel="noreferrer"
              >
                Leave a review
              </Link>
            </p>
          ) : null}
        </motion.div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
          {reviews.map((rev, id) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: id * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <ReviewCard review={rev} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
