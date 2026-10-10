'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, CalendarDays } from 'lucide-react';

import { TiltedGridHero } from '@/components/ui/tilted-grid-hero';
import { InquiryForm } from '@/components/websites/InquiryForm';
import { CALENDLY_EVENT_URL } from '@/lib/calendly';
import { cn } from '@/lib/utils';

const WORK = [
  { src: '/showcase/crepe-heaven.png', alt: 'Crepe Heaven Café website' },
  { src: '/showcase/platter-hero.png', alt: 'Platter restaurant website' },
  { src: '/showcase/dholki-dhamaka.png', alt: 'Dholki Dhamaka rentals website' },
  { src: '/showcase/pacific.png', alt: 'Pacific website' },
  { src: '/showcase/paradise-bikes.png', alt: 'Paradise Bikes website' },
  { src: '/showcase/freeland.png', alt: 'Freeland website' },
  { src: '/showcase/artisan-carry.png', alt: 'Artisan Carry website' },
  { src: '/showcase/corridor-flow.png', alt: 'Corridor Flow website' },
  { src: '/showcase/rizq.png', alt: 'Rizq website' },
  { src: '/showcase/the-mist.png', alt: 'The Mist website' },
  { src: '/showcase/data-flow.png', alt: 'Data Flow website' },
  { src: '/showcase/rovr.png', alt: 'Rovr website' },
  { src: '/showcase/pursuit.png', alt: 'Pursuit website' },
  { src: '/showcase/paradise.png', alt: 'Paradise website' },
  { src: '/showcase/helpdesk.png', alt: 'Helpdesk website' },
  { src: '/showcase/platter.png', alt: 'Platter website' },
];

export function WorkHero() {
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <TiltedGridHero
      images={WORK}
      tileHeight={30}
      axis={52}
      speed={4.5}
      className="h-[100dvh] w-full bg-white text-[#0b0d12]"
    >
      <div className="relative z-10 flex h-full flex-col items-center justify-between px-6 py-8 text-center sm:py-10">
        <div className="flex w-full max-w-page flex-col items-center">
          <div className="flex w-full items-center justify-between text-left">
            <span className="text-[17px] font-bold tracking-[-0.04em] text-[#152868]">
              Devly
            </span>
            <a
              href="mailto:sales@devly.info"
              className="text-[13px] font-medium text-neutral-500 transition-colors hover:text-[#152868]"
            >
              sales@devly.info
            </a>
          </div>

          <h1 className="mt-[5dvh] text-balance text-4xl font-medium leading-[1.05] tracking-[-0.04em] sm:text-6xl">
            Websites that
            <br />
            bring people{' '}
            <em className="font-display font-medium italic text-[#152868]">in.</em>
          </h1>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                setStarted(true);
                setOpen(true);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-[#152868] px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_14px_34px_-14px_rgba(21,40,104,0.7)] transition hover:bg-[#1d3585] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#152868]"
            >
              What are you building?
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </button>
            <a
              href={CALENDLY_EVENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/90 px-7 py-3.5 text-[15px] font-semibold text-[#0b0d12] backdrop-blur transition hover:border-[#152868] hover:text-[#152868]"
            >
              <CalendarDays className="h-4 w-4" aria-hidden />
              Book a call
            </a>
          </div>
          <p className="max-w-sm text-balance text-[13px] leading-relaxed text-neutral-500">
            Custom websites for founders and local businesses.
          </p>
        </div>
      </div>

      <div
        className={cn(
          'absolute inset-0 z-20 flex items-center justify-center bg-white/60 p-4 backdrop-blur-md transition-opacity duration-300 sm:p-8',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
        aria-hidden={!open}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label="What are you building?"
          className={cn(
            'flex max-h-full w-full max-w-xl flex-col overflow-hidden rounded-[24px] border border-neutral-200 bg-white text-left shadow-[0_40px_90px_-40px_rgba(21,40,104,0.45)] transition-transform duration-300',
            open ? 'translate-y-0 scale-100' : 'translate-y-3 scale-[0.98]',
          )}
        >
          {started ? <InquiryForm compact onClose={() => setOpen(false)} /> : null}
        </div>
      </div>
    </TiltedGridHero>
  );
}
