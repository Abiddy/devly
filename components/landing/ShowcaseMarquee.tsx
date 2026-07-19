'use client';

import Image from 'next/image';
import { showcaseWork } from '@/data/showcase-work';

export function ShowcaseMarquee() {
  const items = [...showcaseWork, ...showcaseWork];

  return (
    <div className="relative overflow-hidden py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-24" />

      <div className="showcase-marquee flex w-max gap-4 sm:gap-5">
        {items.map((item, i) => (
          <div
            key={`${item.src}-${i}`}
            className="relative h-44 w-44 shrink-0 overflow-hidden rounded-2xl border border-border bg-muted sm:h-52 sm:w-52 md:h-56 md:w-56"
          >
            <Image
              src={item.src}
              alt={item.name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 176px, 224px"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
