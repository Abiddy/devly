'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useMemo } from 'react';

const navItems = [
  { name: 'Problem', href: '#problem' },
  { name: 'Intro', href: '#intro' },
  { name: 'Work', href: '#work' },
  { name: 'Process', href: '#process' },
];

export const Navbar = () => {
  const { scrollYProgress } = useScroll();
  
  const bars = useMemo(() => Array.from({ length: 24 }), []);

  return (
    <motion.nav 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 p-4 md:p-8 flex justify-center"
    >
      <div className="w-full max-w-[1400px] flex items-center justify-between pointer-events-none">
        {/* Left Side: Logo in Orange */}
        <Link href="/" className="pointer-events-auto flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#F97316]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F97316]">
                Devly Studio
            </span>
        </Link>
        
        {/* Center: Nav Items in Black (Small) */}
        <div className="hidden lg:flex items-center gap-8 pointer-events-auto">
          {navItems.map((item, i) => (
            <Link 
              key={item.name}
              href={item.href}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 hover:text-black transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Side: WATCH THE MOVIE style button */}
        <div className="flex items-center gap-8 pointer-events-auto">
            {/* Progress Bars (Minimal) */}
            <div className="hidden md:flex items-center gap-[2px] h-4">
                {bars.map((_, i) => {
                    const range = i / bars.length;
                    return (
                        <motion.div
                            key={i}
                            className="w-[1px] h-full bg-black/5"
                            style={{ 
                                scaleY: useTransform(scrollYProgress, [range, range + 0.05], [0.3, 1]),
                                backgroundColor: useTransform(scrollYProgress, [range, range + 0.05], ['rgba(0,0,0,0.05)', '#F97316'])
                            }}
                        />
                    );
                })}
            </div>

            <a 
              href="https://calendly.com/abidinouman/new-meeting" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-4 py-2 border border-[#F97316] rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] text-[#F97316] hover:bg-[#F97316] hover:text-white transition-all active:scale-95"
            >
                Book a Call
            </a>
            
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F97316] hidden sm:inline">
                2026
            </span>
        </div>
      </div>
    </motion.nav>
  );
};
