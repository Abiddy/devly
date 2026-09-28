'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Check, X } from 'lucide-react';

import { BookButton, SiteFooter, SiteNav } from './SiteChrome';
import {
  HeroWireframe,
  LeadToasts,
  MetricsVisual,
  SearchVisual,
  SpeedVisual,
  Specimen,
  type Pin,
} from './visuals';
import { anatomyLetters } from './fonts';
import './anatomy.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

type Chapter = {
  id: string;
  part: string;
  title: ReactNode;
  body: string;
  points: string[];
  visual: ReactNode;
};

const specimen = (src: string, alt: string, url: string, pins: Pin[], extra?: ReactNode) => (
  <div className="an-visual">
    <Specimen src={src} alt={alt} url={url} pins={pins} />
    {extra}
  </div>
);

const chapters: Chapter[] = [
  {
    id: 'first-impression',
    part: 'The first five seconds',
    title: (
      <>
        Say what you do <em>before they blink.</em>
      </>
    ),
    body: 'Visitors decide in a few seconds whether to stay. A good hero answers three questions right away: what is this, who is it for, and what should I do next?',
    points: [
      'A headline that owns what you do',
      'One clear action, repeated where it matters',
      'Navigation that points to the money pages',
    ],
    visual: specimen('/website-assets/work-pacific.png', 'Pacific auto body website hero', 'pacificautobody.us', [
      { x: 50, y: 30, label: 'Headline' },
      { x: 84, y: 85, label: 'Get an estimate' },
      { x: 50, y: 5, label: 'Focused nav' },
    ]),
  },
  {
    id: 'clarity',
    part: 'Clarity',
    title: (
      <>
        Explain it like you&apos;re <em>talking to a customer.</em>
      </>
    ),
    body: 'Nobody reads a website — they scan it. Plain words, a clear promise, and an obvious reason to care beat clever copy every time.',
    points: [
      'A name and look that feel like you',
      'One line that says exactly what you sell',
      'A single, obvious next step',
    ],
    visual: specimen('/website-assets/work-freeland.png', 'Freeland Family Farms website', 'Freeland Family Farms', [
      { x: 30, y: 36, label: 'Brand' },
      { x: 38, y: 60, label: 'What you sell' },
      { x: 16, y: 73, label: 'Shop now' },
    ]),
  },
  {
    id: 'trust',
    part: 'Trust',
    title: (
      <>
        Show proof <em>before you ask.</em>
      </>
    ),
    body: 'People buy from businesses they believe. Real photos, specific details, and a confident voice do more selling than any adjective.',
    points: [
      'Real photography, not stock',
      'Specific details that answer questions',
      'A voice that sounds like a real brand',
    ],
    visual: specimen('/showcase/paradise-bikes.png', 'Paradise Worldwide e-bike website', 'paradisebikes.co', [
      { x: 72, y: 38, label: 'Real photos' },
      { x: 22, y: 74, label: 'Specifics' },
      { x: 18, y: 32, label: 'Voice' },
    ]),
  },
  {
    id: 'leads',
    part: 'Conversion',
    title: (
      <>
        A site that doesn&apos;t capture leads <em>is a brochure.</em>
      </>
    ),
    body: 'Every page should give visitors an easy way to raise their hand — a form, a booking link, a tap to call. Then it should make sure you hear about it instantly.',
    points: [
      'Short forms that ask only what matters',
      'Booking, calls, and chat wherever they are',
      'Instant alerts so no lead goes cold',
    ],
    visual: specimen(
      '/showcase/platter.png',
      'Platter waitlist signup',
      'platter.digital',
      [
        { x: 42, y: 69, label: 'Email capture' },
        { x: 79, y: 69, label: 'One tap' },
        { x: 91, y: 5, label: 'Book a demo' },
      ],
      <LeadToasts />,
    ),
  },
  {
    id: 'speed',
    part: 'Speed & mobile',
    title: (
      <>
        Fast, and <em>made for thumbs.</em>
      </>
    ),
    body: 'Most of your visitors are on a phone, and every extra second of loading loses some of them. Good sites load almost instantly and feel native on a small screen.',
    points: [
      'Loads in about two seconds',
      'Text and buttons sized for phones',
      'Accessible to everyone',
    ],
    visual: (
      <div className="an-visual">
        <SpeedVisual />
      </div>
    ),
  },
  {
    id: 'findable',
    part: 'Findable',
    title: (
      <>
        Be the answer <em>when they search.</em>
      </>
    ),
    body: 'A great website does nothing if nobody finds it. Good sites are structured for Google, fast by default, and tied to your local listing.',
    points: [
      'Clean structure and metadata',
      'Local SEO and a Google Business profile',
      'Pages that match what people search',
    ],
    visual: (
      <div className="an-visual">
        <SearchVisual />
      </div>
    ),
  },
  {
    id: 'measured',
    part: 'Measured',
    title: (
      <>
        Know what&apos;s working. <em>Keep improving.</em>
      </>
    ),
    body: 'A good website isn’t finished at launch. Tracking visits, clicks, and leads shows what to fix next, so the site earns more every month.',
    points: [
      'Analytics on the actions that matter',
      'Clear monthly numbers',
      'Small improvements that compound',
    ],
    visual: (
      <div className="an-visual">
        <MetricsVisual />
      </div>
    ),
  },
];

const pretty = [
  'A big stock photo',
  'A clever slogan',
  'Contact page buried in the menu',
  'Slow on phones',
  'No idea what’s working',
];

const working = [
  'Real photos of your work',
  'A headline that says what you do',
  'A clear action on every screen',
  'Loads in about two seconds',
  'Every lead tracked',
];

const work = [
  { name: 'Pacific', tag: 'Auto body', src: '/website-assets/work-pacific.png' },
  { name: 'Freeland Family Farms', tag: 'Farm retail', src: '/website-assets/work-freeland.png' },
  { name: 'Paradise Worldwide', tag: 'E-bike rentals', src: '/showcase/paradise-bikes.png' },
  { name: 'BDL', tag: 'Clinical lab', src: '/website-assets/work-bdl.png' },
  { name: 'Value4Casa', tag: 'Real estate', src: '/website-assets/work-value4casa.png' },
  { name: 'The Mist', tag: 'Hospitality', src: '/showcase/the-mist.png' },
  { name: 'Rizq', tag: 'Marketplace', src: '/showcase/rizq.png' },
];

const marquee = ['Capture', 'Explain', 'Convince', 'Convert', 'Grow'];

export function AnatomyLanding() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to(q('.an-progress'), {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
        });

        const heroTl = gsap.timeline({ defaults: { ease: 'expo.out' } });
        SplitText.create(q('.an-hero__title'), {
          type: 'lines,chars',
          mask: 'lines',
          linesClass: 'an-line',
          autoSplit: true,
          onSplit(self) {
            gsap.set(q('.an-hero__title'), { autoAlpha: 1 });
            return gsap.from(self.chars, {
              yPercent: 115,
              rotate: 6,
              duration: 1.2,
              stagger: 0.022,
              delay: 0.1,
              ease: 'expo.out',
            });
          },
        });
        heroTl
          .from(q('.an-hero__kicker, .an-hero__sub, .an-hero__actions'), {
            y: 18, autoAlpha: 0, duration: 1, stagger: 0.08,
          }, 0.5)
          .from(q('[data-wire]'), { y: 60, autoAlpha: 0, scale: 0.96, duration: 1.4 }, 0.55)
          .from(q('[data-wire] .an-wire__page > *'), { autoAlpha: 0, y: 12, duration: 0.8, stagger: 0.08 }, 0.9)
          .from(q('[data-note]'), { autoAlpha: 0, scale: 0.6, duration: 0.7, stagger: 0.12, ease: 'back.out(2)' }, 1.3);

        gsap.to(q('[data-wire]'), {
          yPercent: -8,
          scale: 1.04,
          ease: 'none',
          scrollTrigger: { trigger: q('.an-hero')[0], start: 'top top', end: 'bottom top', scrub: true },
        });

        q('[data-fill]').forEach((el) => {
          const split = SplitText.create(el, { type: 'words' });
          gsap.fromTo(
            split.words,
            { opacity: 0.14 },
            {
              opacity: 1,
              stagger: 0.1,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true },
            },
          );
        });

        q('[data-split]').forEach((el) => {
          SplitText.create(el, {
            type: 'lines',
            mask: 'lines',
            linesClass: 'an-line',
            autoSplit: true,
            onSplit(self) {
              return gsap.from(self.lines, {
                yPercent: 105,
                duration: 1.1,
                stagger: 0.1,
                ease: 'expo.out',
                scrollTrigger: { trigger: el, start: 'top 85%', once: true },
              });
            },
          });
        });

        q('[data-reveal]').forEach((el) => {
          gsap.from(el, {
            y: 40,
            autoAlpha: 0,
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          });
        });

        q('.an-points').forEach((list) => {
          gsap.from(list.children, {
            x: -16,
            autoAlpha: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: { trigger: list, start: 'top 85%', once: true },
          });
        });

        q('[data-clip]').forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: 'inset(14% 10% 14% 10% round 18px)', scale: 1.08 },
            {
              clipPath: 'inset(0% 0% 0% 0% round 0px)',
              scale: 1,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 35%', scrub: true },
            },
          );
        });

        q('[data-pins]').forEach((el) => {
          gsap.from(el.querySelectorAll('.an-pin'), {
            scale: 0,
            autoAlpha: 0,
            duration: 0.6,
            stagger: 0.18,
            ease: 'back.out(2.2)',
            scrollTrigger: { trigger: el, start: 'top 55%', once: true },
          });
        });

        q('.an-toasts').forEach((el) => {
          gsap.from(el.querySelectorAll('[data-toast]'), {
            x: 60,
            autoAlpha: 0,
            duration: 0.9,
            stagger: 0.35,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 70%', once: true },
          });
        });

        q('[data-count]').forEach((el) => {
          const target = Number(el.dataset.count);
          const decimals = Number(el.dataset.decimals ?? 0);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target,
            duration: 1.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            onUpdate: () => {
              el.textContent = obj.v.toLocaleString('en-US', {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
              });
            },
          });
        });

        q('[data-ring-fill]').forEach((el) => {
          gsap.fromTo(
            el,
            { strokeDashoffset: Number(el.dataset.ringLen) },
            {
              strokeDashoffset: Number(el.dataset.ringFill),
              duration: 1.8,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            },
          );
        });

        q('[data-bars]').forEach((el) => {
          gsap.from(el.children, {
            scaleY: 0,
            duration: 1,
            stagger: 0.05,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          });
        });

        q('[data-type]').forEach((el) => {
          const text = el.dataset.type ?? '';
          const state = { n: 0 };
          el.textContent = '';
          const results = el.closest('.an-search')?.querySelectorAll('[data-result]') ?? [];
          gsap
            .timeline({ scrollTrigger: { trigger: el, start: 'top 80%', once: true } })
            .to(state, {
              n: text.length,
              duration: text.length * 0.055,
              ease: 'none',
              onUpdate: () => {
                el.textContent = text.slice(0, Math.round(state.n));
              },
            })
            .from(results, { y: 16, autoAlpha: 0, duration: 0.7, stagger: 0.12, ease: 'expo.out' }, '+=0.2');
        });

        q('.an-vs__pretty li').forEach((li, i) => {
          gsap.to(li, {
            '--strike': 1,
            color: '#8d8a83',
            duration: 0.6,
            delay: i * 0.12,
            ease: 'power2.out',
            scrollTrigger: { trigger: q('.an-vs')[0], start: 'top 60%', once: true },
          });
        });
        gsap.from(q('.an-vs__working li'), {
          x: 20,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.12,
          delay: 0.5,
          ease: 'expo.out',
          scrollTrigger: { trigger: q('.an-vs')[0], start: 'top 60%', once: true },
        });

        gsap.to(q('.an-marquee__track'), {
          xPercent: -30,
          ease: 'none',
          scrollTrigger: { trigger: q('.an-marquee')[0], start: 'top bottom', end: 'bottom top', scrub: true },
        });

        const cta = q('.an-cta__title')[0];
        if (cta) {
          gsap.from(cta, {
            scale: 0.86,
            autoAlpha: 0.2,
            ease: 'none',
            scrollTrigger: { trigger: cta, start: 'top 95%', end: 'top 45%', scrub: true },
          });
        }
      });

      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 900px)', () => {
        const track = q('.an-gallery__track')[0];
        const pin = q('.an-gallery')[0];
        if (!track || !pin) return;
        const distance = () => track.scrollWidth - window.innerWidth + 64;
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(q('.an-hero__title'), { autoAlpha: 1 });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="an">
      <div className="an-progress" aria-hidden />

      <SiteNav active="home" />

      <main>
        <section className="an-hero">
          <p className="an-hero__kicker an-mono">Fig. 01 — A field guide by Devly</p>
          <h1 className="an-hero__title">
            The{' '}
            <span className="an-anatomy">
              {anatomyLetters.map((l, i) => (
                <span key={i} className={`an-letter ${l.className}`}>
                  {l.ch}
                </span>
              ))}
            </span>{' '}
            of a <em>good</em> website.
          </h1>
          <p className="an-hero__sub">
            Looking good is the entry fee. Here&apos;s what makes a website
            actually work — dissected, one part at a time.
          </p>
          <div className="an-hero__actions">
            <a href="#anatomy" className="an-btn an-btn--ghost">
              Start the tour
              <ArrowRight aria-hidden />
            </a>
            <BookButton>Have one built for you</BookButton>
          </div>
          <HeroWireframe />
        </section>

        <section className="an-statement">
          <p data-fill>
            Most websites are built to be looked at. Good ones are built to
            work — to grab attention in seconds, explain clearly, earn trust,
            and turn a stranger into a customer.
          </p>
        </section>

        <div id="anatomy" className="an-chapters">
          {chapters.map((ch, i) => (
            <section
              key={ch.id}
              id={ch.id}
              className={`an-chapter${i % 2 ? ' an-chapter--flip' : ''}`}
            >
              <div className="an-chapter__copy">
                <p className="an-chapter__part an-mono">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {ch.part}
                </p>
                <h2 className="an-chapter__title" data-split>
                  {ch.title}
                </h2>
                <p className="an-chapter__body" data-reveal>
                  {ch.body}
                </p>
                <ol className="an-points">
                  {ch.points.map((pt, n) => (
                    <li key={pt}>
                      <span>{n + 1}</span>
                      {pt}
                    </li>
                  ))}
                </ol>
              </div>
              {ch.visual}
            </section>
          ))}
        </div>

        <section className="an-vs">
          <div className="an-vs__inner">
            <p className="an-mono an-vs__kicker">The difference</p>
            <h2 className="an-vs__title" data-split>
              Pretty gets a glance. <em>Working gets customers.</em>
            </h2>
            <div className="an-vs__grid">
              <div className="an-vs__col an-vs__pretty">
                <p className="an-mono">A pretty website</p>
                <ul>
                  {pretty.map((item) => (
                    <li key={item}>
                      <X aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="an-vs__col an-vs__working">
                <p className="an-mono">A working website</p>
                <ul>
                  {working.map((item) => (
                    <li key={item}>
                      <Check aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="an-marquee" aria-hidden>
          <div className="an-marquee__track">
            {[0, 1, 2].map((r) =>
              marquee.map((word) => (
                <span key={`${r}-${word}`}>
                  {word}
                  <i />
                </span>
              )),
            )}
          </div>
        </div>

        <section id="work" className="an-gallery">
          <div className="an-gallery__head">
            <p className="an-mono">Selected work</p>
            <h2 data-split>
              Built this way, <em>for real businesses.</em>
            </h2>
          </div>
          <div className="an-gallery__viewport">
            <div className="an-gallery__track">
              {work.map((w) => (
                <figure key={w.name} className="an-card">
                  <div className="an-card__img">
                    <Image src={w.src} alt={`${w.name} website`} width={1024} height={576} sizes="(min-width: 900px) 520px, 80vw" />
                  </div>
                  <figcaption>
                    <strong>{w.name}</strong>
                    <span>{w.tag}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="an-cta">
          <p className="an-mono an-cta__kicker">Fig. 02 — Yours</p>
          <h2 className="an-cta__title">
            Want one <em>built for you?</em>
          </h2>
          <p className="an-cta__sub" data-reveal>
            Book a free call. We&apos;ll look at your current site — or your
            idea — and you&apos;ll leave with a clear plan and price, whether or
            not we work together.
          </p>
          <div className="an-cta__actions" data-reveal>
            <BookButton className="an-btn--lg">Book a free call</BookButton>
            <Link href="/inquire" className="an-btn an-btn--ghost an-btn--lg">
              Get a quote
            </Link>
          </div>
          <div className="an-cta__founder" data-reveal>
            <Image src="/website-assets/nouman-portrait.png" alt="" width={96} height={96} />
            <p>
              You&apos;ll talk to <strong>Mo</strong>, founder of Devly. No
              sales team, no handoffs.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
