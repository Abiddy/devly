'use client';

import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Problems } from '@/components/Problems';
import { Process } from '@/components/Process';
import { Footer } from '@/components/Footer';
import { TextFill } from '@/components/TextFill';
import { motion, useScroll, useSpring } from 'framer-motion';

const PHILOSOPHY_TEXT = "It was the brainchild of Giorgio Rosa, engineer from Bologna with links to the former 'Republic of Salò' during WW II. His aim was to create a state that was completely independent from Italy. It had its own system of taxation and would finance itself.";

export default function Home() {
  const { scrollYProgress } = useScroll();

  return (
    <main className="relative min-h-screen">
      <Navbar />

      <div className="relative z-20">
        <Hero />
        
        {/* Scroll-driven Text Fill Section */}
        <TextFill text={PHILOSOPHY_TEXT} />
        
        <Problems />
        <Process />
        <Footer />
      </div>

      {/* Background Noise/Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
    </main>
  );
}
