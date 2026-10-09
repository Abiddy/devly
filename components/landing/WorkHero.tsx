import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { TiltedGridHero } from '@/components/ui/tilted-grid-hero';

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
          <Link
            href="/inquire"
            className="inline-flex items-center gap-2 rounded-full bg-[#152868] px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_14px_34px_-14px_rgba(21,40,104,0.7)] transition hover:bg-[#1d3585] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#152868]"
          >
            Inquire
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
          <p className="max-w-sm text-balance text-[13px] leading-relaxed text-neutral-500">
            Custom websites for founders and local businesses.
          </p>
        </div>
      </div>
    </TiltedGridHero>
  );
}
