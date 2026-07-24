'use client';

import Image from 'next/image';
import { showcaseWork } from '@/data/showcase-work';

export function ShowcaseMarquee() {
  const items = [...showcaseWork, ...showcaseWork];

  return (
    <div className="relative overflow-hidden py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-obsidian to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-obsidian to-transparent sm:w-28" />

      <div className="showcase-marquee flex w-max gap-4">
        {items.map((item, i) => (
          <div
            key={`${item.src}-${i}`}
            className="relative h-48 w-72 shrink-0 overflow-hidden rounded-card border border-graphite bg-onyx sm:h-56 sm:w-80"
          >
            <Image
              src={item.src}
              alt={item.name}
              fill
              className="object-cover object-top"
              sizes="320px"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
