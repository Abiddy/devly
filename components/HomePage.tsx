'use client';

import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Problems } from '@/components/Problems';
import { Intro } from '@/components/Intro';
import { Work } from '@/components/Work';
import { Process } from '@/components/Process';
import { Footer } from '@/components/Footer';
import { TextFill } from '@/components/TextFill';
import { ReviewsSection } from '@/components/ReviewsSection';
import type { Review } from '@/lib/reviews';

const PHILOSOPHY_TEXT =
  "Design is the silent ambassador of your brand. A high-performance website doesn't just display information; it builds trust, signals authority, and changes the trajectory of your business by turning visitors into lifelong believers.";

type HomePageProps = {
  reviews: Review[];
};

export function HomePage({ reviews }: HomePageProps) {
  return (
    <main className="relative min-h-screen">
      <Navbar />

      <div className="relative">
        <div className="relative z-10">
          <Hero />
        </div>
        <div className="relative z-20">
          <ReviewsSection reviews={reviews} />
        </div>
        <div className="relative z-30">
          <TextFill text={PHILOSOPHY_TEXT} />
        </div>
        <div className="relative z-40">
          <Problems />
        </div>
        <div className="relative z-50">
          <Intro />
        </div>
        <div className="relative z-[60]">
          <Work />
        </div>
        <div className="relative z-[70]">
          <Process />
        </div>
        <div className="relative z-[80]">
          <Footer />
        </div>
      </div>

      <div className="pointer-events-none fixed inset-0 z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-[0.03]" />
    </main>
  );
}
