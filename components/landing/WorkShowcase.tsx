'use client';

import { BookCallButton } from '@/components/landing/BookCallButton';
import { ShowcaseMarquee } from '@/components/landing/ShowcaseMarquee';

type WorkShowcaseProps = {
  onBookCall: () => void;
};

export function WorkShowcase({ onBookCall }: WorkShowcaseProps) {
  return (
    <section className="border-t border-border bg-background px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mx-auto max-w-md text-base font-normal leading-relaxed tracking-normal text-black sm:text-lg">
          Websites that actually bring you leads.
        </h2>
      </div>

      <div className="mt-10">
        <ShowcaseMarquee />
      </div>

      <div className="mt-12 flex justify-center pb-4">
        <BookCallButton
          onClick={onBookCall}
          label="Ready for the make over?"
        />
      </div>
    </section>
  );
}
