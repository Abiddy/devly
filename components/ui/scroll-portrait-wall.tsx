'use client';

import * as React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface Speaker {
  name: string;
  role: string;
  /** Image URL. Square / portrait crops look best. */
  src: string;
}

export interface ScrollPortraitWallProps {
  /** Big sticky title rendered with `mix-blend-exclusion`. */
  title?: React.ReactNode;
  /** Small line under the title. */
  date?: React.ReactNode;
  /** Scroll hint that fades out as the wall comes into view. */
  hint?: React.ReactNode;
  /** People to scatter across the wall. Defaults to a built-in demo set. */
  speakers?: Speaker[];
  /** Columns on large screens (auto-reduced to 3 on `sm` and 2 on mobile). */
  columns?: number;
  /** Show the name / role caption under each portrait. Default `true`. */
  showCaptions?: boolean;
  /** Optional class override for the sticky title. */
  titleClassName?: string;
  /** Tighter spacing — smaller gaps between portraits. */
  condensed?: boolean;
  className?: string;
  /** Smooth exit: grid lifts off-screen, CTA settles at center. */
  scrollExit?: boolean;
  /** CTA rendered during the scroll-exit finale (requires `scrollExit`). */
  cta?: React.ReactNode;
}

function buildLayout(count: number, cols: number): number[][] {
  const rows: number[][] = [];
  let i = 0;
  let r = 0;
  while (i < count) {
    const row = new Array<number>(cols).fill(-1);
    const a = (r * 2 + (r % 2)) % cols;
    row[a] = i++;
    if (r % 3 === 0 && i < count) {
      let b = (a + 2) % cols;
      if (b === a) b = (a + 1) % cols;
      row[b] = i++;
    }
    rows.push(row);
    r++;
  }
  return rows;
}

function useResponsiveColumns(desired: number): number {
  const [cols, setCols] = React.useState(desired);

  React.useEffect(() => {
    const sm = window.matchMedia('(min-width: 640px)');
    const lg = window.matchMedia('(min-width: 1024px)');
    const update = () => {
      if (lg.matches) setCols(desired);
      else if (sm.matches) setCols(Math.min(desired, 3));
      else setCols(Math.min(desired, 2));
    };
    update();
    sm.addEventListener('change', update);
    lg.addEventListener('change', update);
    return () => {
      sm.removeEventListener('change', update);
      lg.removeEventListener('change', update);
    };
  }, [desired]);

  return cols;
}

const DEMO_SPEAKERS: Speaker[] = [
  { name: 'Alex Johnson', role: 'CEO & Founder' },
  { name: 'Sarah Chen', role: 'CTO' },
  { name: 'Marcus Rivera', role: 'Lead Designer' },
  { name: 'Emily Watson', role: 'Product Manager' },
  { name: 'David Kim', role: 'Senior Developer' },
  { name: 'Lisa Thompson', role: 'Marketing Director' },
  { name: 'James Wilson', role: 'UX Researcher' },
  { name: 'Rachel Green', role: 'Data Scientist' },
  { name: 'Michael Brown', role: 'DevOps Engineer' },
  { name: 'Anna Davis', role: 'Content Strategist' },
].map((s, i) => ({
  ...s,
  src: `https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/avatar-images/avatar-${String((i % 5) + 1).padStart(2, '0')}.jpg`,
}));

export function ScrollPortraitWall({
  title = 'Speakers',
  date = 'Oct 22, 2025',
  hint = 'scroll down to see effect',
  speakers = DEMO_SPEAKERS,
  columns = 4,
  showCaptions = true,
  titleClassName,
  condensed = false,
  className,
  scrollExit = false,
  cta,
}: ScrollPortraitWallProps) {
  const root = React.useRef<HTMLElement | null>(null);
  const gridRef = React.useRef<HTMLDivElement | null>(null);
  const titleRef = React.useRef<HTMLDivElement | null>(null);
  const ctaRef = React.useRef<HTMLDivElement | null>(null);
  const hintRef = React.useRef<HTMLDivElement | null>(null);
  const cols = useResponsiveColumns(Math.max(1, columns));
  const layout = React.useMemo(
    () => buildLayout(speakers.length, cols),
    [speakers.length, cols],
  );

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      const items = gsap.utils.toArray<HTMLElement>('.spw-item');

      if (reduce) {
        gsap.set(items, { scale: 1 });
        if (scrollExit) {
          gsap.set(ctaRef.current, { autoAlpha: 1, y: 0 });
        }
        return;
      }

      gsap.to(hintRef.current, {
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=40%',
          scrub: true,
        },
      });

      items.forEach((el) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          })
          .fromTo(
            el,
            { scale: 0 },
            { scale: 1, ease: 'power2.out', duration: 0.5 },
          )
          .to(el, { scale: 0, ease: 'power2.in', duration: 0.5 });
      });

      if (scrollExit && gridRef.current && ctaRef.current) {
        gsap.set(ctaRef.current, { autoAlpha: 0, y: 28 });
        gsap.set(gridRef.current, { y: 0 });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'bottom 72%',
              end: 'bottom 18%',
              scrub: 1.4,
            },
          })
          .to(
            gridRef.current,
            {
              y: () => -window.innerHeight * 0.62,
              ease: 'power2.inOut',
            },
            0,
          )
          .to(
            titleRef.current,
            {
              autoAlpha: 0,
              y: -16,
              ease: 'power2.out',
            },
            0,
          )
          .to(
            ctaRef.current,
            {
              autoAlpha: 1,
              y: 0,
              ease: 'power3.out',
            },
            0.42,
          );
      }
    },
    { scope: root, dependencies: [cols, scrollExit], revertOnUpdate: true },
  );

  return (
    <section
      ref={root}
      aria-label={typeof title === 'string' ? title : undefined}
      className={cn(
        'relative w-full overflow-x-hidden bg-background text-foreground',
        className,
      )}
    >
      <div
        ref={hintRef}
        className="pointer-events-none absolute left-1/2 top-[60vh] z-10 grid -translate-x-1/2 content-start justify-items-center gap-6 text-center"
      >
        <span className="relative max-w-[12ch] text-xs uppercase leading-tight text-muted-foreground after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:to-muted-foreground/40 after:content-['']">
          {hint}
        </span>
      </div>

      <div
        ref={titleRef}
        className={cn(
          'pointer-events-none sticky top-1/2 z-20 -translate-y-1/2 text-center',
          titleClassName
            ? 'text-muted-foreground'
            : 'text-white mix-blend-exclusion',
        )}
      >
        <h2
          className={cn(
            titleClassName ??
              'text-5xl font-semibold tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl',
          )}
        >
          {title}
        </h2>
        {date && (
          <p className="mt-1 text-xs uppercase tracking-wide text-white/60 sm:text-sm">
            {date}
          </p>
        )}
      </div>

      <div
        ref={gridRef}
        className={cn(
          'relative z-0 will-change-transform',
          scrollExit ? 'mb-[18vh] mt-[50vh]' : 'mb-[50vh] mt-[50vh]',
          condensed
            ? 'mx-auto max-w-5xl px-6 sm:max-w-6xl sm:px-8'
            : 'px-6 sm:px-10',
        )}
      >
        {layout.map((row, ri) => (
          <div
            key={ri}
            className={cn(
              'flex w-full',
              condensed ? 'justify-center gap-4 sm:gap-6' : 'gap-3 sm:gap-4',
              ri > 0 && (condensed ? 'mt-4 sm:mt-6' : 'mt-3 sm:mt-4'),
            )}
          >
            {row.map((idx, ci) => {
              if (idx === -1)
                return condensed ? (
                  <div key={ci} className="w-8 shrink-0 sm:w-12 md:w-16" />
                ) : (
                  <div key={ci} className="aspect-square flex-1" />
                );

              const s = speakers[idx];
              const origin = ci < cols / 2 ? 'right bottom' : 'left bottom';

              return (
                <div
                  key={ci}
                  className={cn(
                    'aspect-square',
                    condensed
                      ? 'w-36 shrink-0 sm:w-48 md:w-56 lg:w-64'
                      : 'flex-1',
                  )}
                >
                  <div
                    className="spw-item relative h-full w-full"
                    style={{ transformOrigin: origin, transform: 'scale(0)' }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.src}
                      alt={s.name}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="h-full w-full object-cover object-top"
                    />
                    {showCaptions && (
                      <div className="absolute -bottom-2 left-0 flex w-full translate-y-full justify-between gap-2 text-[11px] uppercase leading-tight text-muted-foreground sm:text-sm">
                        <span className="truncate">{s.name}</span>
                        <span className="shrink-0">({s.role})</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {scrollExit && cta && (
        <div className="relative z-30 h-[55vh]">
          <div
            ref={ctaRef}
            className="sticky top-1/2 flex -translate-y-1/2 justify-center"
          >
            {cta}
          </div>
        </div>
      )}
    </section>
  );
}

export default ScrollPortraitWall;
