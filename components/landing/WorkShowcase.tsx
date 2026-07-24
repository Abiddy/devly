'use client';

import { BookCallButton } from '@/components/landing/BookCallButton';
import { ShowcaseMarquee } from '@/components/landing/ShowcaseMarquee';

type WorkShowcaseProps = {
  onBookCall: () => void;
};

export function WorkShowcase({ onBookCall }: WorkShowcaseProps) {
  return (
    <section className="border-t border-graphite px-6 py-24 sm:px-8 lg:py-40">
      <div className="mx-auto max-w-page text-center">
        <p className="text-[13px] font-semibold uppercase tracking-[-0.02em] text-copper">
          Selected work
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.13] text-paper-white">
          Websites built to convert, not just look good.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[18px] font-light leading-[1.5] text-fog">
          A sample of recent launches — clean, fast, and focused on bringing
          you leads.
        </p>
      </div>

      <div className="mt-16">
        <ShowcaseMarquee />
      </div>

      <div className="mt-16 flex justify-center">
        <BookCallButton onClick={onBookCall} label="Ready for the make over?" />
      </div>
    </section>
  );
}
