'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion';
import { BlurText } from './BlurText';
import { PhoneUI } from './PhoneUI';

const CONTACT_EMAIL = 'sales@devly.info';
const CALENDLY_URL = 'https://calendly.com/abidinouman/new-meeting';
const EASE = [0.22, 1, 0.36, 1] as const;

const heroBgVideo =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_022325_dcb1b04a-75f8-429b-a8dd-08272d030e7e.mp4';
const imgClouds =
  'https://jab-speak-07810027.figma.site/assets/355b52e3cf88c06096e719625a84afe3861c2727-BTnUzilu.png';
const imgPeaceSymbol =
  'https://jab-speak-07810027.figma.site/assets/205cff25a34184bc8a6d049229042c52dfd558bf-ncz4dPKl.png';
const imgMedThumb1 =
  'https://jab-speak-07810027.figma.site/assets/f03f38dc1cbef6d3f79ae6fa9add02eab2f12003-DCXWJ372.png';
const imgMedThumb2 =
  'https://jab-speak-07810027.figma.site/assets/54f786bf5983d305543d95fff6f61a7240658afa-tRA4vYp2.png';
const imgMedThumb3 =
  'https://jab-speak-07810027.figma.site/assets/65dab302f45297096be0e98a219fdc9263e5ac7c-R-8QtYqa.png';

const navLinks = [
  { label: 'How it works', href: '#how' },
  { label: 'Why Devly', href: '#why' },
  { label: 'KPIs', href: '#kpis' },
  { label: 'Contact', href: '#contact' },
];

const kpiItems = [
  {
    title: 'Brand Awareness',
    meta: 'Reach & lift',
    thumb: imgMedThumb2,
  },
  {
    title: 'Lead Generation',
    meta: 'Qualified interest',
    thumb: imgMedThumb1,
  },
  {
    title: 'Sales Conversion',
    meta: 'Attributed revenue',
    thumb: imgMedThumb3,
  },
];

function usePhoneWidth() {
  const [width, setWidth] = useState(200);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 768) setWidth(268);
      else if (w >= 640) setWidth(240);
      else setWidth(200);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return width;
}

function useCardPhoneLayout() {
  const [layout, setLayout] = useState({ width: 220, bottom: '-88%' });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 768) setLayout({ width: 300, bottom: '-68%' });
      else if (w >= 640) setLayout({ width: 300, bottom: '-165%' });
      else setLayout({ width: 220, bottom: '-88%' });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return layout;
}

function blurIn(delay: number) {
  return {
    initial: { opacity: 0, filter: 'blur(10px)', y: 20 },
    animate: { opacity: 1, filter: 'blur(0px)', y: 0 },
    transition: { duration: 1.05, delay, ease: EASE },
  };
}

function MeditationItem({
  title,
  meta,
  thumb,
  delay,
  inView,
}: {
  title: string;
  meta: string;
  thumb: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <motion.div
      className="relative flex min-h-[88px] overflow-hidden rounded-2xl bg-white"
      initial={{ opacity: 0, y: -24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      <div className="flex flex-1 items-center p-4 pr-3">
        <p
          className="font-[family-name:var(--font-noola-inter)] font-medium leading-snug"
          style={{
            fontSize: 'clamp(1.05rem, 3.5vw, 1.2rem)',
            color: '#6b6893',
          }}
        >
          {title}
        </p>
      </div>
      <div className="relative w-[110px] shrink-0 self-stretch overflow-hidden rounded-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={thumb} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <span className="absolute right-2 top-2 whitespace-nowrap rounded-full bg-black/40 px-2.5 py-1 font-[family-name:var(--font-noola-inter)] text-[10px] leading-none text-white">
          {meta}
        </span>
      </div>
    </motion.div>
  );
}

export function AgencyLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const phoneWidth = usePhoneWidth();
  const cardPhone = useCardPhoneLayout();

  const moodRef = useRef<HTMLDivElement | null>(null);
  const moodInView = useInView(moodRef, { once: true, margin: '-80px' });
  const medRef = useRef<HTMLDivElement | null>(null);
  const medInView = useInView(medRef, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const cloudsY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return (
    <main
      className="agency relative min-h-screen font-[family-name:var(--font-noola-display)]"
      style={{ backgroundColor: '#6574a4' }}
    >
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative flex min-h-[100svh] flex-col overflow-visible"
        style={{ backgroundColor: '#6574a4' }}
      >
        {!reducedMotion ? (
          <video
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_top]"
            src={heroBgVideo}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
          />
        ) : (
          <div className="absolute inset-0" style={{ backgroundColor: '#6574a4' }} />
        )}

        {/* Nav */}
        <nav className="relative z-50 px-5 pt-5 sm:px-8 md:px-10 md:pt-6">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <a
              href="#"
              className="font-[family-name:var(--font-noola-display)] text-[1.35rem] font-medium tracking-tight text-white sm:text-[1.5rem]"
            >
              Devly
            </a>

            <div className="hidden items-center gap-3 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-xl bg-white px-5 py-3 text-xs uppercase tracking-widest transition-colors hover:bg-white/90"
                  style={{ color: '#706a9b' }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl px-5 py-2.5 text-sm uppercase text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#9092e3' }}
              >
                Book a call
              </a>
            </div>

            <button
              type="button"
              className="relative z-50 flex h-8 w-8 flex-col items-center justify-center md:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span
                className="block h-0.5 w-6 bg-white transition-transform duration-[350ms]"
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)',
                  transform: menuOpen
                    ? 'translateY(8px) rotate(45deg)'
                    : 'none',
                }}
              />
              <span
                className="mt-1.5 block h-0.5 w-6 bg-white transition-[transform,opacity] duration-[350ms]"
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)',
                  opacity: menuOpen ? 0 : 1,
                  transform: menuOpen ? 'scaleX(0)' : 'none',
                }}
              />
              <span
                className="mt-1.5 block h-0.5 w-6 bg-white transition-transform duration-[350ms]"
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)',
                  transform: menuOpen
                    ? 'translateY(-8px) rotate(-45deg)'
                    : 'none',
                }}
              />
            </button>
          </div>

          {/* Mobile menu */}
          <div
            className="absolute left-5 right-5 top-full z-40 overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md md:hidden"
            style={{
              maxHeight: menuOpen ? 400 : 0,
              opacity: menuOpen ? 1 : 0,
              transition: 'max-height 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.45s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            <div className="flex flex-col gap-2 p-4">
              {navLinks.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl bg-white px-5 py-3 text-center text-xs uppercase tracking-widest"
                  style={{
                    color: '#706a9b',
                    transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.35s cubic-bezier(0.4,0,0.2,1)',
                    transitionDelay: menuOpen ? `${i * 40}ms` : '0ms',
                    transform: menuOpen ? 'translateY(0)' : 'translateY(-8px)',
                    opacity: menuOpen ? 1 : 0,
                  }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-5 py-3 text-center text-sm uppercase text-white"
                style={{
                  backgroundColor: '#9092e3',
                  transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.35s cubic-bezier(0.4,0,0.2,1)',
                  transitionDelay: menuOpen ? `${navLinks.length * 40}ms` : '0ms',
                  transform: menuOpen ? 'translateY(0)' : 'translateY(-8px)',
                  opacity: menuOpen ? 1 : 0,
                }}
              >
                Book a call
              </a>
            </div>
          </div>
        </nav>

        <div className="relative z-10 flex flex-1 flex-col items-center px-5 pb-64 pt-16 text-center sm:px-8 sm:pb-72 sm:pt-20 md:pb-80 md:pt-24">
          <motion.p
            className="text-sm font-medium text-white/70 sm:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: EASE }}
          >
            Creator partnerships that convert
          </motion.p>

          <BlurText
            as="h1"
            text="We help brands meet their KPIs"
            delay={190}
            direction="bottom"
            stepDuration={0.6}
            className="mb-20 mt-4 justify-center text-center leading-[0.88] tracking-tighter text-white sm:mb-24"
            style={{
              fontSize: 'clamp(2.8rem, 9vw, 7rem)',
              maxWidth: '11ch',
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.6, ease: EASE }}
          >
            <PhoneUI width={phoneWidth} />
          </motion.div>

          <div className="relative z-40 flex flex-col items-center pb-44 pt-16 sm:pb-52 sm:pt-20">
            <motion.p
              className="max-w-sm font-medium text-white/85 md:max-w-md"
              style={{ fontSize: 'clamp(0.875rem, 2vw, 1.125rem)' }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1.1, delay: 0.4, ease: EASE }}
            >
              We connect brands with vetted creators — qualified on engagement,
              consistency, and audience fit — then match them to the KPI you
              actually need to hit.
            </motion.p>
            <motion.a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 rounded-xl bg-white px-6 py-3 text-sm font-medium uppercase tracking-wide"
              style={{ color: '#706a9b' }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1.1, delay: 0.6, ease: EASE }}
            >
              Book a call
            </motion.a>
          </div>
        </div>

        {/* Clouds */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 z-30 clouds-position"
          style={{ y: reducedMotion ? 0 : cloudsY }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgClouds} alt="" className="w-full" />
          <div
            className="absolute inset-x-0 bottom-0 h-[40%]"
            style={{
              background: 'linear-gradient(to bottom, transparent, #6574a4)',
            }}
          />
        </motion.div>
      </section>

      {/* Features intro */}
      <section
        id="why"
        className="relative z-40 mx-auto max-w-5xl overflow-visible px-5 pb-20 pt-28 text-center sm:px-8 sm:pb-28 sm:pt-32 md:pb-36 md:pt-40"
      >
        <h2
          className="overflow-visible tracking-tighter text-white"
          style={{ lineHeight: 1.12 }}
        >
          <BlurText
            text="Designed"
            delay={160}
            direction="bottom"
            stepDuration={0.58}
            className="justify-center overflow-visible pb-1 pt-2"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6.5rem)' }}
          />
          <span
            className="inline-flex flex-wrap items-baseline justify-center gap-x-3 overflow-visible"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6.5rem)' }}
          >
            <BlurText
              text="for your"
              delay={160}
              direction="bottom"
              stepDuration={0.58}
              animationFrom={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
              animationTo={[
                { filter: 'blur(5px)', opacity: 0.5, y: -5 },
                { filter: 'blur(0px)', opacity: 1, y: 0 },
              ]}
              className="justify-center overflow-visible"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imgPeaceSymbol}
              alt=""
              className="inline-block rounded-lg object-cover"
              style={{
                width: 'clamp(50px, 6vw, 88px)',
                height: 'clamp(50px, 6vw, 88px)',
                position: 'relative',
                top: '0.05em',
              }}
            />
            <BlurText
              text="results"
              delay={160}
              direction="bottom"
              stepDuration={0.58}
              className="justify-center overflow-visible"
            />
          </span>
          <BlurText
            text="not vanity metrics"
            delay={160}
            direction="bottom"
            stepDuration={0.58}
            className="justify-center overflow-visible"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6.5rem)' }}
          />
        </h2>
        <motion.p
          className="mx-auto mt-10 max-w-md font-medium text-white/80 sm:mt-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.4, ease: EASE }}
        >
          Follower count is a lazy brief. We qualify every creator before we
          match them to your objective.
        </motion.p>
      </section>

      {/* How it works card */}
      <section id="how" className="relative z-40 px-4 pb-6 sm:px-6 md:px-10">
        <motion.div
          ref={moodRef}
          className="mx-auto max-w-5xl overflow-hidden rounded-[24px] sm:rounded-[28px]"
          style={{ backgroundColor: '#f0f3ff' }}
          initial={{ opacity: 0, y: 40 }}
          animate={moodInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <div className="flex min-h-[400px] flex-col md:min-h-[420px] md:flex-row">
            <div className="order-2 flex flex-col justify-end p-6 sm:p-8 md:order-1 md:w-[45%] md:p-10">
              <motion.p
                className="text-xs uppercase tracking-widest"
                style={{ color: '#9092e3' }}
                {...(moodInView
                  ? blurIn(0.3)
                  : {
                      initial: { opacity: 0, filter: 'blur(10px)', y: 20 },
                    })}
              >
                How it works
              </motion.p>
              <motion.p
                className="mt-4 max-w-[36ch] font-medium"
                style={{
                  color: '#060cd1',
                  fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
                }}
                {...(moodInView
                  ? blurIn(0.55)
                  : {
                      initial: { opacity: 0, filter: 'blur(10px)', y: 20 },
                    })}
              >
                Qualify creators on engagement, consistency, and audience
                alignment. Match them to awareness, lead gen, or sales. Track
                every campaign against the KPIs you set before launch.
              </motion.p>
            </div>
            <div className="relative order-1 min-h-[260px] flex-1 overflow-hidden md:order-2">
              <motion.div
                className="absolute left-1/2 -translate-x-1/2"
                style={{ bottom: cardPhone.bottom }}
                initial={{ opacity: 0, y: 40, scale: 0.92 }}
                animate={
                  moodInView
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 40, scale: 0.92 }
                }
                transition={{ duration: 1.4, delay: 0.55, ease: EASE }}
              >
                <PhoneUI width={cardPhone.width} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* KPIs card */}
      <section id="kpis" className="relative z-40 px-4 pb-16 sm:px-6 sm:pb-24 md:px-10">
        <motion.div
          ref={medRef}
          className="mx-auto max-w-5xl overflow-hidden rounded-[24px] sm:rounded-[28px]"
          style={{ backgroundColor: '#f0f3ff' }}
          initial={{ opacity: 0, y: 40 }}
          animate={medInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <div className="flex min-h-[400px] flex-col md:min-h-[420px] md:flex-row">
            <div className="order-2 flex flex-col justify-end p-6 sm:p-8 md:order-1 md:w-[45%] md:p-10">
              <motion.p
                className="text-xs uppercase tracking-widest"
                style={{ color: '#9092e3' }}
                {...(medInView
                  ? blurIn(0.3)
                  : {
                      initial: { opacity: 0, filter: 'blur(10px)', y: 20 },
                    })}
              >
                What we optimize for
              </motion.p>
              <motion.p
                className="mt-4 max-w-[36ch] font-medium"
                style={{
                  color: '#060cd1',
                  fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
                }}
                {...(medInView
                  ? blurIn(0.55)
                  : {
                      initial: { opacity: 0, filter: 'blur(10px)', y: 20 },
                    })}
              >
                Tell us which outcome matters. We build the creator strategy
                around that KPI — awareness, leads, or sales — not a generic
                roster pitch.
              </motion.p>
            </div>
            <div className="order-1 flex flex-1 items-center justify-center p-6 md:order-2 md:p-10">
              <div className="flex w-full max-w-[320px] flex-col gap-3">
                {kpiItems.map((item, i) => (
                  <MeditationItem
                    key={item.title}
                    title={item.title}
                    meta={item.meta}
                    thumb={item.thumb}
                    delay={0.4 + i * 0.22}
                    inView={medInView}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section
        id="contact"
        className="relative z-40 px-5 pb-20 pt-8 text-center sm:px-8 sm:pb-28"
      >
        <BlurText
          as="h2"
          text="We help brands meet their KPIs"
          delay={160}
          direction="bottom"
          stepDuration={0.5}
          className="mx-auto justify-center tracking-tighter text-white"
          style={{
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            maxWidth: '14ch',
            lineHeight: 1.05,
          }}
        />
        <motion.p
          className="mx-auto mt-6 max-w-md font-medium text-white/80"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
        >
          Allocating influencer budget and need it tied to a real objective?
          Let&apos;s talk.
        </motion.p>
        <motion.div
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.45, ease: EASE }}
        >
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl px-6 py-3 text-sm uppercase text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#9092e3' }}
          >
            Book a call
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="rounded-xl bg-white px-6 py-3 text-sm font-medium transition-colors hover:bg-white/90"
            style={{ color: '#706a9b' }}
          >
            {CONTACT_EMAIL}
          </a>
        </motion.div>
      </section>

      <footer className="relative z-40 border-t border-white/15 px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-white">Devly</p>
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} Devly. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
