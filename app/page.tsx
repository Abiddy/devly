'use client';

import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Problems } from '@/components/Problems';
import { Intro } from '@/components/Intro';
import { Work } from '@/components/Work';
import { Process } from '@/components/Process';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/PageTransition';
import { TextFill } from '@/components/TextFill';
import { motion, useScroll, useSpring } from 'framer-motion';

const PHILOSOPHY_TEXT = "It was the brainchild of Giorgio Rosa, engineer from Bologna with links to the former 'Republic of Salò' during WW II. His aim was to create a state that was completely independent from Italy. It had its own system of taxation and would finance itself.";

export default function Home() {
  const { scrollYProgress } = useScroll();

  return (
    <main className="relative min-h-screen">
      <Navbar />

      <div className="relative">
        <div className="relative z-10"><Hero /></div>
        <div className="relative z-20"><TextFill text={PHILOSOPHY_TEXT} /></div>
        <div className="relative z-30"><Problems /></div>
        <div className="relative z-40"><Intro /></div>
        <div className="relative z-50"><Work /></div>
        <div className="relative z-[60]"><Process /></div>
        <div className="relative z-[70]"><Footer /></div>
      </div>

      {/* Background Noise/Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
    </main>
  );
}
